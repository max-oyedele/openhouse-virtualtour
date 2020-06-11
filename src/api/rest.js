import axios from 'axios';

const API_V1_POST_URL = 'http://www.openhousemarketingsystem.com/application/virtualplus/v1/post.php';
const API_V1_GET_URL = 'http://www.openhousemarketingsystem.com/application/virtualplus/v1/get.php';
const API_V1_GET_LIVEINFO_URL = 'http://www.openhousemarketingsystem.com/application/virtualplus/v1/connect_to_live_oh.php'
const API_V1_GET_GEO_REVIEW_FOR_APPLE_URL = 'http://www.openhousemarketingsystem.com/application/virtualplus/v1/underview.php'

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

export const getLiveInfo = (param) => {
  return new Promise((resolve, reject)=>{
    axios.get(API_V1_GET_LIVEINFO_URL, {
      params: param
    })
    .then((res) => {
      //console.log(res);
      resolve(res.data);
    })
    .catch((err) => {
      reject(err)
    });
  })
}

export const getReviewGeoForApple = () => {
  return new Promise((resolve, reject)=>{
    axios.get(API_V1_GET_GEO_REVIEW_FOR_APPLE_URL)
    .then((res) => {
      //console.log(res);
      resolve(res.data);
    })
    .catch((err) => {
      reject(err)
    });
  })
}
