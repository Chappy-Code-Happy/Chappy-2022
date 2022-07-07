import {Box, Button, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"

const ExecuteResult = ({result}) =>{
    return(
        <>
            <Box sx={{width: '25vw'}}>
                <Box sx={{ height: 40, backgroundColor: "#414E5A", pt:1.2}}>
                    <Typography fontWeight='bold' fontSize={15} style={{ marginLeft: "3%", color: 'white'}}>실행결과</Typography>
                </Box>

                <Box sx={{height:'85vh', overflow: 'scroll'}}>
                    <Typography fontSize={13} style={{ marginLeft: "3%", marginTop:10}}>출력값:</Typography>
                    <Typography fontSize={13} style={{ marginLeft: "3%"}}>{result}</Typography>
                </Box>
            </Box>
        </>
    )

}

export default ExecuteResult