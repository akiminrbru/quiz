import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import styles from "./CreateQuiz.module.scss";
import close from "../../assets/close.svg";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import axios from "axios";
import { URL } from "../../utils/config";
import { createQuiz } from "../../store/mapInfoReducer";

const defaultCenter = [55.7522, 37.6115];
const defaultZoom = 2;

const LocationMarker = ({ position, setPosition }) => {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);

            console.log(e.latlng);
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>Вы указали это место!</Popup>
        </Marker>
    );
};

const CreateQuiz = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const profile = useSelector((state) => state.auth.user);

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [text, setText] = useState("");
    const [position, setPosition] = useState(null);

    const [questions, setQuestions] = useState([]);
    const [quiz, setQuiz] = useState({});

    useEffect(() => {
        console.log(questions);
        console.log(quiz);
    });

    const createQuestion = () => {
        setQuestions([
            ...questions,
            { text, lat: position.lat, lon: position.lng, answer: "123" },
        ]);

        setText("");
        setPosition(null);
    };

    const createQuizFunc = () => {
        console.log(quiz);
        dispatch(createQuiz({ title, description, questions }));
        setTitle("");
        setDescription("");
        setQuestions();
    };

    return (
        <div className={styles.createQuiz}>
            <div className={styles.createQuiz__close}>
                <Link to="/">
                    <img src={close} alt="close" />
                </Link>
            </div>
            <div className="container">
                <div className={styles.createQuiz__header}>
                    <div className={styles.createQuiz__info}>
                        <p className={styles.createQuiz__info_login}>
                            {profile.name}
                        </p>
                        <p className={styles.createQuiz__info_logo}>
                            DarkSecrets
                        </p>
                    </div>
                    <div className={styles.createQuiz__btn}>
                        <button onClick={() => navigate("/profile")}>
                            Назад
                        </button>
                    </div>
                </div>
                <div className={styles.createQuiz__content}>
                    <div className={styles.createQuiz__input}>
                        <p>Название викторины</p>
                        <input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            type="text"
                            placeholder="Введите название..."
                        />
                    </div>
                    <div className={styles.createQuiz__input}>
                        <p>Описание викторины</p>
                        <input
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            type="text"
                            placeholder="Введите описание..."
                        />
                    </div>
                    <h3>Вопросы</h3>
                    <div className={styles.createQuiz__input}>
                        <p>Вопрос</p>
                        <input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            type="text"
                            placeholder="Введите вопрос..."
                        />
                    </div>
                    <div className={styles.createQuiz__input}>
                        <p>Укажите координаты</p>
                    </div>
                </div>
                <div className={styles.createQuiz__map}>
                    <MapContainer
                        center={defaultCenter}
                        zoom={defaultZoom}
                        scrollWheelZoom={true}
                    >
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

                        <LocationMarker
                            position={position}
                            setPosition={setPosition}
                        />
                    </MapContainer>
                </div>
                <div className={styles.createQuiz__btns}>
                    <div className={styles.createQuiz__btn2}>
                        <button
                            onClick={() => createQuestion()}
                            className={styles.createQuiz__btn2_first}
                        >
                            Добавить вопрос
                        </button>
                    </div>
                    <div className={styles.createQuiz__btn2}>
                        <button
                            onClick={() => createQuizFunc()}
                            className={styles.createQuiz__btn2_second}
                        >
                            Создать викторину
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreateQuiz;
