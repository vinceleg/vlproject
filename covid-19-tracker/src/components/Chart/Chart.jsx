// Display line chart for Global covid cases and bar chart for Country covid cases
import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Line, Bar} from 'react-chartjs-2'

import styles from './Chart.module.css'

const Chart = ({data, country}) => {
    const [dailyData, setDailyData] = useState({});

    useEffect(() => {
        const fetchFromAPI = async () => {
            setDailyData(await fetchDailyData());
        }
        fetchFromAPI();
    }, []);

    const covidLineChart = (
        dailyData.length ? (
            <Line
                data={{
                    labels: dailyData.map(({date}) => date),
                    datasets: [{
                        data: dailyData.map(({confirmed}) => confirmed),
                        label: 'Infected',
                        borderColor: '#3333ff',
                        fill: true,
                     }, {
                        data: dailyData.map(({deaths}) => deaths),
                        label: 'Deaths',
                        borderColor: 'red',
                        backgroundColor: 'rgba(255, 0, 0, 0.5)',
                        fill: true,
                }]}}
            />) : null
    );

    const covidBarChart = (
        data.confirmed ? (
            <Bar 
                data={{
                    labels: ['Infected', 'Recovered', 'Deaths'],
                    datasets: [{
                        label: 'People', 
                        backgroundColor: ['rgba(0, 100, 255, 0.6)', 
                            'rgba(0, 255, 0, 0.5)',
                            'rgba(255, 0, 0, 0.6)',
                        ],
                        data: [data.confirmed.value, data.recovered.value, data.deaths.value]
                    }]
                }}
                options={{
                    legend: { display: false },
                    title: { display: true, text: `Current state in ${country}` },
                }}
            />
        ) : null
    )

    return(
        <div className={styles.container}>
            {country ? covidBarChart : covidLineChart}
        </div>
    )
}

export default Chart