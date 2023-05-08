import {
  Box,
  Stack,
  Typography,
  Button,
  Card,
  CardHeader,
  Divider,
  TextField,
  Container,
  Alert,
  AlertTitle,
  linearProgressClasses,
  Link
} from '@mui/material';
import React, { useCallback, useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import Page from 'components/Page';
import { useSnackbar } from 'notistack';
import HashLoader from 'react-spinners/HashLoader';
import apis from 'services';
import { indexOf } from 'lodash';

export default function ManageCards() {
  const navigate = useNavigate();
  const COUNTOFCARDS = 5;
  const [cards, setCards] = useState([]);

  const [processing, setProcessing] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const updateCards = (index, key, value) => {
    setCards(prevState => {
      // Make a shallow copy of the original array
      const newArr = [...prevState];

      // Modify the specific element at the desired index
      newArr[index] = { ...newArr[index], [key]: value };

      // Return the modified array to update the state
      return newArr;
    });
  }

  const handleCreate = async () => {
    setProcessing(true);
    (async () => {
      try {
        const response = await apis.createCards({
          cards
        });
        if (response.data.result) {
          enqueueSnackbar('success', {
            variant: 'success'
          });
          navigate('/home')
        } else {
          enqueueSnackbar(response.data.message, {
            variant: 'danger'
          });
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Oops, Something went wrong!' + error.message, {
          variant: 'error'
        });
      }
      setProcessing(false);
    })();
  };

  useEffect(() => {
    (async () => {
      try {
        const response = await apis.getCards();
        if (response.data.result) {
          var arr = response.data.data;
          console.log(arr)
          arr = Array.from({ length: COUNTOFCARDS }, (_, index) => {
            return index in arr ? arr[index] : { img: '', title: '', description: '' };
          });
          console.log(arr)
          setCards(arr)
        } else {
          enqueueSnackbar(response.data.message, {
            variant: 'danger'
          });
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Oops, Something went wrong!' + error.message, {
          variant: 'error'
        });
      }
      setProcessing(false);
    })();
  }, [])


  return (
    <Page title="Manage Cards">
      <Container maxWidth="lg" className="pt-5">
        <Card
          sx={{
            width: 1,
            p: 3,
            transition: 'all .3s',
            cursor: 'pointer',
            '&:hover': {
              boxShadow: (theme) => theme.customShadows.z24
            }
          }}
        >
          <Typography variant="h4">Manage Cards</Typography>
          <Divider />
          <Stack sx={{ mt: 2 }} spacing={3}>
            {cards.map((card, index) =>
              <Box key={indexOf}>
                <h5>Card {index + 1}</h5>
                <TextField
                  fullWidth
                  label="Image URL"
                  value={card.img}
                  onChange={(e) => updateCards(index, 'img', e.target.value)}
                  sx={{ width: 1, marginBottom: '10px' }}
                />
                <TextField
                  fullWidth
                  label="Title"
                  value={card.title}
                  onChange={(e) => updateCards(index, 'title', e.target.value)}
                  sx={{ width: 1, marginBottom: '10px' }}
                />
                <TextField
                  fullWidth
                  label="Description"
                  value={card.description}
                  onChange={(e) => updateCards(index, 'description', e.target.value)}
                  sx={{ width: 1, marginBottom: '10px' }}
                />
              </Box>
            )}

          </Stack>
          <Stack sx={{ mt: 2 }} alignItems="center" spacing={1}>
            <Button size="large" variant="contained" className="btn btn-info text-light mt-2 mx-4" onClick={handleCreate}>
              {processing ? <HashLoader color="#02FF7B" size={30} /> : 'Save'}
            </Button>
          </Stack>
        </Card>
      </Container>
    </Page>
  );
}
