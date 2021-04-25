import api from '../../api/'
import Fuse from 'fuse.js'

const state = {
    priceLists: [],
    priceListDataLoaded: false,
    search: '',
    selectedDeparture: '',
    selectedRoute: {},
    selectedProviders: [],
    selectedCompanies: [],
    sortBy: 'duration',
    reservationState: false,
}

// Search options for fuse.js
const searchOption = {
    minMatchCharLength: 1,
    isCaseSensitive: false,
    shouldSort: true,
    findAllMatches: true,
    includeScore: true,
    threshold: 0.4,
    keys: ['routeInfo.from.name']
}

const getters = {
    latestPriceList: (state) => {
        return state.priceLists[0]
    },
    selectedDeparture: (state) => {
        return state.selectedDeparture
    },
    selectedRoute: (state) => {
        return state.selectedRoute
    },
    reservationState: (state) => {
        return state.reservationState
    },
    selectedProviders: (state) => {
        return state.selectedProviders
    },
    // Get flights that will depart later than the last flight has ended so you can make it to the next flight
    availableProviders: (state) => {
        if (state.selectedProviders.length) {
            const lastFlightEnd = new Date(state.selectedProviders[state.selectedProviders.length - 1].flightEnd).valueOf()
            return state.selectedRoute.providers.filter(provider => new Date(provider.flightStart).valueOf() > lastFlightEnd)
        } else {
            return state.selectedRoute.providers
        }
    },
    // Get flights that are sorted
    filteredProviders: (state, getters) => {
        if (state.sortBy == 'duration') return getters.availableProviders.sort((providerA, providerB) => {
                const durationA = new Date(providerA.flightEnd) - new Date(providerA.flightStart)
                const durationB = new Date(providerB.flightEnd) - new Date(providerB.flightStart)
                return durationA - durationB
            })
        if (state.sortBy == 'price') return getters.availableProviders.sort((providerA, providerB) => {
                return providerA.price - providerB.price
            })
        return getters.availableProviders
    },
    departures: (state, getters) => {
        let legs = getters.latestPriceList.legs
        let result = []

        // Activate fuse.js searching
        if (state.search.length) {
            const searchIndex = Fuse.createIndex(searchOption.keys, legs)
            const fuse = new Fuse(legs, searchOption, searchIndex)
            legs = fuse.search(state.search).map(leg => leg.item)
        }
        legs.forEach(leg => {
            result.push(leg.routeInfo.from.name)
        })
        // A Set takes only unique values, so converting an array to set and back gives array with unique elements
        return Array.from(new Set(result))
    },
    destinations: (state, getters) => {
        let legs = getters.latestPriceList.legs
        return legs.filter(leg => leg.routeInfo.from.name == state.selectedDeparture)
    },
    validUntil: (state, getters) => {
        return getters.latestPriceList.validUntil
    },
    priceListDataLoaded: (state) => {
        return state.priceListDataLoaded
    },
}

const actions = {
    async loadPriceLists ({ commit }) {
        commit('LOAD_PRICELISTS', await api.getAllPriceLists())
    },
    updateSearch ({ commit }, data) {
        commit('UPDATE_SEARCH', data)
    },
    updateSelectedDeparture ({ commit }, data) {
        commit('UPDATE_SELECTED_DEPARTURE', data)
    },
    updateSelectedRoute ({ commit }, data) {
        commit('UPDATE_SELECTED_ROUTE', data)
    },
    updateSelectedProviders ({ commit }, data) {
        commit('UPDATE_SELECTED_PROVIDERS', data)
    },
    clearSelectedProviders ({ commit }) {
        commit('CLEAR_SELECTED_PROVIDERS')
    },
    updateReservationState ({ commit }, data) {
        commit('UPDATE_RESERVATION_STATE', data)
    },
    updateSortBy ({ commit }, data) {
        commit('UPDATE_SORT_BY', data)
    },
    
}

const mutations = {
    LOAD_PRICELISTS (state, data) {
        state.priceLists = data
        state.priceListDataLoaded = true
    },
    UPDATE_SEARCH (state, data) {
        state.search = data
    },
    UPDATE_SELECTED_DEPARTURE (state, data) {
        state.selectedDeparture = data
    },
    UPDATE_SELECTED_ROUTE (state, data) {
        state.selectedRoute = data
    },
    UPDATE_SELECTED_PROVIDERS (state, data) {
        state.selectedProviders.push(data)
    },
    CLEAR_SELECTED_PROVIDERS (state, data) {
        state.selectedProviders = []
    },
    UPDATE_RESERVATION_STATE (state, data) {
        state.reservationState = data
    },
    UPDATE_SORT_BY (state, data) {
        state.sortBy = data
    },
}

export default {
  state,
  getters,
  actions,
  mutations
}