/* eslint-disable default-param-last */
import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGOUT,
} from '../types/auth';

export const loginReducer = (state = {userInfo:null}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loading: true };

    case LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case "LOGIN_FAIL":
      return { };
    // case "NEW_SHIFT_ASSIGNED":
      
    //   return{
    //     ...state,
    //     newShift:action.payload
    //   }
    case "HANDLE_DRAWER":
      return{
        ...state,
        drawer:action.payload
      }
    case "SET_PUSH_TOKEN":
      return{
        ...state,
        push_token:action.payload
      }
    case LOGOUT:
      return {userInfo:null};

    default:
      return state;
  }
};

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };

    case REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };

    case REGISTER_FAIL:
      return { loading: false, error: action.payload };

    case LOGOUT:
      return {};

    default:
      return state;
  }
};
