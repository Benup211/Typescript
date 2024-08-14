import { FC, ReactElement, useState } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { IDateField } from './interfaces/IDateField';
import PropTypes from 'prop-types';
export const TaskDateField: FC<IDateField> = (props): ReactElement => {
  const {
    value=new Date(),
    disabled=false,
    onChange=(date)=>console.log(date)
  }=props
  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Task Date"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
      </LocalizationProvider>
    </>
  );
};
TaskDateField.propTypes={
  value:PropTypes.instanceOf(Date),
  disabled:PropTypes.bool,
  onChange:PropTypes.func
}