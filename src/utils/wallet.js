// Set of helper functions to facilitate wallet setup

import {
  SCAN_URL, CURRENCY_NAME, CURRENCY_SYMBOL, NETWORK_NAME
} from "../config/constants";
import { nodes } from "./getRpcUrl";

/**
 * Prompt the user to add BSC as a network on Metamask, or switch to BSC if the wallet is on a different network
 * @returns {boolean} true if the setup succeeded, false otherwise
 */
export const setupNetwork = async (network) => { 
  const provider = window.ethereum;
  if (provider) {
    const requested_chainId_str = `0x${Number(network).toString(16)}`;
    if (provider.chainId != requested_chainId_str) {
      try {
        await provider.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: requested_chainId_str
            },
          ],
        });
      } catch (switchError) {
        console.log('$$$$$$$$$$$$$$$$',switchError)
        if (switchError.code === 4902) { // You can make a request to add the chain to wallet here     
          await provider.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: requested_chainId_str,
                chainName: NETWORK_NAME[network],
                nativeCurrency: {
                  name: CURRENCY_NAME[network],
                  symbol: CURRENCY_SYMBOL[network],
                  decimals: 18,
                },
                rpcUrls: nodes[network],
                blockExplorerUrls: [`${SCAN_URL[network]}/`],
              },
            ],
          });
        }
        return 0;
      }
    }
  } else {
    console.error(
      "Can't setup the network on metamask because window.ethereum is undefined"
    );
    return -1;
  }
};

/**
 * Prompt the user to add a custom token to metamask
 * @param tokenAddress
 * @param tokenSymbol
 * @param tokenDecimals
 * @param tokenImage
 * @returns {boolean} true if the token has been added, false otherwise
 */
