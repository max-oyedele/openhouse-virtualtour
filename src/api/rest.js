import axios from 'axios';

const API_V1_POST_URL = 'http://www.openhousemarketingsystem.com/application/virtualplus/v1/post.php';
const API_V1_GET_URL = 'http://www.openhousemarketingsystem.com/application/virtualplus/v1/get.php';

const axios_post_instance = axios.create({
  headers: {
    'Content-Type': 'multipart/form-data',
    'Access-Control-Allow-Origin': '*',
  },
  withCredentials: false,
});

export const postData = (loginInfo) => {
  return new Promise((resolve, reject) => {
    axios_post_instance
      .post(API_V1_POST_URL, loginInfo)
      .then((res) => {        
        resolve(res.data)
      })
      .catch((err) => {
        reject(err);
      })
  })
}

export const getContentByAction = (param) => {
  return new Promise((resolve, reject)=>{
    axios.get(API_V1_GET_URL, {
      params: param
    })
    .then((res) => {
      resolve(res.data);
    })
    .catch((err) => {
      reject(err)
    });
  })
}