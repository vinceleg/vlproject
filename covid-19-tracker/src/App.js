import React from 'react';
import { Cards, Chart, CountrySelector } from './components';
import styles from './App.module.css';
import { fetchData } from './api';
import headerImage from './images/title-image.png'

class App extends React.Component{
    state = {
        data: {},
        country: '',
    }

    async componentDidMount (){
        const fetchedData = await fetchData();
        this.setState({ data: fetchedData })
    }

    handleCountrySelect = async (country) => {
        const fetchedCountry = await fetchData(country);
        this.setState({ data: fetchedCountry, country: country });
    }

    render(){
        const { data, country } = this.state;
        return(
            <div className={styles.container}>
                <img className={styles.headerImage} src={headerImage} alt="COVID-19"/>
                <Cards data={data}/>
                <CountrySelector handleCountrySelect={this.handleCountrySelect}/>
                <Chart data={data} country={country}/>
            </div>
        )
    }
}

export default App;