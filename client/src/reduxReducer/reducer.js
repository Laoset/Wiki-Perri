const initialState = {
  //Estado basico y de refresh
  dogs: [],
  //Estado para filtrar
  allDogs: [],
  //Estado para orden
  allDesorderDogs: [],
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
        allDogs: payload,
        allDesorderDogs: payload,
        detail: payload,
      };
    case "GET_TEMPERAMENTS":
      return {
        ...state,
        temperaments: payload,
      };
    case "SEARCH_DOG":
      return {
        ...state,
        allDesorderDogs: payload,
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
    case "FILTER_BY_ALL_DOGS":
      return {
        ...state,
        dogs: state.allDogs,
      };
    case "FILTER_BY_TEMPERAMENT":
      const allTemps = state.allDogs;
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
      if (payload === "allDogs") {
        return {
          ...state,
        };
      } else {
        const createdFilter =
          payload === "created"
            ? state.allDogs.filter((el) => el.createInDb === true)
            : state.allDogs.filter((el) => !el.createInDb);
        return {
          ...state,
          dogs: createdFilter,
        };
      }
    case "ORDER_BY_ALF":
      let orderSort =
        payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allDesorderDogs: orderSort,
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
        allDesorderDogs: orderWeight,
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
        allDesorderDogs: orderHeight,
      };
    default:
      return state;
  }
}

export default rootReducer;
