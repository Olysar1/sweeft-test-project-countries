const COUNTRY_EXCHANGE_INITIAL_STATE = {
  selectedCountry: "",
};

export const countryExchangeReducer = (
  state = COUNTRY_EXCHANGE_INITIAL_STATE,
  action
) => {
  switch (action.type) {
    case "SELECT_COUNTRY":
      return {
        ...state,
        selectedCountry: action.payload,
      };
    default:
      return state;
  }
};
