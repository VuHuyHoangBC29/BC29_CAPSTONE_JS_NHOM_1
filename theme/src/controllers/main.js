let services = new Services();
let dataApi = [];
const service = new CartList();
let totalPrice = 0;

const getEle = (id) => {
  return document.getElementById(id);
};

const getListProduct = () => {
  const promise = services.getProductListApi();
  promise
    .then(function (result) {
      dataApi = result.data;
      renderProduct(result.data);
      getLocalStorage();
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
        <div class="card_item col-sm-12 col-md-6 col-lg-4 col-xl-3">
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
                            <div id = "up_down-${
                              item.id
                            }"  style="display: none">
                              <button onclick="giamSL('${
                                item.id
                              }')"><i class="fa-solid fa-chevron-left"></i></button>
                              <span id="soLuong-${item.id}">1</span>
                              <button onclick="tangSL('${
                                item.id
                              }')"><i class="fa-solid fa-chevron-right"></i></button>
                            </div>
                              <button id="btn-${
                                item.id
                              }" class="btn btn_up_down" onclick="ThemSP('${
      item.id
    }')">Add <i class="fa-solid fa-chevron-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        `;
  });

  getEle("card_product").innerHTML = content;
};

const getCartItem = (id) => {
  let cartItem = {};
  dataApi.forEach((item) => {
    if (item.id === id) {
      const id = item.id;
      const name = item.name;
      const price = item.price;
      const screen = item.screen;
      const backCam = item.backCam;
      const frontCam = item.frontCam;
      const img = item.img;
      const desc = item.desc;
      const type = item.type;
      const quantity = 0;

      cartItem = new CartItem(
        id,
        name,
        price,
        screen,
        backCam,
        frontCam,
        img,
        desc,
        type,
        quantity
      );

      console.log(cartItem);
    }
  });
  return cartItem;
};

const ThemSP = (id) => {
  let index = -1;
  service.cartList.forEach((ele, idx) => {
    if (ele.id === id) {
      index = idx;
      ele.quantity++;
    }
  });

  if (index === -1) {
    cartItem = getCartItem(id);
    cartItem.quantity = 1;
    service.cartList.push(cartItem);
    getEle(`up_down-${id}`).style.display = "block";
    getEle(`btn-${id}`).style.display = "none";
  }

  console.log(index);
  renderListCart(service.cartList);

  setLocalStorage(service.cartList);
};

const renderListCart = (data) => {
  let content = "";
  data.forEach((item, idx) => {
    content += `
            <li class="row d-flex align-items-center">
                <div class="col-sm-1 col-md-1 col-lg-2 imgThumb">
                    <img class="item_Img" src="${item.img}" alt="">
                </div>
                <div class="col-sm-11 col-md-11 col-lg-3 cartItemName">
                    <span class="col-4">${item.name}</span>
                </div>
                <div class="col-sm-4 col-md-4 col-lg-3 cartItemControl">
                    <button onclick="giamSL('${
                      item.id
                    }')"><i class="fa-solid fa-chevron-left"></i></button>
                    <span class="so_luong">${item.quantity}</span>
                    <button onclick="tangSL('${
                      item.id
                    }')"><i class="fa-solid fa-chevron-right"></i></button>
                </div>
                <div class="col-sm-6 col-md-6 col-lg-3 cartItemQuan">
                    <span class="totalItemPrice">${
                      item.price * item.quantity
                    }</span><span> VNĐ</span>
                </div>
                <div class="col-sm-2 col-md-2 col-lg-1 cartItemRemove">
                    <button onclick="removeCartItem('${
                      item.id
                    }')"><i class="fa-solid fa-trash"></i></button>
                </div>
            </li>
         `;
    if (item.quantity > 0) {
      getEle(`up_down-${item.id}`).style.display = "block";
      getEle(`btn-${item.id}`).style.display = "none";
      getEle(`soLuong-${item.id}`).innerHTML = item.quantity;
    }
  });
  getEle("listCart").innerHTML = content;
  console.log(data);

  let totalItem = 0;
  service.cartList.forEach((item, i) => {
    totalItem += item.quantity;
  });
  getEle("counter").innerHTML = totalItem;
  if (totalItem > 0) {
    getEle("tbCart").style.display = "none";
  } else {
    getEle("tbCart").style.display = "block";
  }

  totalPrice = 0;

  service.cartList.forEach((item) => {
    totalPrice += item.price * item.quantity;
  });

  getEle("totalPrice").innerHTML = totalPrice + " VNĐ";
};

const setLocalStorage = () => {
  const dataString = JSON.stringify(service.cartList);
  localStorage.setItem("CART_LIST", dataString);
};

