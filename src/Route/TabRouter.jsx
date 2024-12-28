import * as React from 'react';
import {
  NavigationContainer,
  getFocusedRouteNameFromRoute,
} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import Icon from 'react-native-vector-icons/Ionicons';
import {Image} from 'react-native';

// Import your components
import MyTrip from '../pages/Tabs/MyTrip/MyTrip';
import Discover from '../pages/Tabs/Discover/Discover';
import Profile from '../pages/Tabs/Profile/Profile';
import ChatBot from '../pages/Tabs/ChatBot/ChatBot';
import SearchPlace from '../pages/createTrip/SearchPlace/SearchPlace';
import SelectTraveler from '../pages/createTrip/SelectTraveler/SelectTraveler';
import SelectDate from '../pages/createTrip/SelectDate/SelectDate';
import SelectBudget from '../pages/createTrip/SelectBudget/SelectBudget';
import ReviewTrip from '../pages/createTrip/ReviewTrip/ReviewTrip';
import GenerateTrip from '../pages/createTrip/GenerateTrip/GenerateTrip';

// Import your context
import CreateTripContext from '../Context/CreateTripContext';
import DetailTrip from '../pages/createTrip/DetailTrip/DetailTrip';
import AllDetailTrip from '../pages/createTrip/AllDetailTrip/AllDetailTrip';
import SignIn from '../pages/FirstLogin/SignIn/SignIn';
import MainReview from '../pages/createTrip/MainReview/MainReview';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const shouldHideTabBar = route => {
  const routeName = getFocusedRouteNameFromRoute(route) ?? 'MyTrip';
  return [
    'SearchPlace',
    'SelectTraveler',
    'SelectDate',
    'SelectBudget',
    'ReviewTrip',
    'GenerateTrip',
    'AllDetailTrip',
  ].includes(routeName);
};

// Stack for MyTrip
const MyTripStack = () => {
  const [tripData, setTripData] = React.useState([]);

  return (
    <CreateTripContext.Provider value={{tripData, setTripData}}>
      <Stack.Navigator>
        <Stack.Screen
          name="MyTrip"
          component={MyTrip}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SearchPlace"
          component={SearchPlace}
          options={{
            headerTitle: 'Search',
            headerTitleAlign: 'center',
            headerBackTitleStyle: {
              color: 'black',
            },
          }}
        />
        <Stack.Screen
          name="SelectTraveler"
          component={SelectTraveler}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="SelectDate"
          component={SelectDate}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="SelectBudget"
          component={SelectBudget}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="ReviewTrip"
          component={ReviewTrip}
          options={{
            headerTitle: '',
          }}
        />
        <Stack.Screen
          name="GenerateTrip"
          component={GenerateTrip}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="DetailTrip"
          component={DetailTrip}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AllDetailTrip"
          component={AllDetailTrip}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="MainReview"
          component={MainReview}
          options={{
            headerShown: false,
          }}
        />
      </Stack.Navigator>
    </CreateTripContext.Provider>
  );
};
const ProfileStack = () => {

  return (
      <Stack.Navigator>
        <Stack.Screen
          name="Profile"
          component={Profile}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{
            headerTitle: 'Search',
            headerTitleAlign: 'center',
            headerBackTitleStyle: {
              color: 'black',
            },
          }}
        />
     
      </Stack.Navigator>
  );
};

export default function TabRouter() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: {
          display: shouldHideTabBar(route) ? 'none' : 'flex',
        },
      })}>
      <Tab.Screen
        name="MyTripStack"
        component={MyTripStack}
        options={{
          tabBarLabel: 'My Trip',
          tabBarIcon: ({color}) => (
            <Icon name="location-sharp" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Discover"
        component={Discover}
        options={{
          tabBarLabel: 'Discover',
          tabBarIcon: ({color}) => (
            <Icon name="compass" size={24} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="ChatBot"
        component={ChatBot}
        options={{
          tabBarLabel: 'AI Chat',
          tabBarIcon: ({color}) => (
            <Image
              style={{width: 25, height: 25}}
              source={require('../../assets/images/logo.png')}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileStack"
        component={ProfileStack}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({color}) => (
            <Icon name="person" size={24} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
