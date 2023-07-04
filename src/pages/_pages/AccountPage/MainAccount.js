import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { PrimaryButton } from 'components/_components/Button';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { RoundedCard } from 'components/_components/Card';
import { RoundedLabel, Label } from 'components/_components/Label';
import LeftStaking from '../StakingPage/LeftStaking';
import { Link } from 'react-router-dom';

import apis from 'services';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useMainStakingStatus } from 'hooks/useMyStatus';

const columns = [
  { id: 'project', label: 'PROJECT', minWidth: 200 },
  { id: 'purchased', label: 'PURCHASED', minWidth: 100 },
  { id: 'claimed', label: 'CLAIMED', minWidth: 100, format: (value) => value.toLocaleString('en-US') },
  {
    id: 'unclaimed',
    label: 'UNCLAIMED',
    minWidth: 100,
    format: (value) => value.toLocaleString('en-US')
  }
];

function createData(project, purchased, claimed, unclaimed) {
  return { project, purchased, claimed, unclaimed };
}

const rows = [
  createData(
    <Box sx={{ display: 'flex', gap: '20px' }}>
      <Box>
        <Box
          component="img"
          src="logo.png"
          sx={{
            width: '80px',
            border: '1px solid green',
            borderRadius: '10px',
            height: '80px',
            padding: '10px',
            margin: '0 20px'
          }}
        />{' '}
      </Box>
      <Box sx={{ marginLeft: '5px' }}>
        <Label text={{ value: 'playzap', size: 30 }} sx={{ marginBottom: '4px' }} />
        <Label text={{ value: '$GLXW', color: 'green', size: 16 }} />
        <Box sx={{ display: 'flex', columnGap: '8px' }}>
          <RoundedCard
            label="Private Deal"
            bgColor="rgba(255,255,255,0.2)"
            color="green"
            size={10}
            width={90}
            height={30}
          />
          <RoundedCard label="Shadrem" bgColor="rgba(255,255,255,0.2)" color="green" size={10} width={90} height={30} />
        </Box>
      </Box>
    </Box>,
    <Box>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>12983</p>
      <p style={{ fontSize: '10px' }}>12 May 2023</p>
    </Box>,
    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>12983</p>,
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '8px', gap: '12px' }}>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>1782444</p>
      <PrimaryButton
        label="claime"
        size="14"
        hasFocus={true}
        sx={{
          color: '#585858',
          fontSize: '12px',
          height: '40px',
          width: '180px',
          padding: '2px 0'
        }}
      />
    </Box>
  ),
  createData(
    <Box sx={{ display: 'flex', gap: '20px' }}>
      <Box>
        <Box
          component="img"
          src="logo.png"
          sx={{
            width: '80px',
            border: '1px solid green',
            borderRadius: '10px',
            height: '80px',
            padding: '10px',
            margin: '0 20px'
          }}
        />
      </Box>
      <Box sx={{ marginLeft: '5px' }}>
        <Label text={{ value: 'playzap', size: 30 }} sx={{ marginBottom: '4px' }} />
        <Label text={{ value: '$GLXW', color: 'green', size: 16 }} />
        <Box sx={{ display: 'flex', columnGap: '8px' }}>
          <RoundedCard
            label="Private Deal"
            bgColor="rgba(255,255,255,0.2)"
            color="green"
            size={10}
            width={90}
            height={30}
          />
          <RoundedCard label="Shadrem" bgColor="rgba(255,255,255,0.2)" color="green" size={10} width={90} height={30} />
        </Box>
      </Box>
    </Box>,
    <Box>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>12983</p>
      <p style={{ fontSize: '10px' }}>12 May 2023</p>
    </Box>,
    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>12983</p>,
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '8px', gap: '12px' }}>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>1782444</p>
      <PrimaryButton
        label="claime"
        size="14"
        hasFocus={true}
        sx={{
          color: '#585858',
          fontSize: '12px',
          height: '40px',
          width: '180px',
          padding: '2px 0'
        }}
      />
    </Box>
  ),
  createData(
    <Box sx={{ display: 'flex', gap: '20px' }}>
      <Box>
        <Box
          component="img"
          src="logo.png"
          sx={{
            width: '80px',
            border: '1px solid green',
            borderRadius: '10px',
            height: '80px',
            padding: '10px',
            margin: '0 20px'
          }}
        />{' '}
      </Box>
      <Box sx={{ marginLeft: '5px' }}>
        <Label text={{ value: 'playzap', size: 30 }} sx={{ marginBottom: '4px' }} />
        <Label text={{ value: '$GLXW', color: 'green', size: 16 }} />
        <Box sx={{ display: 'flex', columnGap: '8px' }}>
          <RoundedCard
            label="Private Deal"
            bgColor="rgba(255,255,255,0.2)"
            color="green"
            size={10}
            width={90}
            height={30}
          />
          <RoundedCard label="Shadrem" bgColor="rgba(255,255,255,0.2)" color="green" size={10} width={90} height={30} />
        </Box>
      </Box>
    </Box>,
    <Box>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>12983</p>
      <p style={{ fontSize: '10px' }}>12 May 2023</p>
    </Box>,
    <p style={{ fontSize: '20px', fontWeight: 'bold' }}>12983</p>,
    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '8px', gap: '12px' }}>
      <p style={{ fontSize: '20px', fontWeight: 'bold' }}>1782444</p>
      <PrimaryButton
        label="claime"
        size="14"
        hasFocus={true}
        sx={{
          color: '#585858',
          fontSize: '12px',
          height: '40px',
          width: '180px',
          padding: '2px 0'
        }}
      />
    </Box>
  )
];

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    padding: '30px',
    minHeight: 440
  }
}));

