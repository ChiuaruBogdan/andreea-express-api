window.Cart = {
    API_BASE_URL: "http://localhost:8088",

    getProducts: function () {
        $.ajax({
            url: Cart.API_BASE_URL + "/carts/" + 10,
            method: "GET"
        }).done(function (response) {
            console.log(response);
            Cart.displayProducts(response.products);
        })
    },
    displayProducts: function(products){
        var allProductsHtml = "";

        products.forEach(product => allProductsHtml += Cart.getProductHtml(product));

        $(".shop_table.cart tbody").html(allProductsHtml);

    },


    getProductHtml: function(product) {
        return ` <tr class="cart_item">
                                            <td class="product-remove">
                                                <a title="Remove this item" class="remove" href="#">×</a> 
                                            </td>
                                            <td class="product-thumbnail">
                                                <a href="single-product.html"><img width="145" height="145" alt="poster_1_up" class="shop_thumbnail" src="img/product-thumb-2.jpg"></a>
                                            </td>
                                            <td class="product-name">
                                                <a href="single-product.html">${product.name}</a> 
                                            </td>
                                            <td class="product-price">
                                                <span class="amount">£${product.price}</span> 
                                            </td>
                                            <td class="product-quantity">
                                                <div class="quantity buttons_added">
                                                    <input type="button" class="minus" value="-">
                                                    <input type="number" size="4" class="input-text qty text" title="Qty" value="1" min="0" step="1">
                                                    <input type="button" class="plus" value="+">
                                                </div>
                                            </td>
                                            <td class="product-subtotal">
                                                <span class="amount">£${product.price}</span> 
                                            </td>
                                        </tr>`;

    },

    //messing with the + and - buttons, also trying to add checkout funciton
    //de aici in jos e belea, nu mai sunt activate
    addPlusButton: function (id) {
        var currentValue = $(`.product-quantity-${id}`).find('input.input-text').val(),
            nextValue = parseInt(currentValue) + 1;
        $(`.product-quantity-${id}`).find('input.input-text').val(nextValue);
    },
    addMinusButton: function (id) {
        var currentValue = $(`.product-quantity-${id}`).find('input.input-text').val(),
            nextValue = parseInt(currentValue - 1);
        $(`.product-quantity-${id}`).find('input.input-text').val(nextValue);
    },
    deleteProduct: function (productId) {
        console.log(productId);
        $.ajax({
            url:Cart.API_BASE_URL + "/carts/remove/10/" + productId,
            method:"DELETE"
        }).done(function (response) {
            console.log(response);
            $(`.${productId}`).html('');
            // Cart.displayProducts(response.products);
        })
    },
    updateProductCount: function(productId) {
        var count = $(`.qty${productId}`).val();
        $.ajax({
            url:Cart.API_BASE_URL + "/carts/update/count/10/" + productId + "/" + count,
            method:"PUT"
        }).done(function (response) {
            console.log(response);
            // $(`.${productId}`).html('');
            // Cart.displayProducts(response.products);
        })
    },


    addcheckout: function (productId) {
        return ` <tr>
                                            <td class="actions" colspan="6">
                                                <div class="coupon">
                                                    <label for="coupon_code">Coupon:</label>
                                                    <input type="text" placeholder="Coupon code" value="" id="coupon_code" class="input-text" name="coupon_code">
                                                    <input type="submit" value="Apply Coupon" name="apply_coupon" class="button">
                                                </div>
                                                <input type="submit" onclick="Cart.updateProductCount(${productId}); return false;" value="Update Cart" name="update_cart" class="button">
                                                <input type="submit" value="Proceed to Checkout" name="proceed" class="checkout-button button alt wc-forward">
                                            </td>
                                        </tr>`;
    },




};

Cart.getProducts();