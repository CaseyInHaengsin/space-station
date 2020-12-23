import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import axios from 'axios';

const getLocation = async () => {
    let res = await axios.get('http://api.open-notify.org/iss-now.json');
    return res.data.iss_position
}

const Map = () => {
    
    const [location, setLocation] = useState({latitude: 38.8765, longitude: -77.0098});

    useEffect(() => {
        const interval = setInterval(async() => {
            let data = await getLocation();
            setLocation({latitude: data.latitude, longitude: data.longitude})
        }, 10000)
        return () => clearInterval(interval)
    })
  
    return (

            <MapView
            style={styles.map}
            provider={null}
            region={{
                latitude: parseFloat(`${location.latitude}`),
                longitude: parseFloat(`${Number(location.longitude)}`),
                latitudeDelta: 100.00,
                longitudeDelta: 100.00,
            }}
            >
                <Marker 
                    key={location.latitude}
                    coordinate={{
                        latitude: parseFloat(`${location.latitude}`),
                        longitude: parseFloat(`${location.longitude}`)
                    }}
                    
                >

                </Marker>
                
               
               </MapView>
            
        
    )
}

const styles = StyleSheet.create({
      map: {
        ...StyleSheet.absoluteFillObject,
      }
    })

export default Map;