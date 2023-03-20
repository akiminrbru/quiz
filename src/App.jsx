import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Route, Routes } from "react-router-dom";
import styles from "./App.module.scss";
import AllQuiz from "./components/AllQuiz/AllQuiz";
import Login from "./components/Authorization/Login";
import Registration from "./components/Authorization/Registration";
import CreateQuiz from "./components/CreateQuiz/CreateQuiz";
import Home from "./components/Home/Home";
import Map from "./components/Map/Map";
import MapPage from "./components/MapPage/MapPage";
import Profile from "./components/Profile/Profile";
import { auth } from "./store/authReducer";
import { getAllQuiz } from "./store/mapInfoReducer";
import { URL } from "./utils/config";

const App = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const user = useSelector((state) => state.auth.user);
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(getAllQuiz());
    // }, []);

    useEffect(() => {
        dispatch(auth());
        // console.log(isAuth);
        // console.log(user);
    }, []);
    return (
        <div className={styles.app}>
            {isAuth ? (
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/registration"
                        element={<Registration />}
                    ></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/profile" element={<Profile />}></Route>
                    <Route path="/createQuiz" element={<CreateQuiz />}></Route>
                    <Route path="/maps" element={<AllQuiz />}></Route>
                    <Route path="/map" element={<MapPage />}></Route>
                </Routes>
            ) : (
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/registration"
                        element={<Registration />}
                    ></Route>
                    <Route path="/login" element={<Login />}></Route>

                    <Route path="/maps" element={<AllQuiz />}></Route>
                    <Route path="/map" element={<MapPage />}></Route>
                </Routes>
            )}
        </div>
    );
};

export default App;
