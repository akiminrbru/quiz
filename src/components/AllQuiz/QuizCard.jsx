import styles from "./AllQuiz.module.scss";
import image from "../../assets/russia_image.svg";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setPlace } from "../../store/mapInfoReducer";

const QuizCard = ({ card }) => {
    const dispatch = useDispatch();

    // useEffect(() => {
    //     dispatch(setPlace(card.questions));
    //     // console.log(card.questions);
    // }, []);

    return (
        <div className={styles.quizCard}>
            <div className={styles.quizCard__image}>
                <img src={image} alt="image" />
            </div>
            <div className={styles.quizCard__info}>
                <div className={styles.quizCard__info_title}>Россия</div>
                <Link to="/map">
                    <div className={styles.quizCard__info_start}>Начать</div>
                </Link>
            </div>
        </div>
    );
};

export default QuizCard;
