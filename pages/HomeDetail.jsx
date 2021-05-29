import React,  {useState, useEffect }from 'react';
import { StyleSheet, ScrollView, View, Text, Image, Dimensions, TouchableOpacity,Alert } from 'react-native';
import HomeDetailComponent from '../components/HomeDetailComponent';
import {getCateData} from '../config/BackData'
import { Container, Tab, Tabs } from 'native-base';


export default function HomeDetail(navigation) {
  console.disableYellowBox = true;

  const [categories, setCategories] = useState(new Array());

  useEffect(() => {
    download();
},[]);

  const download = async () => {
    const result = await getCateData();      
    setCategories(result);
  }

  return (
    <Container style={styles.container}>
       <View>
      {/* <ScrollView> */}
        {categories.map((category, i) =>{
          return (
            <HomeDetailComponent
            category = {category}
            key = {i}
            navigation={navigation}
            />
          );
        })}
          {/* </ScrollView>   */}
      </View>
            
    
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});