const getLocalStorage = () => {
  const stringify = localStorage.getItem("CART_LIST");
  console.log(stringify);
  cartList = stringify ? JSON.parse(stringify) : [];
  console.log(service.cartList);

  renderListCart(service.cartList);
};

getEle("shopping").onclick = function () {
  getEle("cart").style.display = "block";
  getEle("blur").style.display = "block";
};

getEle("close").onclick = function () {
  getEle("cart").style.display = "none";
  getEle("blur").style.display = "none";
};

const tangSL = (id) => {
  service.cartList.forEach((item) => {
    if (item.id === id) {
      item.quantity++;
      getEle(`soLuong-${id}`).innerHTML = item.quantity;
    }
  });
  renderListCart(service.cartList);
  setLocalStorage(service.cartList);
};

const giamSL = (id) => {
  service.cartList.forEach((item) => {
    if (item.id === id) {
      if (item.quantity === 1) {
        removeCartItem(item.id);
        getEle(`up_down-${id}`).style.display = "none";
        getEle(`btn-${id}`).style.display = "block";
      } else {
        item.quantity--;
      }
      getEle(`soLuong-${id}`).innerHTML = item.quantity;
    }
  });
  renderListCart(service.cartList);
  setLocalStorage(service.cartList);
};

const removeCartItem = (id) => {
  service.removeCartItem(id);
  renderListCart(service.cartList);
  setLocalStorage(service.cartList);
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

getEle("btnPurchase").onclick = () => {
  if (service.cartList.length > 0) {
    getEle("orderNow").style.display = "block";
    renderOrtherPopup(service.cartList);
    getEle("cart").style.display = "none";
  }
};

//btn Clear
getEle("btnClear").onclick = () => {
  service.cartList.forEach((ele) => {
    getEle(`up_down-${ele.id}`).style.display = "none";
    getEle(`btn-${ele.id}`).style.display = "block";
    getEle(`soLuong-${ele.id}`).innerHTML = "1";
  });

  service.cartList = [];
  renderListCart(service.cartList);
  setLocalStorage(service.cartList);
};

//render Order_po-pup
const renderOrtherPopup = (data) => {
  let content = `
                <div class="container">
                  <div class="orderNow_content" id="orderNowContent">
                    <div id="order_product">
  `;
  content += data.reduce((total, ele) => {
    total += `
                      <div class="d-flex justify-content-between">
                        <span>${ele.quantity} x ${ele.name}</span>
                        <span>${ele.quantity * ele.price} VND</span>
                      </div>
                      </br>
            `;
    return total;
  }, "");

  content += `
                    </div>
                    <hr class="bg-light">
                    <p>payment</p>
                    <div class="d-flex">
                    <span>Total amount to be paid:</span><span class="ml-auto">${totalPrice} VND</span>
                    <div>
                    </br>
                    <div class="btn_group">
                      <button onclick="btnOderNow()" class="btn btn-info">Order Now</button>
                      <button onclick="btnCancleOrder()" class="btn btn-danger">Cancle</button>
                    </div>
                  </div>
                </div>
  `;
  getEle("orderNow").innerHTML = content;
};

const btnCancleOrder = () => {
  getEle("cart").style.display = "block";
  getEle("orderNow").style.display = "none";
};

const btnOderNow = () => {
  const random = Math.floor(Math.random() * 1000);
  const content = `
  <div class="d-flex flex-column">
    <h3>Your order has been placed</h3>
    <p>Your order-id is : ${random}</p>
    <p>Your order will be delivered to you in 3-5 working days</p>
    <p>You can pay ${totalPrice} VND by card or any online transaction method after the products have been dilivered to you</p>
    <button onclick="btnOk()" class="btn btn-info form-control">Okay</button>
  </div>
  `;
  getEle("orderNowContent").innerHTML = content;
  getEle("orderNowContent").className = "placed";
};

const btnOk = () => {
  const content = `
  <h2>Thanks for shopping with us</h2>
  <button onclick="btnContinue()" class="btn btn-info form-control">continue</button>
  `;
  getEle("orderNowContent").innerHTML = content;
  getEle("orderNowContent").className = "continue";
  service.cartList.forEach((ele) => {
    getEle(`up_down-${ele.id}`).style.display = "none";
    getEle(`btn-${ele.id}`).style.display = "block";
    getEle(`soLuong-${ele.id}`).innerHTML = "1";
  });
  service.cartList = [];
  renderListCart(service.cartList);
  setLocalStorage(service.cartList);
};

const btnContinue = () => {
  getEle("orderNow").style.display = "none";
  getEle("blur").style.display = "none";
};
