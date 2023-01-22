const initialState = {
  dogs: [],
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
    case "FILTER_BY_TEMPERAMENT":
      const allTemps = state.dogs;
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
      const createdFilter =
        payload === "created"
          ? state.dogs.filter((el) => el.createdInDB === true)
          : state.dogs.filter((el) => !el.createdInDB);
      return {
        ...state,
        allDesorderDogs: createdFilter,
      };
    case "ORDER_BY_ALF":
      let orderSort =
        payload === "asc"
          ? state.allDesorderDogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.allDesorderDogs.sort(function (a, b) {
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
          ? state.allDesorderDogs.sort(function (a, b) {
              //ParseInt para convertir a num mi primer valor de la cadena de string que devuelve weight
              if (parseInt(a.weight) > parseInt(b.weight)) {
                return 1;
              }
              if (parseInt(b.weight) > parseInt(a.weight)) {
                return -1;
              }
              return 0;
            })
          : state.allDesorderDogs.sort(function (a, b) {
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
    default:
      return state;
  }
}

export default rootReducer;
