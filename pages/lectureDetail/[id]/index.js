import { useEffect, useState } from "react";
import styles from "../../../styles/lectureDetail/LectureDetail.module.css";
import Home from "../components/_home";
import Learning from "../components/_learning";
import Notice from "../components/_notice";
import Assignment from "../components/_assignment";
import Exam from "../components/_exam";
import Header from "../../components/_header";
import Footer from "../../components/_footer";
import Menu from "../components/_menu";
import Unit from "../components/_unit";
import Lecture from "../components/_lecture";
import { useSelector, useDispatch } from 'react-redux';
import Router, { useRouter } from "next/router";

export function getServerSideProps({ params }) {
    console.log("getssp", params);
    return {
      props: {
        params,
      },
    };
}

export default function LectureDetailIDPage(props) {
    const lecture_id = props.params.id;
    const user_id = useSelector(state => state.user);
    const router = useRouter();

    const [mode, setMode] = useState(router.query.mode);
    const [dropdown, setDropdown] = useState([]);
    useEffect(() => {
        if (router.query.mode===undefined)
            setMode(0);
    }, [router.query.mode]);

    return(
        <div className={styles.container}>
            <Header />
            <div className={styles.main}>
                <Lecture lecture_id={lecture_id}/>

                <div className={styles["content"]}>
                    <div className={styles["content-left"]}>
                        <Menu mode={mode} setMode={setMode}/>
                        <div>
                            {
                                mode == 0 ?
                                <>
                                <Home lecture_id={lecture_id}/>
                                </>
                                : mode == 1 ?
                                <>
                                <Notice lecture_id={lecture_id}/>
                                </>
                                : mode == 2 ?
                                <>
                                <Learning lecture_id={lecture_id}/>
                                </>
                                : mode == 3 ?
                                <>
                                <Assignment lecture_id={lecture_id}/>
                                </>
                                    :
                                    <>
                                    <Exam lecture_id={lecture_id}/>
                                    </>
                            }
                        </div>
                    </div>
                    <div className={styles["vectorline"]}/>
                    <div className={styles["content-right"]}>
                        <Unit lecture_id={lecture_id} mode={mode} setMode={setMode} dropdown={dropdown} setDropdown={setDropdown}/>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    );
}
