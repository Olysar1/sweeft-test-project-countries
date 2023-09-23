import { configureStore } from "@reduxjs/toolkit";
import { cacheReducer } from "./cacheReducer";

const store = configureStore({ reducer: cacheReducer });

export default store;
