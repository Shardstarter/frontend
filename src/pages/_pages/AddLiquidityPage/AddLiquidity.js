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
import { Link } from 'react-router-dom';

function Page() {
  const { tokenAmountIn, setTokenAmountIn, tokenAmountOut, setTokenAmountOut,
    tokenInBalance, tokenOutBalance, tokenIn, tokenOut, setTokenIn, setTokenOut,
    pairAddress, sharepercent,
    onAmountInChanged, onAmountOutChanged,
    funcAdd } = useLiquidityStatus();
  const network = useSelector((state) => state.network.chainId);

  const handleAdd = async () => {
    try {
      await funcAdd()
    } catch (e) {
      console.log(e.message)
    }
  }

  const [tokenInIcon, setTokenInIcon] = useState('')
  const [tokenOutIcon, setTokenOutIcon] = useState('')

  const tokenAChanged = (tokenname) => {
    if (DEX_COINS[tokenname].isNative || DEX_COINS[tokenname].addresses[network]) {
      setTokenIn(DEX_COINS[tokenname].isNative ? "0x0000000000000000000000000000000000000000" : DEX_COINS[tokenname].addresses[network])
      setTokenInIcon(DEX_COINS[tokenname].icon)
    }
    else
      alert(tokenname + " not exist")
  }

  const tokenBChanged = (tokenname) => {
    if (DEX_COINS[tokenname].isNative || DEX_COINS[tokenname].addresses[network]) {
      setTokenOut(DEX_COINS[tokenname].isNative ? "0x0000000000000000000000000000000000000000" : DEX_COINS[tokenname].addresses[network])
      setTokenOutIcon(DEX_COINS[tokenname].icon)
    }
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
          <a href="/swap">Swap | </a>
          <span>Liquidity </span>
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
              {tokenInIcon && <img src={tokenInIcon} alt="hello" width={50} />}
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '26px', fontWeight: 700 }}
              value={tokenAmountIn}
              onChange={(e) => onAmountInChanged(e.target.value.replace(/[^0-9.]/g, ""))}
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
              {tokenOutIcon && <img src={tokenOutIcon} alt="hello" width={50} />}
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '26px', fontWeight: 700 }}
              value={tokenAmountOut}
              onChange={(e) => onAmountOutChanged(e.target.value.replace(/[^0-9.]/g, ""))}
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
          <Box sx={{ display: 'flex', justifyContent: 'end' }}>
            <Link to="/removeliquidity">Remove Liquidity</Link>
          </Box>
          <br />
          <hr />
          {/* <p>{JSON.stringify(address1)}</p> */}
          {pairAddress == '0x0000000000000000000000000000000000000000' ?
            <p>When creating a pair you are the first liquidity provider. The ratio of tokens you add will set the price of this pool. Once you are happy with the rate, click supply to review </p>
            :
            <>
              <h5>Share of Pool:   <span style={{ color: '#02FF7B' }}>{sharepercent}%</span> </h5>
              <p>Tip: By adding liquidity you'll earn 0.2% of all trades on this pair proportional to your share of the pool. Fees are added to the pool, accrue in real time and can be claimed by withdrawing your liquidity.</p>
            </>
          }
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
