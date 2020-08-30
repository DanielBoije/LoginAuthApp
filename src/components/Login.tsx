import React from 'react';
import { StyleSheet, Text, View, Image, Keyboard, TouchableWithoutFeedback} from 'react-native';
import Form from "./Form"

// Virhe: React Navigation 'navigation' is missing in props validation
// Korjaus: Lisätty eslintrc tiedostoon rulesiin "react/prop-types": ["error", { "ignore": ["navigation"] }]

// interface Props {
//   navigation: any
// }

const Login: React.FC = ({navigation}) => {   
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image 
                    style={styles.image}
                    source={require("../images/lock-removebg-preview.png")}/>
                <Text style={styles.text}>Authentication required</Text>
            </View>
            <View>
                <Form
                    navigation={navigation}
                />
            </View>
        </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#a29bfe",
  },
  image: {
    height: 150,
    width:150,
    marginTop: 70
  },
  imageContainer: {
    flex: 1,
    alignItems: "center", 
    justifyContent: "center", 
  },
  text: {
    opacity: 0.8,
    fontSize: 16
  }
});

export default Login;