// Toggle Menus
function toggleMenu(){document.getElementById("navMenu").classList.toggle("show");}
function toggleCart(){document.getElementById("cartPanel").classList.toggle("show");}
function toggleAdmin(){document.getElementById("adminPanel").classList.toggle("show");}

// Upload Logo
function uploadLogo(event){
  const file = event.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = e => document.getElementById("logoImage").src = e.target.result;
    reader.readAsDataURL(file);
  }
}

// Product System
let products = [];

function addProduct(){
  const title = document.getElementById("prodTitle").value;
  const desc = document.getElementById("prodDesc").value;
  const price = document.getElementById("prodPrice").value;
  const imageFile = document.getElementById("prodImage").files[0];
  if(!title || !desc || !price || !imageFile){alert("Fill all fields");return;}

  const reader = new FileReader();
  reader.onload = e => {
    const product = {title,desc,price,img:e.target.result};
    products.push(product);
    renderProducts();
  };
  reader.readAsDataURL(imageFile);
}

function renderProducts(){
  const grid = document.getElementById("productGrid");
  grid.innerHTML = "";
  products.forEach(p=>{
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${p.img}">
      <h3>${p.title}</h3>
      <p>${p.desc}</p>
      <p>₹${p.price}</p>
      <button>Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}
