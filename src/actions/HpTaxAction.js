import {
    COMMODITY_TYPE, COMMODITY_TYPE_TAX_TYPE_ID, DESTINATION_LOCATION_CHANGE, DISTANCE_VALUE_CHANGE, EPAYMENT_FORM_DATA,
    FETCHING_DATA,
    FETCHING_DATA_SUCCESDS, PASSENGER_VALUE_CHANGE,
    PICKER_VALUE_CHANGE, QUANTITY_VALUE_CHANGE, SOURCE_LOCATION_VALUE_CHANGE, TOTAL_VALUE_CHANGE, VEHICLE_VALUE_CHANGE,
    WEIGHT_VALUE_CHANGE
} from "../config/Config";
import ApiAccess from "../apiAccess/ApiAccess";
import {dummyLIst, getPickerList, getPickerSelectedOhj} from "../business/HpTaxBusiness";
import {initialEData} from "../reducers/HpTaxReducers";

/*
    * Created Date 30/04/2018
     * Created By: Bikash Kumar Sahu
     * Des: This method is used for get all commodity type
     * Input: Tax type
     * Return: All comodity type
     * */

export const weightChanged = (text, value,commodityTypeId) => {
    debugger;
    if(commodityTypeId === 28){
        if(parseFloat(text) > 10){
            return {
                type: WEIGHT_VALUE_CHANGE,
                payload: ""
            }
        }else{
            return (dispatch) => {
                dispatch({
                    type: WEIGHT_VALUE_CHANGE,
                    payload: text
                });
            }
        }
    }else if (commodityTypeId === 29){
        if(parseFloat(text) > 20){
            return {
                type: WEIGHT_VALUE_CHANGE,
                payload: ""
            }
        }else{
            return (dispatch) => {
                dispatch({
                    type: WEIGHT_VALUE_CHANGE,
                    payload: text
                });
            }
        }
    }else{
        let finalValue = getTaxPrice(text, value);
        return (dispatch) => {
            dispatch({
                type: WEIGHT_VALUE_CHANGE,
                payload: text
            });
            dispatch({
                type: TOTAL_VALUE_CHANGE,
                payload: finalValue.toString()
            });
        }
    }


};

export const quantityChanged = (text,weightValue) => {
    debugger;
    let finalValue = getTaxPrice(text, weightValue);
    return (dispatch) => {
        dispatch({
            type: QUANTITY_VALUE_CHANGE,
            payload: text
        });
        dispatch({
            type: TOTAL_VALUE_CHANGE,
            payload: finalValue.toString()
        });
    }
    return {

    };
};

export const sourceLocationChanged = (text) => {
    debugger;
    return {
        type: SOURCE_LOCATION_VALUE_CHANGE,
        payload: text
    };
};

export const destinationLocationChange = (text) => {
    debugger;
    return {
        type: DESTINATION_LOCATION_CHANGE,
        payload: text
    };
};

export const vehicleChange = (text) => {
    debugger;
    return {
        type: VEHICLE_VALUE_CHANGE,
        payload: text
    };
};

export const distanceChange = (text, totalTax, weight, taxValue, passenger, tax_type_id) => {
    let tax;
    debugger;
    if (tax_type_id === "3") {
        if (passenger !== "") {
            tax = parseFloat(text) * parseFloat(passenger) * parseFloat(taxValue);
            return (dispatch) => {
                dispatch({
                    type: TOTAL_VALUE_CHANGE,
                    payload: tax.toString()
                });
                dispatch({
                    type: DISTANCE_VALUE_CHANGE,
                    payload: text
                });
            }
        } else if (text === "") {
            //Condition for passenger here for nullabel change
            if (passenger !== "") {


                tax = parseFloat(passenger) * parseFloat(taxValue);
                return (dispatch) => {
                    dispatch({
                        type: TOTAL_VALUE_CHANGE,
                        payload: tax.toString()
                    });
                    dispatch({
                        type: DISTANCE_VALUE_CHANGE,
                        payload: text
                    });
                }
            }
        } else if (passenger === "" && text === "") {
            tax = 0;
            return (dispatch) => {
                dispatch({
                    type: TOTAL_VALUE_CHANGE,
                    payload: tax.toString()
                });
                dispatch({
                    type: DISTANCE_VALUE_CHANGE,
                    payload: text
                });
            }
        }

        else {
            tax = parseFloat(text) * parseFloat(taxValue);
            return (dispatch) => {
                dispatch({
                    type: TOTAL_VALUE_CHANGE,
                    payload: tax.toString()
                });
                dispatch({
                    type: DISTANCE_VALUE_CHANGE,
                    payload: text
                });
            }
        }
    } else {
        if (parseInt(text) > 250) {
            tax = totalTax * 2;
            return (dispatch) => {
                dispatch({
                    type: TOTAL_VALUE_CHANGE,
                    payload: tax.toString()
                });
                dispatch({
                    type: DISTANCE_VALUE_CHANGE,
                    payload: text
                });
            }
        } else {
            let finalValue = getTaxPrice(weight, taxValue);
            return (dispatch) => {
                dispatch({
                    type: TOTAL_VALUE_CHANGE,
                    payload: finalValue.toString()
                });
                dispatch({
                    type: DISTANCE_VALUE_CHANGE,
                    payload: text
                });
            }
        }
    }

};


