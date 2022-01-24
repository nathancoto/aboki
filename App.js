import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Package pour la navigation
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Import des écrans
import Connexion from './pages/Connexion'
import Home from './pages/Home'
import Search from './pages/Search'
import Messages from './pages/Messages'
import Parameters from './pages/Parameters'

// Import des icônes
import HomeIcon from './assets/home-icon.svg';
import SearchIcon from './assets/search-icon.svg';
import MessagesIcon from './assets/messages-icon.svg';
import ParametersIcon from './assets/parameters-icon.svg';

// Création de l'objet qui va gérer la navigation
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function App() {
  function MyTabBar({ state, descriptors, navigation }) {
    return (
      <View style={{width: '100%', alignItems: 'center'}}>
        <View style={styles.tabBarContainer}>
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
                activeOpacity={.7}
              >
                {renderIcon(label)}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  }

  function HomeTabs() {
    return (
      <Tab.Navigator
          initialRouteName='Connexion'
          screenOptions={{headerShown: false}}
          tabBar={props => <MyTabBar {...props} />}>
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Messages" component={Messages} />
        <Tab.Screen name="Parameters" component={Parameters} />
      </Tab.Navigator>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Connexion' screenOptions={{headerShown: false}} >
        <Stack.Screen name="Connexion" component={Connexion} />
        <Stack.Screen name="Home" component={HomeTabs} />
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
    width: '80%',
    height: 63,
    backgroundColor: 'white',
    borderRadius: 25
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
    backgroundColor: '#EF835E',
    flex: 1
  },

  tabBarIcon: {
    color: '#EF835E'
  },

  tabBarIconActive: {
    color: 'white'
  }
});
