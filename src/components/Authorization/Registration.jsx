import styles from "./Authorization.module.scss";
import close from "../../assets/close.svg";
import { Link } from "react-router-dom";
import { useState } from "react";
import { URL } from "../../utils/config";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const registration = async (name, email, password) => {
        try {
            const response = await axios
                .post(URL + "user/signup", {
                    name,
                    email,
                    password,
                })
                .then((res) => {
                    console.log(res.status);
                    if (res.status == 200) {
                        navigate("/login");
                    }
                });
        } catch (e) {
            alert(e.response);
        }
        setName("");
        setEmail("");
        setPassword("");
    };

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
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            type="text"
                            placeholder="Введите логин..."
                        />
                    </div>
                    <div className={styles.authorization__input}>
                        <p>Почта</p>
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="email"
                            placeholder="Введите почту..."
                        />
                    </div>
                    <div className={styles.authorization__input}>
                        <p>Пароль</p>
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            placeholder="•‎ •‎ •‎ •‎ •‎ •‎ •‎ •‎"
                        />
                    </div>
                    <div className={styles.authorization__btn}>
                        <button
                            onClick={() => registration(name, email, password)}
                        >
                            Зарегистрироваться
                        </button>
                    </div>
                    <p className={styles.authorization__link}>
                        <span>Имеете аккаунт?</span>{" "}
                        <Link to="/login">Войти</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Registration;
