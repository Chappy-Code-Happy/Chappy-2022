import useSWR, { useSWRConfig } from "swr"
import { useState } from "react";
import styles from "../../../styles/mypage/_myassignment.module.css"
import { useSelector, useDispatch } from 'react-redux';

import Title from "./_title"


const fetcher = (url) => {
    // console.log('URL:', url, typeof url)
    if (typeof url != 'string') return { data: [] }
    return fetch(url).then((res) => {
        // console.log(res)
        return res.json()
    })
}

function SelectLecture({mode, setMode, setID}){
    // const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const user = useSelector(state => state.user);
    const user_id = user.id;
    const semester="2022년 1학기"
    let d;

    if(mode===1){
        d = useSWR(`/api/aggregation/mypage/mylectures?user_id=${user_id}&open_semester=${semester}`, fetcher);
    }
    else{
        d = useSWR(`/api/aggregation/mypage/mylectures?user_id=${user_id}`, fetcher);
    }
    // const { data, error } = useSWR(`/api/lecture/info/${user_id}`, fetcher)

    if (d.error) return <div>Getting Lectures Failed</div>
    if (!d.data) return <div>Loading...</div>

    const toMode1 = async () => {
        setMode(1);
    }

    const toMode2 = async () => {
        setMode(2);
    }

    const onClick = async (_id) => {
        setID(_id);
        console.log("id changed to ",_id)
    }

    return(
        <div className={styles.section_bg}>
            <div style={{justifyContent:"space-between"}} className={styles.section_title_bg}>
                <div className={styles.section_title}>과목선택</div>
                <div style={{width:"50%", columnGap:"5%", display:"flex", flexDirection:"row", justifyContent:"flex-end"}}>
                <button style={{borderRadius:20}} class={mode==1 ? "btn btn-secondary btn-sm" : "btn btn-outline-secondary btn-sm"} type="button" onClick={()=>toMode1()}>이번 학기 과목만 보기</button>
                <button style={{borderRadius:20}} class={mode==2 ? "btn btn-secondary btn-sm" : "btn btn-outline-secondary btn-sm"} type="button" onClick={()=>toMode2()}>모든 과목 보기</button>
                </div>
            </div>
            <div style={{width:"100%"}} class="row">
                {
                    d.data.lectures.map((lecture) => {
                        return (
                            <div class="col-6">
                            <div className={styles.lecture} onClick={()=>onClick(lecture._id)}>
                                <div className={styles.lecture_name}>
                                    <div className={styles.lecture_name_1}>{lecture.name}</div>
                                    <div className={styles.lecture_name_2}>
                                    <div className={styles.lecture_open}>{lecture.open_semester}</div>
                                    </div>
                                </div>
                                <div className={styles.lecture_prof}>{lecture.professor}</div>
                                <div className={styles.lecture_id}>{lecture.lecture_num}</div>
                            </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

function Objection( {lecture_id} ){
    // const user_id = "62ff6f624b99ac8a2bcbd015" // user _id
    const user = useSelector(state => state.user);
    const user_id = user.id;
    let d ;
    if(lecture_id!==""){
        d= useSWR(`/api/aggregation/mypage/objection?user_id=${user_id}&lecture_id=${lecture_id}`, fetcher)
    }
    else{
        d= useSWR(`/api/aggregation/mypage/objection?user_id=${user_id}`, fetcher)
    }

    if (d.error) return <div>Getting Lectures Failed</div>
    if (!d.data) return <div>Loading...</div>

    return (
        <div className={styles.section_bg}>
            <div className={styles.section_title_bg}>
                <div className={styles.section_title}>이의제기</div>
            </div>

            <div style={{width:"100%"}} class="shadow-sm">
            <div className={styles.objection}>
                <div className={styles.objection_1}>제목</div>
                <div className={styles.objection_2}>날짜</div>
                <div className={styles.objection_2}>교수자</div>
                <div className={styles.objection_2}>확인여부</div>
                <div className={styles.objection_2}>답장보기</div>
            </div>
            </div>

            <div style={{width:"100%"}}>
            {
                d.data.data.map((objection) => {
                return (
                    <div className={styles.objection}>
                        <div className={styles.objection_1}>{objection.title}</div>
                        <div className={styles.objection_2}>{objection.date}</div>
                        <div className={styles.objection_3}>{objection.professor}</div>
                        <div className={styles.objection_2}>{objection.check}</div>
                        <div className={styles.objection_2}>
                            <button style={{fontSize:"small", display:"flex", alignItems:"center",height:"100%", borderRadius:5}} class="btn btn-primary" type="button">답변보기</button>
                        </div>
                    </div>
                )})
            }
            </div>
        </div>
    )
}

// _1 마이페이지
// _2 내 성적관리
// _3 나의 피드백
// _4 내 과제관리
// _5 계정관리
// _6 환경설정
// _7 문의하기

export default function MyAssignment() {
    //mode 1: 이번 학기 과목만
    //mode 2: 모든 과목
    
    const [mode, setMode] = useState(1);
    const [id, setID] = useState("");

    return (
        <div className={styles.content}>

            <Title mode={4}/>
            <SelectLecture mode={mode} setMode={setMode} setID={setID}/>
            <Objection lecture_id={id}/>
            
        </div>
    )
}