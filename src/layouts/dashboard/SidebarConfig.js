// routes
// components
import SvgIconStyle from '../../components/SvgIconStyle';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import ArticleIcon from '@mui/icons-material/Article';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import DashboardIcon from '@mui/icons-material/Dashboard';
// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.svg`} sx={{ width: '100%', height: '100%' }} />
);

const ICONS = {
  user: getIcon('ic_user'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: <DashboardIcon />,
  launch: <RocketLaunchIcon />,
  locks: <LockOpenIcon />,
  audit: <VerifiedUserIcon />,
  doc: <ArticleIcon />,
  telegram: <TelegramIcon />,
  twitter: <TwitterIcon />
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    items: [
      {
        title: 'Menu',
        icon: ICONS.dashboard,
        children: [
          { title: 'Home', path: '/home' },
          { title: 'Presales', path: '/presales' },
          { title: 'Create Presale', path: '/create' },
          // { title: 'My Contributions', path: '/presales/#my-contributions' },
          // { title: 'My Alarms', path: '/presales/#my-alarms' }
        ]
      },
      // {
      //   title: 'Launchpad',
      //   icon: ICONS.launch,
      //   children: [
      //     { title: 'Configure Launchpad', path: '/admin-presales', admin: true },
      //     { title: 'Create Presale', path: '/create' },
      //     { title: 'Manage Created Presales', path: '/presales/#my-presales' }
      //     // { title: 'Presale List', path: '/presales' }
      //   ]
      // },
      // {
      //   title: 'Locks',
      //   path: '/locks',
      //   icon: ICONS.locks,
      //   children: [
      //     { title: 'Create Lock', path: '/create-lock' },
      //     { title: 'Token Lock', path: '/lock/#token' },
      //     { title: 'Liquidity Lock', path: '/lock/#liquidity' }
      //   ]
      // },
      // {
      //   title: 'KYC & Audit',
      //   path: 'https://gem-pad.gitbook.io/the-gempad/guide-for-project-owners/kyc-at-gempad',
      //   icon: ICONS.audit
      // },
      // {
      //   title: 'Docs',
      //   path: 'https://gem-pad.gitbook.io/the-gempad/',
      //   icon: ICONS.doc
      // }
      // {
      //   title: 'Telegram',
      //   path: '/tele',
      //   icon: ICONS.telegram
      // },
      // {
      //   title: 'Twitter',
      //   path: '/twi',
      //   icon: ICONS.twitter
      // }
    ]
  }

  // MANAGEMENT
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'management',
  //   items: [
  //     {
  //       title: 'user',
  //       path: '/',
  //       icon: ICONS.user,
  //       children: [{ title: 'Four', path: '/' }]
  //     }
  //   ]
  // }
];

export default sidebarConfig;
