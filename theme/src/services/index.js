class Services{
    getProductApi(){
        return axios({
            url: "https://628b995a7886bbbb37bbca17.mockapi.io/api/phone",
            method: "GET"
        })
    }
}