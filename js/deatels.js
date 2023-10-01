let products = JSON.parse(localStorage.getItem("products"))
let productid = localStorage.getItem("productid")
let productdeatels = products.find((item) => item.id ==productid);
let productdom = document.querySelector(".item-deatels")

productdom.innerHTML =` <img src="${productdeatels.imageurl}" alt="">
<h2>${productdeatels.price}</h2>
`