import React from 'react';
import { Platform } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import HomePage from '../pages/HomePage';
import HoodPage from '../pages/HoodPage';
import NearmePage from '../pages/NearmePage';
import ChatPage from '../pages/ChatPage';
import MyPage from '../pages/MyPage';

const Tabs = createBottomTabNavigator();

const TabNavigator = ({ navigation }) => {
  return (
    <Tabs.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName = Platform.OS === 'ios' ? 'ios-' : 'md-';
          
          if (route.name === '홈') {
            iconName += 'home-outline';
          } else if (route.name === '동네생활') {
            iconName += 'newspaper-outline';
           } else if (route.name === "내 근처") {
              iconName += "pin-outline";            
          } else if (route.name === '채팅') {
            iconName += 'chatbubbles-outline';
            // 채팅 수 표현 방법
          } else if (route.name === '나의 당근') {
            iconName += 'person-outline';
          } 
          return (
            <Ionicons
              name={iconName}
              color={focused ? 'tomato' : 'grey'}
              size={26}
            />
          );
        },
      })}
      tabBarOptions={{
        showLabel: true,
        style: {
          backgroundColor: '#fff',
          borderTopColor: '#ff7f00',
          height: 70,
          fontSize: 10,
        },
        activeTintColor: "#ff7f00",
        style: {
          backgroundColor: "#fff",
          borderTopColor: "#eee",
        },
      }}
    >
      <Tabs.Screen name="홈" component={HomePage} />
      <Tabs.Screen name="동네생활" component={HoodPage} />
      <Tabs.Screen name="내 근처" component={NearmePage} />
      <Tabs.Screen name="채팅" component={ChatPage} />
      <Tabs.Screen name="나의 당근" component={MyPage} />
    </Tabs.Navigator>
  );
};

export default TabNavigator;