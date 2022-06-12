let services = new Services();
let listProduct = new ListProduct();
let dataApi = [];
// const cartList = new CartList();
let cartList = [];

const getEle = (id) => {
  return document.getElementById(id);
};

getEle("shopping").onclick = function () {
  getEle("cart").style.display = "block";
};

getEle("close").onclick = function () {
  getEle("cart").style.display = "none";
};

const getListProduct = () => {
  const promise = services.getProductListApi();
  promise
    .then(function (result) {
      dataApi = result.data;
      renderProduct(result.data);
    })

    .catch(function (error) {
      console.log(error);
    });
};

getListProduct();

const renderProduct = (data) => {
  let content = "";
  let icon = "";
  data.forEach((item) => {
    if (item.type.toLowerCase() === "iphone") {
      icon = `<i class="fa-brands fa-apple fa-2x">`;
    } else {
      icon = `<span class="text-light">Samsung</span>`;
    }
    content += `
        <div class="card_item col-3">
            <div class="card">
                <div class="icon d-flex justify-content-between p-3">${icon}</i>
                    <span>In Stock</span>
                </div>
                <img class="card-img-top mx-auto mt-4 mb-5"
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
                                <li>Screen: ${item.screen.slice(
                                  7,
                                  8
                                )}.${item.screen.slice(8, 9)} inch</li>
                                <li>Back camera: ${item.backCamera}</li>
                                <li>Front camera: ${item.frontCamera}</li>
                                <li>${item.desc}</li>
                            </ul>
                        </div>
                        <div class="product_price d-flex justify-content-between align-items-center">
                            <span>${item.price} VNĐ</span>
                            <button class="btn" onclick="ThemSP('${
                              item.id
                            }')">Add <i
                                    class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
  });
  getEle("card_product").innerHTML = content;
};

getEle("selectPhone").onchange = function () {
  const filter = getEle("selectPhone").value;
  let dataApiFilter = [];
  dataApi.forEach((item, i) => {
    if (filter === item.type.toLowerCase()) {
      dataApiFilter.push(item);
    }
  });
  if (filter === "") {
    renderProduct(dataApi);
  } else {
    renderProduct(dataApiFilter);
  }
};

// const ThemSP = (id) => {
//   dataApi.forEach((item) => {
//     if (item.id === id) {
//       arrCart.push(item);
//     }
//   });
//   getEle("counter").innerHTML = arrCart.length;
//   if (arrCart.length > 0) {
//     getEle("tbCart").style.display = "none";
//   } else {
//     getEle("tbCart").style.display = "block";
//   }
//   renderListCart(arrCart);
// };

const getCartItem = (id) => {
  let cartItem = {};

  dataApi.forEach((item) => {
    if (item.id === id) {
      cartItem = item;
    }
  });
  return cartItem;
};

const ThemSP = (id) => {
  let index = -1;
  cartList.forEach((ele, idx) => {
    if (ele.id === id) {
      index = idx;
      ele.quantity++;
    }
  });

  if (index === -1) {
    cartItem = getCartItem(id);
    cartItem.quantity = 1;
    cartList.push(cartItem);
  }
  console.log(cartList);
  renderListCart(cartList);
};

const renderListCart = (data) => {
  let content = "";
  data.forEach((item) => {
    content += `
            <li class="row d-flex align-items-center">
                <div class="col-3">
                    <img class="item_Img" src="${item.img}" style="width: 30%;" alt="">
                </div>
                <div class="col-4">
                    <span class="col-4">${item.name}</span>
                </div>
                <div class="col-2 icon">
                    <i class="fa-solid fa-chevron-left"></i>
                    <span class="so_luong">${item.quantity}</span>
                    <i class="fa-solid fa-chevron-right"></i>
                </div>
                <div class="col-2">
                    <span>${item.price}</span>
                </div>
                <div class="col-1">
                    <i class="fa-solid fa-trash"></i>
                    </div>
            </li>
        `;
  });
  getEle("listCart").innerHTML = content;
};
