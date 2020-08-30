import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "../src/components/Login";                        
import Orders from "../src/components/Orders";
import OrderDetails from "../src/components/OrderDetails";

const { Navigator, Screen } = createStackNavigator();

const HomeNavigator = () => (
  <Navigator headerMode="none"> 
    <Screen name="Login" component={Login} />
    <Screen name="Orders" component={Orders} />
    <Screen name="OrderDetails" component={OrderDetails} />
  </Navigator>
);

export const AppNavigator:React.FC = () => (      //TS added
  <NavigationContainer>
    <HomeNavigator />
  </NavigationContainer>
);