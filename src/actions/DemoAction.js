import {
    EMAIL_CHANGE, GETTING_JSON_RESPONSE, PASSWORD_CHANGE, GETTING_MONITORED_STOP_VISIT_RESPONSE,
    FETCHING_DATA, ORIGIN_REF
} from "../config/Config";

// import ApiAccess from "../apiAccess/ApiAccess";
// import {makeList} from "../business/LoginBusiness";

export const emailChanged = (text) => {
    console.log('Email on action ' + text);
    return {
        type: EMAIL_CHANGE,
        payload: text
    };
}

export const passwordChange = (text) => {
    console.log('Password' + text);
    return {
        type: PASSWORD_CHANGE,
        payload: text
    };
}


// export const sampleApiCallWigh_Params = ({email, password}) => {

//     return async (dispatch) => {
//         dispatch({type: FETCHING_DATA});
//         try {
//             var params = {
//                 UserName: 'powergrid',
//                 Password: 'bipros123#',
//                 grant_type: 'password'
//             };
//             let resp = await ApiAccess.post("token",params);
//             console.log("Login resp " + resp);
//             /* dispatch({
//                  type: ORIGIN_REF,
//                  payload: makeList(data)
//              });*/
//         }catch (e){

//         }
//     }

// }



// export const sampleApiCall = ({}) => {
//     return async (dispatch) => {
//         dispatch({type: FETCHING_DATA});
//         try {
//             let data = await ApiAccess.getWith_Headers("sm"); //get('sm');//
//             // console.log(" Response " + " " + data);
//             dispatch({
//                 type: ORIGIN_REF,
//                 payload: makeList(data)
//             });
//         }catch (e){

//         }
//     }
// }




