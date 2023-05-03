import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';

const initialState = {
  isLoading: false,
  error: false,
  pools: [],
  totalPage: 0,
  pool: {}
};

const slice = createSlice({
  name: 'pools',
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
    setPools(state, action) {
      state.pools = action.payload;
    },
    setTotalPage(state, action) {
      state.totalPage = action.payload;
    },
    setPool(state, action) {
      state.pool = action.payload;
    },
    setAlarmPool(state, action) {
      let alarms = state.pools.find(ele => ele.address === action.payload.address).alarms;
      console.log(alarms);
      if (alarms) {
        let index = alarms.findIndex(ele => ele.wallet === action.payload.wallet && ele.time === action.payload.time &&
          ele.status === action.payload.status);
        console.log(index);
        if (index > -1) {
          alarms.splice(index, 1);
          console.log(alarms);
        } else {
          alarms.push({
            wallet: action.payload.wallet,
            time: action.payload.time,
            status: action.payload.status
          })
        }
      }
    },
    setPoolStatusChanged(state, action) {
      if (state.pool.address === action.payload.address) {
        state.pool.status = action.payload.status;
      }
      let tmp = state.pools.find(ele => ele.address === action.payload.address);
      if (tmp) {
        tmp.status = action.payload.status;
      }
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function setPools(pools) {
  return (dispatch) => {
    dispatch(slice.actions.setPools(pools));
  };
}

export function setPoolStatusChanged(address, status) {
  return (dispatch) => {
    dispatch(slice.actions.setPoolStatusChanged({ address, status }));
  };
}

export function setPool(pool) {
  return (dispatch) => {
    dispatch(slice.actions.setPool(pool));
  };
}

export function setAlarmPool(payload) {
  return (dispatch) => {
    dispatch(slice.actions.setAlarmPool(payload));
  };
}

export function getPools(network, page, search, tab, sort, filter, account) {
  return async (dispatch) => {
    if(tab>2)
      return;
    
    dispatch(slice.actions.startLoading());
    
    let pools = [];
    try {
      const response = await axios.get(`/api/${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}/ido`, {
        params: {
          page,
          search: search == null ? '' : search,
          tab,
          sort,
          filter,
          account
        }
      });
      // console.log(response);
      pools = response.data.pools;
      // for (let i = 0; i < pools.length; i++) {
      //   try {
      //     let response_ipfs;
      //     const extraData = pools[i].extraData;
      //     response_ipfs = await fetch(`https://ipfs.infura.io/ipfs/${extraData}`);
      //     pools[i].ipfs = await response_ipfs.json();
      //   } catch (error) {
      //     console.log(error);
      //   }
      // }
      dispatch(slice.actions.setPools(pools));
      dispatch(slice.actions.setTotalPage(response.data.counts));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPool(network, address) {
  return async (dispatch) => {
    dispatch(slice.actions.startLoading());
    let pool;
    try {
      const response = await axios.get(`/api/${network === Number(process.env.REACT_APP_ETHEREUM_CHAINID) ? 'eth' : 'bsc'}/pool/${address}`);
      pool = response.data.pool==null ? {} : response.data.pool;
      // try {
      //   let response_ipfs;
      //   const extraData = pool.extraData;
      //   response_ipfs = await fetch(`https://ipfs.infura.io/ipfs/${extraData}`);
      //   pool.ipfs = await response_ipfs.json();
      // } catch (error) {
      //   console.log(error);
      // }
      dispatch(slice.actions.setPool(pool));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
