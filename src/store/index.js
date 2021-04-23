import { createStore } from 'vuex'
import Reservation from './modules/Reservation'

export default createStore({
    modules:{
        Reservation,
    }
})