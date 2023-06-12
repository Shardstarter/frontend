export const IDO_ADDRESS = {
  [process.env.REACT_APP_ETHEREUM_CHAINID]: '0xb7BB0b6Ceb97cd0F482AADA8Cf09df14451f7300', //Ropsten IDO
  [process.env.REACT_APP_BSC_CHAINID]: '0x54A637CB0033d5eb96316d00EA1B43cA0E7eb25A', //BSC IDO
  [process.env.REACT_APP_LOCALHOST_CHAINID]: '',
  [process.env.REACT_APP_SHMLIB2X_CHAINID]: '0x50826317f22c46753CC7cb91455Af69AfCEc907F', //Shardeum IDO
  [process.env.REACT_APP_SHMSPHINX_CHAINID]: '0x45C1fe473B7053cf01923ebe5c67B8576F6E2C02', //Shardeum IDO
};

export const MAIN_STAKING_CONTRACT_ADDRESS = {
  [process.env.REACT_APP_ETHEREUM_CHAINID]: '',
  [process.env.REACT_APP_BSC_CHAINID]: '0xbb3663E583E51AF08654a800B50d2d1b12b1B88E', //SHMX token on BSC
  [process.env.REACT_APP_LOCALHOST_CHAINID]: '',
  [process.env.REACT_APP_SHMLIB2X_CHAINID]: '0x6A9C7aaF517E615Ef113af92f0425fe487E9fb9B',  //Shardeum, SHMX token
  [process.env.REACT_APP_SHMSPHINX_CHAINID]: '',  //Shardeum, SHMX token
};

export const PROJECT_MAIN_TOKEN_ADDRESS = {
  [process.env.REACT_APP_ETHEREUM_CHAINID]: '',
  [process.env.REACT_APP_BSC_CHAINID]: '0xd3761e00fDd4e4eEeED5cE78ed0C7c41b6517a0f', //SHMX
  [process.env.REACT_APP_LOCALHOST_CHAINID]: '',
  [process.env.REACT_APP_SHMLIB2X_CHAINID]: '',  //ShardStarter Token, SHMX
  [process.env.REACT_APP_SHMSPHINX_CHAINID]: '0x978Ef5F2Dc601d2Fb482FD8457e19178ccb76a53',  //ShardStarter Token, SHMX
};

export const LIQUID_STAKING_CONTRACT_ADDRESS = {
  [process.env.REACT_APP_ETHEREUM_CHAINID]: '',
  [process.env.REACT_APP_BSC_CHAINID]: '0xC2447aC4Fc570bB0ECc2352bF59680F5867c9D54', //SHMX <-> sSHMX
  [process.env.REACT_APP_LOCALHOST_CHAINID]: '',
  [process.env.REACT_APP_SHMLIB2X_CHAINID]: '',
  [process.env.REACT_APP_SHMSPHINX_CHAINID]: '0x72b94c2f7539c84D4B2a18072bF4461D2EEfeE89', //SHMX <-> sSHMX
};

export const LIQUID_STAKING_TOKEN_ADDRESS = {
  [process.env.REACT_APP_ETHEREUM_CHAINID]: '',
  [process.env.REACT_APP_BSC_CHAINID]: '0xD17D869E5D8152e0deEEAC1BB45476DD272c9c58', //sSHMX
  [process.env.REACT_APP_LOCALHOST_CHAINID]: '',
  [process.env.REACT_APP_SHMLIB2X_CHAINID]: '',
  [process.env.REACT_APP_SHMSPHINX_CHAINID]: '0x1182B77a40aA95978C9906058FD927f4a17a6203', //sSHMX
};





export const LOCK_ADDRESS = {
  [process.env.REACT_APP_ETHEREUM_CHAINID]: '0xdd151CEbdc9574686a408381732a5756D4A96819',
  [process.env.REACT_APP_BSC_CHAINID]: '0x7C1666fa1e6E3908618B4aE4cEB239f8ccb62C10',
  [process.env.REACT_APP_LOCALHOST_CHAINID]: '',
  [process.env.REACT_APP_SHMLIB2X_CHAINID]: '',
  [process.env.REACT_APP_SHMSPHINX_CHAINID]: '',
};

