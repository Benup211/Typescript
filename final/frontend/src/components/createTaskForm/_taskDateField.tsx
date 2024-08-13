import { FC, ReactElement, useState } from 'react';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

export const TaskDateField: FC = (): ReactElement => {
  const [date, setDate] = useState<Date | null>(null);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <DesktopDatePicker
          label="Task Date"
          inputFormat="dd/MM/yyyy"
          value={date}
          onChange={(newValue) => setDate(newValue)}
          renderInput={(params) => (
            <TextField {...params} />
          )}
        />
      </LocalizationProvider>
    </>
  );
};