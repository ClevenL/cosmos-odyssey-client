import axios from "axios"

export default {
    async getAllPriceLists(){
        const response = await axios.get(`api/pricelists/`)
        return response.data
    },
    /*
    async updateArticleRead(item, bool){
        const response = await axios.put(`api/articles/${item._id}`, { read: bool })
        return response.data
    },
    async updateArticleStar(item, bool){
        const response = await axios.put(`api/articles/${item._id}`, { star: bool })
        return response.data
    },
    async updateArticleHide(item, bool){
        const response = await axios.put(`api/articles/${item._id}`, { hide: bool })
        return response.data
    },
    async updateArticleSave(item){
        const response = await axios.put(`api/articles/${item._id}`, item)
        return response.data
    },
    */
}