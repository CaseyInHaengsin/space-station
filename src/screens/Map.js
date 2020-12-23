import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps'
import { Feather } from '@expo/vector-icons';
import axios from 'axios';


const getLocation = async () => {
    let res = await axios.get('http://api.open-notify.org/iss-now.json');
    return res.data.iss_position
}

const Map = () => {
    const [location, setLocation] = useState({latitude: 38.8765, longitude: -77.0098});
    const [zoom, setZoom] = useState(0.00);

    useEffect(() => {
        const interval = setInterval(async() => {
            let data = await getLocation();
            setLocation({latitude: parseFloat(data.latitude), longitude: parseFloat(data.longitude)})
        }, 10000)
        return () => clearInterval(interval)
    })
  
    return (

            <MapView
            style={styles.map}
            provider={null}
            region={{
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: zoom,
                longitudeDelta: zoom,
            }}
            >
                <Marker 
                    key={location.latitude}
                    coordinate={{
                        latitude: location.latitude,
                        longitude: location.longitude
                    }}
                    
                >
                </Marker>
                <Feather 
                    style={styles.zoomIn} 
                    name="zoom-in" 
                    color="black"
                    onPress={() => {
                        if (zoom > 0){
                            setZoom(zoom -10)
                        }
                    }}
                />
                <Feather
                    style={styles.zoomOut} 
                    name="zoom-out" 
                    color="black"
                    onPress={() => {
                        if (zoom < 180){
                            setZoom(zoom + 10)
                        }
                        
                    }}

                />
               
               </MapView>
            
        
    )
}

const styles = StyleSheet.create({
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      zoomIn: {
          alignSelf: 'flex-start',
          position: 'absolute',
          bottom: 100,
          left: 20,
          fontSize: 50
      },
      zoomOut: {
        alignSelf: 'flex-start',
        position: 'absolute',
        left: 20,
        bottom: 175,
        fontSize: 50
      }
    })

export default Map;