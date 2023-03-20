import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import styles from "./Home.module.scss";

const Home = () => {
    const isAuth = useSelector((state) => state.auth.isAuth);

    return (
        <div className={styles.home}>
            <div className="container">
                <div className={styles.home__header}>
                    <div className={styles.home__header_logo}>
                        <p>DarkSecrets</p>
                    </div>
                    <div className={styles.home__header_nav}>
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
                <div className={styles.home__content}>
                    <h1>Географическая викторина</h1>
                    <div className={styles.home__content_link}>
                        <Link to="/maps">Начать</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
