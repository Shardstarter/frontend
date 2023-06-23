import React, { useEffect, useState } from 'react';
import { Button, Box, Paper, InputBase, IconButton } from '@mui/material';
import { Label } from 'components/_components/Label';
import { RoundedLabel } from 'components/_components/Label';
import { PrimaryButton } from 'components/_components/Button';

import { useSwapStatus } from 'hooks/useMyStatus';


function Page() {
  const { tokenAmountIn, setTokenAmountIn, tokenAmountOut, setTokenAmountOut,
    tokenInBalance, tokenOutBalance,
    funcSwap } = useSwapStatus();

  const [amount, setAmount] = useState(0);

  const handleSwap = async () => {
    try {
      await funcSwap()
    } catch (e) {
      console.log(e.message)
    }
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
        <Label sx={{ marginTop: '60px' }} text={{ value: 'Swap SHMX', size: 40, color: 'green' }} />
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
              <img src="_img/icon/USDC.png" alt="hello" width={50} />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '26px', fontWeight: 700 }}
              value={tokenAmountIn}
              onChange={(e) => setTokenAmountIn(e.target.value.replace(/[^0-9.]/g, ""))}
            />
            <Button
              sx={{
                width: '140px',
                height: '70px',
                backgroundColor: '#000000',
                borderRadius: '8px',
                border: '1px solid #7070704D',
                color: 'white',
                fontSize: 20
              }}
            >
              USDC
            </Button>
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
              <img src="_img/icon/shmx.png" alt="hello" width={50} />
            </IconButton>
            <InputBase
              sx={{ ml: 1, flex: 1, fontSize: '26px', fontWeight: 700 }}
              value={tokenAmountOut}
            // onChange={(e) => setTokenAmountOut(e.target.value.replace(/[^0-9.]/g, ""))}
            />
            <Button
              sx={{
                width: '140px',
                height: '70px',
                backgroundColor: '#000000',
                borderRadius: '8px',
                border: '1px solid #7070704D',
                color: 'white',
                fontSize: 20
              }}
            >
              SHMX
            </Button>
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
            label="Swap"
            hasFocus
            onClick={handleSwap}
          />
        </Box>
      </Box>
    </Box>
  );
}

export default Page;