export const passengerChange = (text, distance, taxValue) => {
    debugger;
    let totalTax;
    if (distance !== "") {
        debugger;
        if (text !== "") {
            debugger;
            totalTax = parseFloat(distance) * parseFloat(text) * parseFloat(taxValue);
            return (dispatch) => {
                dispatch({
                    type: TOTAL_VALUE_CHANGE,
                    payload: totalTax.toString()
                });
                dispatch({
                    type: PASSENGER_VALUE_CHANGE,
                    payload: text
                });
            }
        } else if (distance === "") {
            totalTax = parseFloat(text) * parseFloat(taxValue);
            return (dispatch) => {
                dispatch({
                    type: TOTAL_VALUE_CHANGE,
                    payload: totalTax.toString()
                });
                dispatch({
                    type: PASSENGER_VALUE_CHANGE,
                    payload: text
                });
            }
        } else if (distance === "" && text === "") {
            totalTax = 0;
            return (dispatch) => {
                dispatch({
                    type: TOTAL_VALUE_CHANGE,
                    payload: totalTax.toString()
                });
                dispatch({
                    type: PASSENGER_VALUE_CHANGE,
                    payload: text
                });
            }
        }

        else {
            debugger;
            totalTax = parseFloat(distance) * parseFloat(taxValue);
            return (dispatch) => {
                dispatch({
                    type: TOTAL_VALUE_CHANGE,
                    payload: totalTax.toString()
                });
                dispatch({
                    type: PASSENGER_VALUE_CHANGE,
                    payload: text
                });
            }
        }


    } else {
        debugger;
        totalTax = parseFloat(text) * parseFloat(taxValue);
        return (dispatch) => {
            dispatch({
                type: TOTAL_VALUE_CHANGE,
                payload: totalTax.toString()
            });
            dispatch({
                type: PASSENGER_VALUE_CHANGE,
                payload: text
            });
        }
    }
};
export const taxValueChange = (text) => {
    debugger;
    return {
        type: TOTAL_VALUE_CHANGE,
        payload: text.toString()
    };
};

export const clearState = () => {
    debugger;
    return (dispatch) => {
        dispatch({
            type: WEIGHT_VALUE_CHANGE,
            payload: ""
        });
        dispatch({
            type: TOTAL_VALUE_CHANGE,
            payload: ""
        });
        dispatch({
            type: QUANTITY_VALUE_CHANGE,
            payload: ""
        });
        dispatch({
            type: VEHICLE_VALUE_CHANGE,
            payload: ""
        });
        dispatch({
            type: DISTANCE_VALUE_CHANGE,
            payload: ""
        });
        dispatch({
            type: PASSENGER_VALUE_CHANGE,
            payload: ""
        });
        dispatch({
            type: SOURCE_LOCATION_VALUE_CHANGE,
            payload: ""
        });
        dispatch({
            type: DESTINATION_LOCATION_CHANGE,
            payload: ""
        });
        dispatch({
            type: PICKER_VALUE_CHANGE,
            payload: ""
        });
        dispatch({
            type: EPAYMENT_FORM_DATA,
            payload: initialEData
        });

    }
};


export const getCommodityType = ({tax_type_id}) => {
    debugger;
    return async (dispatch) => {
        dispatch({type: FETCHING_DATA});
        try {
            let resp = await ApiAccess.get(COMMODITY_TYPE_TAX_TYPE_ID + tax_type_id);
            let data = resp.data;

            dispatch({type: FETCHING_DATA_SUCCESDS});
            dispatch({
                type: COMMODITY_TYPE,
                payload: getPickerList(resp.data) //dummyLIst()//
            });
        } catch (e) {
            dispatch({type: FETCHING_DATA_SUCCESDS});

        }
    }

};
export const onPickerValueChange = ({value, pickerList, tax_type_id}) => {
    debugger;
    return async (dispatch) => {
        dispatch({type: FETCHING_DATA});
        try {

            let pickerObj = getPickerSelectedOhj(value, pickerList);
            debugger;
            dispatch({type: FETCHING_DATA_SUCCESDS});
            dispatch({
                type: PICKER_VALUE_CHANGE,
                payload: value
            });
            dispatch({
                type: EPAYMENT_FORM_DATA,
                payload: pickerObj
            });
            if (tax_type_id === "2") {
                dispatch({
                    type: TOTAL_VALUE_CHANGE,
                    payload: pickerObj.taxValue.toString()
                })
            }
        } catch (e) {
            dispatch({type: FETCHING_DATA_SUCCESDS});

        }
    }

};


function getTaxPrice(text, value) {
    let totalTax = parseFloat(text) * parseFloat(value);
    return Math.round(totalTax * 100) / 100;
}