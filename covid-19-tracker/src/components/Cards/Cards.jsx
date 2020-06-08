// Cards that display Infected, Recovered, and Deaths totals
import React from 'react'
import { Card, CardContent, CardMedia, Typography, Grid } from '@material-ui/core';
import CountUp from 'react-countup';
import cs from 'classnames';

import styles from './Cards.module.css'

const GridItem = ({heading, value, date, description}) => {
    return (
        <Grid item component={Card} xs={12} md={3} className={cs(styles.card, styles[heading.toLowerCase()])}>
            <CardMedia
                className={styles.media}
                image= {require('../../images/' + heading.toLowerCase() + '.jpg')}
                title="Infected"
            />
            <CardContent>
                <Typography color="textSecondary" gutterBottom>{heading}</Typography>
                <Typography variant="h5">
                    <CountUp start={0} end={value} duration={2.5} separator="," />
                </Typography>
                <Typography color="textSecondary">{new Date(date).toDateString()}</Typography>
                <br/>
                <Typography variant="body2">NUMBER OF {description.toUpperCase()}</Typography>
            </CardContent>
        </Grid>
    )
}

const Cards = ({ data: {confirmed, recovered, deaths, lastUpdate} }) => {
    if (!confirmed){
        return("Loading... ")
    }
    return(
        <div className={styles.container}>
            <Grid container spacing={3} justify="center">
               <GridItem heading="Infected" value={confirmed.value} date={lastUpdate} description="active COVID-19 cases"/>
               <GridItem heading="Recovered" value={recovered.value} date={lastUpdate} description="recoveries"/>
               <GridItem heading="Deaths" value={deaths.value} date={lastUpdate} description="deaths"/>
            </Grid>
        </div>
    )
}

export default Cards