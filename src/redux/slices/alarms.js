import { createSlice } from '@reduxjs/toolkit';
// import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: false,
  alarms: []
};

const slice = createSlice({
  name: 'alarms',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    setAlarm(state, action) {
      let index = state.alarms.findIndex(ele => ele.address === action.payload.address && ele.time === action.payload.time &&
        ele.status === action.payload.status);
      if (index > -1 || !action.payload.name) {
        state.alarms.splice(index, 1);
      } else {
        state.alarms.push({
          address: action.payload.address,
          time: action.payload.time,
          status: action.payload.status,
          extraData:action.payload.extraData,
          name:action.payload.name,
          symbol:action.payload.symbol,
          startDateTime:action.payload.startDateTime,
          listDateTime:action.payload.listDateTime,
        })
      }

    },
    setAlarmList(state, action) {
      state.alarms = action.payload;
    },

  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function setAlarm(payload) {
  return (dispatch) => {
    dispatch(slice.actions.setAlarm(payload));
  };
}

export function setAlarmList(payload) {
  return (dispatch) => {
    dispatch(slice.actions.setAlarmList(payload));
  };
}
