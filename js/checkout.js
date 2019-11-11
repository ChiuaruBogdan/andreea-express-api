window.Checkout ={

    API_BASE_URL: "http://localhost:8088",


    getProducts: function () {
        $.ajax({
            url:Checkout.API_BASE_URL + "/carts/" + 15,
            method:"GET"
        }).done(function (response) {
            console.log(response);
            Cart.displayProducts(response.products);
        })

    },



}