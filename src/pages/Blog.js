import { useState, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Loader from 'react-loader-spinner';
import { useNavigate } from 'react-router';
// material
import {
  Box,
  Typography,
  Grid,
  Button,
  Card,
  CardContent
} from '@mui/material';

import { getPools } from 'redux/slices/pools';
import { SearchContext } from 'contexts/SearchContext';
import { useIDOContract } from 'hooks/useContract';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
// hooks
import useSettings from 'hooks/useSettings';
// components
import Page from 'components/Page';
import MHidden from 'components/@material-extend/MHidden'
import {imageURL} from '../utils'

// ----------------------------------------------------------------------

export default function Stakepad() {
  const { themeStretch } = useSettings();
  const { hash } = useLocation();
  const [checked, setCheck] = useState(0);

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
  const blogs = [
    {
      src: imageURL('blog-1.png'),
      title:"April 02, 2021",
      body:"06 ways to do workout inside your home during Covid-19",
    },
    {
      src: imageURL('blog-2.png'),
      title:"March 26, 2021",
      body:"How is the pandemic affecting the way people work?",
    },
    {
      src: imageURL('blog-3.png'),
      title:"March 19, 2021",
      body:"The parent's balancing act: using the word 'No'",
    },
  ]
  const btnStyle1 = {
    color:"#56C5FF",
    backgroundColor:"#2E2F30",
    width:"85px",
    border:"none",
    height:"40px"
  }
  const btnStyle2 = {
    color:"white",
    backgroundColor:"#24B6E6",
    width:"85px",
    border:"none",
    height:"40px"
  }
  return (
    <Page  style={{backgroundColor:"#171819"}}>
      {/* <Container maxWidth='md'> */}
            <MHidden width="mdDown">
              <Grid paddingLeft={'11%'} paddingRight={'11%'}>
                  <Grid  align="center" justifyContent="center" paddingTop="60px">
                  <Box component="h1" className="text-info">News and Blog</Box>
                  </Grid>
                  <Grid width="100%" display="flex" position="relative" marginTop="50px" marginBottom="40px">
                      <Box component="h3" className="text-info" position="relative" left="5px">Blogs</Box>
                      <Box position="absolute" right="5px"><Button className="btn btn-outline-info">Read all articles</Button></Box>
                  </Grid>
                  <Grid container spacing={2}>
                      <Grid item md="4"><BlogCard blog={blogs[0]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[1]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[2]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[0]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[1]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[2]}></BlogCard></Grid>
                  </Grid>
                  <Grid width="100%" display="flex" position="relative" marginTop="30px" marginBottom="30px">
                      <Box component="h3" className="text-info" position="relative" left="5px">NEWS</Box>
                      <Box position="absolute" right="5px"><Button className="btn btn-outline-info">Read all articles</Button></Box>
                  </Grid>
                  <Grid container spacing={2}>
                      <Grid item md="4"><BlogCard blog={blogs[0]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[1]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[2]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[0]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[1]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[2]}></BlogCard></Grid>
                  </Grid>
              </Grid>
            </MHidden>
            <MHidden width="mdUp">
              <Grid paddingLeft={'5%'} paddingRight={'5%'}>
                  <Grid  align="center" justifyContent="center" paddingTop="30px">
                  <Box component="h1" color="#56C5FF">NEWS AND BLOG</Box>
                  </Grid>
                  <Grid width="100%" display="flex" justifyContent="center" marginBottom="25px" marginTop="25px">
                      <Box component="button" borderRadius={0.5} style={checked === 1 ? btnStyle1 : btnStyle2} onClick={() => setCheck(0)}>News</Box>
                      <Box component="button" borderRadius={0.5} style={checked === 1 ? btnStyle2 : btnStyle1} onClick={() => setCheck(1)}>Blogs</Box>
                  </Grid>
                  {checked === 0 ?
                  <Grid container spacing={2}>
                      <Grid item md="4"><BlogCard blog={blogs[0]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[2]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[1]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[0]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[2]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[1]}></BlogCard></Grid>
                  </Grid>
                  :
                  <Grid container spacing={2}>
                      <Grid item md="4"><BlogCard blog={blogs[2]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[1]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[0]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[0]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[1]}></BlogCard></Grid>
                      <Grid item md="4"><BlogCard blog={blogs[2]}></BlogCard></Grid>
                  </Grid>}
                  <Box component="button" marginTop="30px" backgroundColor="rgb(0,0,0,0)"
                    paddingTop="8px" paddingBottom="8px" color="#56C5FF" border="1px solid #56C5FF" borderRadius={0.5} width="100%">Read all articles</Box>
              </Grid>
            </MHidden>
      {/* </Container> */}
    </Page>
  );
}
function VoteCard(props){
    return(
            <Grid container bgcolor={'#272727'} direction="row" sx={{width:"100%"}} padding="5px" marginTop="40px">
                <Grid item container md={7} sm="12" direction="row" >
                    <Box component="img" src="img/catecoin.webp"></Box>
                    <Box marginTop='13px' marginLeft="10px"> {props.name}</Box>
                </Grid>
                <Grid item md="1"sm={3} >
                    <Box marginTop='13px'>NFT</Box>
                </Grid>
                <Grid item md={1.5} sm={3}>
                    <Button className="btn btn-info text-light mx-2 px-5 mt-2">YES</Button>
                </Grid>
                <Grid item md={1.5} sm={3}>
                    <Button className="btn btn-outline-info mx-2 px-5 mt-2">NO</Button>
                </Grid>
                <Grid item md="1" sm={3}>
                    <Button><i className="Nft-arrow fa-solid fa-angle-down text-info mx-5 pt-3"></i></Button>
                </Grid>
            </Grid>
    );
}
function BlogCard(props){
    return(
    <Grid container direction="column" sx={{width:"100%"}}>
      <Box width="100%">
        <Box component="img" width="100%" src={props.blog.src} borderRadius={1}></Box>
        <Box color="#00BFFF" marginTop="10px"> {props.blog.title} </Box>
        <Box marginTop="10px"  color="white"> {props.blog.body}  </Box>
      </Box>
    </Grid>
    );
}