import axios from "axios";
import {
  ALL_PET_FAIL,
  ALL_PET_SUCCESS,
  ALL_PET_REQUEST,
  CLEAR_ERRORS,
} from "../constants/petConstant";

// Get all pets
export const getAllPets = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_PET_REQUEST });

    const { data } = await axios.get("/api/v1/pets");

    dispatch({
      type: ALL_PET_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ALL_PET_FAIL,
      payload: error.response.data.message,
    });
  }
};

//Clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
