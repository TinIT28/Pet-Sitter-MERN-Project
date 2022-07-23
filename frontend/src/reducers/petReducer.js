import {
  ALL_PET_FAIL,
  ALL_PET_SUCCESS,
  ALL_PET_REQUEST,
  CLEAR_ERRORS,
} from "../constants/petConstant";

export const petsReducer = (state = { pets: [] }, action) => {
    switch (action.type) {
      case ALL_PET_REQUEST:
        return {
          loading: true,
          pet: [],
        };
  
      case ALL_PET_SUCCESS:
        return {
          loading: false,
          pets: action.payload.pet,
        };
  
      case ALL_PET_FAIL:
        return {
          loading: false,
          error: action.payload,
        };
  
      case CLEAR_ERRORS:
        return {
          ...state,
          error: null,
        };
  
      default:
        return state;
    }
  };
