import { twitter, chain, telegram, reddit } from './EntityFieldDefs';

export const ProjectDetail = {
  icon: '_img/icon/playzap.png',
  label: 'Playzap',
  img: '_img/icon/shardeum.png',
  imgAlt: 'Shardeum',
  text: {
    value:
      "The ZapVerse is a powerful ecosystem built and powered by proven solutions and infrastructure, providing a satisfying core experience to our users. Users will have a wide array of in-house and partnered games, played by thousands of people globally. Those low-skill-floor high-skill-ceiling games will provide value corresponsive to the player's skill level. With a truly free-to-play economy, the monetization aspect will come directly from the players interacting actively with each other, playing games, earning prizes and exchanging assets.",
    size: 20,
    color: 'grey',
    weight: 100
  },
  social: [chain, twitter, telegram, reddit],
  poolDetail: {
    'Swap Rate': [
      {
        value: '1 PLAYZAP',
        color: 'green'
      },
      {
        value: ' = ',
        color: 'grey'
      },
      {
        value: '$0.12',
        color: 'green'
      },
      {
        value: ' | ',
        color: 'grey'
      },
      {
        value: '8.333 PLAYZAP',
        color: 'green'
      },
      {
        value: ' per ',
        color: 'grey'
      },
      {
        value: '1 BUSD',
        color: 'green'
      }
    ],
    'Start/end': [
      {
        value: '16 Apr, 14:00 pm -17 Apr, 14:00 pm UTC',
        color: 'grey'
      }
    ],
    Registration: [
      {
        value: 'Apr 14, 14:00 UTC -Apr 16, 11:00 UTC',
        color: 'grey'
      }
    ],
    'FCFS Opens': [
      {
        value: 'Apr 14, 14:00 UTC -Apr 16, 11:00 UTC',
        color: 'grey'
      }
    ]
  },
  price: {
    Listing: [
      {
        value: '$0.12 (+0.00%)',
        color: 'green'
      }
    ],
    IDO: [
      {
        value: '$0.12',
        color: 'green'
      }
    ]
  },
  token: {
    Token: [
      { value: 'PlayZap (PLAYZAP)', color: 'green' },
      { value: 'on BNB Chain', color: 'grey' }
    ],
    'Total Supply': [
      {
        value: '150 000 000 PLAYZAP',
        color: 'grey'
      }
    ],
    'Initial Supply': [
      {
        value: '3 749 851 PLAYZAP',
        color: 'green'
      },
      {
        value: ', market cap ',
        color: 'grey'
      },
      {
        value: '$450 000',
        color: 'green'
      }
    ],
    'Token Listing': [
      {
        value: 'TBA',
        color: 'grey'
      }
    ]
  },
  distribution: {
    Distribution: [
      {
        value: 'Claimed on Shardstarter',
        color: 'grey'
      }
    ],
    Vesting: [
      {
        value: '20% at listing, 1 month cliff, then 6 months linear vesting',
        color: 'grey'
      }
    ]
  }
};

export const ProjectCard = {
  icon: '_img/icon/playzap.png',
  label: 'Playzap',
  value: 'PLAYZAP / BUSD',
  labels: [
    {
      label: 'Levels',
      bgColor: '#FF77774F',
      color: '#FF5D5D'
    },
    {
      label: 'KYC',
      bgColor: '#FFD5002B',
      color: '#FFD500'
    }
  ],
  price: [
    {
      value: '1 BUSD = 8.333 PLAYZAP',
      color: 'green'
    },
    {
      value: '1 PLAYZAP = 0.12 BUSD',
      color: 'green'
    }
  ],
  progress: {
    title: 'registration opens in 2 days, 3 hours',
    label: '1 PLAYZAP = 0.12 BUSD',
    currProg: 0,
    prog: 50,
    text: '0 BUSD',
    value: '0 / 2 249 921 PLAYZAP'
  },
  details: [
    {
      imgUrl: '_img/icon/wifi.png',
      label: {
        value: 'IDO and distribution on BNB chain',
        size: 18,
        weight: 100
      }
    },
    {
      imgUrl: '_img/icon/register.png',
      label: {
        value: 'Register',
        size: 18,
        weight: 100
      },
      value: {
        value: 'Apr 14, 14:00 – Apr 16, 11:00 UTC',
        size: 18
      }
    },
    {
      imgUrl: '_img/icon/money-bag.png',
      label: {
        value: 'Sale',
        size: 18,
        weight: 100
      },
      value: {
        value: 'Apr 16, 14:00 – Apr 17, 14:00 UTC',
        size: 18
      }
    },
    {
      imgUrl: '_img/icon/training.png',
      label: {
        value: 'FCFS',
        size: 18,
        weight: 100
      },
      value: {
        value: 'Apr 17, 13:20 UTC',
        size: 18
      }
    }
  ]
};
