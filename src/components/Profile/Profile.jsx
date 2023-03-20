import styles from "./Profile.module.scss";
import close from "../../assets/close.svg";
import QuizCard from "./QuizCard";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/authReducer";
import { useNavigate } from "react-router-dom";
import plus from "../../assets/plus.svg";
import axios from "axios";
import { URL } from "../../utils/config";
import { useEffect, useState } from "react";

const Profile = () => {
    const dispatch = useDispatch();
    const nagivate = useNavigate();

    const [data, setData] = useState(null);

    const profile = useSelector((state) => state.auth.user);
    // console.log(profile);

    const exit = () => {
        dispatch(logout());
        nagivate("/");
    };

    const getQuizes = () => {
        axios.get(URL + "quiz/user/" + profile.id).then((res) => {
            setData(res.data);
            console.log(data);
        });
    };

    useEffect(() => {
        getQuizes();
    }, []);

    // useEffect(() => {
    //     console.log(data);
    // });

    return (
        <div className={styles.profile}>
            <div className={styles.profile__close}>
                <Link to="/">
                    <img src={close} alt="close" />
                </Link>
            </div>
            <div className="container">
                <div className={styles.profile__header}>
                    <div className={styles.profile__info}>
                        <p className={styles.profile__info_login}>
                            {profile.name}
                        </p>
                        <p className={styles.profile__info_logo}>DarkSecrets</p>
                    </div>
                    <div className={styles.profile__btn}>
                        <button onClick={() => exit()}>Выйти</button>
                    </div>
                </div>
                <div className={styles.profile__quizList}>
                    <div className={styles.profile__quizList_create}>
                        <p>Созданные квизы</p>
                        <Link to="/createQuiz">Создать квиз</Link>
                    </div>
                    <div className={styles.profile__quizList_list}>
                        <QuizCard />
                        <QuizCard />
                        <QuizCard />
                    </div>
                </div>
                <div className={styles.profile__quizHistory}>
                    <p>Прошлые квизы</p>
                    <div className={styles.profile__quizHistory_list}>
                        <QuizCard />
                        <QuizCard />
                        <QuizCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
