let product =document.querySelector(".products")
let cartproductDom =document.querySelector(".carts-product div")
let cartproduct =document.querySelector(".carts-product ")
let page =document.querySelector(".page")
let downcart =document.querySelector(".card-down");
let addremove=document.getElementById("add")
let products = productsbb;


let drawitem;
drawitem =  function (products =[]){
    localStorage.setItem("products",JSON.stringify(products));
    let productcards   =localStorage.getItem("productcart") ? 
    JSON.parse(localStorage.getItem("productcart")): [];
      let productsui =  products.map((item)=>{
        
        return`
            <div class="product-item">
                                    <img src="${item.imageurl}" class="product-item-image" alt="">
    
                                <div class="product-item-info">
                                    <h2 onclick="saveitemdata(${item.id})" >product:${item.product}</h2>
                                    <p>price:${item.price}</p>
                                    <p>catagory:${item.catagory}</p>
                                </div>
    
                                <div class="product-item-action">
                                    <button style="background-color:${productcards.some((i) =>item.id===i.id)===true? "red":""}" onclick="addtocard(${item.id})" > ${productcards.some((i) =>item.id===i.id)===false? "Add To Card":"REMOVE From Card"} </button>
                                    <i class="fa-solid fa-heart" style="color:${item.liked===true? "red":""}" onclick="addtofavourit(${item.id})"></i>
                                    </div>
                            </div>
        `
    })
    product.innerHTML=productsui.join("");
}
drawitem(JSON.parse(localStorage.getItem("products"))|| products);


 
   function addeditems(){
    let addeditem  =localStorage.getItem("productcart") ?
     JSON.parse(localStorage.getItem("productcart")): [];

    if(addeditem){
        addeditem.map((item) =>{
            
            cartproductDom.innerHTML +=`<p>
            ${item.product}  ${item.qty} 
         
          <i class="fa-solid fa-plus" onclick="add(${item.id})"></i>
          <i class="fa-solid fa-minus"onclick="miuns(${item.id})"></i>
          
            </p>`;
        })
        page.style.display="block";
        page.innerHTML += addeditem.length;
    }
   }
   addeditems()
   

function addtocard(id){
    if(localStorage.getItem("username")){
        let  products = JSON.parse(localStorage.getItem("products")) || products;

        localStorage.setItem("products",JSON.stringify(products));
        let addeditem   =localStorage.getItem("productcart") ? 
        JSON.parse(localStorage.getItem("productcart")): [];
     

        let product = products.find((item)=>item.id ===id);
      let isproductincart = addeditem.some((i) => i.id === product.id);
        if(isproductincart){
          
            addeditem=addeditem.filter((p)=>p.id !=product.id)
        }else{
            addeditem.push(product);
            product.num=true;
        }
    cartproductDom.innerHTML="";
    addeditem.forEach((item) =>{
        cartproductDom.innerHTML +=`<p>${item.product} ${item.qty}  
        <i class="fa-solid fa-plus" onclick="add(${item.id})"></i>
        <i class="fa-solid fa-minus"onclick="miuns(${item.id})"></i>
        </p>`;
    })
    localStorage.setItem("productcart",JSON.stringify(addeditem))
    page.style.display="block";
    let cartproductItems =document.querySelectorAll(".carts-product div p");
    page.innerHTML=cartproductItems.length;
    }else{
        window.location="login.html"
    }
    let get =JSON.parse(localStorage.getItem("products"))
    console.log(get);
    drawitem(get);
}


