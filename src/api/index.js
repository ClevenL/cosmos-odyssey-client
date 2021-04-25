import axios from "axios"

export default {
    async fetchPriceListFromAPI(){
        const response = await axios.get(`https://cosmos-odyssey.azurewebsites.net/api/v1.0/TravelPrices`)
        return response.data
    },
    async getAllPriceLists(){
        const response = await axios.get(`api/pricelists/`)
        return response.data
    },
    async makeReservation(data) {
        const response = await axios.post("api/reservations/", data)
        return response.data
    },
}