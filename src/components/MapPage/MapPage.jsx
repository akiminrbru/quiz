import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Map from "../Map/Map";
import styles from "./MapPage.module.scss";

const MapPage = () => {
    const [index, setIndex] = useState(0);
    // const data = useSelector(
    //     (state) => state.mapInfo.quizInfo[index].questions
    // );
    const data = useSelector((state) => state.mapInfo.questionInfo[index]);
    const length = useSelector(
        (state) => state.mapInfo.questionInfo.length - 1
    );

    useEffect(() => {
        console.log(data);
    });
    // console.log(length);

    return (
        <div className={styles.mapPage}>
            <div className="container">
                <div className={styles.mapPage__btn}>
                    <Link to="/">
                        <button>Назад</button>
                    </Link>
                </div>
            </div>
            <Map
                data={data}
                index={index}
                length={length}
                setIndex={setIndex}
            />
        </div>
    );
};

export default MapPage;
