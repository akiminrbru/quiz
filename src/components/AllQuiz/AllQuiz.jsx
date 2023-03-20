import axios from "axios";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./AllQuiz.module.scss";
import QuizCard from "./QuizCard";
import { URL } from "../../utils/config";
import { useEffect, useState } from "react";

const AllQuiz = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);
    const data = useSelector((state) => state.mapInfo.quizInfo);
    // console.log(data);

    // useEffect(() => {
    //     console.log(data);
    // });

    return (
        <div className={styles.allQuiz}>
            <div className="container">
                <div className={styles.allQuiz__header}>
                    <div className={styles.allQuiz__header_logo}>
                        <p>DarkSecrets</p>
                    </div>
                    <div className={styles.allQuiz__header_nav}>
                        {isAuth ? (
                            <>
                                <Link to="/profile">Профиль</Link>
                            </>
                        ) : (
                            <>
                                <Link to="/login">Вход</Link>
                                <Link to="/registration">Регистрация</Link>
                            </>
                        )}
                    </div>
                </div>
                <div className={styles.allQuiz__content}>
                    <h3>Все викторины</h3>
                    <div className={styles.allQuiz__list}>
                        {/* {data.map((card) => (
                            <QuizCard key={card.id} card={card} />
                        ))} */}
                        <QuizCard />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AllQuiz;
