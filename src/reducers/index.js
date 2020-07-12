import { combineReducers } from 'redux';
import DemoReducer from './DemoReducer';
import HpTaxReducers from './HpTaxReducers';
import VisonReducer from './VisonReducer';
import AffirimationReducer from './AffirimationReducer';
export default combineReducers({
    //  coool: () =>[]
    auth: DemoReducer,
    hpTax:HpTaxReducers,
    vision:VisonReducer,
    affirimation:AffirimationReducer
});