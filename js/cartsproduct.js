let product = document.querySelector(".products");
let noitemDom = document.querySelector(".noitem");
let favourit = document.querySelector(".parent-favourit-cart");
let noitemfavouritDom = document.querySelector(".no-product-favorit");
let totalprice = document.querySelector(".total-price ");
let totalpriceDom = document.querySelector(".total-price p span");
let btnremove = document.querySelector(".product-item-action button");


function drawproductscatUI(allproducts = []) {
  let products = JSON.parse(localStorage.getItem("productcart")) || allproducts;
  let productsui = products.map((item) => {
    return `
          <div class="product-item">
                                  <img src="${item.imageurl}" class="product-item-image" alt="">
  
                              <div class="product-item-info">
                                  <p>product:${item.product}</p>
                                  <p>price:${item.price}</p>
                                  <p>catagory:${item.catagory}</p> 
                                  <p class="qty">quntatie:${item.qty}</p>
                                  <div class="product-item-info-icon">
                                  <i class="fa-solid fa-plus" onclick="add(${item.id})"></i>
                                  <i class="fa-solid fa-minus"onclick="miuns(${item.id})"></i>
                                  </div>
                              </div>
                              <div class="product-item-action">
                                  <button class="remove" onclick="removefromcard(${item.id})">Remove </button>
                              </div>
                          </div>
      `;
  });
  product.innerHTML = productsui.join("");
}
drawproductscatUI();


function add(id) {
  let products = JSON.parse(localStorage.getItem("productcart"));

  let product = products.find((item) => item.id === id);
let isproductincart = products.some((i) => i.id === product.id);
  if (isproductincart) {
    products = products.map((p) => {
      if (p.id === product.id) {
        p.qty += 1;
       
      }
      return p;
    });
  } else {
  }
  localStorage.setItem("productcart", JSON.stringify(products));
  total()
  drawproductscatUI();
}


function miuns(id) {
  let products = JSON.parse(localStorage.getItem("productcart"));

  let product = products.find((item) => item.id === id);
  let isproductincart = products.some((i) => i.id === product.id);
  if (isproductincart) {
    products = products.map((p) => {
      if (p.id === product.id){
        p.qty -= 1;
        if(p.qty < 1)  {
         p.qty =1;
        }
      } 
      return p;
    });
  } else {
  }
  localStorage.setItem("productcart", JSON.stringify(products));
  total()
 
  drawproductscatUI();
}


function total(){
  let totalprice =0;
  let products = JSON.parse(localStorage.getItem("productcart"));

  products.map((m)=>{
    totalprice  += parseInt(m.price) *parseInt(m.qty); 
}) 
      localStorage.setItem("totalprice",JSON.stringify(totalprice));
      totalpriceDom.innerHTML="";
     totalpriceDom.innerHTML =totalprice+ "$";

}
total();


function removefromcard(id) {
  let productincart = localStorage.getItem("productcart");
  if (productincart) {
    let items = JSON.parse(productincart);
    let filterd = items.filter((item) => item.id != id);
    localStorage.setItem("productcart", JSON.stringify(filterd));
    
    drawproductscatUI();
    total()
    
  }
}



function drawproductscatUIfavourit(allproducts = []) {
  let products =
    JSON.parse(localStorage.getItem("products")) || allproducts;
  let productsui = products.map((item) => {
    if(item.liked){
      return `
      <div class="product-item">
                              <img src="${item.imageurl}" class="product-item-image" alt="">

                          <div class="product-item-info">
                              <p>product:${item.product}</p>
                              <p>price:${item.price}</p>
                              <p>catagory:${item.catagory}</p>
                              <p class="qty">quntatie:${item.qty}</p>

                          </div>

                          <div class="product-item-action">
                              <button class="remove" onclick="removefromfavorit(${item.id})">Remove from favorit</button>
                          </div>
                      </div>
  `;
    }else{
      return``
    }
   
  });
  favourit.innerHTML = productsui.join("");
}
drawproductscatUIfavourit();
function removefromfavorit(id) {
  // اول حاجه نجيب المنتجات من اللوكل استورج
  let productsfavourit = localStorage.getItem("products");
  // نتشك لو فيه داتا ولا لا
  if (productsfavourit) {
    // نحول الداتا الي جايه عشان نعرف نتعامل معاها
    let items = JSON.parse(productsfavourit);
    //    نمسك الايتم كله من خلال ID ونعمل عليه فلتر
    // let filterd = items.filter((item) => item.id != id);
    //    نخزن الداتا الجديده في اللوكل استورج ونستدعي فنكشن ال دروو
  let products=  items.map((item)=>{
      if(item.id===id){
        item.liked=false;
        return item;
      }else return item;
    })

    localStorage.setItem("products", JSON.stringify(products));
    drawproductscatUIfavourit();
  }
}
