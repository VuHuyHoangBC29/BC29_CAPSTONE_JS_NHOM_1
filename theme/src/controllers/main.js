let services = new Services();
let listProduct = new ListProduct();
const getEle = (id) => {
    return document.getElementById(id);
}

getEle('shopping').onclick = function () {
    getEle('cart').style.display = 'block';
}

getEle('close').onclick = function () {
    getEle('cart').style.display = 'none';
}

const getListProduct = () => {
    const promise = services.getProductApi();
    promise
        .then(function (result) {
            console.log(result);
            renderProduct(result.data);
        })

        .catch(function (error) {
            console.log(error);
        })
}

getListProduct();

const renderProduct = (data) => {
    let content = "";
    data.forEach(item => {
        content += `
        <div class="card_item col-3">
            <div class="card">
                <div class="icon d-flex justify-content-between p-3"><i class="fa-brands fa-apple fa-2x"></i>
                    <span>In Stock</span>
                </div>
                <img class="card-img-top mx-auto"
                    src="${item.img}"
                    alt="Card image" style="width:70%">
                <div class="card-body">
                    <div class="product_name d-flex justify-content-between">
                        <span>${item.name}</span>
                        <i class="fa-solid fa-heart"></i>
                    </div>
                    <div class="content">
                        <div class="product_info">
                            <ul>
                                <li>Screen: ${item.screen.slice(7,8)}.${item.screen.slice(8,9)} inch</li>
                                <li>Back camera: ${item.backCamera}</li>
                                <li>Front camera: ${item.frontCamera}</li>
                                <li>${item.desc}</li>
                            </ul>
                        </div>
                        <div class="product_price d-flex justify-content-between align-items-center">
                            <span>$ ${item.price}</span>
                            <button class="btn text-light" onclick="ThemSP()">Add <i
                                    class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `
    });
    getEle('card_product').innerHTML = content;
}

