const CACHE_INITIAL_STATE = {
  cache: [],
};

export const cacheReducer = (state = CACHE_INITIAL_STATE, action) => {
  switch (action.type) {
    case "CACHEITEM":
      console.log(action.payload);
      return {
        cache: [...state.cache, action.payload],
      };
    default:
      return state;
  }
};
