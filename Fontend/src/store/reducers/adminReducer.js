// import actionTypes from "../actions/actionTypes";

// const initialState = {
//   isloadingGender: false,
//   genders: [],
//   roles: [],
//   positions: [],
//   users: [],
//   topDoctors: []
// };

// const adminReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case actionTypes.FETCH_GENDER_START:
//       let copyState = { ...state };
//       copyState.isloadingGender = true;
//       return {
//         ...copyState
//       }

//     case actionTypes.FETCH_GENDER_SUCCESS:
//       state.genders = action.data;
//       state.isloadingGender = false;
//       return {
//         ...state
//       }

//     case actionTypes.FETCH_GENDER_FAIDED:
//       state.isloadingGender = false;
//       state.genders = [];
//       return {
//         ...state
//       }

//     case actionTypes.FETCH_POSITION_SUCCESS:
//       state.positions = action.data;
//       return {
//         ...state
//       }

//     case actionTypes.FETCH_POSITION_FAILDED:
//       state.positions = [];
//       return {
//         ...state
//       }

//     case actionTypes.FETCH_ROLE_SUCCESS:
//       state.roles = action.data;
//       return {
//         ...state
//       }

//     case actionTypes.FETCH_ROLE_FAILDED:
//       state.roles = [];
//       return {
//         ...state
//       }

//     case actionTypes.FETCH_ALL_USERS_SUCCESS:
//       state.users = action.users;
//       return {
//         ...state
//       }

//     case actionTypes.FETCH_ALL_USERS_FAILDED:
//       state.users = [];
//       return {
//         ...state
//       }

//     case actionTypes.FETCH_TOP_DOCTOR_SUCCESS:
//       state.topDoctors = action.dataDoctors;
//       return {
//         ...state
//       }

//     case actionTypes.FETCH_TOP_DOCTOR_FAILDED:
//       state.topDoctors = [];
//       return {
//         ...state
//       }
//     default:
//       return state;
//   }
// };

// export default adminReducer;
