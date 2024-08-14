import { FormControl, InputLabel, MenuItem, Select, SelectChangeEvent } from "@mui/material";
import { FC, ReactElement } from "react";
import { ISelectField } from './interfaces/ISelectField';
import PropTypes from 'prop-types';
export const TaskSelectField: FC<ISelectField> = (props): ReactElement => {
  const {
  name="Select Field",
  label="Select Field",
  value="",
  onChange=(e:SelectChangeEvent)=>console.log(e),
  items=[{value:"",label:"Add Items"}],
  disabled=false
  }=props;
  return (
    
    <FormControl fullWidth size="small">
      <InputLabel id={`${name}-id`}>{label}</InputLabel>
      <Select
        labelId={`${name}-id`}
        id={`${name}-id-select`}
        value={value}
        onChange={onChange}
        label={label}
        name={name}
        disabled={disabled}
      >
        {
          items.map((item,index)=>(
            <MenuItem key={item.value+index} value={item.value}>{item.label}</MenuItem>
          ))
        }
      </Select>
    </FormControl>
  );
};
TaskSelectField.propTypes={
  name:PropTypes.string,
  label:PropTypes.string,
  value:PropTypes.string,
  onChange:PropTypes.func,
  disabled:PropTypes.bool,
  items:PropTypes.arrayOf(
    PropTypes.shape(
      {
      value:PropTypes.string.isRequired,
      label:PropTypes.string.isRequired
      }
    ).isRequired,
  ).isRequired 
}