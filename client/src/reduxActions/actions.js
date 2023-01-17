import Axios from "axios";

export const getRazas = () => {
  return async function (dispatch) {
    let infoAfuera = await Axios.get("http://localhost:3001/dogs");
    return dispatch({
      type: "GET_DOGS",
      payload: infoAfuera.data,
    });
  };
};
