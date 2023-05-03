import "react-big-calendar/lib/css/react-big-calendar.css";
import React from 'react'
import Page from 'components/Page';
import { getPools } from 'redux/slices/pools';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import gsap from 'gsap';
import Loader from 'react-loader-spinner';
// import { Calendar, momentLocalizer } from "react-big-calendar";
import {Calendar} from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import {Box, Grid} from '@mui/material'

import { Eventcalendar, getJson, setOptions, CalendarNav, 
    SegmentedGroup, SegmentedItem, CalendarPrev, CalendarNext } from '@mobiscroll/react-lite';

// setOptions({
//     theme: 'ios',
//     themeVariant: 'light'
// });

// moment.locale("en-GB");
// const localizer = momentLocalizer(moment);

export default function PhoneCalendar() {
  const { hash } = useLocation();
  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();

  //Pagination part
  const [tab, setTab] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const network = useSelector((state) => state.network.chainId);
  const imgRef = useRef(null);
  useEffect(() => {
    const el = imgRef.current;
    gsap.fromTo(el, {opacity: 0}, {opacity: 1, duration: 2, scrollTrigger:{
      trigger : el,
      start: "top bottom",
      // end: "top bottom",
      toggleActions: "restart pause restart none"
    }})
  })

  //--------------------
  useEffect(() => {
    let unmounted = false;
    (async () => {
      setIsLoading(true);
      await dispatch(getPools(network, tab, account));
      if (!unmounted)
        setIsLoading(false);
    })();
    return () => unmounted = true;
  }, [account, dispatch, network, tab]);

  useEffect(() => {
    switch (hash) {
      case '#my-contributions':
        setTab(1);
        break;
      case '#my-alarms':
        setTab(2);
        break;
      case '#my-presales':
        setTab(3);
        break;
      default:
        setTab(0);
    }
  }, [hash]);
  // const Item = styled(Paper)(({ theme }) => ({
  //   backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  //   ...theme.typography.body2,
  //   padding: theme.spacing(2),
  //   textAlign: 'center',
  //   color: theme.palette.text.secondary,
  // }));
  
  const allMonthValues = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  
  const [selectedDate, setSelectedDate] = useState();
  const [calendarText, setCalendarText] = useState(`No Date is selected`);
  const handleDateChange = (value) => {
    setSelectedDate(value);
    setCalendarText(`The selected Date is ${value.toDateString()}`);
  };
  const handleYearChange = (value) => {
    const yearValue = value.getFullYear();
    setCalendarText(`${yearValue} Year  is selected`);
  };
  const handleMonthChange = (value) => {
    const monthValue = allMonthValues[value.getMonth()];
    setCalendarText(`${monthValue} Month  is selected`);
  };
  // const [myEvents, setEvents] = React.useState([]);

  //   React.useEffect(() => {
  //       getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
  //           setEvents(events);
  //       }, 'jsonp');
  //   }, []);
    
  //   const onEventClick = React.useCallback((event) => {
  //       toast({
  //           message: event.event.title
  //       });
  //   }, []);
    
  //   const view = React.useMemo(() => {
  //       return {
  //           calendar: { type: 'month' },
  //           agenda: { type: 'month' }
  //       };
  //   }, []);
  const events = [
    {
      day : 7,
      title : 'Lorem Ipsum',
      fromto : '15:00pm to 17:00pm',
      weekDay : 'Thu'
    },
    {
      day : 18,
      title : 'Lorem Ipsum',
      fromto : '16:00pm to 18:00pm',
      weekDay : 'Sat'
    },
    {
      day : 22,
      title : 'Lorem Ipsum',
      fromto : '16:00pm to 18:00pm',
      weekDay : 'Wed'
    },
    {
      day : 30,
      title : 'Lorem Ipsum',
      fromto : '16:00pm to 19:00pm',
      weekDay : 'Wed'
    },
  ]
  return (
    <> 
    <Page   style={{backgroundColor:"#171819"}} paddingLeft="5px" paddingRight="5px">
      <Box justifyContent="center" display="flex" marginBottom="30px">
          <Calendar
          onClickMonth={handleMonthChange}
          onClickYear={handleYearChange}
          onChange={handleDateChange}
          value={selectedDate}
          />
      </Box>
      <Event events={events}/>
      </Page>
    </>
  );
}
function Event(props){
  return(
    <>
    <Box margintop="20px">
    {props.events.map((event) => (
      <EventCard event={event}/>
    ))}
    </Box>
    </>
  );
}
function EventCard(props){
  const event = props.event;
  return(
    <>
    <Box display="flex" justifyContent="center" padding="0 10px">
      <Grid container marginBottom="20px" backgroundColor="#232323" borderRadius={1} padding="10px 20px">
        <Grid item xs={2} fontSize={16} color="white">{event.day}</Grid>
        <Grid item xs={10} fontSize={14} color="white">{event.title}</Grid>
        <Grid item xs={2} fontSize={12} color="#24B6E6">{event.weekDay}</Grid>
        <Grid item xs={10} fontSize={12} color="#24B6E6">{event.fromto}</Grid>
      </Grid>
      </Box>
    </>
  );
}