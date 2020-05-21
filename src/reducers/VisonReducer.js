import {
    VISION_CATAGORY, VISION_DESC, VISION_LIST
} from "../config/Config";

const INITIAL_STATE = {
    visionList: [], visionCatagory: [{ id: 1, catagory: "Extra Income" }, { id: 2, catagory: "Financial Freedom" }
        , { id: 3, catagory: "Time Freedom" }, { id: 4, catagory: "Own Business" }, { id: 5, catagory: "New Friends" },
    { id: 6, catagory: "Charity" }, { id: 7, catagory: "Retirement Feeling" }, { id: 8, catagory: "Personality Develooment" },
    { id: 9, catagory: "Property" }
        , { id: 10, catagory: "World Tour" }, { id: 11, catagory: "Child Education" }, { id: 12, catagory: "Sweet Home" }
        , { id: 13, catagory: "New Car" }, { id: 14, catagory: "Passive Earning" }, { id: 15, catagory: "Spending Time with Family" },
    { id: 16, catagory: "Enjoy Hobbies" }, { id: 17, catagory: "Healthy Bank Balance" }, { id: 18, catagory: "Good Health" }], visionDes: ""
};

export default (state = INITIAL_STATE, action) => {

    switch (action.type) {

        case VISION_CATAGORY:
            return { ...state, visionCatagory: action.payload };

        case VISION_DESC:
            return { ...state, visionDes: action.payload };

        case VISION_LIST:
            return { ...state, visionList: action.payload };

        default:
            return state;
    }
}