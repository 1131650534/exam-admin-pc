import axios from 'axios'
import Vue from 'vue'
import router from '@/router'
//设置公共的地址
// axios.defaults.baseURL = "http://localhost:4000/api"
axios.defaults.baseURL = "http://exam.zcmax.top/api"

// 请求拦截
axios.interceptors.request.use((config)=>{
  let token = localStorage.getItem('token')
  config.headers.token  =  token
  return config 
},err=>{
  return Promise.reject(err)
})
// 响应拦截
axios.interceptors.response.use((response)=>{

 if(response.data.meta.status==5044){
   localStorage.setItem('token','')
   router.push('/')
 }
  return response;
},err=>{
  return Promise.reject(err)
  }
)
Vue.prototype.$http = axios
export default axios;
