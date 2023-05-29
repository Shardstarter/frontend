import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import { Label, RoundedLabel } from 'components/_components/Label';
import { SubmitInput } from 'components/_components/Input';
import { PrimaryButton } from 'components/_components/Button';
import { RoundedCard } from 'components/_components/Card';
import Pagination from 'components/_components/Pagination';
import { StakingButtons, LiquidParams } from 'utils/_utils/EntityFieldDefs';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useSnackbar } from 'notistack';

import { formatUnits, parseUnits } from '@ethersproject/units';
import apis from 'services';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useStakingContract, useTokenContract } from 'hooks/useContract';
import LiquidStaking from './LiquidStaking';

const RenderElements = ({ poolInfo, idx, expanded, setExpanded }) => {
  const { account } = useActiveWeb3React();
  const tokenContract = useTokenContract(poolInfo.tokenAddress);
  const stakingContract = useStakingContract(poolInfo.address);
  const [data, setData] = useState({
    token_decimal: 0,
    wallet_balance: 0,
    staked: 0,
    rewards: 0,
    staking_amount: 0, //input data
    unstaking_amount: 0, //input data
    tvl: 0, //pool information
    lockingReleaseTime: '', //user information
  });

  useEffect(() => {
    (async () => {
      try {
        const wallet_balance = await tokenContract.balanceOf(account);
        const pool_tvl = await stakingContract._totalSupply();
        const decimals = await tokenContract.decimals();
        const staked = await stakingContract.balances(account);
        const rewards = await stakingContract.earned(account);

        let lockingReleaseTime = await stakingContract.lockingReleaseTime(account);
        lockingReleaseTime = formatUnits(lockingReleaseTime, 0);
        if (Number(lockingReleaseTime) > 0) {
          lockingReleaseTime = new Date(Number(lockingReleaseTime) * 1000);
          var year = lockingReleaseTime.getFullYear();
          var month = ("0" + (lockingReleaseTime.getMonth() + 1)).slice(-2);
          var day = ("0" + lockingReleaseTime.getDate()).slice(-2);
          var formattedDate = `${year}-${month}-${day}`;
          lockingReleaseTime = formattedDate;
        } else {
          lockingReleaseTime = "~"
        }


        setData({
          ...data,
          token_decimal: decimals,
          wallet_balance: formatUnits(wallet_balance, decimals),
          staked: formatUnits(staked, decimals),
          rewards: Number(formatUnits(rewards, decimals)).toFixed(3),
          tvl: formatUnits(pool_tvl, decimals),
          lockingReleaseTime,
        });

      } catch (error) {
        console.log(error.message)
      }
    })();

  }, [account, poolInfo, tokenContract]);

  var componentInfo = {
    imgUrl: poolInfo.logo,
    value: {
      value: `$${poolInfo.tokenName.substring(0, 10)}`,
      size: 30
    },
    label: {
      bgColor: '#171717',
      label: `$${poolInfo.tokenSymbol.substring(0, 5)} / ${poolInfo.tokenSymbol.substring(0, 5)}`,
      color: 'green',
      size: 20,
      width: 197,
      height: 43
    },
    items: [
      {
        label: {
          value: 'Your Staked',
          color: 'grey',
          size: 22,
          height: 100
        },
        value: {
          value: data.staked,
          size: 26,
          height: 100
        }
      },
      {
        label: {
          value: 'Duration',
          color: 'grey',
          size: 22,
          height: 100
        },
        value: {
          value: `${poolInfo.lockingdays} days`,
          size: 26,
          height: 100
        }
      },
      {
        label: {
          value: 'APR',
          color: 'grey',
          size: 22,
          height: 100
        },
        value: {
          value: poolInfo.rewardRate * 12 + '%',
          size: 26,
          height: 100
        },
        img: {
          imgUrl: '_img/icon/increased.png',
          size: 16
        }
      },
      {
        label: {
          value: 'TVL',
          color: 'grey',
          size: 22,
          height: 100
        },
        value: {
          value: data.tvl,
          size: 26,
          height: 100
        }
      }
    ]
  };

  const handleStake = async () => {
    console.log(data)
    var bignumber_staking_amount = parseUnits(String(data.staking_amount), data.token_decimal);
    // check allowance
    try {
      const allowance = await tokenContract.allowance(account, poolInfo.address);
      if (allowance.lt(bignumber_staking_amount)) {
        const tx = await tokenContract.approve(poolInfo.address, bignumber_staking_amount);
        let result = await tx.wait();
        if (result.confirmations > 1) {
          const tx = await stakingContract.stake(bignumber_staking_amount);
          await tx.wait();

          await apis.updateUserStaking({
            staking_address: poolInfo.address,
            wallet_address: account,
            changing_amount: Number(data.staking_amount)
          });

          window.location.reload()
        }
      } else {
        const tx = await stakingContract.stake(bignumber_staking_amount);
        await tx.wait();

        await apis.updateUserStaking({
          staking_address: poolInfo.address,
          wallet_address: account,
          changing_amount: Number(data.staking_amount)
        });

        window.location.reload()
      }
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleUnstake = async () => {
    console.log(data)
    try {
      if (new Date(data.lockingReleaseTime).getTime() > Date.now()) {
        if (window.confirm("Unstaking before locktime can be take fee upto 25%. Are you ok?")) {

        } else {
          return;
        }
      }
      const tx = await stakingContract.withdraw(parseUnits(String(data.unstaking_amount), data.token_decimal));
      await tx.wait();

      await apis.updateUserStaking({
        staking_address: poolInfo.address,
        wallet_address: account,
        changing_amount: 0 - Number(data.unstaking_amount)
      });

      window.location.reload()
    } catch (err) {
      console.log(err);
      return;
    }
  };

  const handleHarvest = async () => {
    try {
      const tx = await stakingContract.getReward();
      await tx.wait();
      window.location.reload()
    } catch (err) {
      console.log(err);
      return;
    }
  };

  return (
    <Box
      key={idx}
      sx={{
        padding: '35px 30px 35px 60px',
        backgroundColor: '#000000',
        border: '1px solid #7070704C',
        borderRadius: '20px',
        position: 'relative'
      }}
    >
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        <Box
          sx={{
            display: 'flex',
            '@media (max-width: 600px)': {
              flexDirection: 'column'
            }
          }}
        >
          <img src={componentInfo.imgUrl} width={100} height={100} alt="coin" />
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '30px',
              '@media (max-width: 600px)': {
                marginLeft: '0px'
              }
            }}
          >
            <Label text={componentInfo.value} sx={{ marginBottom: '8px' }} />
            <RoundedCard {...componentInfo.label} />
          </Box>
        </Box>
        <Box
          sx={{
            display: 'flex',
            width: '70%',
            flexWrap: 'wrap',
            justifyContent: 'space-around',
            '@media (max-width: 1500px)': {
              width: '100%'
            },
            '@media (max-width: 600px)': {
              flexDirection: 'column'
            }
          }}
        >
          {componentInfo.items.map((item, idx) => (
            <Box
              key={idx}
              sx={{
                display: 'flex',
                alignItems: 'center',
                '@media (max-width: 600px)': {
                  marginTop: '20px'
                }
              }}
            >
              <Box
                sx={{
                  height: '70%',
                  '@media (max-width: 600px)': {
                    height: '100%'
                  }
                }}
              >
                <Label
                  text={item.label}
                  sx={{
                    textAlign: 'center',
                    '@media (max-width: 600px)': {
                      textAlign: 'start'
                    }
                  }}
                />
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    '@media (max-width: 600px)': {
                      justifyContent: 'start'
                    }
                  }}
                >
                  <Label text={item.value} />
                  {item.img && (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <img src={item.img.imgUrl} width={16} height={16} alt="img" style={{ marginLeft: '10px' }} />
                    </Box>
                  )}
                </Box>
              </Box>
            </Box>
          ))}
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              background: '#171717',
              width: '44px',
              height: '44px',
              padding: '0px',
              minWidth: '44px',
              position: 'absolute',
              right: '30px',
              top: '30px'
            }}
            onClick={() =>
              setExpanded(
                expanded.map((value, index) => {
                  if (index === idx) {
                    return !value;
                  }
                  return value;
                })
              )
            }
          >
            {!expanded[idx] && <ExpandMoreIcon sx={{ color: 'white' }} />}
            {expanded[idx] && <ExpandLessIcon sx={{ color: 'white' }} />}
          </Button>
        </Box>
      </Box>
      {expanded[idx] && (
        <Box
          sx={{
            margin: '35px -30px 0px -60px',
            paddingTop: '50px',
            borderTop: '1px solid #002B15'
          }}
        >
          <Box
            sx={{
              display: 'flex',
              columnGap: '35px',
              rowGap: '25px',
              padding: '0px 30px',
              justifyContent: 'space-between',
              flexWrap: 'wrap'
            }}
          >
            <SubmitInput
              sx={{
                width: '30%',
                minWidth: '330px',
                '@media (max-width: 1000px)': {
                  width: '100%',
                  minWidth: 'fit-content'
                }
              }}
              size={38}
              btnValue="Harvest"
              label={`$${poolInfo.tokenSymbol}`}
              value={data.rewards}
              onClick={() => handleHarvest()}
              readOnly={true}
            />
            <SubmitInput
              sx={{
                width: '30%',
                minWidth: '330px',
                '@media (max-width: 1000px)': {
                  width: '100%',
                  minWidth: 'fit-content'
                }
              }}
              size={26}
              btnValue="Stake"
              label={`$${poolInfo.tokenSymbol}`}
              value={data.staking_amount}
              onClick={() => handleStake()}
              onChangeValue={(value) => setData({ ...data, staking_amount: value })}
            />
            <SubmitInput
              sx={{
                width: '30%',
                minWidth: '330px',
                '@media (max-width: 1000px)': {
                  width: '100%',
                  minWidth: 'fit-content'
                }
              }}
              size={26}
              btnValue="Unstake"
              label={`$${poolInfo.tokenSymbol}`}
              value={data.unstaking_amount}
              onClick={() => handleUnstake()}
              onChangeValue={(value) => setData({ ...data, unstaking_amount: value })}
            />
          </Box>
          <Box
            sx={{
              columnGap: '35px',
              rowGap: '25px',
              padding: '5px 30px',
            }}
          >
            <span>Your wallet {poolInfo.tokenSymbol} balance: {data.wallet_balance}</span>
            <br />
            <span>Your Lock time: {data.lockingReleaseTime}.  Harvesting will reset the lock time.</span>
          </Box>
        </Box>
      )}
    </Box>
  );
};

