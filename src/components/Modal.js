import { useState } from 'react';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import apis from '../services';

// const events = [
//   {
//     start: '2015-07-20',
//     end: '2015-07-02',
//     eventClasses: 'optionalEvent',
//     title: 'test event',
//     description: 'This is a test description of an event'
//   },
//   {
//     start: '2015-07-19',
//     end: '2015-07-25',
//     title: 'test event',
//     description: 'This is a test description of an event',
//     data: 'you can add what ever random data you may want to use later'
//   }
// ];

const My_modal = ({ isOpen, setIsOpen, modalData, eventArr, setEvents }) => {
  const [imgUrl, setImgUrl] = useState(null);
  const [description, setDescription] = useState(null);

  const handleClick = () => {
    console.log({ modalData }, { eventArr });
    // eventArr = [
    //   ...eventArr,
    //   {
    //     date: modalData.dateStr,
    //     title: description,
    //     url: imgUrl
    //   }
    // ];

    apis.saveEvent({
      calenderDate: modalData.dateStr,
      image: imgUrl,
      description: description
    });

    setEvents([
      ...eventArr,
      {
        date: modalData.dateStr,
        title: description,
        url: imgUrl
      }
    ]);
    // eventArr.push({
    //   date: modalData.dateStr,
    //   title: description,
    //   url: imgUrl
    // });
    setIsOpen(false);
  };

  //   const handleOpen = () => setOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
        style={{ height: '100vh', width: '100%' }}
      >
        <Box component='span' sx={{ display: 'flex', justifyContent: 'center', mx: '2px', transform: 'scale(0.8)' }}>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h5>Add your Image Url:</h5>
            <Input
              onChange={(e) => setImgUrl(e.target.value)}
              id='outlined-basic'
              label='Outlined'
              variant='outlined'
              style={{ display: 'flex', flexDirection: 'column' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <h5>Add Description</h5>
            <TextField
              onChange={(e) => setDescription(e.target.value)}
              id='filled-basic'
              label='Filled'
              variant='filled'
              style={{ display: 'flex', justifyContent: 'center' }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button onClick={handleClick}>Save</Button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default My_modal;
