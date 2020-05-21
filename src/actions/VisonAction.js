import {
     VISION_CATAGORY, VISION_LIST
} from "../config/Config";

// import ApiAccess from "../apiAccess/ApiAccess";
// import {makeList} from "../business/LoginBusiness";

export const addNewCatagory = (list) => {
    return {
        type: VISION_LIST,
        payload: list
    };
}

export const passwordChange11 = (text) => {
    console.log('Password' + text);
    return {
        type: PASSWORD_CHANGE,
        payload: text
    };
}





