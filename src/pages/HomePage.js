import { useContext, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { experimentalStyled as styled } from '@mui/material/styles';
// material
// import "my_public/css/main-page.css";
// import Particles from './Particles'
import Paper from '@mui/material/Paper';
import gsap from 'gsap';
import Pools from './HomePage/Pools';
import Invest from './HomePage/Invest';
import Projects from './HomePage/Projects';
import Token from './HomePage/Token';
import Heading from './HomePage/Heading';
import Roadmap from './HomePage/Roadmap';
import Performance from './HomePage/Performance';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import { getPools } from 'redux/slices/pools';
import { SearchContext } from 'contexts/SearchContext';
import { useIDOContract } from 'hooks/useContract';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';

gsap.registerPlugin(ScrollTrigger);
const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0
};

const transitionStyles = {
  entering: { opacity: 0, display: 'none' },
  entered: { opacity: 1, display: 'block' },
  exited: { opacity: 0, display: 'none' }
};

// ----------------------------------------------------------------------

export default function HomePage(props) {

  const { themeStretch } = useSettings();
  const { hash } = useLocation();
  const font_Family = 'system-ui,-apple-system,"Segoe UI",Roboto,"Helvetica Neue",Arial,"Noto Sans","Liberation Sans",sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Noto Color Emoji"';
  const dispatch = useDispatch();
  const { account } = useActiveWeb3React();
  const idoContract = useIDOContract();

  const [search, setSearch] = useContext(SearchContext);

  //Pagination part
  const [pageSize, setPageSize] = useState(50);
  const [page, setPage] = useState(1);
  const [tab, setTab] = useState(0);
  const [filter, setFilter] = useState(-1);
  const [sort, setSort] = useState('createdAt');
  const [isLoading, setIsLoading] = useState(true);

  const network = useSelector((state) => state.network.chainId);
  const pools = useSelector((state) => state.pools.pools);
  const totalPage = useSelector((state) => state.pools.totalPage);
  const handlePageChange = (e, value) => {
    setPage(value);
  };
  const imgRef = useRef(null);
  useEffect(() => {
    const el = imgRef.current;
    gsap.fromTo(el, { opacity: 0 }, {
      opacity: 1, duration: 2, scrollTrigger: {
        trigger: el,
        start: 'top bottom',
        // end: "top bottom",
        toggleActions: 'restart pause restart none'
      }
    });
  });

  //--------------------
  useEffect(() => {
    let unmounted = false;
    (async () => {
      setIsLoading(true);
      await dispatch(getPools(network, page, search, tab, sort, filter, account));
      if (!unmounted)
        setIsLoading(false);
    })();
    return () => unmounted = true;
  }, [account, dispatch, filter, network, page, search, sort, tab]);

  useEffect(() => {
    switch (hash) {
      case '#my-contributions':
        setTab(1);
        break;
      case '#my-alarms':
        setTab(2);
        break;
      case '#my-presales':
        setTab(3);
        break;
      default:
        setTab(0);
    }
  }, [hash]);
  styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  }));
  return (
    <>
      <Page style={{ backgroundColor: '#171819' }}>
        <>
          <Heading></Heading>
          <Invest></Invest>
          <Projects></Projects>
          <Performance></Performance>
          <Pools></Pools>
          <Token></Token>
          <Roadmap></Roadmap>
        </>
      </Page>
    </>
  );
}