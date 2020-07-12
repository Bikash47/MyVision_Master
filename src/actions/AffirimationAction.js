import {
    AFFIRMATION_LIST, ADD_NOTES, GET_NOTES
} from "../config/Config";

// import ApiAccess from "../apiAccess/ApiAccess";
// import {makeList} from "../business/LoginBusiness";

export const upDateAffirimation = (list) => {
   return {
       type: AFFIRMATION_LIST,
       payload: list
   };
}

export const addNotes = (data) => {
    return {
        type: ADD_NOTES,
        payload: data
    };
 }
 export const getSavedNotes = (list) => {
    return {
        type: GET_NOTES,
        payload: list
    };
 }






