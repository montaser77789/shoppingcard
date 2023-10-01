let productname =document.getElementById("product-product");
let productprice =document.getElementById("product-price");
let productcatagory=document.getElementById("product-catagory");
let createform = document.getElementById("create-form");
let uploadfile = document.getElementById("upload-image-file");


let products =productsbb;
let productcatagoryvalue;
let productimage;


// events
productcatagory.addEventListener("change" , getcatagoryvalue);
createform.addEventListener("submit",createproductitem)
uploadfile.addEventListener("change",ubloadimage)
 
// function
function getcatagoryvalue(e){
    productcatagoryvalue =e.target.value;
}
function createproductitem(e){
    e.preventDefault()
    let allproducts =JSON.parse(localStorage.getItem("products")) ||productsbb ;
    let nameproduct= productname.value;
    let price =productprice.value;

  if(nameproduct && nameproduct){
    let obj ={
        id:allproducts.length +1,
        product:nameproduct,
        imageurl:productimage,
        price:price,
        catagory:productcatagoryvalue,
        qty:1
    }

    let newproduct =[...allproducts,obj]
    localStorage.setItem("products" ,JSON.stringify(newproduct));
    productname.value="";
    productprice.value="";
    productcatagory.value="";
  }else{
    alert("Enter Data")
  }

}
function ubloadimage(){
    let file= this.files[0];
    

   let types =["image/jpeg" ,"image/png"];
   
   if(types.indexOf(file.type) ==-1 ){
    alert("type Not Suported");
    return;
   }
   if(file.size>2*1024*1024){
    alert("image Not Exected 2Mega")
   }
  //  productimage =URL.createObjectURL(file);

getimagebase64(file)
}

function getimagebase64(file){
 let reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload =function(){
    productimage =reader.result;
  }
}