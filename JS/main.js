var ProductName=document.getElementById("ProductName");
var ProductPrice=document.getElementById("ProductPrice");
var ProductCategory=document.getElementById("ProductCategory");
var ProductDesc=document.getElementById("ProductDesc");
var addBtn=document.getElementById("addBtn");
var inputs=document.getElementsByClassName("form-control");
var searchInput=document.getElementById("search");
var nameAlert=document.getElementById("nameAlert");
var products=[];
var currentIndex=0;

ProductName.onkeyup=function(){
    var nameRejex=/^[A-Z][a-z]{2,8}$/;
    if(!nameRejex.test(ProductName.value))
    {
       addBtn.disabled="true";
       ProductName.classList.add("is-invalid");
       ProductName.classList.remove("is-valid");
       nameAlert.classList.remove("d-none");
       return false;
    }
    else{
        addBtn.removeAttribute("disabled");
        ProductName.classList.add("is-valid");
        ProductName.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
        return true;
    }
}

if(JSON.parse(localStorage.getItem("productsList"))!=null)
{
  products=JSON.parse(localStorage.getItem("productsList"));
  disPlayData();
}

function addProduct(){
    var product=
    {
        name:ProductName.value,
        price:ProductPrice.value,
        category:ProductCategory.value,
        description:ProductDesc.value,
    }
    products.push(product);
    localStorage.setItem("productsList",JSON.stringify(products));
}

function disPlayData(){
   var trs='';
    for(var i=0 ; i<products.length;i++ ){
        trs+=`<tr>
                <td>${i+1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].description}</td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="getProductInfo(${i})" class="btn btn-warning">Up Date</button></td>
            </tr>`
    }
    document.getElementById("tableBody").innerHTML=trs;
}

addBtn.onclick=function(){
    if(addBtn.innerHTML=="Add Product"){
        addProduct();
    }
    else{
        updateProduct();
    }
    disPlayData();
    clearForm();
}

function clearForm(){
  for(var i=0 ; i<inputs.length ;i++){
      inputs[i].value="";
  }
}

function deleteProduct(index){
   products.splice(index,1);
   disPlayData();
   localStorage.setItem("productsList",JSON.stringify(products));
}

searchInput.onkeyup=function(){
    var trs='';
    var val=searchInput.value;
    for(var i=0 ; i<products.length;i++ ){
        if(products[i].name.toLowerCase().includes(val.toLowerCase()))
        {
            trs+=`<tr>
                <td>${i+1}</td>
                <td>${products[i].name}</td>
                <td>${products[i].price}</td>
                <td>${products[i].category}</td>
                <td>${products[i].description}</td>
                <td><button onclick="deleteProduct(${i})" class="btn btn-danger">Delete</button></td>
                <td><button onclick="editProduct(${i})" class="btn btn-warning">Up Date</button></td>
                </tr>`
        }
    }
    document.getElementById("tableBody").innerHTML=trs;
}

function search(val){
}

function getProductInfo(index){

    ProductName.value=products[index].name;
    ProductPrice.value=products[index].price;
    ProductCategory.value=products[index].category;
    ProductDesc.value=products[index].description;
    addBtn.innerHTML="Update Product";
    currentIndex=index;
}

function updateProduct(){
    var product=
    {
        name:ProductName.value,
        price:ProductPrice.value,
        category:ProductCategory.value,
        description:ProductDesc.value,
    }
    products[currentIndex]=product;
    localStorage.setItem("productsList",JSON.stringify(products));
}
