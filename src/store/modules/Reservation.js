import api from '../../api/'

const state = {
    reservationSuccess: false,
    dataUpdateSuccess: false,
}

const getters = {
    reservationSuccess: (state) => {
        return state.reservationSuccess
    },
    dataUpdateSuccess: (state) => {
        return state.dataUpdateSuccess
    },
}

const actions = {
    async makeReservation ({ rootGetters, dispatch, commit }, data) {
        const selectedRoutes = rootGetters.selectedProviders
        const totalPrice = selectedRoutes.reduce((total, provider) => total + provider.price, 0)
        const totalTravelTime = selectedRoutes.reduce((total, provider) => total + (new Date(provider.flightEnd) - new Date(provider.flightStart)), 0)
        const reservation = {
            firstName: data.firstName,
            lastName: data.lastName,
            routes: selectedRoutes,
            totalPrice: totalPrice,
            totalTravelTime: totalTravelTime,
            priceListId: rootGetters.latestPriceList._id,
        }
        await api.makeReservation(reservation)
        dispatch('updateReservationState', false, { root: true })
        dispatch('updateSelectedDeparture', '', { root: true })
        dispatch('clearSelectedProviders', { root: true })
        dispatch('updateSelectedRoute', {}, { root: true })
        commit('UPDATE_RESERVATION_SUCCESS', true)
    },
    updateReservationSuccess ({ commit }, data) {
        commit('UPDATE_RESERVATION_SUCCESS', data)
    },
    updateDataUpdateSuccess ({ commit }, data) {
        commit('UPDATE_DATA_UPDATE_SUCCESS', data)
    },
}

const mutations = {
    UPDATE_RESERVATION_SUCCESS (state, data) {
        state.reservationSuccess = data
    },
    UPDATE_DATA_UPDATE_SUCCESS (state, data) {
        state.dataUpdateSuccess = data
    },
}

export default {
  state,
  getters,
  actions,
  mutations
}