import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../utils/config";

export const createQuiz = createAsyncThunk(
    "mapInfo/createQuiz",
    async function (quiz, { rejectWithValue }) {
        try {
            // console.log(quiz);
            const response = await axios.post(URL + "quiz", quiz, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
            });
            console.log(response);
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

export const getAllQuiz = createAsyncThunk(
    "mapInfo/getAllQuiz",
    async function (_, { rejectWithValue, dispatch }) {
        try {
            // console.log(quiz);
            const response = await axios
                .get(URL + "quiz/get/all")
                .then((res) => {
                    // console.log(res.data);
                    dispatch(setQuiz(res.data));
                });
        } catch (error) {
            return rejectWithValue(error);
        }
    }
);

// export const getQuiz = createAsyncThunk(
//     "mapInfo/getQuiz",
//     async function (_, { rejectWithValue }) {
//         try {
//             // console.log(quiz);
//             const response = await axios.get(URL + "quiz/user", quiz, {
//                 headers: {
//                     Authorization: `Bearer ${localStorage.getItem("token")}`,
//                 },
//             });
//             console.log(response);
//         } catch (error) {
//             return rejectWithValue(error);
//         }
//     }
// );

const mapInfoSlice = createSlice({
    name: "mapInfo",
    initialState: {
        quizInfo: [],
        questionInfo: [
            {
                id: 0,
                question: "Где находится Москва?",
                startPlace: [55.7522, 37.6115],
                selectPlace: [],
            },
            {
                id: 1,
                question: "Где находится Санкт-Петербург?",
                startPlace: [59.93863, 30.31413],
                selectPlace: [],
            },
            {
                id: 2,
                question: "Где находится Ростов-на-дону?",
                startPlace: [47.23135, 39.72328],
                selectPlace: [],
            },
        ],
    },
    reducers: {
        setPlace(state, action) {
            console.log(action.payload);
            state.questionInfo[action.payload.id].selectPlace =
                action.payload.coords;
        },
        // setPlace(state, action) {
        //     // console.log(action.payload);
        //     state.questionInfo = action.payload;
        // },
        // setQuiz(state, action) {
        //     state.quizInfo = action.payload;
        // },
    },
});

export const { setPlace, setQuiz } = mapInfoSlice.actions;

export default mapInfoSlice.reducer;
