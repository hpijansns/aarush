let products = JSON.parse(localStorage.getItem('products')||"[]");
let cart = JSON.parse(localStorage.getItem('cart')||"[]");

// Render Products
function renderProducts(){
  const grid = document.getElementById('productGrid');
  grid.innerHTML = '';
  products.forEach((p,i)=>{
    const card = document.createElement('div');
    card.className = 'product-card';
    card.innerHTML = `
      <img src="${p.image}" alt="">
      <div class="product-info">
        <h3>${p.title}</h3>
        <p>${p.desc}</p>
        <div class="price">₹${p.price}</div>
        <button onclick="addToCart(${i})">Add to Cart</button>
      </div>`;
    grid.appendChild(card);
  });
}

// Cart Functions
function toggleCart(){ document.getElementById('cartPanel').classList.toggle('show'); }
function addToCart(i){
  let item = {...products[i], qty:1};
  let found = cart.find(c=>c.title===item.title);
  if(found) found.qty++;
  else cart.push(item);
  localStorage.setItem('cart',JSON.stringify(cart));
  renderCart();
}
function renderCart(){
  const cartDiv=document.getElementById('cartItems');
  cartDiv.innerHTML='';
  let total=0;
  cart.forEach((c,i)=>{
    total+=c.price*c.qty;
    const div=document.createElement('div');
    div.innerHTML=`${c.title} - ₹${c.price} x ${c.qty} <button onclick="removeCart(${i})">Remove</button>`;
    cartDiv.appendChild(div);
  });
  document.getElementById('cartTotal').innerText=total;
}
function removeCart(i){ cart.splice(i,1); localStorage.setItem('cart',JSON.stringify(cart)); renderCart(); }
function checkout(){ alert(`Total: ₹${cart.reduce((a,c)=>a+c.price*c.qty,0)}`); cart=[]; localStorage.setItem('cart',JSON.stringify(cart)); renderCart(); }

// Admin Functions
function toggleAdmin(){ document.getElementById('adminPanel').classList.toggle('show'); }
function uploadLogo(){
  const file = document.getElementById('logoUpload').files[0];
  if(file){
    const reader = new FileReader();
    reader.onload=e=>{
      document.getElementById('logoImage').src=e.target.result;
      localStorage.setItem('logo',e.target.result);
    }
    reader.readAsDataURL(file);
  }
}
function saveProduct(){
  const title = document.getElementById('prodTitle').value;
  const desc = document.getElementById('prodDesc').value;
  const price = parseFloat(document.getElementById('prodPrice').value);
  const file = document.getElementById('prodImage').files[0];
  if(!title || !desc || !price || !file){ alert('Fill all fields!'); return; }
  const reader = new FileReader();
  reader.onload=e=>{
    products.push({title,desc,price,image:e.target.result});
    localStorage.setItem('products',JSON.stringify(products));
    renderProducts();
  }
  reader.readAsDataURL(file);
}

// Initial Load
if(localStorage.getItem('logo')) document.getElementById('logoImage').src = localStorage.getItem('logo');
renderProducts();
renderCart();

// Search
function searchProducts(){
  const input = document.getElementById('searchInput').value.toLowerCase();
  document.querySelectorAll('.product-card').forEach(card=>{
    const title = card.querySelector('h3').innerText.toLowerCase();
    card.style.display = title.includes(input)?'block':'none';
  });
}

// Burger Menu
function toggleMenu(){ document.querySelector('nav').classList.toggle('active'); }
