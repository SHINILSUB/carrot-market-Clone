import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import HeaderComponent from '../components/HeaderComponent';

import { Container, Tab, Tabs } from 'native-base';
import HomeComponent from '../components/HomeComponent';
// import data from '../data.json';
import { getCateData } from '../config/BackData';

const diviceWidth = Dimensions.get('window').width;

export default function HomePage({ navigation }) {
  console.disableYellowBox = true;

  const [categories, setCategories] = useState(new Array());

  useEffect(() => {
    download();
  }, []);

  const download = async () => {
    const result = await getCateData();
    setCategories(result);
  };

  return (
    <Container style={styles.container}>
      <HeaderComponent headerTitle="Home" />
      <Ionicons
        onPress={() => Alert.alert('성공')}
        style={styles.headerIcons1}
        name={'search-outline'}
        color={'grey'}
        size={25}
      />
      <Ionicons
        style={styles.headerIcons2}
        name={'apps-outline'}
        color={'grey'}
        size={25}
      />
      <Ionicons
        style={styles.headerIcons3}
        name={'notifications-outline'}
        color={'grey'}
        size={25}
      />

      <View>
        <ScrollView>
          {categories.map((category, i) => {
            return (
              <HomeComponent
                category={category}
                key={i}
                navigation={navigation}
              />
            );
          })}
        </ScrollView>
        <TouchableOpacity
          style={styles.pencilSize}
          onPress={() => navigation.navigate('HomeAddPage')}
        >
          <Image
            resizeMode={'contain'}
            style={styles.pencil}
            source={require('../assets/Pencil.png')}
          />
        </TouchableOpacity>
      </View>
    </Container>
  );
}

const styles = StyleSheet.create({
  pencilSize: {
    width: 50,
    height: 50,
    position: 'absolute',
    marginTop: 650,
    marginLeft: 300,
  },

  pencil: {
    position: 'absolute',
    // marginTop: 350,
    // marginLeft: 300,
    width: '100%',
    height: '100%',
  },
  headerIcons1: {
    position: 'absolute',
    top: 45,
    left: 270,
  },
  headerIcons2: {
    position: 'absolute',
    top: 45,
    left: 300,
  },
  headerIcons3: {
    position: 'absolute',
    top: 45,
    left: 330,
  },
});
