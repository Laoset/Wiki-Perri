import Axios from "axios";
//Traer razas
export const getRazas = () => {
  return async function (dispatch) {
    let infoAfuera = await Axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: infoAfuera.data,
    });
  };
};
//Traer temperamentos
export const getTemperaments = () => {
  return async function (dispatch) {
    let infoTemperaments = await Axios.get(
      "http://localhost:3001/temperaments"
    );
    return dispatch({
      type: "GET_TEMPERAMENTS",
      payload: infoTemperaments.data,
    });
  };
};
//Search name dogs
export const searchDog = (payload) => {
  return async function (dispatch) {
    let dataPerri = await Axios.get(
      `http://localhost:3001/dogs?name=${payload}`
    );
    return dispatch({
      type: "SEARCH_DOG",
      payload: dataPerri.data,
    });
  };
};
//Search ID dogs
export const searchIdDog = (id) => {
  return async function (dispatch) {
    let dataPerriId = await Axios.get(`http://localhost:3001/dogs/${id}`);
    return dispatch({
      type: "SEARCH_ID",
      payload: dataPerriId.data,
    });
  };
};
//FILTROS//
export const filterByTemperament = (payload) => {
  return {
    type: "FILTER_BY_TEMPERAMENT",
    payload,
  };
};
export const filterByCreated = (payload) => {
  return {
    type: "FILTER_BY_CREATED",
    payload,
  };
};
//ORDER//
export const orderByAlf = (payload) => {
  return {
    type: "ORDER_BY_ALF",
    payload,
  };
};
export const orderByWeight = (payload) => {
  return {
    type: "ORDER_BY_WEIGHT",
    payload,
  };
};
//POST DE PERRITO
export const postDog = (payload) => {
  return async function (dispatch) {
    let postPerri = await Axios.post("http://localhost:3001/dogs", payload);
    return dispatch({
      type: "POST_DOG",
      payload: postPerri,
    });
  };
};
