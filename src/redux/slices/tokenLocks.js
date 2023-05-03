import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
// import { BigNumber } from 'ethers';
import { formatUnits, 
  // commify 
} from '@ethersproject/units';
const initialState = {
  error: false,
  tokens: [],
  token:[],
  totalPage:0
};

const slice = createSlice({
  name: 'tokenLocks',
  initialState,
  reducers: {
  
    setTokens(state, action) {
      state.tokens = action.payload;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
    setTotalPage(state, action) {
      state.totalPage = action.payload;
    },
    addToken(state, action){
      const tokens=JSON.parse(JSON.stringify(state.tokens));
      const tmp=tokens.find(ele=>ele.token===action.payload.token && ele.owner===action.payload.owner && ele.endDateTime===action.payload.endDateTime);
      if(tmp){
        tmp.amount=tmp.amount.add(action.payload.amount);
      }else
        tokens.push(action.payload);
      state.tokens =tokens;

      const token=JSON.parse(JSON.stringify(state.token));
      // tmp=token.filter(ele=>ele.token===action.payload.token && ele.owner===action.payload.owner);
      if(tmp.length>0){
        const tmp_time=tmp.find(ele=>ele.endDateTime===action.payload.endDateTime);
        if(tmp_time)
          tmp_time.amount=tmp_time.amount.add(action.payload.amount);
        else
          tmp.push(action.payload);
      }
      state.token =token;
    },
    removeToken(state, action){
      const tokens=JSON.parse(JSON.stringify(state.tokens));
      tokens.splice(tokens.findIndex(ele=>ele.token===action.payload.token && ele.owner===action.payload.owner && action.endDateTime===action.payload.endDateTime),1);
      state.tokens =tokens;

      const token=JSON.parse(JSON.stringify(state.token));
      token.splice(token.findIndex(ele=>ele.token===action.payload.token && ele.owner===action.payload.owner && action.endDateTime===action.payload.endDateTime),1);
      state.token =token;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function setTokens(tokens) {
  return (dispatch) => {
    dispatch(slice.actions.setTokens(tokens));
  };
}

export function setToken(token) {
  return (dispatch) => {
    dispatch(slice.actions.setToken(token));
  };
}

export function addToken(token) {
  return (dispatch) => {
    dispatch(slice.actions.addToken(token));
  };
}
export function removeToken(token) {
  return (dispatch) => {
    dispatch(slice.actions.addToken(token));
  };
}
/////////////////////////////////////////////////////////////////////
export function getTokens(network, page, search, tab, account) {
  return async (dispatch) => {
    let tokens = [];
    try {
      const response = await axios.get(`/api/${network === process.env.REACT_APP_ETHEREUM_CHAINID ? 'eth' : 'bsc'}/tokens`, {
        params: {
          page,
          search: search == null ? '' : search,
          tab,
          account
        }
      });
      tokens = response.data.tokens;      
      dispatch(slice.actions.setTokens(tokens));
      dispatch(slice.actions.setTotalPage(response.data.counts));
    } catch (error) {
      // dispatch(slice.actions.hasError(error));
    }
  };
}

export function getToken(network, token, account) {
  return async (dispatch) => {
    let token_info;
    let price=0;
    try {
      
      const response = await axios.get(`/api/${network === process.env.REACT_APP_ETHEREUM_CHAINID ? 'eth' : 'bsc'}/token/${token}/${account}`);
      token_info = response.data.token;   
    } catch (error) {
      // dispatch(slice.actions.hasError(error));
    }
    try {
      if(network=== process.env.REACT_APP_ETHEREUM_CHAINID){
        const response=await fetch(`https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${token}&apikey=YourApiKeyToken`);
        const data =await response.json();
        price=data.result[0].tokenPriceUSD ? Number(data.result[0].tokenPriceUSD) : 0;
      }else{
        const response=await fetch(`https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=${token}&apikey=YourApiKeyToken`);
        const data =await response.json();
        price=data.result[0].tokenPriceUSD ?  Number(data.result[0].tokenPriceUSD) : 0;
      }
    } catch (error) {
      price=0;
      // dispatch(slice.actions.hasError(error));
    }
    token_info.price=Number(formatUnits(token_info.amount, token_info.decimals))*price;

    dispatch(slice.actions.setToken(token_info));
   
  };
}
