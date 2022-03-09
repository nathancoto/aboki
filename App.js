import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Appearance } from 'react-native';

// Package pour la navigation
import { NavigationContainer, DarkTheme} from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import Animated, { EasingNode } from 'react-native-reanimated';

// Import des écrans
import Connexion from './pages/Connexion'
import Home from './pages/Home'
import Search from './pages/Search'
import Messages from './pages/Messages'
import Parameters from './pages/Parameters'
import EditParameters from './pages/EditParameters';
import MessageDetail from './pages/MessageDetail';
import Post_Detail from './pages/Post_Detail';

// Import des icônes
import HomeIcon from './assets/home-icon.svg';
import SearchIcon from './assets/search-icon.svg';
import MessagesIcon from './assets/messages-icon.svg';
import ParametersIcon from './assets/parameters-icon.svg';
import Param_Langue from './pages/Param_Langue';
import Param_Theme from './pages/Param_Theme';
import Param_Confidentialite from './pages/Param_Confidentialite';
import Profil from './pages/Profil';
import Group from './pages/Group';

// Création de l'objet qui va gérer la navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
let leftAnim = new Animated.Value(0);

export default function App() {
  // const [theme,setTheme] = useState(Appearance.getColorScheme());
  // console.log(theme)
  // console.log("oui", Appearance.getColorScheme())
  // Appearance.addChangeListener((scheme)=>{
  //   console.log(scheme)
  // })
  const [userData, setUserData] = useState('');

  function MyTabBar({ state, descriptors, navigation }) {
    function animation(value) {
      Animated.timing(leftAnim, {
        toValue: value,
        duration: 150,
        easing: EasingNode.linear
      }).start();
    }
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor="white"
          barStyle={'dark'}
          showHideTransition={'fade'}
          hidden={'hidden'} />
        <View style={{width: '100%', alignItems: 'center'}}>
          <View style={styles.tabBarContainer}>
            <Animated.View style={[styles.animationItemContainer, {left: leftAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '87.7%']
            })}]}>
              <View style={styles.animationItem} />
            </Animated.View>
            {state.routes.map((route, index) => {
              const { options } = descriptors[route.key];
              const label =
                options.tabBarLabel !== undefined
                  ? options.tabBarLabel
                  : options.title !== undefined
                  ? options.title
                  : route.name;
      
              const isFocused = state.index === index;
      
              const onPress = () => {
                const event = navigation.emit({
                  type: 'tabPress',
                  target: route.key,
                  canPreventDefault: true,
                });
                animation(index);
                
                if (!isFocused && !event.defaultPrevented) {
                  // The `merge: true` option makes sure that the params inside the tab screen are preserved
                  navigation.navigate({ name: route.name, merge: true });
                }
              };
      
              const onLongPress = () => {
                navigation.emit({
                  type: 'tabLongPress',
                  target: route.key,
                });
              };

              const renderIcon = (label) => {
                switch(label) {
                  case "Home":
                    return <HomeIcon height={17} style={isFocused ? styles.tabBarIconActive : styles.tabBarIcon} />
                  case "Search":
                    return <SearchIcon height={17} style={isFocused ? styles.tabBarIconActive : styles.tabBarIcon} />
                  case "Messages":
                    return <MessagesIcon height={17} style={isFocused ? styles.tabBarIconActive : styles.tabBarIcon} />
                  case "Parameters":
                    return <ParametersIcon height={17} style={isFocused ? styles.tabBarIconActive : styles.tabBarIcon} />
                  default:
                    return <Text>undefined</Text>
                }
              }
      
              return (
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={isFocused ? { selected: true } : {}}
                  accessibilityLabel={options.tabBarAccessibilityLabel}
                  testID={options.tabBarTestID}
                  onPress={onPress}
                  onLongPress={onLongPress}
                  style={isFocused ? styles.tabBarElementActive : styles.tabBarElement }
                  activeOpacity={.8}
                  key={index}
                >
                  {renderIcon(label)}
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </>
    );
  }

  function HomeTabs() {
    return (
      <Tab.Navigator
          initialRouteName='Connexion'
          screenOptions={{
            headerShown: false
          }}
          tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Home">
          {props => (<Home {...props} userData={userData}/>)}
        </Tab.Screen>
        <Tab.Screen name="Search">
          {props => (<Search {...props} userData={userData}/>)}
        </Tab.Screen>
        <Tab.Screen name="Messages">
          {props => (<Messages {...props} userData={userData}/>)}
        </Tab.Screen>
        <Tab.Screen name="Parameters">
          {props => (<Parameters {...props} userData={userData}/>)}
        </Tab.Screen>
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName='Connexion' screenOptions={{headerShown: false}} >
        <Stack.Screen name="Connexion">
          {props => (<Connexion {...props} setUserData={setUserData}/>)}
        </Stack.Screen>
        <Stack.Screen name="App" component={HomeTabs} />
        <Stack.Screen name="MessageDetail">
          {props => (<MessageDetail {...props} userData={userData}/>)}
        </Stack.Screen>
        <Stack.Screen name="EditParameters">
          {props => (<EditParameters {...props} userData={userData}/>)}
        </Stack.Screen>
        <Stack.Screen name="Param_Langue">
          {props => (<Param_Langue {...props} userData={userData}/>)}
        </Stack.Screen>
        <Stack.Screen name="Param_Theme">
          {props => (<Param_Theme {...props} userData={userData}/>)}
        </Stack.Screen>
        <Stack.Screen name="Param_Confidentialite">
          {props => (<Param_Confidentialite {...props} userData={userData}/>)}
        </Stack.Screen>
        <Stack.Screen name="Post_Detail">
          {props => (<Post_Detail {...props} userData={userData}/>)}
        </Stack.Screen>
        <Stack.Screen name="Profil">
          {props => (<Profil {...props} userData={userData}/>)}
        </Stack.Screen>
        <Stack.Screen name="Group">
          {props => (<Group {...props} userData={userData}/>)}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tabBarContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'absolute',
    bottom: 20,
    width: '90%',
    height: 63,
    backgroundColor: 'white',
    borderRadius: 25,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 10,
  },

  tabBarElement: {
    height: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    color: '#EF835E',
    flex: 1
  },

  tabBarElementActive: {
    height: '100%',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
    color: 'white',
    // backgroundColor: '#EF835E',
    flex: 1
  },

  tabBarIcon: {
    color: '#EF835E'
  },

  tabBarIconActive: {
    color: 'white'
  },

  animationItemContainer: {
    position: 'absolute',
    top: 0,
    width: '25%',
    height: '100%',
    overflow: 'hidden'
  },

  animationItem: {
    width: '100%',
    height: '100%',
    backgroundColor: '#EF835E',
    borderRadius: 25
  }
});
