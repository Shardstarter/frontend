import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from 'layouts/_layouts/main';
import LogoOnlyLayout from 'layouts/LogoOnlyLayout';
// components
import LoadingScreen from 'components/LoadingScreen';
import { useSelector } from 'react-redux';
import { useWeb3React } from '@web3-react/core';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const network = useSelector((state) => state.network.chainId);
  const { account } = useWeb3React();
  return useRoutes([
    // Dashboard Routes
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { path: '/', element: <Navigate to="/home" replace /> },

        { path: '/home', element: <HomePage /> },
        { path: '/projects', element: <ProjectPage /> },
        { path: '/staking', element: <StakingPage /> },
        { path: '/vote', element: <VotePage /> },
        { path: '/account', element: <AccountPage /> },
        
        { path: '/deals', element: <Deals /> },
        { path: '/idodeals', element: <IdoDeals /> },
        { path: '/inodeals', element: <InoDeals /> },
        { path: '/vcdeals', element: <VCDeals /> },
        { path: '/create-ido', element: <CreatePage /> }, //admin - create IDO deal
        { path: '/project/:address', element: <ProjectDetail /> }, // one IDO deal
        { path: '/presale/:address', element: <DetailPage /> }, // presale

        { path: '/vote', element: <Vote /> },
        { path: '/create-vote', element: <CreateVote /> }, //admin - create vote

        { path: '/dashboard', element: <Dashboard /> },

        { path: '/stakepad', element: <Stakepad /> },
        { path: '/create-stake', element: <CreateStake /> }, //admin - create staking pool

        { path: '/blog', element: <Blog /> },
        { path: '/helpcenter', element: <HelpCenter /> },

        { path: '/calender', element: <Calendar /> },
        { path: '/phonecalendar', element: <PhoneCalendar /> },

        { path: '/lock', element: <LockListPage /> }, // remove this
        { path: '/token-lock-detail/:token/:owner', element: <TokenLockDetailPage /> },
        { path: '/liquidity-lock-detail/:token/:owner', element: <LiquidityLockDetailPage /> },
        { path: '/presales', element: <Presales /> },

        // { path: '/admin-presales', element: account === ADMIN_ADDRESS[network] ? <AdminPresales /> : '' }
        { path: '/admin-presales', element: <AdminPresales /> },
        { path: '/admin', element: <Admin /> },

        // { path: '/pages', element: <PageList /> } // list of pages
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    // {
    //   path: '/',
    //   element: <MainLayout />,
    //   children: [{ path: '/', element: <LandingPage /> }]
    // },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}

// IMPORT COMPONENTS

// Dashboard
const HomePage = Loadable(lazy(() => import('pages/_pages/HomePage')));
const NotFound = Loadable(lazy(() => import('pages/Page404')));
const ProjectPage = Loadable(lazy(() => import('pages/_pages/ProjectPage')));
const StakingPage = Loadable(lazy(() => import('pages/_pages/StakingPage')));
const VotePage = Loadable(lazy(() => import('pages/_pages/VotePage')));
const AccountPage = Loadable(lazy(() => import('pages/_pages/AccountPage')));
const Presales = Loadable(lazy(() => import('pages/Presales')));
const Stakepad = Loadable(lazy(() => import('pages/Stakepad')));
const IdoDeals = Loadable(lazy(() => import('pages/IdoDeals')));
const Deals = Loadable(lazy(() => import('pages/Deals')));
const InoDeals = Loadable(lazy(() => import('pages/InoDeals')));
const VCDeals = Loadable(lazy(() => import('pages/VCDeals')));
const HelpCenter = Loadable(lazy(() => import('pages/HelpCenter')));
const ProjectDetail = Loadable(lazy(() => import('pages/ProjectDetail')));
const PhoneCalendar = Loadable(lazy(() => import('pages/PhoneCalendar')));
const Vote = Loadable(lazy(() => import('pages/Vote')));
const Dashboard = Loadable(lazy(() => import('pages/Dashboard')));
const Blog = Loadable(lazy(() => import('pages/Blog')));
const DetailPage = Loadable(lazy(() => import('pages/DetailPage')));
const CreatePage = Loadable(lazy(() => import('pages/CreatePage')));
const CreateStake = Loadable(lazy(() => import('pages/CreateStake')));
const CreateVote = Loadable(lazy(() => import('pages/CreateVote')));
const LockListPage = Loadable(lazy(() => import('pages/LockListPage')));
const TokenLockDetailPage = Loadable(lazy(() => import('pages/TokenLockDetailPage')));
const LiquidityLockDetailPage = Loadable(lazy(() => import('pages/LiquidityLockDetailPage')));
const PageList = Loadable(lazy(() => import('pages/PageList')));
const AdminPresales = Loadable(lazy(() => import('pages/AdminPresales')));
const Admin = Loadable(lazy(() => import('pages/Admin')));
const Calendar = Loadable(lazy(() => import('pages/calender/Calender')));
// Main
// const LandingPage = Loadable(lazy(() => import('pages/LandingPage')));
