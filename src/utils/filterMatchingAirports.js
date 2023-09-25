//filters original array to match substring

export const filterMatchingAirports = (original, substring) => {
  if (!substring) {
    return original;
  } else {
    return original.filter((airport) =>
      airport.name.toLowerCase().includes(substring.toLowerCase())
    );
  }
};
