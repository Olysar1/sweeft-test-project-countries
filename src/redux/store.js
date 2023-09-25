import { configureStore } from "@reduxjs/toolkit";
import { cacheReducer } from "./cache/cacheReducer";

const store = configureStore({ reducer: cacheReducer });

export default store;
