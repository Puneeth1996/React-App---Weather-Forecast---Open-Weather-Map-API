import React from "react";
import Form from "./components/form";
import Titles from "./components/titles";
import Chart from "./components/chartsdemo/index";
const Api_Key = "0a51f52a80e1d36043b1d3605497af41";

export default class App extends React.Component {

  state = {
    dataForcastArr: [],
    newData2: [],
    city: '',
    country: '',
    error: ''
  }

  getWeather = async (e) => {
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    e.preventDefault();

    if (city && country) {
      const api_call = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city},${country}&units=metric&appid=${Api_Key}`);
      const response = await api_call.json();

      let valArr = [];
      let newData2 = [];
	  console.log("New Response From API Call");
	  if(response.list){
		this.setState({
			dataForcastArr: response.list.slice(0, 7),
			city,
			country,
			error: ""
		})
		this.state.dataForcastArr.forEach(el => {
			let val = { x: el.dt_txt, y: el.main.temp };
			valArr.push(val);
		});
		newData2 = [{
			label: 'Wide Eye',
			values: valArr
		}];
		this.setState({newData2});
	  } else {
			this.setState({
				error: "Please correct input search values..."
			})
		}
	 
    } else {
      this.setState({
        error: "Please correct input search values..."
      })
    }
  }

  render() {
    return (
      <div className="">
        <Titles />
        <Form loadWeather={this.getWeather} />
        {this.state.error ? (<b>{this.state.error}</b>) : <Chart data={this.state.newData2} />}
      </div>
    )
  }
}
