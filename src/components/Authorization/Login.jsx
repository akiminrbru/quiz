import styles from "./Authorization.module.scss";
import close from "../../assets/close.svg";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { login } from "../../store/authReducer";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();
    const isAuth = useSelector((state) => state.auth.isAuth);

    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            navigate("/profile");
        }
    }, [isAuth]);

    return (
        <div className={styles.authorization}>
            <div className={styles.authorization__form}>
                <div className={styles.authorization__close}>
                    <Link to="/">
                        <img src={close} alt="close" />
                    </Link>
                </div>
                <div className={styles.authorization__body}>
                    <div className={styles.authorization__text}>
                        <h2>Добро пожаловать!</h2>
                        <p>Введите ваши регистрационные данные</p>
                    </div>
                    <div className={styles.authorization__input}>
                        <p>Логин</p>
                        <input
                            onChange={(e) => setName(e.target.value)}
                            value={name}
                            type="text"
                            placeholder="Введите логин..."
                        />
                    </div>
                    <div className={styles.authorization__input}>
                        <p>Пароль</p>
                        <input
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password"
                            placeholder="•‎ •‎ •‎ •‎ •‎ •‎ •‎ •‎"
                        />
                    </div>

                    <p className={styles.authorization__link}>
                        Восстановить пароль
                    </p>
                    <div className={styles.authorization__btn}>
                        <button
                            onClick={() => dispatch(login({ name, password }))}
                        >
                            Войти
                        </button>
                    </div>
                    <p className={styles.authorization__link}>
                        <span>Не имеете аккаунта?</span>{" "}
                        <Link to="/registration">Зарегистрироваться</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
