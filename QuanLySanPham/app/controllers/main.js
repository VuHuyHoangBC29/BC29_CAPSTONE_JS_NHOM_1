var service = new Services();
var validation = new Validation();
var danhSachSP = [];

function getEle(id) {
  return document.getElementById(id);
}

function getProductList() {
  service
    .getProductListByApi()
    .then(function (result) {
      console.log(result);
      renderProductList(result.data);
      danhSachSP = result.data;
      console.log(danhSachSP);
    })
    .catch(function (error) {
      console.log(error);
    });
}

getProductList();

function renderProductList(data) {
  var contentHTML = "";

  data.forEach(function (product, index) {
    contentHTML += `
        <tr>
                <td>${index + 1}</td>
                <td>${product.name}</td>
                <td>${product.price}</td>
                <td>${product.screen}</td>
                <td>${product.backCamera}</td>
                <td>${product.frontCamera}</td>
                <td>${product.desc}</td>
                <td>${product.type}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal"
                    data-target="#myModal" onclick="editProduct(${
                      product.id
                    })">Sửa</button> 
                    <button class="btn btn-danger" onclick="deleteProduct(${
                      product.id
                    })">Xóa</button> 
                </td>
            </tr>
        `;
  });

  getEle("tblDanhSachSP").innerHTML = contentHTML;
}

function defaultStatus() {
  getEle("tenSP").value = "";
  getEle("giaSP").value = "";
  getEle("manHinh").value = "";
  getEle("camSau").value = "";
  getEle("camTruoc").value = "";
  getEle("hinhAnh").value = "";
  getEle("moTa").value = "";
  getEle("loaiSP").value = "Chọn loại sản phẩm";

  getEle("tbTenSP").innerHTML = "";
  getEle("tbGiaSP").innerHTML = "";
  getEle("tbManHinh").innerHTML = "";
  getEle("tbCamSau").innerHTML = "";
  getEle("tbCamTruoc").innerHTML = "";
  getEle("tbHinhAnh").innerHTML = "";
  getEle("tbMoTa").innerHTML = "";
  getEle("tbLoaiSP").innerHTML = "";

  getEle("tenSP").disabled = false;
}

/**
 * Xóa SP
 */
function deleteProduct(id) {
  service
    .deleteProductApi(id)
    .then(function () {
      getProductList();
    })
    .catch(function (error) {
      console.log(error);
    });
}

