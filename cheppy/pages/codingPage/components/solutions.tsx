import {Box, Button, Popover, Grid, InputAdornment, Stack, TextField, Typography} from '@mui/material'
import { GET_USER, GET_USER_BY_USERID } from '../../../database/constants'
import { DataUsageTwoTone } from '@mui/icons-material';
import Link from "next/link"
import * as React from 'react';
import { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from "../../../store/modules";
import * as feedbackActions from "../../../store/modules/feedback";
import { codeActions } from '../../../store/modules/code';

const Solutions = () =>{
    const dispatch = useDispatch();
    const codeValue = useSelector((state: RootState) => state.code);
    const solutionValue = useSelector((state: RootState) => state.feedback);

    const applyFeedbackCode = useCallback(()=>{
        let payload = {
            line: solutionValue.cur_line,
            contentKey: solutionValue.cur_content_key,
            contentVal: solutionValue.cur_content_val,
        };
        dispatch(codeActions.changeCode(payload));
    }, [dispatch, solutionValue]);

    const setNextFeedback = useCallback(()=>{
        dispatch(feedbackActions.setNextFeedback());
    }, [dispatch]);

    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
    const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
        // setAnchorEl(event.currentTarget);
        await applyFeedbackCode();
        await setNextFeedback();
    };
    
    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    return(
        <>
            <Box sx={{width: '25vw', marginBottom:3}} >
                <Box sx={{ height: 40, backgroundColor: "#414E5A", pt:1.2}}>
                    <Grid container>
                        <Grid item width="25%">
                            <Typography fontWeight='bold' fontSize={15} style={{ marginLeft: "12%", marginRight: "6%", color: 'white'}}>해결방안</Typography>
                        </Grid>
                        <Grid item width="8%">
                            <Box sx={{ backgroundColor: "#FFD600", borderRadius: 2}}>
                                <Typography fontWeight='bold' fontSize={13}  align="center">{solutionValue.remain_num}+</Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Box>

                {solutionValue.remain_num==-1 && 
                    <Typography fontSize={14} fontWeight='bold' style={{ marginLeft: "20%", marginTop: 15 }}>
                        Server Error
                    </Typography>                
                }

                {solutionValue.remain_num==0 && 
                    <Typography fontSize={14} fontWeight='bold' style={{ marginLeft: "20%", marginTop: 15 }}>
                        No Feedback Left
                    </Typography>                
                }

                {solutionValue.remain_num>0 && 
                    <>
                    <Typography fontSize={14} fontWeight='bold' style={{ marginLeft: "5%", marginTop: 15 }}>
                        {solutionValue.cur_line}번째 줄
                    </Typography>
                    <Button variant="outlined" style={{ marginLeft: "20%", marginTop: 10 }} onClick={handleClick}>
                        {solutionValue.cur_content_key} {solutionValue.cur_content_val}
                    </Button>
                    {/* <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose} anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}>
                        <Typography sx={{ p: 2 }}>
                            The content of the Popover.
                        </Typography>
                    </Popover> */}
                    <Typography align="center" fontSize={13} style={{ marginLeft: "3%", marginTop: 5 }}>
                        버튼을 누르면 코드가 바뀝니다
                    </Typography>
                    </>
                }
            </Box>
        </>
    )

}

export default Solutions