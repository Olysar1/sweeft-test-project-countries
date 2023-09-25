const CACHE_INITIAL_STATE = {
  cache: [],
};

export const cacheReducer = (state = CACHE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "CACHEITEM":
      //check for duplicate values
      const isDuplicate = state.cache.some(
        (item) => item.cca2 === action.payload.cca2
      );
      if (isDuplicate) return state;

      return {
        cache: [...state.cache, action.payload],
      };
    default:
      return state;
  }
};
