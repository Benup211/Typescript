import {FC,ReactElement} from 'react';
import {Box,Switch,Button,FormControlLabel} from '@mui/material';
import { ITaskFooter } from './interfaces/ITaskFooter';
import PropTypes from 'prop-types';
export const TaskFooter:FC<ITaskFooter>=(props):ReactElement=>{
    const {onStatusChange=(e)=>console.log(e),onClick=(e)=>console.log(e)}=props
    return <>
    <Box
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    mt={4}
    >
        <FormControlLabel label="In Progress" control={<Switch color='warning'/>} onChange={(e)=>onStatusChange(e)}/>
        <Button 
        variant='contained' 
        size='small'
         color='success'
         sx={{color:'#ffffff'}}
         onClick={(e)=>onClick(e)}>Mark Completed</Button>
    </Box>
    </>
}
TaskFooter.propTypes={
    onStatusChange:PropTypes.func,
    onClick:PropTypes.func
}
