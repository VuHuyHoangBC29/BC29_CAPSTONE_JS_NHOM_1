class CartList {
    cardList = [];

    addCartItem(cartItem) {
        this.cardList = [...this.cardList, cartItem];
    }
}