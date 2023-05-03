import { createSlice } from '@reduxjs/toolkit';
import axios from '../../utils/axios';
import { BigNumber } from 'ethers';
// import { formatUnits, commify } from '@ethersproject/units';
const initialState = {
  error: false,
  liquidities: [],
  liquidity: [],
  totalPage: 0
};

const slice = createSlice({
  name: 'liquidityLocks',
  initialState,
  reducers: {

    setLiquidities(state, action) {
      state.liquidities = action.payload;
    },
    setLiquidity(state, action) {
      state.liquidity = action.payload;
    },
    setTotalPage(state, action) {
      state.totalPage = action.payload;
    },
    addLiquidity(state, action) {
      const liquidities = JSON.parse(JSON.stringify(state.liquidities));
      const tmp = liquidities.find(ele => ele.token === action.payload.token && ele.owner === action.payload.owner && ele.endDateTime === action.payload.endDateTime);
      if (tmp) {
        tmp.amount = BigNumber.from(tmp.amount).add(BigNumber.from(action.payload.amount)).toString();
      } else
        liquidities.push(action.payload);
      state.liquidities = liquidities;

      const liquidity = JSON.parse(JSON.stringify(state.liquidity));
      // tmp = liquidity.filter(ele => ele.token === action.payload.token && ele.owner === action.payload.owner);
      if (tmp.length > 0) {
        const tmp_time = tmp.find(ele => ele.endDateTime === action.payload.endDateTime);
        if (tmp_time)
          tmp_time.amount = BigNumber.from(tmp_time.amount).add(BigNumber.from(action.payload.amount)).toString();
        else
          tmp.push(action.payload);
      }
      state.liquidity = liquidity;
    },
    removeLiquidity(state, action) {
      const liquidities = JSON.parse(JSON.stringify(state.liquidities));
      liquidities.splice(liquidities.findIndex(ele => ele.token === action.payload.token && ele.owner === action.payload.owner && action.endDateTime === action.payload.endDateTime), 1);
      state.liquidities = liquidities;

      const liquidity = JSON.parse(JSON.stringify(state.liquidity));
      liquidity.splice(liquidity.findIndex(ele => ele.token === action.payload.token && ele.owner === action.payload.owner && action.endDateTime === action.payload.endDateTime), 1);
      state.liquidity = liquidity;
    },
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------

export function setLiquidities(liquidities) {
  return (dispatch) => {
    dispatch(slice.actions.setLiquidities(liquidities));
  };
}

export function setLiquidity(liquidity) {
  return (dispatch) => {
    dispatch(slice.actions.setLiquidity(liquidity));
  };
}

export function addLiquidity(liquidity) {
  return (dispatch) => {
    dispatch(slice.actions.addLiquidity(liquidity));
  };
}
export function removeLiquidity(liquidity) {
  return (dispatch) => {
    dispatch(slice.actions.addLiquidity(liquidity));
  };
}
/////////////////////////////////////////////////////////////////////
// function checkIfImageExists(url) {
//   const img = new Image();
//   img.src = url;
  
//   if (img.complete) {
//     return(url);
//   } else {
//     img.onload = () => {
//       return(url);
//     };
    
//     img.onerror = () => {
//       return("/icons/default_logo.png");
//     };
//   }
// }



export function getLiquidities(network, page, search, tab, account) {
  return async (dispatch) => {
    let liquidities = [];
    try {
      const response = await axios.get(`/api/${network === process.env.REACT_APP_ETHEREUM_CHAINID ? 'eth' : 'bsc'}/liquidities`, {
        params: {
          page,
          search: search === null ? '' : search,
          tab,
          account
        }
      });
      liquidities = response.data.liquidities;
      // liquidities=liquidities.map(ele=>{
      //   ele.image0=checkIfImageExists()
      // });
      dispatch(slice.actions.setLiquidities(liquidities));
      dispatch(slice.actions.setTotalPage(response.data.counts));
    } catch (error) {
      // dispatch(slice.actions.hasError(error));
    }
  };
}

export function getLiquidity(network, token, account) {
  return async (dispatch) => {
    let liquidity, price;
    try {
      const response = await axios.get(`/api/${network === process.env.REACT_APP_ETHEREUM_CHAINID ? 'eth' : 'bsc'}/liquidity/${token}/${account}`);
      liquidity = response.data.liquidity;
      
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
    try {
      if(network=== process.env.REACT_APP_ETHEREUM_CHAINID){
        const response=await fetch(`https://api.etherscan.io/api?module=token&action=tokeninfo&contractaddress=${token}&apikey=YourApiKeyToken`);
        const data =await response.json();
        price=Number(data.result[0].tokenPriceUSD);
      }else{
        const response=await fetch(`https://api.bscscan.com/api?module=token&action=tokeninfo&contractaddress=${token}&apikey=YourApiKeyToken`);
        const data =await response.json();
        price=Number(data.result[0].tokenPriceUSD);
      }
    } catch (error) {
      // dispatch(slice.actions.hasError(error));
    }
    liquidity.price=liquidity.amount.mul(price);
    dispatch(slice.actions.setLiquidity(liquidity));
  };
}
