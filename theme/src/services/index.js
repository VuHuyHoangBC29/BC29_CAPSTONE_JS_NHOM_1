class Services{
    getProductListApi(){
        return axios({
            url: "https://628b995f667aea3a3e32d1a4.mockapi.io/api/ProductsCapstone",
            method: "GET"
        })
    }
}