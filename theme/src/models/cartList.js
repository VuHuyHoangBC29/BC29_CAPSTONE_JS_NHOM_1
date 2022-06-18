class CartList {
  cartList = [];

  addCartItem(cartItem) {
    this.cartList = [...this.cartList, cartItem];
  }

  removeCartItem(id) {
    this.cartList = this.cartList.filter((ele) => ele.id !== id);
  }
}
