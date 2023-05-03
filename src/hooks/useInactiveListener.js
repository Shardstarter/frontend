import { useEffect } from 'react'
import { useWeb3React } from '@web3-react/core'
import { connectorLocalStorageKey } from 'redrum-pancake-uikit'
import { connectorsByName } from '../utils/web3React'

export const useInactiveListener = () => {
  const { account, chainId, connector } = useWeb3React()

  useEffect(() => {
    if (account && connector) {
      const handleDeactivate = () => {
        // This localStorage key is set by @web3-react/walletconnect-connector
        if (window.localStorage.getItem('walletconnect')) {
          connectorsByName.walletconnect.close()
          connectorsByName.walletconnect.walletConnectProvider = null
        }
        window.localStorage.removeItem(connectorLocalStorageKey)
      }

      connector.addListener('Web3ReactDeactivate', handleDeactivate)

      return () => {
        connector.removeListener('Web3ReactDeactivate', handleDeactivate)
      }
    }
    return undefined
  }, [account, chainId, connector])
}
