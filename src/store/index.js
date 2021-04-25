import { createStore } from 'vuex'
import Reservation from './modules/Reservation'
import PriceList from './modules/PriceList'

export default createStore({
    modules:{
        Reservation,
        PriceList,
    }
})