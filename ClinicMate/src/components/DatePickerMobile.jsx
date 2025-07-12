import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers'
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'

function DatePickerMobile({ selectedDate, setSelectedDate }) {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <MobileDatePicker
        label="Select Date"
        value={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        className="w-full mb-4"
        slotProps={{ textField: { fullWidth: true } }}
      />
    </LocalizationProvider>
  )
}

export default DatePickerMobile