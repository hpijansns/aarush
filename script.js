// Logo Upload
function uploadLogo(event){
  const file = event.target.files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = e => {
      localStorage.setItem("siteLogo", e.target.result);
      alert("✅ Logo updated successfully!");
    };
    reader.readAsDataURL(file);
  }
}

// Product Storage
let products = JSON.parse(localStorage.getItem("products")) || [];

function addProduct(){
  const title = document.getElementById("prodTitle").value;
  const desc = document.getElementById("prodDesc").value;
  const price = document.getElementById("prodPrice").value;
  const imageFile = document.getElementById("prodImage").files[0];

  if(!title || !desc || !price || !imageFile){
    alert("⚠️ Please fill all fields!");
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    const product = {title, desc, price, img:e.target.result};
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    renderAdminProducts();
    alert("✅ Product added successfully!");
  };
  reader.readAsDataURL(imageFile);
}

function renderAdminProducts(){
  const list = document.getElementById("adminProductList");
  if(!list) return;
  list.innerHTML = "";
  products.forEach((p, i) => {
    list.innerHTML += `
      <div>
        <img src="${p.img}">
        <h4>${p.title}</h4>
        <p>₹${p.price}</p>
        <button onclick="deleteProduct(${i})">Delete</button>
      </div>
    `;
  });
}

function deleteProduct(i){
  products.splice(i,1);
  localStorage.setItem("products", JSON.stringify(products));
  renderAdminProducts();
}

renderAdminProducts();
