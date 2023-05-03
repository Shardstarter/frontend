import random from 'lodash/random'

// Array of available nodes to connect to

export const nodes ={
  [Number(process.env.REACT_APP_BSC_CHAINID)] :[process.env.REACT_APP_BSC_NODE_1, process.env.REACT_APP_BSC_NODE_2, process.env.REACT_APP_BSC_NODE_3],
  [Number(process.env.REACT_APP_ETHEREUM_CHAINID)] : [process.env.REACT_APP_ETHEREUM_NODE],
  [Number(process.env.REACT_APP_SHM2X_CHAINID)] : [process.env.REACT_APP_SHM2X_NODE],
} 

const getNodeUrl = (network) => {
    const randomIndex = random(0, nodes[network].length - 1)
    return nodes[network][randomIndex];  
}

export default getNodeUrl
