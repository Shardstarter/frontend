import React, { useEffect, useState } from 'react';
import { Button, Box, Paper, InputBase, IconButton } from '@mui/material';
import { Label } from 'components/_components/Label';
import { RoundedLabel } from 'components/_components/Label';
import { PrimaryButton } from 'components/_components/Button';
import FilterBar from 'components/_components/FilterBar';
import { useLiquidityStatus } from 'hooks/useMyStatus';
import { CURRENCY_SYMBOL } from 'config/constants';
import { useSelector } from "react-redux";
import { DEX_COINS, DEX_COINS_LIST } from 'config/constants';

function Page() {
  const { tokenAmountIn, setTokenAmountIn, tokenAmountOut, setTokenAmountOut,
    tokenInBalance, tokenOutBalance, tokenIn, tokenOut, setTokenIn, setTokenOut,
    funcAdd } = useLiquidityStatus();
  const network = useSelector((state) => state.network.chainId);

  const handleAdd = async () => {
    try {
      await funcAdd()
    } catch (e) {
      console.log(e.message)
    }
  }

  const tokenAChanged = (tokenname) => {
    if (DEX_COINS[tokenname].addresses[network])
      setTokenIn(DEX_COINS[tokenname].addresses[network])
    else
      alert(tokenname + " not exist")
  }

  const tokenBChanged = (tokenname) => {
    if (DEX_COINS[tokenname].addresses[network])
      setTokenOut(DEX_COINS[tokenname].addresses[network])
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
        <Label sx={{ marginTop: '60px' }} text={{ value: 'Add Liquidity', size: 40, color: 'green' }} />
        <Box
          sx={{
            width: '600px',
            '@media (max-width: 760px)': {
              width: '100%'
            }
          }}
        >
          {/* Swap Input */}
          <Paper
            component="form"
            sx={{
              p: '2px 13px',
              display: 'flex',
              alignItems: 'center',
              marginTop: '10px',
              marginBottom: '5px',
              border: '1px solid #02FF7B',
              backgroundColor: '#171717',
              height: '96px'
            }}
          >
            <IconButton sx={{ p: '10px' }} disabled>
              {/* <img src={"_img/icon/shmx.png"} alt="hello" width={50} /> */}
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '26px', fontWeight: 700 }}
              value={tokenAmountIn}
              onChange={(e) => setTokenAmountIn(e.target.value.replace(/[^0-9.]/g, ""))}
            />
            <FilterBar options={DEX_COINS_LIST} onChangeAction={tokenAChanged} title="Select" />
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <RoundedLabel keyword="Balance" value={Number(tokenInBalance).toFixed(3)} bgColor="#171717" />
          </Box>


          {/* Swap Output */}
          <Paper
            component="form"
            sx={{
              p: '2px 13px',
              display: 'flex',
              alignItems: 'center',
              marginTop: '50px',
              marginBottom: '5px',
              border: '1px solid #02FF7B',
              backgroundColor: '#171717',
              height: '96px'
            }}
          >
            <IconButton sx={{ p: '10px' }} disabled>
              {/* <img src="_img/icon/shmx.png" alt="hello" width={50} /> */}
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '26px', fontWeight: 700 }}
              value={tokenAmountOut}
              onChange={(e) => setTokenAmountOut(e.target.value.replace(/[^0-9.]/g, ""))}
            />
            <FilterBar options={DEX_COINS_LIST} onChangeAction={tokenBChanged} title="Select" />
          </Paper>
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <RoundedLabel keyword="Balance" value={Number(tokenOutBalance).toFixed(3)} bgColor="#171717" />
          </Box>

          {/* Swap Button */}
          <PrimaryButton
            sx={{
              marginTop: '30px',
              width: '100%',
              minHeight: '85px',
              fontSize: '24px !important'
            }}
            label="Add Liquidity"
            hasFocus
            onClick={handleAdd}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
