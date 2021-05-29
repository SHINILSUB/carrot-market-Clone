import React, { useState, useEffect } from 'react';
import { Platform, StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Grid } from 'react-native-easy-grid';

import { secondhandpost } from '../config/BackData';
import {
  Container,
  Content,
  Item,
  Input,
  Form,
  Textarea,
  Button,
} from 'native-base';

const loading = require('../assets/Loading.gif');
const tempImage =
  'https://firebasestorage.googleapis.com/v0/b/sparta-study-plus.appspot.com/o/lecture%2F6-min.png?alt=media&token=bbc87679-4084-40ad-b6cd-01e808983fa4';


export default function HomeAddPage({ navigation }) {
  const [title, setTitle] = useState('');
  const [contents, setContents] = useState('');
  const [price, setPrice] = useState('');
  const [progress, setProgress] = useState(false);

  const [image, setImage] = useState(tempImage);
  const [imageUri, setImageUri] = useState('');

  const upload = async () => {
    console.log(title, contents, price);
    console.log('업로드 준비중!');
    setProgress(true);
    let data = {
      title: title,
      contents: contents,
      price: price,
      image: image
      
    };
    const response = await fetch(imageUri);
    const blob = await response.blob();
    const imageUrl = await imageUpload(blob);
    data.image = imageUrl;
    let result = await secondhandpost(data);
    if (result) {
      Alert.alert('글이 성공적으로 등록되었습니다!');
      setTitle('');
      setContent('');
      setImage(tempImage);
      setImageUri('');
      setProgress(false);
    }else {
      setProgress(false);
    }
  };


  const pickImage = async () => {
    console.log('이미지 선택');
    let imageData = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    getImageUrl(imageData);
  };
  const getImageUrl = async (imageData) => {
    setImageUri(imageData.uri);
  };


  useEffect(() => {
    getPermission();
  }, []);
  const getPermission = async () => {
    if (Platform.OS !== 'web') {
      const { status } =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('업로드하려면 권한이 필요해요');
      }
    }
  };

  const goHomePage = () => {
    navigation.navigate('HomePage');
  };

  return (
    <Container>
      {progress == false ? null : (<Image source={loading} style={styles.progress} />)}
      <Content>
        {imageUri == '' ? (
          <Grid style={styles.imageUpload} onPress={() => pickImage()}>
            <Text style={styles.imageUploadPlus}>+</Text>
          </Grid>
        ) : (
          <Image
            source={{ uri: imageUri }}
            style={styles.imagePreview}
            onPress={() => pickImage()}
          />
        )}

        <Item regular style={styles.title}>
          <Input
            placeholder="글 제목"
            value={title}
            style={{ fontSize: 13 }}
            onChangeText={(text) => setTitle(text)}
          />
        </Item>

        <Item regular style={styles.category}>
          <Input
            placeholder="가격 입력(선택사항)"
            value={price}
            style={{ fontSize: 13 }}
            onChangeText={(text) => setPrice(text)}
          />
        </Item>
        <Form style={styles.contentLayout}>
          <Textarea
            rowSpan={13}
            value={contents}
            placeholder="동네에 올릴 게시글 내용을 작성해주세요."
            onChangeText={(text) => setContents(text)}
          />
        </Form>
        <TouchableOpacity onPress={() => upload()}>
          <Button full style={styles.uploadButton}>
            <Text>등록</Text>
          </Button>
        </TouchableOpacity>
      </Content>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageUpload: {
    borderWidth: 2,
    borderRadius: 10,
    borderColor: 'grey',
    borderStyle: 'dashed',
    width: '90%',
    height: 200,
    marginTop: 20,
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageUploadPlus: {
    textAlign: 'center',
    width: '100%',
    fontSize: 90,
    fontWeight: '300',
    color: 'grey',
  },
  title: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  category: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  contentLayout: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    height: 400,
    borderWidth: 0.2,
    borderRadius: 10,
    borderColor: 'grey',
  },
  uploadButton: {
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
    backgroundColor: 'pink',
    borderRadius: 10,
  },
  progress: {
    width: 100,
    height: 100,
    borderRadius: 100,
    position: 'absolute',
    top: '50%',
    alignSelf: 'center',
    zIndex: 2,
}

});
