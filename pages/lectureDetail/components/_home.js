import useSWR from "swr"
import commonStyles from "../../../styles/lectureDetail/LectureDetail.module.css";
import noticeStyles from "../../../styles/lectureDetail/_notice.module.css"
import taskStyles from "../../../styles/lectureDetail/_task.module.css"

const fetcher = (url) => {
    if (typeof url != 'string')
        return { data: [] }
    return fetch(url).then((res) => {
        return res.json()
    })
}

const NoticeList = ({lecture_id}) => {
    const { data, error } = useSWR(`/api/lectureDetail/${lecture_id}/notice`, fetcher);

    if (error) return <div>Getting Notice Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data==-1) return <div>Notice Not Existing</div>
    
    return(
        <div>
            {data?.data.map((notice) => (
                <div className={noticeStyles["notice-item"]} key={notice._id}>
                    <div className={noticeStyles["notice-item-type-new"]}>{notice.type}</div>
                    <div className={noticeStyles["notice-item-title"]}>{notice.title}</div>
                    <div className={noticeStyles["notice-item-date"]}>{notice.date}</div>
                </div>
            ))}
        </div>
    );
}

const TaskList = ({lecture_id}) => {
    const user_id = "62ff6f624b99ac8a2bcbd015"; //redux처리 필요

    const { data, error } = useSWR(`/api/lectureDetail/${lecture_id}/${user_id}/lesson`, fetcher)

    if (error) return <div>Getting Tasks Failed</div>
    if (!data) return <div>Loading...</div>
    if (data.data==-1) return <div>Task Not Existing</div>

    return(
        <div>
            {data.data.map((task) => (
                <div className={taskStyles["task-item"]} key={task.lesson._id}>
                    {task.attendance==1 && 
                        <div className={taskStyles["task-item-done"]}/>                   
                    }
                    {task.attendance==0 && 
                        <div className={taskStyles["task-item-undone"]}/>                   
                    }
                    <div className={taskStyles["task-item-title"]}>{task.lesson.title}</div>
                    <div className={taskStyles["task-item-btn"]}>강의듣기</div>
                </div>                
            ))}
        </div>
    );
}

export default function Home({lecture_id}){
    return (
        <div>
            <div className={noticeStyles.notice}>
                <div className={commonStyles.title}>새로운 공지</div>
                <NoticeList lecture_id={lecture_id}/>
            </div>
            <div className={taskStyles.task}>
                <div className={commonStyles.title}>이번주 할일</div>
                <TaskList lecture_id={lecture_id}/>
            </div>
        </div>
    );
}