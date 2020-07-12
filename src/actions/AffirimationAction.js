import {
    AFFIRMATION_LIST
} from "../config/Config";

// import ApiAccess from "../apiAccess/ApiAccess";
// import {makeList} from "../business/LoginBusiness";

export const upDateAffirimation = (list) => {
   return {
       type: AFFIRMATION_LIST,
       payload: list
   };
}







