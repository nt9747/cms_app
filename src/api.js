import axios from "axios";
import Cookie from 'js-cookie';
// const Reactotron = process.env.NODE_ENV !== "production" && require("reactotron-react-js").default; 

function createAxios() {
  var axiosInstant = axios.create();
  axiosInstant.defaults.baseURL = "http://localhost:3001/";
  axiosInstant.defaults.timeout = 20000;
  axiosInstant.defaults.headers = { "Content-Type": "application/json" };

  axiosInstant.interceptors.request.use(
    async config => {
      config.headers.token = Cookie.get('SESSION_ID');
      return config;
    },
    error => Promise.reject(error)
  );
  return axiosInstant;
}

export const getAxios = createAxios();

function handleResult(api) {
    return api.then(res => {
      if (res.data.status != 1) {
        return Promise.reject(res.data);
      }
      return Promise.resolve(res.data);
    });
  }

  export const requestLogin = (payload) => {
    return handleResult(getAxios.post('/users/login', {
      username: payload.USERNAME,
      password: payload.PASS
    })) 
  }

  export const requestGetListCar = (payload) => {
    return handleResult(getAxios.post(`${payload.CONG}page=${payload.PAGE}&limit=${payload.LIMIT}`, {
      fromDate: payload.FROMDATE,
      toDate: payload.TODATE,
      plateNumber: payload.PLATENUMBER,
      portIn: payload.PORTIN,
      numberCar: payload.NUMBERCAR,
      loaiHang: payload.LOAIHANG,
      portOut: payload.PORTOUT,
      loaiXe: payload.LOAIXE,
      orderNumber: payload.ORDERNUMBER,
      bienCont: payload.BIENCONT,
      bienMooc: payload.BIENMOOC,
    }))
  }
  export const resquestGetListCarType = (payload) => {
    return handleResult(getAxios.get(`/listCar/listCarType`, {
    }))
  }
  export const resquestGetListLoaiHang = (payload) => {
    return handleResult(getAxios.get(`/loaihang/`, {
    }))
  }
  export const requestGetListLoaiXe = (payload) => {
    return handleResult(getAxios.post(`${payload.THONGKELOAIXE}`,{
      fromDate: payload.FROMDATE,
      toDate: payload.TODATE,
      plateNumber: payload.PLATENUMBER,
      portOut: payload.PORTOUT,
      portIn: payload.PORTIN,
      numberCar: payload.NUMBERCAR,
      loaiHang: payload.LOAIHANG,
      loaiXe: payload.LOAIXE,
    }))
  }  
  