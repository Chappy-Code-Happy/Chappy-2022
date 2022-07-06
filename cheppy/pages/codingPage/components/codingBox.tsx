import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"
import React, { useRef, useState } from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Editor from "@monaco-editor/react";
import router from 'next/router';

const CodingBox = ({ mode, modeChanger, exe_result, exe_resultChanger, tc_result, tc_resultChanger}) =>{

    const [value, setValue] = useState('');

    /* 작성된 코드 값 받아오기 */
    const handleEditorChange = (event) => {
        // console.log(event);
        setValue(event)
    }

    /* 채점 버튼 */
    const gradingClick = async () => {
        modeChanger(0);
    }

    /* 실행 버튼 */ 
    const executionClick = async () => {
        
        //showValue();
        await axios.post('http://localhost:4000/runcode/run', {
                code: value
            })
            .then((res) => {
                console.log("success");
                console.log(res.data.result);
                exe_resultChanger(res.data.result);
            })
            .catch(error => {
                console.log("failed");
                console.log(error.response)
            })
            modeChanger(1);
    }    

    /* 제출 버튼 */
    const submitClick = () => {
        modeChanger(2);
    }
    
    function showValue() {
        alert(value);
    }

    return(

        <>
            <Box sx={{height: '90vh', width: '50vw', border: 1, borderColor: '#bdbdbd' }} >
                <Typography fontSize={15} style={{ marginLeft: "3%", marginTop: 15, marginBottom: 10}}>코드작성</Typography>

                <Box sx={{border: 1, borderColor: '#bdbdbd'}} style={{ marginLeft: "2%", marginRight: "2%", marginBottom: 20}}>
                    <Editor
                        height="70vh"
                        defaultLanguage="python"
                        defaultValue="## code here"
                        onChange={handleEditorChange}/>
                </Box>

                <Button variant="contained" style={{ marginLeft: '1%' }} onClick={executionClick}>실행</Button>
                <Button variant="contained" style={{ marginLeft: '1%' }} onClick={gradingClick}>채점</Button>
                <Button variant="contained" color="error" style={{ marginLeft: "70%" }} onClick={submitClick}>제출</Button>
            </Box>
        </>
    )

}

export default CodingBox