getEle("btnThemSanPham").onclick = function () {
  defaultStatus();
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm sản phẩm";

  var footer = `<button class="btn btn-success" onclick="addProduct()">Thêm</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;
};

/**
 * Lấy thông tin sản phẩm
 */
function layThongTinSP(isAdd) {
  var tenSP = getEle("tenSP").value;
  var giaSP = getEle("giaSP").value;
  var manHinh = getEle("manHinh").value;
  var camSau = getEle("camSau").value;
  var camTruoc = getEle("camTruoc").value;
  var hinhAnh = getEle("hinhAnh").value;
  var moTa = getEle("moTa").value;
  var loaiSP = getEle("loaiSP").value;

  //check validation
  var isValid = true;

  //tenSP
  if (isAdd) {
    isValid &=
      validation.kiemTraRong(tenSP, "tbTenSP", "Vui lòng nhập tên sản phẩm") &&
      validation.kiemTraSPTonTai(
        tenSP,
        "tbTenSP",
        "Sản phẩm đã tồn tại",
        danhSachSP
      );
  }

  //giaSp
  isValid &=
    validation.kiemTraRong(giaSP, "tbGiaSP", "Vui lòng nhập giá sản phẩm") &&
    validation.kiemTraGia(
      giaSP,
      "tbGiaSP",
      1000000,
      50000000,
      "Vui lòng nhập giá hợp lệ"
    );

  //manHinh
  isValid &= validation.kiemTraRong(
    manHinh,
    "tbManHinh",
    "Vui lòng nhập thông số màn hình"
  );

  //camSau
  isValid &= validation.kiemTraRong(
    camSau,
    "tbCamSau",
    "Vui lòng nhập thông số camera sau"
  );

  //camTruoc
  isValid &= validation.kiemTraRong(
    camTruoc,
    "tbCamTruoc",
    "Vui lòng nhập thông số camera trước"
  );

  //hinhAnh
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "Vui lòng nhập hình ảnh"
  );

  //moTa
  isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "Vui lòng nhập mô tả") &&
    validation.kiemTraDoDaiKiTu(
      moTa,
      "tbMoTa",
      20,
      200,
      "Mô tả phải dài hơn 20 và ít hơn 200 kí tự"
    );

  //loaiSP
  isValid &= validation.kiemTraChon(
    "loaiSP",
    "tbLoaiSP",
    "Vui lòng chọn loại sản phẩm"
  );

  if (!isValid) return;

  //new product
  var product = new Product(
    "",
    tenSP,
    giaSP,
    manHinh,
    camSau,
    camTruoc,
    hinhAnh,
    moTa,
    loaiSP
  );

  return product;
}

/**
 * Thêm sản phẩm
 */
function addProduct() {
  var product = layThongTinSP(true);
  if (product) {
    service
      .addProductApi(product)
      .then(function () {
        getProductList();
        document.getElementsByClassName("close")[0].click();
      })
      .catch(function (error) {
        console.log(error);
      });
  }
}

/**
 * Sửa sản phẩm
 */
function editProduct(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Thay đổi thông tin sản phẩm";

  var footer = `<button class="btn btn-success" onclick="updateProduct(${id})">Sửa</button>`;
  document.getElementsByClassName("modal-footer")[0].innerHTML = footer;

  service
    .getProductApi(id)
    .then(function (result) {
      getEle("tenSP").value = result.data.name;
      getEle("giaSP").value = result.data.price;
      getEle("manHinh").value = result.data.screen;
      getEle("camSau").value = result.data.backCamera;
      getEle("camTruoc").value = result.data.frontCamera;
      getEle("hinhAnh").value = result.data.img;
      getEle("moTa").value = result.data.desc;
      getEle("loaiSP").value = result.data.type;
    })
    .catch(function (error) {
      console.log(error);
    });

  getEle("tenSP").disabled = true;
}

/**
 * Cập nhật sản phẩm
 */
function updateProduct(id) {
  var tenSP = getEle("tenSP").value;
  var giaSP = getEle("giaSP").value;
  var manHinh = getEle("manHinh").value;
  var camSau = getEle("camSau").value;
  var camTruoc = getEle("camTruoc").value;
  var hinhAnh = getEle("hinhAnh").value;
  var moTa = getEle("moTa").value;
  var loaiSP = getEle("loaiSP").value;

  var isValid = true;
  //giaSp
  isValid &=
    validation.kiemTraRong(giaSP, "tbGiaSP", "Vui lòng nhập giá sản phẩm") &&
    validation.kiemTraGia(
      giaSP,
      "tbGiaSP",
      1000000,
      50000000,
      "Vui lòng nhập giá hợp lệ"
    );

  //manHinh
  isValid &= validation.kiemTraRong(
    manHinh,
    "tbManHinh",
    "Vui lòng nhập thông số màn hình"
  );

  //camSau
  isValid &= validation.kiemTraRong(
    camSau,
    "tbCamSau",
    "Vui lòng nhập thông số camera sau"
  );

  //camTruoc
  isValid &= validation.kiemTraRong(
    camTruoc,
    "tbCamTruoc",
    "Vui lòng nhập thông số camera trước"
  );

  //hinhAnh
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "tbHinhAnh",
    "Vui lòng nhập hình ảnh"
  );

  //moTa
  isValid &=
    validation.kiemTraRong(moTa, "tbMoTa", "Vui lòng nhập mô tả") &&
    validation.kiemTraDoDaiKiTu(
      moTa,
      "tbMoTa",
      20,
      200,
      "Mô tả phải dài hơn 20 và ít hơn 200 kí tự"
    );

  //loaiSP
  isValid &= validation.kiemTraChon(
    "loaiSP",
    "tbLoaiSP",
    "Vui lòng chọn loại sản phẩm"
  );

  if (!isValid) return;

  var product = new Product(
    id,
    tenSP,
    giaSP,
    manHinh,
    camSau,
    camTruoc,
    hinhAnh,
    moTa,
    loaiSP
  );

  service
    .updateProductApi(product)
    .then(function () {
      getProductList();
      document.getElementsByClassName("close")[0].click();
    })
    .catch(function (error) {
      console.log(error);
    });
};

/**
 * Tìm kiếm sản phẩm
 */
// getEle("keyword").addEventListener("keyup", function () {
//   var keyword = getEle("keyword").value;
//   var mangTimKiem = [];
//   danhSachSP.forEach(function (item) {
//     if (item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
//       mangTimKiem.push(item);
//     }
//   });
//   renderProductList(mangTimKiem);
// });

getEle("searchButton").onclick = function () {
  var keyword = getEle("keyword").value;
  var mangTimKiem = [];
  danhSachSP.forEach(function (item) {
    if (item.name.toLowerCase().indexOf(keyword.toLowerCase()) > -1) {
      mangTimKiem.push(item);
    }
  });
  renderProductList(mangTimKiem);
};