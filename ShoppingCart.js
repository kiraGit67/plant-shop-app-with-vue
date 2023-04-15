class ShoppingCart {
  constructor() {
    this.cartContent = [];
    console.log("Initialized Class");
  }

  addToCart(description, price, quantity) {
    const newItem = {
      description,
      price,
      quantity,
    };

    this.cartContent.push(newItem);
  }

  getCartPrice() {
    let total = 0;

    for (let i = 0; i < this.cartContent.length; i++) {
      const item = this.cartContent[i];

      total += item.price * item.quantity;
    }

    return total;
  }

  removeFromCart(description, quantity) {
    if (quantity === undefined) {
      this.cartContent = this.cartContent.filter(function (element) {
        return element.description !== description;
      });

      return;
    }

    for (let i = 0; i < this.cartContent.length; i++) {
      const item = this.cartContent[i];

      if (item.description === description && quantity <= item.quantity) {
        item.quantity -= quantity;
        break;
      }
    }
  }
}
