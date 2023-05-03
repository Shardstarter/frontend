import { combineReducers } from "redux";
// slices
import networkReducer from "./slices/network";
import userReducer from "./slices/user";
import tokenListingReducer from "./slices/tokenListing";
import poolsReducer from "./slices/pools";
import liquidityLocksReducer from "./slices/liquidityLocks";
import tokenLocksReducer from "./slices/tokenLocks";
import alarmsReducer from "./slices/alarms";
import storage from "redux-persist/lib/storage";

// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: "redrum",
  storage,
  blacklist: ["tokenListing", "pools", "liquidityLocks", "tokenLocks", "network"],
};

const rootReducer = combineReducers({
  user: userReducer,
  network: networkReducer,
  tokenListing: tokenListingReducer,
  pools: poolsReducer,
  alarms:alarmsReducer,
  liquidityLocks: liquidityLocksReducer,
  tokenLocks: tokenLocksReducer,
});

export { rootPersistConfig, rootReducer };
