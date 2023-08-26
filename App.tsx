/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import LoginScreen from './screens/Login'
import SingUpScreen from './screens/SingUp'
import CategoryScreen from './screens/Category'
import CreateAccount from './screens/CreateAccunt'

const Stack = createNativeStackNavigator();


function App(): JSX.Element {
  
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={LoginScreen}
          options={{title: 'Welcome',headerShown: false}}
        />
        <Stack.Screen
          name="SingUp"
          component={SingUpScreen}
          options={{title: 'SingUp',headerShown: false}}
        />
         <Stack.Screen
          name="Category"
          component={CategoryScreen}
          options={{title: 'Category',headerShown: false}}
        />
        <Stack.Screen
          name="CreateAccount"
          component={CreateAccount}
          options={{title: 'CreateAccount',headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
