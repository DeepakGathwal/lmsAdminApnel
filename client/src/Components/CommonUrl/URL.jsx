import axios from "axios";

// export const instance =  axios.create({ baseURL:"http://localhost:8080/jtc/admin/",
// headers : {'Content-Type' : 'application/json'},
// headers : {'Content-Type' :  'multipart/form-data'},
// // headers : {'Content-Type' :  'application/x-www-form-urlencoded'},
// withCredentials : true
// })

export const instance = axios.create({ baseURL:`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_DOMAIN}`})
instance.defaults.headers.common['Content-Type'] = 'multipart/form-data';
instance.defaults.withCredentials = true;
