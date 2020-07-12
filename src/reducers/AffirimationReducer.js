import {
    AFFIRMATION_LIST, ADD_NOTES, GET_NOTES
} from "../config/Config";

const INITIAL_STATE = {
    affirmationList: affListJson,allNotes:[]
};
import affListJson from './affirmationList.json'
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case AFFIRMATION_LIST:
            return { ...state, affirmationList: action.payload };
        case ADD_NOTES:
            return { ...state, allNotes: action.payload };
        case GET_NOTES:
            return { ...state, allNotes: action.payload };
        default:
            return state;
    }
}