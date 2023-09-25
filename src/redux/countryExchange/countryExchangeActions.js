export const updateCountry = (country) => {
  return {
    type: "SELECT_COUNTRY",
    payload: country,
  };
};
