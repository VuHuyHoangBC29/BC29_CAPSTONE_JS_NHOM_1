var service = new Services();
var product = new Product();
var danhSachSP = [];

function getEle(id) {
  return document.getElementById(id);
}

function getProductList() {
  service
    .getProductApi()
    .then(function () {
      renderProductList(result.data);
      danhSachSP = result.data;
    })
    .catch(function (error) {
      console.log(error);
    });
}

getProductList();

function renderProductList(data) {
  var contentHTML = "";

  data.forEach(function (product, index) {
    contentHTML = `
        <tr>
                <td>${index + 1}</td>
                <td>${product.tenSP}</td>
                <td>${product.giaSP}</td>
                <td>${product.manHinh}</td>
                <td>${product.camSau}</td>
                <td>${product.camTruoc}</td>
                <td>${product.hinhAnh}</td>
                <td>${product.moTa}</td>
                <td>${product.loaiSP}</td>
                <td>
                    <button class="btn btn-info" data-toggle="modal"
                    data-target="#myModal" onclick="editUser(${
                      product.id
                    })">Sửa</button> 
                    <button class="btn btn-danger" onclick="deleteUser(${
                      product.id
                    })">Xóa</button> 
                </td>
            </tr>
        `;
  });

  getEle("tblDanhSachSP").innerHTML = contentHTML;
}