function add(id) {
    if(localStorage.getItem("username")){
        
        let addeditem =localStorage.getItem("productcart") ? 
        JSON.parse(localStorage.getItem("productcart")): [];
        let product = products.find((item)=>item.id ===id);

    let isproductincart = addeditem.some((i) => i.id === product.id);

    if(isproductincart){
        addeditem = addeditem.map((p)=>{
            if(p.id ===product.id) p.qty +=1;
            return p;
        })
    }else{
      
    }
    cartproductDom.innerHTML="";
    addeditem.forEach((item) =>{
        cartproductDom.innerHTML +=`<p>${item.product} ${item.qty} 
        <i class="fa-solid fa-plus" onclick="add(${item.id})"></i>
        <i class="fa-solid fa-minus"onclick="miuns(${item.id})"></i>
        </p>`;
    })


    localStorage.setItem("productcart",JSON.stringify(addeditem))

    page.style.display="block";
    let cartproductItems =document.querySelectorAll(".carts-product div p");
    page.innerHTML=cartproductItems.length;
    }else{
        window.location="login.html"
    }
  }

  function miuns(id) {
    if(localStorage.getItem("username")){
        let addeditem =localStorage.getItem("productcart") ?
         JSON.parse(localStorage.getItem("productcart")): [];

        let product = products.find((item)=>item.id ===id);

    let isproductincart = addeditem.some((i) => i.id === product.id);

    if(isproductincart){
        addeditem = addeditem.map((p)=>{
            if(p.id ===product.id) {
                p.qty -=1;
                 localStorage.setItem("productcart",JSON.stringify(addeditem));
                if(p.qty <= 1)  {
                    removefromcard(id)
                   }
            }
            return p;
        })
    }else{
       
    }
    cartproductDom.innerHTML="";
    addeditem.forEach((item) =>{
        cartproductDom.innerHTML +=`<p>${item.product} ${item.qty} 
        <i class="fa-solid fa-plus" onclick="add(${item.id})"></i>
        <i class="fa-solid fa-minus"onclick="miuns(${item.id})"></i>
        </p>`;
    })



    page.style.display="block";
    let cartproductItems =document.querySelectorAll(".carts-product div p");
    page.innerHTML=cartproductItems.length;
    }else{
        window.location="login.html"
    }
  }

  function removefromcard(id) {

    if(localStorage.getItem("username")){


      

    let productcart=  localStorage.getItem("productcart");
    if(productcart){
        items = JSON.parse(productcart)
       let filterditem= items.filter((item) =>item.id !== id);
    //    console.log(filterditem);
       localStorage.setItem("productcart",JSON.stringify(filterditem))

       cartproductDom.innerHTML="";
       filterditem.forEach((item) =>{
           cartproductDom.innerHTML +=`<p>${item.product} ${item.qty} 
           <i class="fa-solid fa-plus" onclick="add(${item.id})"></i>
           <i class="fa-solid fa-minus"onclick="miuns(${item.id})"></i>
           </p>`;
       })
    }
        

      
    }else{
        window.location="login.html"
    }
  }


function getuniquearr(arr,filtertype){
    let uniqe = arr.map((item  => item[filtertype]))
    .map((item ,i ,final)=> final.indexOf(item) === i && i)
    .filter((item) => arr[item])
    .map((item) => arr[item]);
    return uniqe;
}


downcart.addEventListener("click",opencartmenu)
function opencartmenu(){
    if(cartproduct!=""){
        if(cartproduct.style.display=="none"){
            cartproduct.style.display="block"
        }else{
            cartproduct.style.display="none"
        }
    }
}

function saveitemdata(id){
    localStorage.setItem("productid",id);
    window.location = "deatels.html"
}

let moodsearch ="title";
let inputsearch =document.getElementById("input-search");

function search (id){
    if(id=="searchbytitle"){
        moodsearch ="title";
        inputsearch.placeholder="search by product"
    }else{
        moodsearch ="catagory";
        inputsearch.placeholder="search by catagory"

    }
    inputsearch.focus()
}

inputsearch.addEventListener("keyup",function(e){
        searchdata(e.target.value,products)
    if(e.target.value.trim()===""){
        drawitem(JSON.parse(localStorage.getItem("products")))
    }

})

function searchdata(product , myarry){

    if( moodsearch ==="title"){
        console.log(myarry);
    let arr = myarry.filter((item )=> item.product.includes(product) !== false);
    drawitem(arr);
    }else{
        let arr = myarry.filter((item )=> item.catagory.indexOf(product) !== -1);
    drawitem(arr);
    }
}
function addtofavourit(id) {
    if(localStorage.getItem("username")){

        let products = localStorage.getItem("products") ?
         JSON.parse(localStorage.getItem("products")):productsbb;
        
        let product = products.find((item)=>item.id === id);
        let isproductincart =products.some((i)=>i.id===product.id)
        if(isproductincart){
            products= products.map((p)=>{
                if(p.id===product.id) p.liked=true
                    return p
            })
        }else{
            product.liked=true;
            products.push(product);
        }
        // product.liked=true;
        // favourit=[...favourit,product]
    //    let uniqe= getuniquearr(favourit,"id")
        // localStorage.setItem("productsfavourit",JSON.stringify(favourit))
        // products.map((item)=>{
        //     if(item.id===product.id){
        //         item.liked=true;
        //     }
        // })
        localStorage.setItem("products",JSON.stringify(products))
        drawitem(products)
    }else{
        window.location="login.html"
    }
}










