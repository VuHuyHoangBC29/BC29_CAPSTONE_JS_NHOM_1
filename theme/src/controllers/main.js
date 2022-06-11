let services = new Services();
let listProduct = new ListProduct();
let productList = [];
let cart = [];
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
            productList = result.data;
            renderProduct(result.data);
        })

        .catch(function (error) {
            console.log(error);
        })
}

getListProduct();

const renderProduct = (data) => {
    let content = "";
    let icon = "";
    data.forEach(item => {
        if (item.type.toLowerCase() == "iphone") {
            icon = `<i class="fa-brands fa-apple fa-2x">`;
        } else {
            icon = `<span class="text-light">Samsung</span>`
        }
        content += `
        <div class="card_item col-3">
            <div class="card">
                <div class="icon d-flex justify-content-between p-3">${icon}</i>
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
                                <li>Screen: ${item.screen.slice(7, 8)}.${item.screen.slice(8, 9)} inch</li>
                                <li>Back camera: ${item.backCamera}</li>
                                <li>Front camera: ${item.frontCamera}</li>
                                <li>${item.desc}</li>
                            </ul>
                        </div>
                        <div class="product_price d-flex justify-content-between align-items-center">
                            <span>$ ${item.price} VNĐ</span>
                            <button class="btn text-light" onclick="ThemSP('${item.id}')">Add <i
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

getEle('selectPhone').onchange = function () {
    const filter = getEle('selectPhone').value;
    let dataApiFilter = [];
    productList.forEach((item, i) => {
        if (filter === item.type.toLowerCase()) {
            dataApiFilter.push(item);
        }
    })
    if (filter === "") {
        renderProduct(ProductList);
    } else {
        renderProduct(dataApiFilter);
    }
}



const ThemSP = (id) => {
    // dataApi.forEach((item) => {
    //     if(item.id == id){
    //         arrCart.push(item);
    //     }
    // })
    // const product = new Product(item.id);
    var index = "";
    productList.forEach((item, i) => {
        if (item.id == id) {
            index = i;
        }
    });

    var flag = -1;
    cart.forEach((item, i)=>{
        if(item.id === id){
            flag = i;
            item.soLuong++;
        }
    })
    if(flag === -1){
        let product = new Product(productList[index].id, productList[index].price, productList[index].name, productList[index].img);
        cart.push(product);
    }

    var total = 0;
    cart.forEach((item, i)=>{
        total += item.soLuong
    })
    getEle('counter').innerHTML = total;
    if (total > 0) {
        getEle('tbCart').style.display = "none";
    } else {
        getEle('tbCart').style.display = "block";
    };
    renderListCart(cart);
}

const renderListCart = (data) => {
    let content = "";
    data.forEach((item) => {
        content += `
            <li class="row d-flex align-items-center">
                <div class="col-3">
                    <img class="item_Img" src="${item.img}" style="width: 30%;" alt="">
                </div>
                <div class="col-4">
                    <span class="col-4">${item.ten}</span>
                </div>
                <div class="col-2 icon">
                    <i class="fa-solid fa-chevron-left"></i>
                    <span class="so_luong">${item.soLuong}</span>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
                <div class="col-2">
                    <span>${item.gia}</span>
                </div>
                <div class="col-1">
                    <i class="fa-solid fa-trash"></i>
                    </div>
            </li>
        `;
    });
    getEle('listCart').innerHTML = content;
}