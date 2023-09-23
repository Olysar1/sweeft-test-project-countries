//Receives array of three letter country codes and returns formatted text
//example: ["ARM", "GEO"] => "Armenia, Georgia"

import countries from "i18n-iso-countries";

export const generateCountriesArr = (codeArr) => {
  countries.registerLocale(require("i18n-iso-countries/langs/en.json"));

  let resultText = "";

  codeArr.forEach((code, index) => {
    resultText += `${countries.getName(code, "en")}${
      index === codeArr.length - 1 ? "" : ", "
    }`;
  });

  return resultText;
};
