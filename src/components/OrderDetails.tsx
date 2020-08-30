import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View, Button, AsyncStorage } from 'react-native';
import MapView from 'react-native-maps';
import axios from 'axios';

const OrderDetails: React.FC = ({route, navigation}) => {

  const [orders, setOrders] = useState()

  useEffect(()=> {
    getData();
  },[])

  const getData = () => { // sends token from AsyncStorage to server and gets specific order details
      AsyncStorage.getItem('token').then((value)=>{
        (value !== null) ?
            axios.get(`http://10.0.2.2:4000/api/orders/${route.params.id}`,
            {
                headers: {
                    'Authorization': value
                }
            })
            .then(res=> {
                console.log(res.data.orders)
                setOrders(res.data.orders)
            })
            :
            console.log("no token")
      })
  }

  
  const navigateBack = () => {
    navigation.goBack()
  }
  
  return (
    orders ?
    <View style={styles.container}>
        <Text style={styles.header}>{orders.additionalInfo}</Text>
        <View style={styles.textcontainer}>
        <Text style={styles.text}>Created by: {orders.createdBy}</Text>
        <Text style={styles.text}>Created at: {orders.createdAt}</Text>
        </View>
          <View style={styles.mapcontainer}>
            <MapView
              style={styles.map}
              region={{
                latitude: orders.coordinates.x,
                longitude: orders.coordinates.y,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <MapView.Marker
                coordinate={{
                  latitude:orders.coordinates.x,
                  longitude:orders.coordinates.y
                }}
                title={"Order"}
                description={"Order location"}
              />
            </MapView>
        </View>

        <View style={styles.button}>
          <Button
            onPress={navigateBack}
            color="#686de0"
            title="Go back"
          />
        </View>
    </View>
    :
    <Text style={styles.header}>Loading...</Text>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a29bfe",
    paddingTop: 30,
    paddingHorizontal: 40,
    alignItems: "center",
  },
  header: {
    fontWeight: "bold",
    fontSize: 40,
    marginVertical: 30,
  },
  textcontainer: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#c7ecee",
    borderRadius: 5
  },
  text: {
    fontSize: 20,
  },
  mapcontainer: {
    height: "50%",
    width: "100%",
    backgroundColor: "red",
    marginTop: 50,
  },
  map: {
    flex: 1
  },
  button: {
    position:"absolute",
    bottom: 0,
    marginBottom: 20
  },
})

export default OrderDetails;