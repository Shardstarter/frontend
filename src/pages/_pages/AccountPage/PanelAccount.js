import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Table from 'components/_components/Table';
import { AccountProjects } from 'utils/_utils/EntityFieldDefs';

import apis from 'services';
import useActiveWeb3React from 'hooks/useActiveWeb3React';

const PanelAccount = () => {
  const { account } = useActiveWeb3React();
  const [dealsStatus, setDealsStatus] = useState([])
  const [totalParticipate, setTotalParticipate] = useState(0)

  useEffect(() => {
    const dosth = async () => {
      let total = 0;
      const response = await apis.getUserParticipations({ wallet_address: account })
      if (response.data.result) {
        let rows = response.data.data;
        setDealsStatus(rows)

        rows.map(item => {
          total += Number(item.deposit_amount)
        })
        setTotalParticipate(total)

      } else {
        console.log('getUserParticipations: ', response.data.message)
      }
    }

    if (account) {
      dosth();
    }
  }, [account])

  const [showingData, setShowingData] = useState([]);
  useEffect(() => {
    var new_arr = dealsStatus.map((item) => {

      return {
        project: {
          img: item.logo,
          text: {
            value: item.projectName,
            size: 30
          },
          value: {
            value: item.projectName + '/SHM',
            color: 'green',
            weight: 100
          },
          labels: [
            {
              width: 120,
              height: 30,
              bgColor: '#171717',
              label: item.deal,
              color: '#02FF7B',
              size: 14
            }

          ]
        },
        purchased: {
          label: {
            value: item.deposit_amount + " SHM",
            size: 22
          },
          value: {
            value: new Date(item.updatedAt).toDateString(),
            color: 'grey',
            size: 16,
            weight: 100
          }
        },
        claimed: {
          label: {
            value: '0.00',
            size: 22
          }
        },
        unclaimed: {
          label: {
            value: item.deposit_amount * item.presaleRate + " " + item.projectName,
            size: 22
          }
        }
      }
    })
    setShowingData(new_arr)
  }, [dealsStatus]);


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
        <Table items={showingData} />
      </Box>
    </Box>
  );
};

export default PanelAccount;
