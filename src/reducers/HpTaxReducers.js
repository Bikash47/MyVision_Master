import {
    COMMODITY_TYPE, DESTINATION_LOCATION_CHANGE, DISTANCE_VALUE_CHANGE, EPAYMENT_FORM_DATA, FETCHING_DATA,
    FETCHING_DATA_SUCCESDS, PASSENGER_VALUE_CHANGE,
    PICKER_VALUE_CHANGE, QUANTITY_VALUE_CHANGE, SOURCE_LOCATION_VALUE_CHANGE, TOTAL_VALUE_CHANGE, VEHICLE_VALUE_CHANGE,
    WEIGHT_VALUE_CHANGE
} from "../config/Config";

export const  initialEData = {
    commodityTypeId: 0,
    taxTypeId: 0,
    taxValue: 0,
    commodityName: "Select",
    source_location_field: false,
    destination_location_field: false,
    distance_field: false,
    no_of_passenger_field: false,
    weight_field: false,
    unit: "kg",
    sub_Charges: 0,
    quantity_field: false
};
const INITIAL_STATE = {isLoading: false, commodityTypeList: [], pickerValue: "Select", ePaymentFormData: initialEData,weight:"",
quantity:"",source:"",destination:"",vehicle:"",totalValue:"",distance:"",passenger:""};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case FETCHING_DATA:
            return {...state, isLoading: true};
        case FETCHING_DATA_SUCCESDS:
            return {...state, isLoading: false};
        case COMMODITY_TYPE:
            return {...state, commodityTypeList: action.payload, isLoading: false};
        case PICKER_VALUE_CHANGE:
            return {...state, pickerValue: action.payload, isLoading: false};
        case EPAYMENT_FORM_DATA:
            return {...state, ePaymentFormData: action.payload, isLoading: false};
        case WEIGHT_VALUE_CHANGE:
            return {...state, weight: action.payload, isLoading: false};
        case QUANTITY_VALUE_CHANGE:
            return {...state, quantity: action.payload, isLoading: false};
        case SOURCE_LOCATION_VALUE_CHANGE:
            return {...state, source: action.payload, isLoading: false};
        case DESTINATION_LOCATION_CHANGE:
            return {...state, destination: action.payload, isLoading: false};
        case VEHICLE_VALUE_CHANGE:
            return {...state, vehicle: action.payload, isLoading: false};
        case TOTAL_VALUE_CHANGE:
            return {...state, totalValue: action.payload, isLoading: false};
        case DISTANCE_VALUE_CHANGE:
            return {...state, distance: action.payload, isLoading: false};
        case PASSENGER_VALUE_CHANGE:
            return {...state, passenger: action.payload, isLoading: false};
        default:
            return state;
    }
}