// LocalStorage
let products = JSON.parse(localStorage.getItem('products')||"[]");
let editingIndex = null;

// Logo Upload
function uploadLogo(){
  const file = document.getElementById('logoUpload').files[0];
  if(file){
    const reader = new FileReader();
    reader.onload = e => {
      localStorage.setItem('logoImage', e.target.result);
      alert('Logo uploaded successfully!');
    }
    reader.readAsDataURL(file);
  } else alert('Select an image!');
}

// Save Product
function saveProduct(){
  const category = document.getElementById('prodCategory').value;
  const title = document.getElementById('prodTitle').value;
  const desc = document.getElementById('prodDesc').value;
  const price = document.getElementById('prodPrice').value;
  const file = document.getElementById('prodImage').files[0];

  if(!title || !desc || !price){ alert('Fill all fields!'); return; }

  if(editingIndex !== null){
    if(file){
      const reader = new FileReader();
      reader.onload = e=>{
        products[editingIndex]={category,title,desc,price,image:e.target.result};
        localStorage.setItem('products',JSON.stringify(products));
        renderAdminProducts();
        resetForm();
      }
      reader.readAsDataURL(file);
    }else{
      products[editingIndex]={category,title,desc,price,image:products[editingIndex].image};
      localStorage.setItem('products',JSON.stringify(products));
      renderAdminProducts();
      resetForm();
    }
  }else{
    if(!file){ alert('Select an image!'); return; }
    const reader = new FileReader();
    reader.onload = e=>{
      products.push({category,title,desc,price,image:e.target.result});
      localStorage.setItem('products',JSON.stringify(products));
      renderAdminProducts();
      resetForm();
    }
    reader.readAsDataURL(file);
  }
}

// Render Admin Products
function renderAdminProducts(){
  const grid = document.getElementById('adminProductGrid');
  grid.innerHTML = '';
  products.forEach((p,i)=>{
    const div = document.createElement('div');
    div.style.display='flex';
    div.style.alignItems='center';
    div.style.justifyContent='space-between';
    div.style.background='#fff';
    div.style.padding='10px';
    div.style.borderRadius='10px';
    div.style.boxShadow='0 2px 6px rgba(0,0,0,0.1)';

    div.innerHTML=`
      <div style="display:flex;align-items:center;gap:10px;">
        <img src="${p.image}" style="width:60px;height:60px;object-fit:cover;border-radius:8px;">
        <div>
          <h4 style="margin:0;color:#222;">${p.title}</h4>
          <p style="margin:0;font-size:0.85rem;color:#555;">₹${p.price}</p>
        </div>
      </div>
      <div>
        <button onclick="editProduct(${i})" style="margin-right:5px;padding:5px 10px;background:blue;color:white;border:none;border-radius:6px;">Edit</button>
        <button onclick="removeProduct(${i})" style="padding:5px 10px;background:red;color:white;border:none;border-radius:6px;">Delete</button>
      </div>
    `;
    grid.appendChild(div);
  });
}

// Edit / Remove Product
function editProduct(i){
  editingIndex=i;
  const p=products[i];
  document.getElementById('prodCategory').value=p.category;
  document.getElementById('prodTitle').value=p.title;
  document.getElementById('prodDesc').value=p.desc;
  document.getElementById('prodPrice').value=p.price;
}

function removeProduct(i){
  if(confirm('Are you sure to remove this product?')){
    products.splice(i,1);
    localStorage.setItem('products',JSON.stringify(products));
    renderAdminProducts();
    resetForm();
  }
}

// Reset Form
function resetForm(){
  document.getElementById('prodCategory').value='';
  document.getElementById('prodTitle').value='';
  document.getElementById('prodDesc').value='';
  document.getElementById('prodPrice').value='';
  document.getElementById('prodImage').value='';
  editingIndex=null;
}

// Initial render
renderAdminProducts();
