import styles from "./Profile.module.scss";
import image from "../../assets/russia_image.svg";

const QuizCard = () => {
    return (
        <div className={styles.quizCard}>
            <div className={styles.quizCard__image}>
                <img src={image} alt="image" />
            </div>
            <div className={styles.quizCard__info}>
                <div className={styles.quizCard__info_title}>Россия</div>
                <div className={styles.quizCard__info_progress}>22%</div>
            </div>
        </div>
    );
};

export default QuizCard;
