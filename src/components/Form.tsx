import React,{useState} from 'react';
import { StyleSheet, Alert, View, TextInput, Button, AsyncStorage } from 'react-native';
import axios from "axios"

const Form: React.FC = ({navigation}) => {

  const [inputUser, setInputUser] = useState("") 
  const [inputPassword, setInputPassword] = useState("")
  const changeText = (input,func) => func(input)
  
  const pressHandler = () => { 
    axios.post("http://10.0.2.2:4000/api/auth", {email: inputUser, password: inputPassword})
    .then(res =>  { 
        if (res.data.token) {
            AsyncStorage.setItem("token",res.data.token).then(()=>{
                navigation.navigate("Orders")
                setInputPassword("")
            })
        } else {
            Alert.alert("Login failed", "Wrong email or password", [
              {text: "Back"}
            ])
        }
    })
}
  return (
    <View style={styles.container}>
        <TextInput 
            placeholder="Email"
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={(input) => changeText(input,setInputUser)}
            value ={inputUser}
            style={styles.input}/>
        <TextInput
            placeholder="Password"
            autoCapitalize="none"
            value ={inputPassword}
            onChangeText={(input) => changeText(input,setInputPassword)}
            secureTextEntry
            style={styles.input}/>
        <View style={styles.button}>
          <Button
              onPress={pressHandler}
              color="#686de0"
              title="Log In"
          />
        </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginBottom: 60
  },
  input: {
    backgroundColor: "#dff9fb",
    margin: 10,
    padding: 10,
    borderRadius: 7,
  },
  button: {
    paddingTop: 15,
    paddingHorizontal: 100
  }
});

export default Form;