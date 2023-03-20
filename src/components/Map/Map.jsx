import { useEffect, useState } from "react";
import styles from "./Map.module.scss";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMapEvents,
    Polyline,
} from "react-leaflet";
import { useDispatch, useSelector } from "react-redux";
import { setPlace } from "../../store/mapInfoReducer";

const defaultCenter = [55.7522, 37.6115];
const defaultZoom = 2;

const LocationMarker = ({ data, position, setPosition }) => {
    // const [position, setPosition] = useState(null);
    const dispatch = useDispatch();

    const map = useMapEvents({
        click(e) {
            dispatch(
                setPlace({ id: data.id, coords: [e.latlng.lat, e.latlng.lng] })
            );
            setPosition(e.latlng);
            // console.log(data);
        },
    });

    return position === null ? null : (
        <Marker position={position}>
            <Popup>Вы указали это место!</Popup>
        </Marker>
    );
};

const Map = ({ data, index, length, setIndex }) => {
    const [points, setPoints] = useState(null);
    const [distance, setDistance] = useState(null);
    const [score, setScore] = useState(null);
    const [position, setPosition] = useState(null);
    const [sumScore, setSumScore] = useState(0);

    // console.log(data);

    const getScore = () => {
        if (distance > 1000) {
            setScore(0);
        } else if (1000 > distance > 100) {
            setScore(10);
        } else if (100 > distance > 10) {
            setScore(100);
        } else if (10 > distance) {
            setScore(1000);
        }
    };

    useEffect(() => {
        // console.log(distance + " km");
        // console.log(score + " очки");
        // console.log(sumScore + " общие очки");
    });

    return (
        <>
            <div className={styles.map__header}>
                <h1>{data.question}</h1>
            </div>
            <MapContainer
                center={defaultCenter}
                zoom={defaultZoom}
                scrollWheelZoom={true}
            >
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {points === null ? null : (
                    <Marker position={data.startPlace}>
                        <Popup></Popup>
                    </Marker>
                )}

                {points === null ? null : <Polyline positions={points} />}

                <LocationMarker
                    position={position}
                    setPosition={setPosition}
                    data={data}
                />
            </MapContainer>
            <div className={styles.map__btn}>
                {distance === null ? (
                    <button
                        disabled={data.selectPlace.length === 0 ? true : false}
                        onClick={() => {
                            // console.log(data.startPlace);
                            setPoints([data.startPlace, data.selectPlace]);
                            setDistance(
                                Math.round(
                                    Math.sqrt(
                                        Math.pow(
                                            data.selectPlace[0] -
                                                data.startPlace[0],
                                            2
                                        ) +
                                            Math.pow(
                                                data.selectPlace[1] -
                                                    data.startPlace[1],
                                                2
                                            )
                                    ) * 111.134861111
                                )
                            );
                            getScore();
                            setSumScore(sumScore + score);
                            // console.log(distance + " km");
                            // console.log(score + " очки");
                            // console.log(sumScore + " общие очки");
                        }}
                    >
                        Угадать
                    </button>
                ) : index == length ? (
                    <button>Смотреть результаты</button>
                ) : (
                    <button
                        onClick={() => {
                            setIndex(index + 1);
                            setDistance(null);
                            setPoints(null);
                            setScore(null);
                            setPosition(null);
                        }}
                    >
                        Следующий вопрос
                    </button>
                )}
            </div>
            {distance === null ? null : (
                <div>
                    <div className={styles.map__answer}>
                        <div className={styles.map__answer_km}>
                            {distance} км <span>от локации</span>
                        </div>
                    </div>
                    <div className={styles.map__score}>
                        Вы получили {score} баллов
                    </div>
                </div>
            )}
        </>
    );
};

export default Map;