function PriceStaking() {
  const [activeId, setActiveId] = useState(0); //tab selected
  const [expanded, setExpanded] = useState(Array(5).fill(false));

  const { enqueueSnackbar } = useSnackbar();
  const { account } = useActiveWeb3React();

  const [pools, SetPools] = useState([]);
  useEffect(() => {
    (async () => {
      try {
        const response = await apis.getStakingPools({});
        if (response.data) {
          SetPools(response.data.data);
        } else {
          enqueueSnackbar('failed', {
            variant: 'danger'
          });
        }
      } catch (error) {
        console.log(error);
        enqueueSnackbar('Oops, Something went wrong!', {
          variant: 'error'
        });
      }
    })();
  }, [account]);

  return (
    <Box
      sx={{
        backgroundImage: 'url("_img/projects/background.png")',
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        marginTop: '80px',
        position: 'relative',
        '@media (max-width: 600px)': {
          padding: '60px 2%'
        },
        padding: '60px 8%'
      }}
    >
      <img
        src="_img/projects/dot.png"
        alt="dot"
        style={{ position: 'absolute', top: '35px', left: '35px', width: '67px' }}
      />
      <img
        src="_img/projects/dot2.png"
        alt="dot"
        style={{
          position: 'absolute',
          bottom: '927px',
          left: '-37px',
          width: '115px',
          filter: 'blur(6px)'
        }}
      />
      <img
        src="_img/projects/dot3.png"
        alt="dot"
        style={{
          position: 'absolute',
          bottom: '882px',
          right: '46px',
          width: '105px',
          height: '90px',
          filter: 'blur(30px)'
        }}
      />
      <img
        src="_img/projects/dot4.png"
        alt="dot"
        style={{ position: 'absolute', bottom: '40px', right: '100px', width: '89px' }}
      />
      <Box>
        <Box sx={{ marginTop: '10px' }}>
          <Stack flexWrap="wrap" flexDirection="row" columnGap="28px" rowGap="15px">
            {StakingButtons.map((but, idx) => (
              <PrimaryButton
                key={idx}
                label={but}
                sx={{ padding: '20px 43px 20px 43px', color: '#585858' }}
                onClick={() => setActiveId(idx)}
                hasFocus={activeId === idx}
              />
            ))}
          </Stack>
        </Box>
        <Box sx={{ marginTop: '60px' }}>
          {/* Staking */}
          {(activeId === 0) && (
            <Box sx={{ display: 'flex', rowGap: '20px', flexDirection: 'column' }}>
              {pools.map((pool, idx) =>
                <RenderElements poolInfo={pool} idx={idx} expanded={expanded} setExpanded={setExpanded} />
              )}
            </Box>
          )}

          {/* Farming */}
          {(activeId === 1) && (
            <></>
          )}

          {/* Liquid Staking */}
          {activeId === 2 && <LiquidStaking />}
        </Box>
      </Box>
    </Box>
  );
}

export default PriceStaking;
