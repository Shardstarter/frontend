import axios from 'axios';
import objToParamString from 'utils/objToParamString';

const createBackendServer = (baseURL) => {
  const api = axios.create({
    baseURL,
    headers: { Accept: 'application/json' },
    timeout: 60 * 5000
  });

  /*const headers = {
    'Content-Type': 'multipart/form-data',
  }*/

  /*==========    GET REQUESTS    ==========*/
  const getDeals = async () => api.get('api/bsc/ido');
  const getEvent = async () => api.get('api/calender/get-events');
  const getBscIdo = async (params) => api.get(`api/bsc/ido?filter=13`);
  const getVCDeals = async (body) => api.get(`api/bsc/ido?filter=12`);
  const getProjectDetails = async (address, params) => api.get(`api/bsc/pool/${address}?${objToParamString(params)}`);
  const getFollowers = async (username) => api.get(`api/get-followers/${username}`);
  const getRandomImages = async (result = 3) => axios.get(`https://randomuser.me/api/?inc=picture&results=${result}`)
  const ipfs = async (id = "QmXRAQ7YecZrV6Yyew2h1Vh9kFHxyuLNEPPYooUDPpRcsf") => axios.get(`https://ipfs.io/ipfs/${id}`);
  /*==========    POST REQUESTS    ==========*/
  const createBscIdo = (body) => api.post('api/create-bsc-ido', body);
  const updateIDOWeiRaised = (body) => api.post('api/update-ido-weiraiased', body);
  const saveEvent = async (body) => api.post('api/calender/save-event', body);
  const setApproval = async (body) => api.post('api/approval/set', body);
  const getApproval = async (body) => api.post('api/approval/get', body);
  const updateUserDeposit = async (body) => api.post('api/update-user-deposit', body);
  const countApproval = async (body) => api.post('api/approval/count', body);

  const updateUserStaking = async (body) => api.post('api/stake/updateUserStaking', body);
  const getCountForTierLevel = async (body) => api.post('api/stake/getCountForTierLevel', body);
  const getUserInfo = async (body) => api.post('api/user/getInfo', body);
  const setUserEmail = async (body) => api.post('api/user/setEmail', body);
  const getUserParticipations = async (body) => api.post('api/user/getParticipations', body);

  const createVote = async (body) => api.post('api/vote/create', body);
  const getVotes = async (body) => api.post('api/vote/get', body);
  const placeVote = async (body) => api.post('api/vote/place', body);

  return {
    createBscIdo, updateIDOWeiRaised, getBscIdo, getVCDeals, getProjectDetails, getDeals, getEvent, saveEvent, getFollowers, getRandomImages, ipfs,
    setApproval, getApproval, updateUserDeposit, countApproval, updateUserStaking, getCountForTierLevel,
    getUserInfo, setUserEmail, getUserParticipations,
    createVote, getVotes, placeVote,
  };
};

const SERVER_URL = process.env.REACT_APP_SERVER_URL;

const apis = createBackendServer(SERVER_URL);

export default apis;
