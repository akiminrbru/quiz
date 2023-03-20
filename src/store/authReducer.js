import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../utils/config";

export const login = createAsyncThunk(
    "auth/login",
    async function ({ name, password }, { rejectWithValue, dispatch }) {
        try {
            const response = await axios.post(URL + "user/signin", {
                name,
                password,
            });
            // console.log(response.data);

            dispatch(setUser(response.data));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const auth = createAsyncThunk(
    "auth/auth",
    async function (_, { rejectWithValue, dispatch }) {
        try {
            const response = await axios.get(URL + "user", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });

            // console.log(response.data);

            dispatch(updateUser(response.data));
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const logout = createAsyncThunk(
    "auth/logout",
    async function (_, { rejectWithValue, dispatch }) {
        try {
            localStorage.removeItem("token");
            dispatch(resetUser());
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: {},
        isAuth: false,
        loading: false,
        error: null,
    },
    reducers: {
        setUser(state, action) {
            localStorage.setItem("token", action.payload.token);
            state.isAuth = true;
            state.user = action.payload.data;
        },
        updateUser(state, action) {
            state.isAuth = true;
            state.user = action.payload.data;
        },
        resetUser(state) {
            state.isAuth = false;
            state.user = {};
        },
    },
    extraReducers: (builder) => {
        builder.addCase(auth.fulfilled, (state) => {
            state.loading = false;
        });
        builder.addCase(auth.pending, (state, action) => {
            state.loading = true;
        });
    },
});

const { setUser, resetUser, updateUser } = authSlice.actions;

export default authSlice.reducer;
