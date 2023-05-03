import { createSlice } from '@reduxjs/toolkit';
const initialState = {
  projectName: '',
  category: 'Startup',
  blockchain: 'Binance',
  tgi: 'Solana',
  type: 'Unlocked',
  deal: 'IDO',
  totalSupply: 0,
  address: '',
  error: '',
  symbol: 'BUSD',
  name: 'BUSD',
  decimals: 18,
  allowance: '',
  approved: false,
  presale_rate: '1',
  soft_cap: 1,
  hard_cap: 100,
  min_buy: 1,
  max_buy: 100,
  whiteListable: false,
  whitelistAddresses: "",
  whitelistMaxDeposit: 0.1,
  dex_amount: '60',
  dex_rate: '1',
  dex_lockup: '31',
  startDate: '',
  endDate: '',
  fcfsStartDate: '',
  fcfsEndDate: '',
  listDate: '', // token listing date, when team sends token to admin, it is just information
  poster: 'https://snipboard.io/F0wMfL.jpg',
  logo: 'https://snipboard.io/SJgPjt.jpg',
  website: 'https://website.com',
  facebook: 'https://fb.com',
  twitter: 'https://tw.com',
  github: 'https://gh.com',
  telegram: 'https://tg.com',
  instagram: 'https://insta.com',
  discord: 'https://discord.com',
  reddit: 'https://reddit.com',
  description: 'This token is for testing',
  roadmap_description: '2023 Q1: Token launch, 2023 Q2: DEX listing',
  about_description: 'about....',
  features_description: 'features...',
  teams_description: 'teams ...',
  tokenomics_description: '10% developing, 30% presale ...',
  roadmap_url: 'https://snipboard.io/VqdLuk.jpg',
  about_url: 'https://snipboard.io/xWl8BT.jpg',
  features_url: 'https://snipboard.io/JCH3Xe.jpg',
  teams_url: 'https://snipboard.io/hNmUvc.jpg',
  tokenomics_url: 'https://snipboard.io/S2vwcD.jpg',
  tier: 'default',
  twitter_followers: 0,
  teamVesting_amount: 0,
  teamVesting_first_percent: 0,
  teamVesting_first_period: 0,
  teamVesting_each_percent: 0,
  teamVesting_each_period: 0
};
const slice = createSlice({
  name: 'tokenListing',
  initialState,
  reducers: {
    // START LOADING
    setTotalSupply(state, action) {
      state.totalSupply = action.payload;
    },
    setAddress(state, action) {
      state.address = action.payload;
    },
    setProjectName(state, action) {
      state.projectName = action.payload;
    },
    setDeal(state, action) {
      state.deal = action.payload;
    },
    setCategory(state, action) {
      state.category = action.payload;
    },
    setBlockchain(state, action) {
      state.blockchain = action.payload;
    },
    setTGI(state, action) {
      state.tgi = action.payload;
    },
    setType(state, action) {
      state.type = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setParsed(state, action) {
      state.symbol = action.payload.symbol;
      state.name = action.payload.name;
      state.decimals = action.payload.decimals;
    },
    setApproved(state, action) {
      state.approved = action.payload;
    },
    setAllowance(state, action) {
      state.allowance = action.payload;
    },
    setMainInfo(state, action) {
      state.presale_rate = action.payload.presale_rate;
      state.soft_cap = action.payload.soft_cap;
      state.hard_cap = action.payload.hard_cap;
      state.min_buy = action.payload.min_buy;
      state.max_buy = action.payload.max_buy;
      // state.refund=action.payload.refund;
      state.whiteListable = action.payload.whiteListable;
      state.whitelistAddresses = action.payload.whitelistAddresses;
      state.whitelistMaxDeposit = action.payload.whitelistMaxDeposit;
      state.dex_amount = action.payload.dex_amount;
      state.dex_rate = action.payload.dex_rate;
      state.dex_lockup = action.payload.dex_lockup;
      state.endDate = action.payload.endDate;
      state.startDate = action.payload.startDate;
      state.fcfsStartDate = action.payload.fcfsStartDate;
      state.fcfsEndDate = action.payload.fcfsEndDate;
      state.listDate = action.payload.listDate;
      state.teamVesting_amount = action.payload.teamVesting_amount;
      state.teamVesting_first_percent = action.payload.teamVesting_first_percent;
      state.teamVesting_first_period = action.payload.teamVesting_first_period;
      state.teamVesting_each_percent = action.payload.teamVesting_each_percent;
      state.teamVesting_each_period = action.payload.teamVesting_each_period;
    },
    setAdditionalInfo(state, action) {
      state.category = action.payload.category;
      state.blockchain = action.payload.blockchain;
      state.tgi = action.payload.tgi;
      state.type = action.payload.type;
      state.logo = action.payload.logo;
      state.poster = action.payload.poster;
      state.website = action.payload.website;
      state.facebook = action.payload.facebook;
      state.twitter = action.payload.twitter;
      state.github = action.payload.github;
      state.telegram = action.payload.telegram;
      state.instagram = action.payload.instagram;
      state.discord = action.payload.discord;
      state.reddit = action.payload.reddit;
      state.description = action.payload.description;
      state.roadmap_description = action.payload.roadmap_description;
      state.about_description = action.payload.about_description;
      state.features_description = action.payload.features_description;
      state.teams_description = action.payload.teams_description;
      state.tokenomics_description = action.payload.tokenomics_description;
      state.roadmap_url = action.payload.roadmap_url;
      state.about_url = action.payload.about_url;
      state.features_url = action.payload.features_url;
      state.teams_url = action.payload.teams_url;
      state.tokenomics_url = action.payload.tokenomics_url;
      state.tier = action.payload.tier;
      state.twitter_followers = action.payload.twitter_followers;
    }
  }
});

// Reducer
export default slice.reducer;
export function setTotalSupply(totalSupply) {
  return (dispatch) => {
    dispatch(slice.actions.setTotalSupply(totalSupply));
  };
}
export function setDeal(value) {
  return (dispatch) => {
    dispatch(slice.actions.setDeal(value));
  };
}
export function setProjectName(value) {
  return (dispatch) => {
    dispatch(slice.actions.setProjectName(value));
  };
}
export function setCategory(value) {
  return (dispatch) => {
    dispatch(slice.actions.setCategory(value));
  };
}
export function setBlockchain(value) {
  return (dispatch) => {
    dispatch(slice.actions.setBlockchain(value));
  };
}
export function setTGI(value) {
  return (dispatch) => {
    dispatch(slice.actions.setTGI(value));
  };
}
export function setType(value) {
  return (dispatch) => {
    dispatch(slice.actions.setType(value));
  };
}
export function setAddress(address) {
  return (dispatch) => {
    dispatch(slice.actions.setAddress(address));
  };
}
export function setError(error) {
  return (dispatch) => {
    dispatch(slice.actions.setError(error));
  };
}

export function setParsed(parsed) {
  return (dispatch) => {
    dispatch(slice.actions.setParsed(parsed));
  };
}
export function setApproved(approved) {
  return (dispatch) => {
    dispatch(slice.actions.setApproved(approved));
  };
}
export function setAllowance(allowance) {
  return (dispatch) => {
    dispatch(slice.actions.setAllowance(allowance));
  };
}
export function setMainInfo(mainInfo) {
  return (dispatch) => {
    dispatch(slice.actions.setMainInfo(mainInfo));
  };
}
export function setAdditionalInfo(additioinalInfo) {
  return (dispatch) => {
    dispatch(slice.actions.setAdditionalInfo(additioinalInfo));
  };
}
