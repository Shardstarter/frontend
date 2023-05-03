import imageURL from './imageURL';

const CHAINS_IMAGES = {
  1: imageURL('./chains/eth.png'),
  97: imageURL('./chains/bsc.png'),
  250: imageURL('./chains/ftm.png'),
  43114: imageURL('./chains/avax.png'),
  137: imageURL('./chains/polygon.png'),
  8081: imageURL('./chains/shardeum.png')
};

export const getNetworkImage = (chainId = 0) => {
  return CHAINS_IMAGES[[process.env.REACT_APP_PROJECT_CHAINID]];
};

