import React, { useEffect, useState } from 'react';
import { Button, Box, Paper, InputBase, IconButton } from '@mui/material';
import { Label } from 'components/_components/Label';
import { RoundedLabel } from 'components/_components/Label';
import { PrimaryButton } from 'components/_components/Button';
import FilterBar from 'components/_components/FilterBar';
import { useLiquidityStatus } from 'hooks/useMyStatus';
import { CURRENCY_SYMBOL } from 'config/constants';
import { useSelector } from "react-redux";
import { DEX_COINS, DEX_COINS_LIST, WETH_TOKEN_ADDRESS } from 'config/constants';

function Page() {
  const { tokenAmountIn, setTokenAmountIn, tokenAmountOut, setTokenAmountOut,
    tokenInBalance, tokenOutBalance, tokenIn, tokenOut, setTokenIn, setTokenOut,
    pairAddress, sharepercent,
    onAmountInChanged, onAmountOutChanged,
    pairTotalSupply, pairBalance,
    funcAdd, funcRemove } = useLiquidityStatus();
  const network = useSelector((state) => state.network.chainId);

  const [percent, setPercent] = useState(0);

  const handleRemove = async () => {
    try {
      await funcRemove(percent);
    } catch (e) {
      console.log(e.message)
    }
  }

  const tokenAChanged = (tokenname) => {
    if (DEX_COINS[tokenname].isNative || DEX_COINS[tokenname].addresses[network])
      setTokenIn(DEX_COINS[tokenname].isNative ? WETH_TOKEN_ADDRESS[network] : DEX_COINS[tokenname].addresses[network])
    else
      alert(tokenname + " not exist")
  }

  const tokenBChanged = (tokenname) => {
    if (DEX_COINS[tokenname].isNative || DEX_COINS[tokenname].addresses[network])
      setTokenOut(DEX_COINS[tokenname].isNative ? WETH_TOKEN_ADDRESS[network]  : DEX_COINS[tokenname].addresses[network])
    else
      alert(tokenname + " not exist")
  }

  return (
    <Box>
      <Box
        sx={{
          width: '100%',
          paddingBottom: '50px',
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
          backgroundColor: '#000000'
        }}
      >
        <p style={{ marginTop: '60px', fontSize: '40px', color: '#02FF7B' }}>
          <span>Remove Liquidity</span>
        </p>
        <Box
          sx={{
            width: '600px',
            '@media (max-width: 760px)': {
              width: '100%'
            }
          }}
        >
          {/* Swap Input */}

          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
              marginBottom: '5px',
              height: '96px'
            }}
          >
            <FilterBar options={DEX_COINS_LIST} onChangeAction={tokenAChanged} title="Select" />
            <h1 style={{ margin: '15px' }}>+</h1>
            <FilterBar options={DEX_COINS_LIST} onChangeAction={tokenBChanged} title="Select" />
          </Box>


          {/* <p>{JSON.stringify(address1)}</p> */}
          {pairAddress == '0x0000000000000000000000000000000000000000' ?
            <p>No pair</p>
            :
            <>
              <h4>You have {Number(pairBalance / pairTotalSupply * 100).toFixed(1)}% shares of pool liquidity</h4>


              {pairBalance > 0 &&
                <>
                  <Box sx={{
                    marginTop: '25px',
                  }}>
                    <RoundedLabel keyword="Percent of your shares to remove" />
                  </Box>
                  <Paper
                    component="form"
                    sx={{
                      p: '2px 13px',
                      display: 'flex',
                      alignItems: 'center',
                      marginBottom: '5px',
                      border: '1px solid #02FF7B',
                      backgroundColor: '#171717',
                      height: '96px'
                    }}
                  >
                    <InputBase
                      sx={{ ml: 1, flex: 1, fontSize: '26px', fontWeight: 700 }}
                      value={percent}
                      onChange={(e) => setPercent(e.target.value.replace(/[^0-9.]/g, ""))}
                    />
                  </Paper>
                  <PrimaryButton
                    sx={{
                      marginTop: '30px',
                      width: '100%',
                      minHeight: '85px',
                      fontSize: '24px !important'
                    }}
                    label="Remove Liquidity"
                    hasFocus
                    onClick={handleRemove}
                  />
                </>
              }
            </>
          }
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
