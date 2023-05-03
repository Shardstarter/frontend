import * as React from 'react';
import { useEffect, useState } from 'react';
import Page from 'components/Page';

// material
import { Box, Grid } from '@mui/material';
import FullCalendar from '@fullcalendar/react'; // must go before plugins
import dayGridPlugin from '@fullcalendar/daygrid'; // a plugin!
import interactionPlugin from '@fullcalendar/interaction';
import './style.css';
import My_modal from 'components/Modal';
import apis from 'services';
import { useLocation } from 'react-router-dom';

// hooks
// components
const container = {
  width: '100%',
  // float: 'left',
  fontFamily: 'system-ui',
  userSelect: 'none'
};

export default function Calender() {
  const [events, setEvents] = useState([]);
  const [currentChannel, setChannel] = useState(0);
  const [channels, setChannels] = useState({});
  const [isOpen, setIsOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  const search = useLocation().search;
  const admin = new URLSearchParams(search).get('admin');

  const onReset = () => {
    setChannel(0);
    setChannels({});
  };

  useEffect(() => {
    (async () => {
      const response = await apis.getEvent();
      console.log(response);
      if (response.statusText === 'OK') {
        const { data: events } = response.data;
        const modifiedEvents = events.map((event) => {
          const { calenderDate, description, image } = event;
          return { date: calenderDate, title: description, url: image };
        });
        setEvents(modifiedEvents);
        // console.log('modifiedEvents: ', modifiedEvents);
      }
    })();
  }, []);

  const reactToChange = (ob) => {
    setModalData(ob);
    setIsOpen(true);
  };

  const renderEvent = (eventInfo) => {
    return (
      <>
        <div>
          <h1 style={{ fontSize: 'initial' }}>{eventInfo.event.title}</h1>
          <img src={eventInfo.event.url} alt={'event_img'} width={150} />
        </div>
      </>
    );
  };

  console.log({ channels, currentChannel });

  const addChannels = ({ channels, currentChannel }) => {
    console.log(channels);
    setChannel(currentChannel);
    setChannels(channels);
  };

  const deleteChannel = (id) => {
    const newChannels = channels.filter((channel) => channel.id !== id);
    setChannels(newChannels);
  };

  const handleSetChannel = () => {
  };

  return (
    <Page style={{ backgroundColor: '#171819' }}>
      <div id='myModal' className='modal'>
        <div className='modal-content'>
          <span className='close'>&times;</span>
          <p>Some text in the Modal..</p>
        </div>
      </div>
      <Grid paddingLeft={'5%'} paddingRight={'5%'} paddingTop='30px'>
        {/* <Grid container direction="row" position="relative" display="flex" borderRadius={2}> */}
        <Grid item xs={12} padding='5px'>
          <div style={{ width: '100%', margin: 'auto' }}>
            <div className='container' style={container}>
              {/*<h3 className='calender-heading'>{`EVENTS CALENDAR`}</h3>*/}
              <div>
                {channels.length > 0 &&
                  channels.map((key, index) => {
                    const channel = channels[key];
                    return (
                      <div style={{ fontSize: '.85em', margin: '20px 0' }} key={key}>
                        <p
                          style={{
                            marginBottom: '5px',
                            color: currentChannel === parseInt(key) ? '#1fb7e7' : '#1fb7e7'
                          }}
                        >
                          {`🗓 ${channel.map((day) => day.format('MM/DD/YY')).join(' - ')}`}
                        </p>
                        {/* <button style={Object.assign({}, buttonStyle, { color: '#38b0ed' })}></button> */}
                        <Box
                          component='button'
                          width='20%'
                          borderRadius={1}
                          padding='5px 8px'
                          margin='0px 10px'
                          style={{ backgroundColor: '#24B6E6', border: 'none', color: 'white' }}
                          onClick={() => setChannel(parseInt(key))}
                        >
                          {'EDIT'}
                        </Box>
                        <Box
                          component='button'
                          width='20%'
                          borderRadius={1}
                          padding='5px 8px'
                          margin='0px 10px'
                          style={{ backgroundColor: '#24B6E6', border: 'none', color: 'white' }}
                          onClick={() => deleteChannel(parseInt(key))}
                        >
                          {'DELETE'}
                        </Box>
                      </div>
                    );
                  })}
              </div>

              <My_modal
                isOpen={isOpen}
                setIsOpen={setIsOpen}
                modalData={modalData}
                setEvents={setEvents}
                eventArr={events}
              />
              <FullCalendar
                id='calender'
                plugins={[dayGridPlugin, interactionPlugin]}
                dateClick={(e) => {
                  admin && reactToChange(e);
                }}
                eventContent={renderEvent}
                initialView='dayGridMonth'
                events={events}
              />
            </div>

            <div style={{ clear: 'both' }} />
            <div style={{ clear: 'both' }} />
          </div>
        </Grid>
        {/* </Grid> */}
      </Grid>
    </Page>
  );
}
