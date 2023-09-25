//gets currency symbol and key from provided country object

export const getCountryCurrencyData = (countryObj) => {
  const currencyKey = Object.values(Object.keys(countryObj.currency))[0];
  return {
    currencyKey: currencyKey,
    symbol: countryObj.currency[currencyKey].symbol,
  };
};
