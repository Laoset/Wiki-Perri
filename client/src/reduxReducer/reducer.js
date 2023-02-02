const initialState = {
  dogs: [],
  dogsClean: [],
  //Estado para mis temperamentos
  temperaments: [],
  //Estado de detalle de perro
  detail: [],
};

function rootReducer(state = initialState, { type, payload }) {
  switch (type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: payload,
        dogsClean: payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: payload,
      };
    case "SEARCH_DOG":
      return {
        ...state,
        dogs: payload,
      };
    case "SEARCH_ID":
      return {
        ...state,
        detail: payload,
      };
    case "POST_DOG":
      return {
        ...state,
      };
    case "DELETE_DOG":
      return {
        ...state,
      };
    case "FILTER_BY_TEMPERAMENT":
      const allTemps = [...state.dogsClean];
      const filterTemp =
        payload === "all"
          ? allTemps
          : allTemps.filter((t) => {
              return t.temperament?.includes(payload);
            });
      return {
        ...state,
        dogs: filterTemp,
      };
    case "FILTER_BY_CREATED":
      let allDogs = [...state.dogsClean];
      let aux;
      if (payload === "allDogs") {
        return {
          ...state,
          dogs: allDogs,
        };
      }
      if (payload === "created") {
        aux = state.dogs.filter((el) => el.createInDb === true);
      }
      if (payload === "api") {
        aux = state.dogs.filter((el) => !el.createInDb);
      }
      return {
        ...state,
        dogs: aux,
      };
    case "ORDER_BY_ALF":
      let orderSort =
        payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return 1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) {
                return -1;
              }
              if (b.name.toLowerCase() > a.name.toLowerCase()) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: orderSort,
      };
    case "ORDER_BY_WEIGHT":
      const orderWeight =
        payload === "menor"
          ? state.dogs.sort(function (a, b) {
              //ParseInt para convertir a num mi primer valor de la cadena de string que devuelve weight
              if (parseInt(a.weight) > parseInt(b.weight)) {
                return 1;
              }
              if (parseInt(b.weight) > parseInt(a.weight)) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (parseInt(a.weight) > parseInt(b.weight)) {
                return -1;
              }
              if (parseInt(b.weight) > parseInt(a.weight)) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: orderWeight,
      };
    //Probando order por ALTURA
    case "ORDER_BY_HEIGHT":
      let orderHeight =
        payload === "menor"
          ? state.dogs.sort(function (a, b) {
              if (parseInt(a.height) > parseInt(b.height)) {
                return 1;
              }
              if (parseInt(b.height) > parseInt(a.height)) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (parseInt(a.height) > parseInt(b.height)) {
                return -1;
              }
              if (parseInt(b.height) > parseInt(a.height)) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: orderHeight,
      };
    default:
      return state;
  }
}

export default rootReducer;
