// import { createSlice } from "@reduxjs/toolkit";
// // utils
// import axios from "../../utils/axios";
// import { toast } from "react-toastify";
// // import useLocalStorage from "hooks/useLocalStorage";

// // ----------------------------------------------------------------------

// // function objFromArray(array, key = "id") {
// //   return array.reduce((accumulator, current) => {
// //     accumulator[current[key]] = current;
// //     return accumulator;
// //   }, {});
// // }

// const initialState = {
//   isLoading: false,
//   error: false,
//   limitTime: false,
//   nfts: [],
//   nft: {},
// };

// const slice = createSlice({
//   name: "token",
//   initialState,
//   reducers: {
//     // START LOADING
//     startLoading(state) {
//       state.isLoading = true;
//     },

//     // HAS ERROR
//     hasError(state, action) {
//       state.isLoading = false;
//       state.error = action.payload;
//     },

//     // GET LABELS
//     getAllNftsSuccess(state, action) {
//       state.isLoading = false;
//       state.nfts = action.payload;
//     },
//     getNftByIdSuccess(state, action) {
//       state.isLoading = false;
//       state.nft = action.payload;
//     },

//     setLimitTime(state, action) {
//       state.limitTime = action.payload;
//     },
//   },
// });

// // Reducer
// export default slice.reducer;

// // ----------------------------------------------------------------------

// export function getAllNfts() {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get("/api/nft/get");
//       dispatch(slice.actions.getAllNftsSuccess(response.data.nfts));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function getNftById(id) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.get(`/api/nft/getbyid/${id}`);
//       dispatch(slice.actions.getNftByIdSuccess(response.data.nft));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//     }
//   };
// }

// export function createNft(formdata) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post("/api/nft/create", formdata);
//       dispatch(slice.actions.getAllNftsSuccess(response.data.nfts));
//       toast.success(`The NFT was submitted successfully`);
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//       toast.error(error.error);
//     }
//   };
// }

// export function deleteNft(id) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       // const response = await axios.delete(`/api/nft/delete/${id}`);
//       dispatch(getAllNfts());
//       // dispatch(slice.actions.getAllNftsSuccess(response.data.nfts));
//       toast.success(`The NFT was deleted successfully`);
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//       toast.error(`Oops, an error has occured`);
//     }
//   };
// }

// export function approveNft(id) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       // const response = await axios.put(`/api/nft/approve/${id}`);
//       dispatch(getAllNfts());
//       // dispatch(slice.actions.getAllNftsSuccess(response.data.nfts));
//       toast.success("Updated successfully!");
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//       toast.error(error.error);
//     }
//   };
// }

// export function notifyNft(data) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const filterData = JSON.parse(localStorage.getItem("filters"));
//       await axios.put(`/api/nft/notify/${data.id}`, data);
//       dispatch(filterNft(filterData));
//       // dispatch(slice.actions.getAllNftsSuccess(response.data.nfts));
//       toast.success("Reminder set!");
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//       toast.error(error.error);
//     }
//   };
// }

// export function promoteNft(nftId, promotion) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       // const response = await axios.put(`/api/nft/promote/${nftId}`, {
//       //   promotion,
//       // });
//       dispatch(getAllNfts());
//       // dispatch(slice.actions.getAllNftsSuccess(response.data.nfts));
//       toast.success("Updated successfully!");
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//       toast.error(error.error);
//     }
//   };
// }

// export function filterNft(filterData) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.post("/api/nft/filter", filterData);
//       dispatch(slice.actions.getAllNftsSuccess(response.data.nfts));
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//       toast.error(error.error);
//     }
//   };
// }

// export function leaveRate(data) {
//   return async (dispatch, getState) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const limitTime = getState().nft.limitTime;
//       if (limitTime) {
//         toast.error(`You can change your review in 1 minute`);
//       } else {
//         const response = await axios.put(`/api/nft/rate/${data.id}`, data);
//         dispatch(slice.actions.getNftByIdSuccess(response.data.nft));
//         toast.success(`Successfully reviewed the NFT`);
//         dispatch(slice.actions.setLimitTime(true));
//         setTimeout(() => dispatch(slice.actions.setLimitTime(false)), 60000)
//       }
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//       toast.error(error.error);
//     }
//   };
// }

// export function leaveComment(data) {
//   return async (dispatch) => {
//     dispatch(slice.actions.startLoading());
//     try {
//       const response = await axios.put(`/api/nft/comment/${data.id}`, data);
//       dispatch(slice.actions.getNftByIdSuccess(response.data.nft));
//       toast.success("Successfully commented on the NFT");
//     } catch (error) {
//       dispatch(slice.actions.hasError(error));
//       toast.error(error.error);
//     }
//   };
// }

// // export function setNotify(account, id, time) {
// //   return async (dispatch) => {
// //     dispatch(slice.actions.startLoading());
// //     try {
// //       const response = await axios.post("/api/user/notify", {
// //         account,
// //         id,
// //         time,
// //       });
// //       dispatch(slice.actions.getUsersSuccess(response.data.users));
// //       toast.success("You set notify successfully!");
// //     } catch (error) {
// //       dispatch(slice.actions.hasError(error));
// //       toast.error(error.error);
// //     }
// //   };
// // }