export const ADMIN_ADDRESS = {
  [process.env.REACT_APP_ETHEREUM_CHAINID]: '0xecFA21cfFcb7BDeE55D137486Dea0d7984c72619',
  [process.env.REACT_APP_BSC_CHAINID]: '0xecFA21cfFcb7BDeE55D137486Dea0d7984c72619',
  [process.env.REACT_APP_LOCALHOST_CHAINID]: '0xecFA21cfFcb7BDeE55D137486Dea0d7984c72619',
  [process.env.REACT_APP_SHMLIB2X_CHAINID]: '0xecFA21cfFcb7BDeE55D137486Dea0d7984c72619',
  [process.env.REACT_APP_SHMSPHINX_CHAINID]: '0xecFA21cfFcb7BDeE55D137486Dea0d7984c72619',
};


export const SCAN_URL = {
  '1': 'https://etherscan.io',
  '3': 'https://ropsten.etherscan.io',
  '42': 'https://kovan.etherscan.io',
  '56': 'https://bscscan.com',
  '97': 'https://testnet.bscscan.com',
  '8081': 'https://explorer-liberty20.shardeum.org',
  '8082': 'https://explorer-sphinx.shardeum.org/',
};

export const CURRENCY_NAME = {
  '1': 'Ethereum',
  '3': 'TEthereum',
  '42': 'TEthereum',
  '56': 'BNB',
  '97': 'TBNB',
  '1337': 'Ethereum',
  '8081': 'Shardeum',
  '8082': 'Shardeum',
};

export const CURRENCY_SYMBOL = {
  '1': 'ETH',
  '3': 'tETH',
  '42': 'tETH',
  '56': 'BNB',
  '97': 'tBNB',
  '1337': 'ETH',
  '8081': 'SHM',
  '8082': 'SHM',
};
export const NETWORK_NAME = {
  '1': 'Ethereum Mainnet',
  '3': 'Ropsten Testnet',
  '42': 'Kovan Testnet',
  '56': 'Binance Smart Chain Mainnet',
  '97': 'Binance Smart Chain Testnet',
  '1337': 'localhost',
  '8081': 'Shardeum Liberty 2.X',
  '8082': 'Shardeum Sphinx 1.X',
};
export const SWAP_URL = {
  '1': 'https://app.uniswap.org/#/swap?outputCurrency=',
  '3': 'https://app.uniswap.org/#/swap?outputCurrency=',
  '42': 'https://app.uniswap.org/#/swap?outputCurrency=',
  '56': 'https://pancakeswap.finance/swap?outputCurrency=',
  '97': 'https://pancakeswap.finance/swap?outputCurrency='
};
export const DEXTOOL_URL = {
  '1': 'https://www.dextools.io/app/ether/pair-explorer/',
  '3': 'https://www.dextools.io/app/ether/pair-explorer/',
  '42': 'https://www.dextools.io/app/ether/pair-explorer/',
  '56': 'https://poocoin.app/tokens/',
  '97': 'https://poocoin.app/tokens/'
};
export const POOL_STATUS = [
  'Upcoming',
  'Inprogress',
  'Finished',
  'Ended',
  'Cancelled'
];
export const POOL_TIER = [
  'common',
  'gold',
  'platinum',
  'diamond'
];

export const DEALS_TAB = [
  // { id: 0, isComingSoon: false, link: '/idodeals', title: 'IDO Deals' },
  // { id: 1, isComingSoon: false, link: '/vcdeals', title: 'VC Deals' },
  // { id: 1, isComingSoon: false, link: '/inodeals', title: 'INO Deals' },
];



export const PROJECT_STATUS = {
  inProcess: 'IN-PROCESS',
  completed: 'COMPLETED'
};

export const ADMIN_WALLETS = [
  '0x791320012C079fDF833244C65c343cbAB34C6ab6', //main
  '0xecFA21cfFcb7BDeE55D137486Dea0d7984c72619', //dev
]

export const MAIN_WALLET = "0x791320012C079fDF833244C65c343cbAB34C6ab6"; // use for staking constructor

/** Tier System */
export const TIER_LEVEL = {
  none_0: 'None',
  amber_1: 'Amber',
  chrome_2: 'Chrome',
  jade_3: 'Jade',
  topaz_4: 'Topaz',
};

export const TIER_STAKING_AMOUNT = {
  amber_1: 1000,
  chrome_2: 2000,
  jade_3: 3000,
  topaz_4: 4000,
};

export const TIER_DEPOSIT_PERCENT = {
  'None': 0,
  'Amber': 5, // all amber users can deposit total 5%
  'Chrome': 15,
  'Jade': 30,
  'Topaz': 50,
};