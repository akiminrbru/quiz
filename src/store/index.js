import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authReducer";
import mapInfoReducer from "./mapInfoReducer";

export default configureStore({
    reducer: {
        auth: authReducer,
        mapInfo: mapInfoReducer,
    },
});
