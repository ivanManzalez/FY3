import * as React from 'react';
import dayjs from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateField } from '@mui/x-date-pickers/DateField';
import { TimeField } from '@mui/x-date-pickers/TimeField';
import { DateTimeField } from '@mui/x-date-pickers/DateTimeField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';


const CalendarPicker = (props) => {
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker defaultValue={props.defaultValue} id={props.id} name={props.name} label={props.label} value={props.value} onChange={props.onChange}/>
    </LocalizationProvider>
  )}

const ClockPicker = (props) => {
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimePicker defaultValue={props.defaultValue} views={['hours','minutes']} id={props.id} name={props.name} label={props.label} value={props.value} onChange={props.onChange} />
    </LocalizationProvider>
  )}

const DateSelect = (props) => {
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateField id={props.id} name={props.name} label={props.label} value={props.value}/>
    </LocalizationProvider>
  )}

const TimeSelect = (props) => {
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <TimeField id={props.id} name={props.name} label={props.label} value={props.value} />
    </LocalizationProvider>
  )}

const DateTimeSelect = (props) => {
  return(
    <LocalizationProvider dateAdapter={AdapterDayjs}>
    <DateTimeField id={props.id} name={props.name} label={props.label} value={props.value} />
    </LocalizationProvider>
  )}

export {CalendarPicker, ClockPicker, DateSelect, TimeSelect, DateTimeSelect};