function MainAccount({ unclaimed }) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const { account } = useActiveWeb3React();
  const { tier, staked_amount, wallet_balance } = useMainStakingStatus();

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 1000) {
      } else {
      }
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const getUserEmail = async () => {
      const response = await apis.getUserInfo({
        wallet_address: account
      });
      if (response.data.result) {
        setUserInfo(response.data.data);
      } else {
        alert(response.data.message);
      }
    };
    if (account) getUserEmail();
  }, [account]);

  const saveEmail = async () => {
    try {
      const userInput = prompt('Enter a email:', userInfo?.email);
      if (userInput) {
        const response = await apis.setUserEmail({
          wallet_address: account,
          email: userInput
        });
        if (response.data.result) {
          alert('success');
          window.location.reload();
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const saveNonEVM = async () => {
    try {
      const userInput = prompt('Enter a email:', userInfo?.nonevm);
      if (userInput) {
        const response = await apis.setUserNonEVM({
          wallet_address: account,
          nonevm: userInput
        });
        if (response.data.result) {
          alert('success');
          window.location.reload();
        } else {
          alert(response.data.message);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  var AccountInfo = {
    balance: {
      keyword: 'Balance',
      value: '$SHMX ' + Number(wallet_balance).toFixed(3)
    },
    buy: {
      keyword: 'Buy',
      value: '$SHMX'
    },
    wallet: {
      keyword: 'Wallet',
      value: account
    },
    totalView: [
      {
        keyword: 'Staked $SHMX',
        value: staked_amount + ' SHMX'
      },
      {
        keyword: 'Unclaimed Tokens',
        value: unclaimed
      }
    ]
  };

  return (
    <Box>
      <Box
        sx={{
          '@media (max-width: 600px)': {
            padding: '60px 2%'
          },
          position: 'unset',
          padding: '60px 8%'
        }}
      >
        <Box
          sx={{
            backgroundPositionX: '0',
            '@media (max-width: 1260px)': {
              flexDirection: 'column',
              backgroundPositionX: '0'
            },
            backgroundImage: 'url("_img/staking/background.png")',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundSize: 'cover',
            borderRadius: '38px',
            display: 'flex'
          }}
        >
          <LeftStaking />
          <Box
            sx={{
              padding: '50px 70px 60px 70px',
              width: '57%',
              '@media (max-width: 1260px)': {
                width: '100%'
              },
              '@media (max-width: 600px)': {
                padding: '20px'
              }
            }}
          >
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                marginBottom: '12px',
                '@media (max-width: 800px)': {
                  flexDirection: 'column',
                  alignItems: 'start',
                  rowGap: '15px'
                }
              }}
            >
              <RoundedLabel keyword={AccountInfo.balance.keyword} value={AccountInfo.balance.value} bgColor="#171717" />
              <Link to="/swap">
                <RoundedLabel keyword={AccountInfo.buy.keyword} value={AccountInfo.buy.value} bgColor="#171717" />
              </Link>
            </Box>
            <RoundedLabel keyword={AccountInfo.wallet.keyword} value={AccountInfo.wallet.value} bgColor="#171717" />
            <Box
              sx={{
                width: '100%',
                border: '1px solid #02FF7B',
                borderRadius: '8px',
                backgroundColor: '#171717',
                padding: '30px 28px 0px 28px',
                marginTop: '12px',
                '@media (max-width: 500px)': {
                  paddingLeft: '15px',
                  paddingRight: '5px'
                }
              }}
            >
              {/* NonEVM wallet */}
              <div style={{ marginBottom: '30px' }}>
                <Box
                  sx={{
                    width: '188px',
                    height: '37px',
                    backgroundColor: '#4B4B4B',
                    color: '#02FF7B',
                    fontSize: '17px',
                    padding: '5px 15px',
                    borderRadius: '7px'
                  }}
                >
                  NON EVM WALLET
                </Box>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Label
                    sx={{ overflow: 'hidden' }}
                    text={{
                      value: userInfo?.nonevm,
                      size: 26
                    }}
                  />
                  <img
                    src="_img/icon/pencil.png"
                    width="26px"
                    style={{ margin: '8px', cursor: 'pointer' }}
                    onClick={() => saveNonEVM()}
                  />
                </div>
              </div>
              {/* Email */}
              <div style={{ marginBottom: '30px' }}>
                <Box
                  sx={{
                    width: '188px',
                    height: '37px',
                    backgroundColor: '#4B4B4B',
                    color: '#02FF7B',
                    fontSize: '17px',
                    padding: '5px 15px',
                    borderRadius: '7px'
                  }}
                >
                  EMAIL ADDRESS
                </Box>
                <div style={{ display: 'flex', flexDirection: 'row' }}>
                  <Label
                    sx={{ overflow: 'hidden' }}
                    text={{
                      value: userInfo?.email,
                      size: 26
                    }}
                  />
                  <img
                    src="_img/icon/pencil.png"
                    width="26px"
                    style={{ margin: '8px', cursor: 'pointer' }}
                    onClick={() => saveEmail()}
                  />
                </div>
              </div>
            </Box>
            {/* Total View */}
            <Box
              sx={{
                display: 'flex',
                marginTop: '30px',
                '@media (max-width: 700px)': {
                  flexDirection: 'column',
                  rowGap: '10px'
                }
              }}
            >
              {AccountInfo.totalView.map((element, index) => (
                <Box
                  key={index}
                  sx={{
                    marginRight: '60px',
                    '@media (max-width: 700px)': {
                      marginRight: '0px'
                    }
                  }}
                >
                  <Label
                    text={{
                      value: element.keyword,
                      size: 20,
                      weight: 100,
                      color: 'green'
                    }}
                  />
                  <Label
                    text={{
                      value: element.value,
                      size: 40
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>
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
        />{' '}
        <Box>
          <Box
            sx={{ padding: '20px', background: 'black', '@media (max-width: 1260px)': {} }}
            className={classes.root}
            component={Paper}
          >
            <TableContainer className={classes.container}>
              <Table stickyHeader aria-label="sticky table">
                <TableHead style={{ background: 'rgb(10,23,16)' }}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.id} align={column.align} style={{ minWidth: column.minWidth }}>
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, index) => (
                    <React.Fragment key={row.code}>
                      <TableRow hover role="checkbox" tabIndex={-1} style={{ verticalAlign: 'bottom' }}>
                        {columns.map((column) => (
                          <TableCell key={column.id} align={column.align}>
                            {column.format && typeof row[column.id] === 'number'
                              ? column.format(row[column.id])
                              : row[column.id]}
                          </TableCell>
                        ))}
                      </TableRow>
                    </React.Fragment>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default MainAccount;
