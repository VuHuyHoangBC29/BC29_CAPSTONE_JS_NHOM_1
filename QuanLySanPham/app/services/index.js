function Services() {
    this.getProductListByApi = function () {
      return axios({
        url: "https://628b995f667aea3a3e32d1a4.mockapi.io/api/ProductsCapstone",
        method: "GET",
      });
    };
  
    this.deleteProductApi = function (id) {
      return axios ({
        url: `https://628b995f667aea3a3e32d1a4.mockapi.io/api/ProductsCapstone/${id}`,
        method: "DELETE",
      })
    }
  
    this.addProductApi = function (product) {
      return axios ({
        url: "https://628b995f667aea3a3e32d1a4.mockapi.io/api/ProductsCapstone",
        method: "POST",
        data: product,
      })
    }
  
    this.getProductApi = function (id) {
      return axios ({
        url: `https://628b995f667aea3a3e32d1a4.mockapi.io/api/ProductsCapstone/${id}`,
        method: "GET",
      })
    }
  
    this.updateProductApi = function (product) {
      return axios ({
        url: `https://628b995f667aea3a3e32d1a4.mockapi.io/api/ProductsCapstone/${product.id}`,
        method: "PUT",
        data: product,
      })
    }
  }