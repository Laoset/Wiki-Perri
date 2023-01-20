const initialState = {
  dogs: [],
  //Otro estado con todos mis perros, para que pueda filtrar uno tras otro con todos mis dogs
  allDogs: [],
  //Otro estado para orden
  allDesorderDogs: [],
  //Estado para mis temperamentos
  temperaments: [],
  //Detail estado
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
        allDogs: payload,
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
      const allDoges = state.allDogs;
      const dataFiltrada =
        payload === "created"
          ? allDoges.filter((d) => d.createInDb)
          : allDoges.filter((d) => !d.createInDb);
      return {
        ...state,
        dogs: payload === "all" ? allDoges : dataFiltrada,
      };
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
        dogs: orderSort,
      };
    case "ORDER_BY_WEIGHT":
      const allWeight = state.allDesorderDogs;
      const orderWeight =
        payload === "menor"
          ? allWeight.sort(function (a, b) {
              //ParseInt para convertir a num mi primer valor de la cadena de string que devuelve weight
              if (parseInt(a.weight) > parseInt(b.weight)) {
                return 1;
              }
              if (parseInt(b.weight) > parseInt(a.weight)) {
                return -1;
              }
              return 0;
            })
          : allWeight.sort(function (a, b) {
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
    default:
      return state;
  }
}

export default rootReducer;
