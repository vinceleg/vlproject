// Input selector used to select a specific Country
import React, { useState, useEffect } from 'react'
import { NativeSelect, FormControl } from '@material-ui/core'
import { fetchCountryData } from '../../api'

import styles from './CountrySelector.module.css';

const CountrySelector = ({handleCountrySelect}) => {
    const [countries, setCountries] = useState([])

    useEffect(()=>{
        const fetchCountries = async () =>{
            setCountries(await fetchCountryData());
        }
        fetchCountries();
    }, [setCountries]);

    
    return(
        <FormControl className={styles.formControl}>
            <NativeSelect className={styles.nativeSelect} defaultValue="" onChange={(event) => handleCountrySelect(event.target.value)}>
                <option value="">Global</option>
                {countries.map((country, index) => <option key={index} value={country}>{country}</option>)}
            </NativeSelect>
        </FormControl>
    )
        
}

export default CountrySelector;