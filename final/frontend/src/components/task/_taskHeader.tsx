import {FC,ReactElement} from 'react';
import {Box,Typography,Chip} from '@mui/material'
import {ITaskHeader} from './interfaces/ITaskHeader';
import {format} from 'date-fns';
import PropTypes from 'prop-types';
export const TaskHeader:FC<ITaskHeader>=(props):ReactElement=>{
    const {title="Sample Title",date=new Date()}=props
    return(
        <>
        <Box
        display='flex'
        justifyContent='space-between'
        width='100%'
        mb={2}
        >
            <Box>
                <Typography variant='h6'>
                    {title}
                </Typography>
            </Box>
            <Box>
                <Chip
                variant='outlined'
                label={format(date,'PPP')}
                />
            </Box>
        </Box>
        </>
    );
}
TaskHeader.propTypes={
    title:PropTypes.string,
    date:PropTypes.instanceOf(Date)
}