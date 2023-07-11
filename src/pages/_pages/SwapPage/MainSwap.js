import React, { useEffect, useState } from 'react';
import { Button, Box, Paper, InputBase, IconButton } from '@mui/material';
import { Label } from 'components/_components/Label';
import { RoundedLabel } from 'components/_components/Label';
import { PrimaryButton } from 'components/_components/Button';

import { useSwapStatus } from 'hooks/useMyStatus';
import { useSelector } from 'react-redux';
import FilterBar from 'components/_components/FilterBar';
import { DEX_COINS, DEX_COINS_LIST } from 'config/constants';

import useActiveWeb3React from 'hooks/useActiveWeb3React';
import useAuth from 'hooks/useAuth';
import { useWalletModal } from 'redrum-pancake-uikit';

function Page() {
  const { tokenAmountIn, setTokenAmountIn, tokenAmountOut, setTokenAmountOut,
    tokenInBalance, tokenOutBalance, exchangeRate, tokenIn, tokenOut, setTokenIn, setTokenOut,
    funcSwap } = useSwapStatus();

  const { account } = useActiveWeb3React();
  const network = useSelector((state) => state.network.chainId);
  const auth = useAuth(network);
  const { onPresentConnectModal, onPresentAccountModal } = useWalletModal(
    auth.login,
    auth.logout,
    (t) => t,
    account,
    Number(network)
  );


  useEffect(() => {
    if (network) {
      tokenAChanged('SHM')
      tokenBChanged('SHMX')
    }
  }, [account, network])


  const handleSwap = async () => {
    try {
      await funcSwap()
    } catch (e) {
      console.log(e.message)
    }

  }
  const [tokenInName, setTokenInName] = useState('')
  const [tokenOutName, setTokenOutName] = useState('')
  const [tokenInIcon, setTokenInIcon] = useState('')
  const [tokenOutIcon, setTokenOutIcon] = useState('')
  const tokenAChanged = (tokenname) => {
    if (DEX_COINS[tokenname].isNative || DEX_COINS[tokenname].addresses[network]) {
      setTokenIn(DEX_COINS[tokenname].isNative ? "0x0000000000000000000000000000000000000000" : DEX_COINS[tokenname].addresses[network])
      setTokenInIcon(DEX_COINS[tokenname].icon)
      setTokenInName(tokenname)
    }

    else
      alert(tokenname + " not exist")
  }

  const tokenBChanged = (tokenname) => {
    if (DEX_COINS[tokenname].isNative || DEX_COINS[tokenname].addresses[network]) {
      setTokenOut(DEX_COINS[tokenname].isNative ? "0x0000000000000000000000000000000000000000" : DEX_COINS[tokenname].addresses[network])
      setTokenOutIcon(DEX_COINS[tokenname].icon)
      setTokenOutName(tokenname)
    }
    else
      alert(tokenname + " not exist")
  }

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          padding: '50px 0',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#000000'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: '30px',
            justifyContent: 'space-between',
            width: '600px',
            '@media (max-width: 760px)': {
              width: '100%',
              padding: '20px',
              gap: '10px'
            }
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '30px',
              justifyContent: 'space-between',
              '@media (max-width: 760px)': {
                gap: '10px'
              }
            }}
          >
            <PrimaryButton
              label="Swap"
              sx={{
                padding: '20px 43px 20px 43px',
                color: '#585858',
                '@media (max-width: 760px)': {
                  padding: '10px 23px 10px 23px'
                }
              }}
              hasFocus={true}
            />
            <a href="/addliquidity">
              <PrimaryButton
                label="Liquidity"
                sx={{
                  padding: '20px 43px 20px 43px',
                  color: '#585858',
                  '@media (max-width: 760px)': {
                    padding: '10px 23px 10px 23px'
                  }
                }}
              />
            </a>
          </Box>
          <svg xmlns="http://www.w3.org/2000/svg" height="1.4rem" fill="#777" viewBox="0 0 512 512">
            <path d="M495.9 166.6c3.2 8.7 .5 18.4-6.4 24.6l-43.3 39.4c1.1 8.3 1.7 16.8 1.7 25.4s-.6 17.1-1.7 25.4l43.3 39.4c6.9 6.2 9.6 15.9 6.4 24.6c-4.4 11.9-9.7 23.3-15.8 34.3l-4.7 8.1c-6.6 11-14 21.4-22.1 31.2c-5.9 7.2-15.7 9.6-24.5 6.8l-55.7-17.7c-13.4 10.3-28.2 18.9-44 25.4l-12.5 57.1c-2 9.1-9 16.3-18.2 17.8c-13.8 2.3-28 3.5-42.5 3.5s-28.7-1.2-42.5-3.5c-9.2-1.5-16.2-8.7-18.2-17.8l-12.5-57.1c-15.8-6.5-30.6-15.1-44-25.4L83.1 425.9c-8.8 2.8-18.6 .3-24.5-6.8c-8.1-9.8-15.5-20.2-22.1-31.2l-4.7-8.1c-6.1-11-11.4-22.4-15.8-34.3c-3.2-8.7-.5-18.4 6.4-24.6l43.3-39.4C64.6 273.1 64 264.6 64 256s.6-17.1 1.7-25.4L22.4 191.2c-6.9-6.2-9.6-15.9-6.4-24.6c4.4-11.9 9.7-23.3 15.8-34.3l4.7-8.1c6.6-11 14-21.4 22.1-31.2c5.9-7.2 15.7-9.6 24.5-6.8l55.7 17.7c13.4-10.3 28.2-18.9 44-25.4l12.5-57.1c2-9.1 9-16.3 18.2-17.8C227.3 1.2 241.5 0 256 0s28.7 1.2 42.5 3.5c9.2 1.5 16.2 8.7 18.2 17.8l12.5 57.1c15.8 6.5 30.6 15.1 44 25.4l55.7-17.7c8.8-2.8 18.6-.3 24.5 6.8c8.1 9.8 15.5 20.2 22.1 31.2l4.7 8.1c6.1 11 11.4 22.4 15.8 34.3zM256 336a80 80 0 1 0 0-160 80 80 0 1 0 0 160z" />
          </svg>
        </Box>
        <Box
          sx={{
            width: '600px',
            position: 'relative',
            '@media (max-width: 760px)': {
              width: '100%',
              padding: '20px'
            }
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="#555"
            style={{
              border: '3px solid #999',
              position: 'absolute',
              left: '50%',
              top: '225px',
              transform: 'translate(-50%,-50%)',
              borderRadius: '50%',
              background: '#222'
            }}
            height="2.6rem"
            viewBox="0 0 512 512"
          >
            <path d="M256 0a256 256 0 1 0 0 512A256 256 0 1 0 256 0zM127 281c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l71 71L232 136c0-13.3 10.7-24 24-24s24 10.7 24 24l0 182.1 71-71c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9L273 393c-9.4 9.4-24.6 9.4-33.9 0L127 281z" />
          </svg>
          <Paper
            component="form"
            sx={{
              p: '2px 13px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #02FF7B',
              backgroundColor: '#171717',
              height: '60px',
              marginTop: "20px"
            }}
          >
            <Box component="img" src={tokenInIcon} sx={{ width: '30px', height: '30px', margin: '0 20px' }} />
            <p style={{ padding: '0 10px', margin: '0' }}>
              1 {tokenInName} = <span style={{ color: 'rgb(2,255,123)' }}>{Number(exchangeRate).toFixed(6)} {tokenOutName}</span>
            </p>
          </Paper>
          {/* Swap Input */}
          <Paper
            component="form"
            sx={{
              p: '2px 13px',
              margin: '20px 0',
              display: 'flex',
              alignItems: 'center',
              justifyContent: "space-between",
              border: '1px solid #02FF7B',
              backgroundColor: '#171717',
              height: '96px'
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: '26px', width: "200px", fontWeight: 700 }}
                value={tokenAmountIn}
                onChange={(e) => setTokenAmountIn(e.target.value.replace(/[^0-9.]/g, ''))}
              />
              <span style={{ color: "#777", cursor: 'pointer', paddingLeft: '10px' }}
                onClick={() => setTokenAmountIn(Number(tokenInBalance).toFixed(6))}>max</span>
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '15px',
              }}
            >
              <FilterBar options={DEX_COINS_LIST} onChangeAction={tokenAChanged} title={tokenInName}
                sx={{ fontSize: '18px', height: '40px', padding: "5px 24px", minWidth: "160px" }} />
              <p style={{ textAlign: 'right' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  style={{ margin: '0 10px 0 0' }}
                  height="1.3rem"
                  viewBox="0 0 512 512"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
                {Number(tokenInBalance).toFixed(3)} {tokenInName}
              </p>
            </Box>
          </Paper>
          {/* Swap Output */}
          <Paper
            component="form"
            sx={{
              p: '2px 13px',
              display: 'flex',
              alignItems: 'center',
              border: '1px solid #02FF7B',
              backgroundColor: '#171717',
              height: '96px',
              justifyContent: "space-between"
            }}
          >
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: '26px', width: "200px", fontWeight: 700 }}
                value={Number(tokenAmountOut).toFixed(6)}
                disabled
              />
            </Box>
            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'space-between',
                justifyContent: 'center',
                gap: '10px',
                marginTop: '15px'
              }}
            >
              <FilterBar options={DEX_COINS_LIST} onChangeAction={tokenBChanged} title={tokenOutName}
                sx={{ fontSize: '18px', height: '40px', padding: "5px 24px", minWidth: "160px" }} />
              <p style={{ textAlign: 'right' }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#fff"
                  style={{ margin: '0 10px 0 0' }}
                  height="1.3rem"
                  viewBox="0 0 512 512"
                >
                  <path d="M64 32C28.7 32 0 60.7 0 96V416c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V192c0-35.3-28.7-64-64-64H80c-8.8 0-16-7.2-16-16s7.2-16 16-16H448c17.7 0 32-14.3 32-32s-14.3-32-32-32H64zM416 272a32 32 0 1 1 0 64 32 32 0 1 1 0-64z" />
                </svg>
                {Number(tokenOutBalance).toFixed(3)} {tokenOutName}
              </p>
            </Box>
          </Paper>

          {/* Swap Button */}
          {account ?
            (Number(tokenAmountOut) > 0 ?
              <PrimaryButton
                sx={{
                  marginTop: '30px',
                  width: '100%',
                  minHeight: '85px',
                  fontSize: '24px !important'
                }}
                label="Swap"
                hasFocus
                onClick={handleSwap}
              />
              :
              <PrimaryButton
                sx={{
                  marginTop: '30px',
                  width: '100%',
                  minHeight: '85px',
                  fontSize: '24px !important'
                }}
                label="No Pool"
              />
            )
            :
            <PrimaryButton
              sx={{
                marginTop: '30px',
                width: '100%',
                minHeight: '85px',
                fontSize: '24px !important'
              }}
              label="Connect Wallet"
              hasFocus
              onClick={onPresentConnectModal}
            />
          }
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
