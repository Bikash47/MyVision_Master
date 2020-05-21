import { combineReducers } from 'redux';
import DemoReducer from './DemoReducer';
import HpTaxReducers from './HpTaxReducers';
import VisonReducer from './VisonReducer';
export default combineReducers({
    //  coool: () =>[]
    auth: DemoReducer,
    hpTax:HpTaxReducers,
    vision:VisonReducer
});