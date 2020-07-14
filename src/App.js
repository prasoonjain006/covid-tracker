import React from 'react';
// import Cards from './components/Cards/Cards.jsx';
// import Chart from './components/Chart/Chart.jsx';
// import CountryPicker from './components/CountryPicker/CountryPicker.jsx';

import {Chart, Cards, CountryPicker} from './components';
import './App.css';
import {fetchData, fetchIndiaData} from './api';
import Particles from 'react-particles-js';


import CardsInd from './components/CardsInd/CardsInd';
import IndiaData from './components/IndiaData/IndiaData';
import MyTable from './components/Table/Table';






const particlesOptions ={
    particles:{
        "number": {
            "value": 160,
            "density": {
                "enable": false
            }
        },
        "size": {
            "value": 10,
            "random": true
        },
        "move": {
            "direction": "bottom",
            "out_mode": "out"
        },
        "line_linked": {
            "enable": false
        }
    },
    "interactivity": {
        "events": {
            "onclick": {
                "enable": true,
                "mode": "remove"
            }
        },
        "modes": {
            "remove": {
                "particles_nb": 10
            }
        }
    }
  }


class App extends React.Component {

    state = {
        data: {},
        country: '',

      
        indiaData: null,
    

    }
    // onShowIndiaClick=()=>{
    //     this.setState({showIndia:true})
    //     this.setState({showGlobal:false})
    // }
    // onShowGlobalClick= async()=>{
    //     this.setState({ showIndia: false })
    //     this.setState({ showGlobal: true })
    //     // this.setState({glc:true})
    // }
    async componentDidMount(){
        const fetchedData = await fetchData();
        const fetchedIndiaData = await fetchIndiaData();

        
     
       
    
        this.setState({data : fetchedData});
        this.setState({ indiaData: fetchedIndiaData.data.confirmed.value })
        


    }
    

    handleCountryChange = async (country) => {
        const fetchedData = await fetchData(country);
        this.setState({data : fetchedData, country: country});
        //fetch the data
        //set the state
      
    }

   

    render(){

        const {data, country} = this.state;
        return (
            <div className= "container">
                <Particles  className='particles'
                     params={particlesOptions}/>

                <ul>
                    <li><a href="#global">Global Stats</a></li>
                    <li><a href="#indian">Indian Stats</a></li>
                    <li id="right">COVID-19 TRACKER</li>
                </ul>


                <img src="https://i.ibb.co/7QpKsCX/image.png" alt="covid-19" className="image"/>
                {/* <button onClick={this.onShowIndiaClick}  > India </button>
                <button onClick={this.componentDidMount}  > India </button> */}
              
                    <h1 id="indian" className="heading">COVID STATS IN INDIA</h1>
                    <IndiaData data={data}  indiaconfirmed={this.state.indiadata} />
                    <MyTable />
          
                     <h1  className="heading">COVID STATS GLOBALLY</h1>
                     <Cards data={data}    />
                    
                    
                    <CountryPicker handleCountryChange={this.handleCountryChange}/>
                    <Chart data={data} country={country} />
                


                <img  id="global" src="https://i.ibb.co/7QpKsCX/image.png" alt="covid-19" className="image"/>

               
                
//                 <Cards data={data} />
                


            </div>
        )
    }
}

export default App;