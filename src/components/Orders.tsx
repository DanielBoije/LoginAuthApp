import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Button, AsyncStorage } from 'react-native';
import axios from 'axios';

const Orders: React.FC = ({navigation}) => {

    const [orders, setOrders] = useState([])

    useEffect(()=> {
        getData();
    },[])

    const getData = () => { // sends token from AsyncStorage to server and gets the order schema
        AsyncStorage.getItem('token').then((value)=>{
            (value !== null) ?
                axios.get("http://10.0.2.2:4000/api/orders",
                {
                    headers: {
                        'Authorization': value
                    }
                })
                .then(res=> {
                    setOrders(res.data.orders)
                })
                :
                console.log("no token")
        })
    }    

    const pressHandler = (item) => {    // when a specific order is clicked
        navigation.navigate("OrderDetails", item)
    }

    const logOut = async () => {
        await AsyncStorage.clear()
        navigation.goBack()
    }

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Orders</Text>
            <FlatList
                keyExtractor= {(item, index) => index.toString()}
                data={orders}   
                renderItem={({item}) => (   
                    <TouchableOpacity onPress={()=>pressHandler(item)}>
                        <Text style={styles.text}>Order by {item.createdBy}</Text>
                    </TouchableOpacity>
                )}
            />
            <View style={styles.logout}>
                <Button
                    onPress={logOut}
                    color="#686de0"
                    title="Log out"
                />
            </View>
        </View>
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
  text: {
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    backgroundColor: "#dff9fe",
    opacity: 0.8
  },
  logout: {
    marginBottom: 50,
  }
})

export default Orders