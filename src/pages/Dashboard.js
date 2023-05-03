import { useState, useContext, useEffect } from 'react';
import * as React from 'react';
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
import { useMainStakingStatus } from 'hooks/useMyStatus';
// components
import Page from 'components/Page';
import MHidden from 'components/@material-extend/MHidden'
import { imageURL } from '../utils';
import apis from 'services';
import { CURRENCY_SYMBOL } from 'config/constants';

// ----------------------------------------------------------------------

export default function Stakepad() {
    const { themeStretch } = useSettings();
    const { hash } = useLocation();

    const dispatch = useDispatch();
    const { account } = useActiveWeb3React();
    const idoContract = useIDOContract();

    const [search, setSearch] = useContext(SearchContext);

    //Pagination part
    const [pageSize, setPageSize] = useState(50);
    const [page, setPage] = useState(1);
    const [tab, setTab] = useState(0);
    const [paneTab, setPaneTab] = useState(0);
    const [filter, setFilter] = useState(-1);
    const [sort, setSort] = useState('createdAt');
    const [isLoading, setIsLoading] = useState(true);
    const [value, setValue] = React.useState(30);

    const network = useSelector((state) => state.network.chainId);
    const pools = useSelector((state) => state.pools.pools);
    const totalPage = useSelector((state) => state.pools.totalPage);
    const handlePageChange = (e, value) => {
        setPage(value);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
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
    const TabPanes = [
        { index: 0, name: "MGV BSC" },
        { index: 1, name: "MEGA MATIC" },
        { index: 2, name: "MEGA AVAX" },
        { index: 3, name: "MEGA FTM" },
    ]

    const [userInfo, setUserInfo] = useState({});
    useEffect(() => {
        const getUserEmail = async () => {
            const response = await apis.getUserInfo({
                wallet_address: account
            });
            if (response.data.result) {
                setUserInfo(response.data.data);
            }
            else {
                alert(response.data.message)
            }
        }
        if (account) getUserEmail();
    }, [account])

    const saveEmail = async (email) => {
        try {
            const response = await apis.setUserEmail({
                wallet_address: account,
                email: email
            });
            if (response.data.result) {
                alert('success')
            }
            else {
                alert(response.data.message)
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <Page  style={{ backgroundColor: "#171819" }} >
            {/* <Container maxWidth='md'> */}
            <MHidden width="mdDown">

                <Grid paddingLeft={'10%'} paddingRight={'10%'} paddingTop="30px"  >
                    <Grid container direction="row" position="relative" display="flex">
                        <Grid item height="60px" display="flex">
                            <Box bgcolor={'#232323'} borderRadius={1} justifyContent="center" display="flex">
                                {TabPanes.map((pane, i) => (
                                    paneTab === pane.index ?
                                        <Box component="button" key={i} onClick={() => setPaneTab(pane.index)} style={{ color: "white", backgroundColor: "#56C5FF", border: "none", borderRadius: 4 }} padding="10px">{pane.name}</Box> :
                                        <Box component="button" key={i} onClick={() => setPaneTab(pane.index)} style={{ color: "#56C5FF", backgroundColor: "rgb(255, 255, 255, 0)", border: "none" }} padding="10px">{pane.name}</Box>
                                ))}
                            </Box>
                        </Grid>
                        <Box component="button" position="absolute" right="5px" style={{ backgroundColor: "#24B6E6", border: "none", height: '58px', color: "white", borderRadius: 8, width: "120px" }}> KYC </Box>
                    </Grid>
                    <ProgressCard></ProgressCard>
                    <Grid container direction={"row"} marginTop="30px" spacing={2} >
                        <Grid item md={6}>
                            <AddressCard src={imageURL('email.svg')} title="Email" address={userInfo?.email} onClickButton={saveEmail}></AddressCard>

                        </Grid>
                        <Grid item md={6}>
                            <AddressCard src={imageURL('solana-sol-logo 1.png')} title="EVM address" address={account} token={1} readonly={true}></AddressCard>
                        </Grid>
                    </Grid>
                    <YourParticipationBox></YourParticipationBox>
                </Grid>
            </MHidden>
            <MHidden width="mdUp">
                <Grid paddingLeft={'5%'} paddingRight={'5%'} paddingTop="30px"  >
                    <Grid container direction="row" position="relative" display="flex" borderRadius={2}>
                        <Grid item xs={6} padding="5px">
                            <Box component="button" borderRadius={1} width="100%" color="white" border="1px solid #56C5FF" padding="3px 8px" backgroundColor="rgb(255, 255, 255, 0)">
                                MEGA BSC
                            </Box>
                        </Grid>
                        <Grid item xs={6} padding="5px">
                            <Box component="button" width="100%" borderRadius={1} padding="3px 8px" style={{ backgroundColor: "#24B6E6", border: "none", color: "white" }}> KYC </Box>
                        </Grid>
                    </Grid>
                    <ProgressCard></ProgressCard>
                    <Grid container marginTop="30px" spacing={2} >
                        <Grid item xs={12}>
                            <AddressCard src={imageURL('email.svg')} title="Email" address="Info@megacapital.io"></AddressCard>
                        </Grid>
                        <Grid item xs={12}>
                            <AddressCard src={imageURL('solana-sol-logo 1.png')} title="Solana address" address="1231sdsxssds....124" token={1}></AddressCard>
                        </Grid>
                    </Grid>
                    <Grid marginTop="20px" color="#56C5FF" fontSize="20px" display="flex" justifyContent="center">
                        Projects
                    </Grid>
                    <Grid container direction={"row"} marginTop="10px" spacing={2} >
                        <Grid item xs={6}><ProjectCard title="Allocated Projects" amount="23"></ProjectCard></Grid>
                        <Grid item xs={6}><ProjectCard title="Total Allocated" amount="$12345"></ProjectCard></Grid>
                    </Grid>
                    <Grid marginTop="20px" marginBottom="20px" color="#56C5FF" fontSize="20px" display="flex" justifyContent="center">
                        My Projects
                    </Grid>
                    <MyProjectCard angle="down"></MyProjectCard>
                    <YourParticipationBox></YourParticipationBox>
                </Grid>
            </MHidden>
            {/* </Container> */}
        </Page>
    );
}
function VoteCard(props) {
    return (
        <Grid container bgcolor={'#272727'} direction="row" sx={{ width: "100%" }} padding="5px" marginTop="40px">
            <Grid item container md={7} sm={12} >
                <Box component="img" src="img/catecoin.webp"></Box>
                <Box marginTop='13px' marginLeft="10px"> {props.name}</Box>
            </Grid>
            <Grid item md={1} sm={3} >
                <Box marginTop='13px'>NFT</Box>
            </Grid>
            <Grid item md={1.5} sm={3}>
                <Button className="btn btn-info text-light mx-2 px-5 mt-2">YES</Button>
            </Grid>
            <Grid item md={1.5} sm={3}>
                <Button className="btn btn-outline-info mx-2 px-5 mt-2">NO</Button>
            </Grid>
            <Grid item md={1} sm={3}>
                <Button><i className="Nft-arrow fa-solid fa-angle-down text-info mx-5 pt-3"></i></Button>
            </Grid>
        </Grid>
    );
}
function ProgressCard() {
    const { tier, staked_amount } = useMainStakingStatus();
    const [value, setValue] = React.useState(30);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <Grid container direction="row" marginTop="30px">
            <Grid item container md={3} direction="column" style={{ backgroundColor: "#232323", borderRadius: 5 }}>
                <Grid item padding="10px"><Box component="img" width="100%" height="100px" position="relative" src={imageURL('bit.png')} ></Box></Grid>
                <Grid item padding="10px" display="flex" position="relative" marginTop="10px">
                    <Box fontSize="19px" color={'white'}>Your Tier</Box>
                    <Box position="absolute" padding="5px 10px 5px 10px" borderRadius={0.5} right="12px" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white" }}>{tier}</Box>
                </Grid>
                <Grid item padding="10px" display="flex" position="relative" marginTop="10px">
                    <Box fontSize="19px" color={'white'}> Staked Amount</Box>
                    <Box position="absolute" padding="5px 10px 5px 10px" borderRadius={0.5} right="12px" style={{ backgroundColor: "rgba(255, 255, 255, 0.1)", color: "white" }}>
                        {staked_amount}
                    </Box>
                </Grid>
                {/* <Grid item marginTop="10px"><Box component="button" border="none" borderRadius={1} height="30px" width="100%" style={{ backgroundColor: "#56C5FF", color: "white" }}>INFO</Box></Grid> */}
            </Grid>
            <MHidden width="mdDown">
                <Grid container item width="73%" marginLeft="2%" paddingLeft="20px" style={{ backgroundColor: "#232323", borderRadius: 5 }}>
                    <Grid item md={8}> <Box marginTop="20px" component="h3" color="#56C5FF">Progress</Box></Grid>
                    <Grid container direction="row">
                        <Grid item md={2.4}><MySlideBar current={100} title="Alpha"></MySlideBar></Grid>
                        <Grid item md={2.4}><MySlideBar current={100} title="Beta"></MySlideBar></Grid>
                        <Grid item md={2.4}><MySlideBar current={100} title="Gamma"></MySlideBar></Grid>
                        <Grid item md={2.4}><MySlideBar current={20} title="Epilson"></MySlideBar></Grid>
                        <Grid item md={2.4}><MySlideBar current={30} title="Zeta"></MySlideBar></Grid>
                    </Grid>
                </Grid>
            </MHidden>
            <MHidden width="mdUp">
                <Grid backgroundColor="#232323" borderRadius={1} container marginTop="20px" paddingBottom="30px" >
                    <Grid item xs={12} marginTop="20px" justifyContent="center" display="flex" color="#56C5FF">Tier</Grid>
                    <Grid item xs={12} marginTop="30px">
                        <Box position="relative" display="flex">
                            <Box width="100%" height="10px" borderRadius={2} backgroundColor="white" />
                            <Box position="absolute" left="0px" borderRadius={2} height="10px" width={`calc(50/100*100%)`} backgroundColor="#56C5FF" />
                            {/* <Box position="absolute" left="0px" borderRadius={2} height="10px" width={`calc(${props.current}/100*100%)`} backgroundColor="#56C5FF"/> */}
                        </Box>
                    </Grid>
                    <Grid item xs={12} justifyContent="center" display="flex">
                        <Box color="white">Alpha</Box>
                        <Box color="white">...MGV</Box>
                    </Grid>
                </Grid>
            </MHidden>
        </Grid>
    );
}
function MySlideBar(props) {
    return (
        <>
            <Box sx={{ width: "97%" }}>

                <Box position="relative" display="flex">
                    <Box width="100%" height="10px" borderRadius={2} backgroundColor="white" />
                    <Box position="absolute" left="0px" borderRadius={2} height="10px" width={`calc(${props.current}/100*100%)`} backgroundColor="#56C5FF" />
                </Box>
            </Box>
            <Box position="relative">
                <Box position="absolute" left="1px" color="white">{props.title}</Box>
                <Box position="absolute" right="15px" color="#696974">0 MEGA</Box>
            </Box>
        </>
    );
}
function AddressCard(props) {
    const [address, setAddress] = useState(props.address);
    useEffect(() => {
        setAddress(props.address)
    }, [props])


    return (
        <>
            <Grid container direction="row" bgcolor={"#303030"} padding="20px" borderRadius={1}>
                <Grid item md={2} display="flex" align="center" justifyContent="center">
                    <Box backgroundColor="rgba(255, 255, 255, 0.1)" width="70px" height="70px" borderRadius="50%" padding="15px"
                        justifyContent="center" display="flex"><Box component="img" src={props.src}></Box></Box>
                </Grid>
                <Grid item md={8} alignItems="left" container marginTop="5px" >
                    <Grid fontSize="20px" color="white" item sm={4} style={{ paddingTop: '10px' }}>{props.title}</Grid>
                    <Grid fontSize="15px" color="white" item sm={8} style={{ paddingTop: '15px' }}>
                        <input value={address} style={{ width: '90%' }} onChange={(e) => setAddress(e.target.value)} readOnly={props.readonly} />
                        {(props.token === 1) ? <Box component="button" backgroundColor="#303030" border="none"><Box component="img" src={imageURL('copy.png')} /></Box> : <Box />}
                    </Grid>
                </Grid>
                <Grid item container md={2} display="flex" justifyContent="center">
                    {!props.readonly && <Button onClick={() => props.onClickButton(address)}>EDIT</Button>}
                </Grid>
            </Grid>

        </>
    );
}
function ProjectCard(props) {
    return (
        <>
            <MHidden width="mdDown">
                <Grid bgcolor={"#232323"} padding="20px" borderRadius={1}>
                    <Grid fontSize="24px" color="white">{props.title}</Grid>
                    <Grid color="#56C5FF" fontSize="34px">{props.amount}</Grid>
                </Grid>
            </MHidden>
            <MHidden width="mdUp">
                <Grid bgcolor={"#232323"} padding="20px" borderRadius={1}>
                    <Grid color="#56C5FF" fontSize="14px">{props.title}</Grid>
                    <Grid fontSize="19.38px" color="white">{props.amount}</Grid>
                </Grid>
            </MHidden>
        </>
    );
}
function MyProjectCard(props) {
    return (
        <>
            <MHidden width="mdDown">
                <Grid container direction="row" bgcolor={"#232323"} borderRadius={1} padding="15px" marginTop="20px">
                    <Grid item md={1}>
                        <Box component="img" src={imageURL('geni-logo.png')}></Box>
                    </Grid>
                    <Grid item md={3} align="left" justifyCenter="flex-start">
                        <Grid><Box backgroundColor="rgba(255, 255, 255, 0.1)" display="flex" justifyContent="center" width="50%" color="white">Ended</Box></Grid>
                        <Grid color="white">GemUni IDO</Grid>
                    </Grid>
                    <Grid item md={2} align="left" justifyCenter="flex-start">
                        <Grid color="white">Start In</Grid>
                        <Grid color="white">17/01/22</Grid>
                    </Grid>
                    <Grid item md={2} align="left" justifyCenter="flex-start">
                        <Grid color="white">End In</Grid>
                        <Grid color="white">17/01/22</Grid>
                    </Grid>
                    <Grid item md={2} align="left" justifyCenter="flex-start">
                        <Grid color="white">Allocation</Grid>
                        <Grid color="white">300</Grid>
                    </Grid>
                    <Grid item md={2} alignItems="center" justifyContent="right" display="flex" paddingRight="15px">
                        {props.angle === "down" ? <Box component="img" src={imageURL('angle_down.png')} />
                            : <Box component="img" src={imageURL('angle_up.png')} />}
                    </Grid>
                </Grid>
            </MHidden>
            <MHidden width="mdUp">
                <Grid item container xs={12} bgcolor={"#232323"} padding="15px" border="1px solid #56C5FF" borderRadius={1} boxShadow="0px 6px 50px #000000;">
                    <Grid item xs={2}>
                        <Box component="img" src={imageURL('geni-logo.png')} />
                    </Grid>
                    <Grid item xs={8} paddingLeft="10px" align="left" justifyCenter="flex-start">
                        <Grid><Box backgroundColor="rgba(255, 255, 255, 0.1)" display="flex" justifyContent="center" width="50%" color="white">Ended</Box></Grid>
                        <Grid color="white">GemUni IDO</Grid>
                    </Grid>
                    <Grid item xs={2} align="center" justifyCenter="center" paddingTop="23px">
                        {props.angle === "down" ? <Box component="img" src={imageURL('angle_down.png')} />
                            : <Box component="img" src={imageURL('angle_up.png')} />}
                    </Grid>
                </Grid>
                <Grid item container xs={12} bgcolor={"#232323"} padding="15px" marginTop="10px" borderRadius={1} boxShadow="0px 6px 50px #000000;">
                    <Grid item xs={7} align="left" justifyCenter="flex-start">
                        <Grid color="#F1F0F0" fontSize={15}>Start In</Grid>
                        <Grid color="white" paddingTop="15px" fontSize={19}>17/01/22</Grid>
                    </Grid>
                    <Grid item xs={5} align="left" justifyCenter="flex-start">
                        <Grid color="#F1F0F0" fontSize={15}>End In</Grid>
                        <Grid color="white" paddingTop="15px" fontSize={19}>17/01/22</Grid>
                    </Grid>
                    <Grid item xs={7} align="left" marginTop="25px">
                        <Grid color="#F1F0F0" fontSize={15}>Allocation</Grid>
                        <Grid color="white" paddingTop="15px" fontSize={19}>300</Grid>
                    </Grid>
                </Grid>
            </MHidden>
        </>
    );
}
function YourParticipationBox() {
    const { account, chainId } = useActiveWeb3React();
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

    return (
        <>
            <Grid marginTop="20px" color="#56C5FF" fontSize="40px">
                Your Deal Participation
            </Grid>
            <Grid container direction={"row"} marginTop="10px" spacing={2} >
                <Grid item md={6}><ProjectCard title="Allocated Projects" amount={dealsStatus.length}></ProjectCard></Grid>
                <Grid item md={6}><ProjectCard title="Total Allocated" amount={totalParticipate + " " + CURRENCY_SYMBOL[chainId]}></ProjectCard></Grid>
            </Grid>

            <Grid container direction="row" bgcolor="#232323" width="100%" marginTop="30px" borderRadius={1}>
                <Grid container padding='15px'>
                    <Grid item sm={12} md={6} display="flex" justifyContent={'flex-start'}><Box component="h5" fontFamily={'system-ui'} color="#56C5FF">
                        Your Participation</Box></Grid>
                </Grid>
                <Grid container direction="row" bgcolor="rgba(86, 197, 255, 0.1)" height="40px" paddingTop="5px">
                    <Grid item md={0.5} display="flex" justifyContent="center" color="white">No.</Grid>
                    <Grid item md={1.5} display="flex" justifyContent="center" color="white">Project Name</Grid>
                    <Grid item md={1.5} display="flex" justifyContent="center" color="white">Deal Type</Grid>
                    <Grid item md={3} display="flex" justifyContent="center" color="white">Date</Grid>
                    <Grid item md={3} display="flex" justifyContent="center" color="white">Participation</Grid>
                    <Grid item md={1.5} display="flex" justifyContent="center" color="white">Claimed</Grid>
                    <Grid item md={1} display="flex" justifyContent="center" color="white">Action</Grid>
                </Grid>

                {dealsStatus.map((item, index) => <>
                    <Grid container marginTop='10px' direction="row" height="40px" fontSize="19px">
                        <Grid item md={0.5} display="flex" justifyContent="center" color="white">{index + 1}</Grid>
                        <Grid item md={1.5} display="flex" justifyContent="center" color="white">{item.projectName}</Grid>
                        <Grid item md={1.5} display="flex" justifyContent="center" color="white">{item.deal}</Grid>
                        <Grid item md={3} display="flex" justifyContent="center" color="white">{new Date(item.updatedAt).toDateString()}</Grid>
                        <Grid item md={3} display="flex" justifyContent="center" color="white">{item.deposit_amount} {CURRENCY_SYMBOL[chainId]}</Grid>
                        <Grid item md={1.5} display="flex" justifyContent="center" color="white">0.0000</Grid>
                        <Grid item md={1} display="flex" justifyContent="center" bgColor="#303030" width="100%" color="#56C5FF">
                            <Box display="flex" justifyContent="center" backgroundColor="rgba(255, 255, 255, 0.1)" width="70px" height="30px">Claim</Box>
                        </Grid>
                    </Grid>
                </>)}

            </Grid>
        </>
    );
}