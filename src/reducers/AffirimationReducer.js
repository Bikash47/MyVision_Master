import {
    AFFIRMATION_LIST
} from "../config/Config";

const INITIAL_STATE = {
    affirmationList: affListJson
};
import affListJson from './affirmationList.json'
export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case AFFIRMATION_LIST:
            return { ...state, affirmationList: action.payload };

        default:
            return state;
    }
}