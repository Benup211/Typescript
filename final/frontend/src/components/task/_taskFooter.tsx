import {FC,ReactElement} from 'react';
import {Box,Switch,Button,FormControlLabel} from '@mui/material';
import { ITaskFooter } from './interfaces/ITaskFooter';
import PropTypes from 'prop-types';
import { Status } from '../createTaskForm/enums/Status';
export const TaskFooter:FC<ITaskFooter>=(props):ReactElement=>{
    const {id,status,onStatusChange=(e)=>console.log(e),onClick=(e)=>console.log(e)}=props
    return <>
    <Box
    display='flex'
    justifyContent='space-between'
    alignItems='center'
    mt={4}
    >
        <FormControlLabel label="In Progress" control={<Switch color='warning' defaultChecked={status===Status.inProgress}/>} onChange={(e)=>onStatusChange(e,id)}/>
        <Button 
        variant='contained' 
        size='small'
         color='success'
         sx={{color:'#ffffff'}}
         onClick={(e)=>onClick(e,id)}>Mark Completed</Button>
    </Box>
    </>
}
TaskFooter.propTypes={
    onStatusChange:PropTypes.func,
    onClick:PropTypes.func,
    id:PropTypes.string.isRequired,
    status:PropTypes.string.isRequired
}
