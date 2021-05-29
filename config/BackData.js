import {
	Alert,
	AsyncStorage
  } from "react-native";
import axios from "axios";

const host = 'http://3.34.198.18:20001'
// homepage
export async function getCateData() {
	const result = await axios({
		method: "get",
		url: "http://3.34.198.18:20001/exchange",
		headers: {
			authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2MDZiMDZhMDA2NjhlZTkzMjZmNGY0YzUiLCJpYXQiOjE2MTc2MjY4MDB9.FGc6aCdych26nSPrwFr1oei75iTA0weI8OFaIgvjY78'
		}
	})
	console.log(result.data.exchangeBoardData);
	return result.data.exchangeBoardData
}

// addhomepage
export async function secondhandpost(data) {
	try {
		console.log("성공")
		const token = await AsyncStorage.getItem('session');
		const result = await axios({
			method: 'post',
			url: host + '/exchange',
			headers: {
				authorization: token
			},
			data: {
				data
			},
		});
		console.log("성공")
	} catch (err) {
		const error = err.response.data.error || err.message;

		Alert.alert(error);
	}
}

export async function imageUpload(blob) {
	const token = await AsyncStorage.getItem('session');
	const result = await axios({
		method: 'post',
		url: host + '/image',
		headers: {
			authorization: token
		},
		Formdata: blob
	})
	const imageUrl = URL.createObjectURL(blob)
	console.log(imageUrl);
	blob.close();
  
	return result;
  };
  