let products = [
  { id: 1, pic: 'https://picsum.photos/id/1/200/300', name: 'Samsung Galaxy S23', price: 34.999, category: 'Elektronik', stock: 10 },
  { id: 2, pic: 'https://picsum.photos/id/2/200/300', name: 'IPhone 15 Pro', price: 64.999, category: 'Elektronik', stock: 5 },
  { id: 3, pic: 'https://picsum.photos/id/3/200/300', name: 'Xiaomi 13', price: 39.999, category: 'Elektronik', stock: 10 },
  { id: 4, pic: 'https://picsum.photos/id/4/200/300', name: 'L’oréal Paris Feline Özel Tasarım Maskara', price: 355, category: 'Kozmetik', stock: 20 },
  { id: 5, pic: 'https://picsum.photos/id/5/200/300', name: 'Maybelline New York Super Ruj', price: 286.90, category: 'Kozmetik', stock: 15 },
  { id: 6, pic: 'https://picsum.photos/id/6/200/300', name: 'Chanel Coco Mademoiselle Edp 50 Ml Parfum', price: 6.700, category: 'Kozmetik', stock: 6 },
  { id: 7, pic: 'https://picsum.photos/id/7/200/300', name: 'Hayvan Çiftliği', price: 24.90, category: 'Kitap', stock: 8 },
  { id: 8, pic: 'https://picsum.photos/id/8/200/300', name: 'Dönüşüm', price: 19.90, category: 'Kitap', stock: 12 },
  { id: 9, pic: 'https://picsum.photos/id/9/200/300', name: 'Sefiller', price: 29.90, category: 'Kitap', stock: 5 },
  { id: 10, pic: 'https://picsum.photos/id/10/200/300', name: 'Y-3 Takumi Sen 9', price: 10.849, category: 'Ayakkabı', stock: 8 },
  { id: 11, pic: 'https://picsum.photos/id/11/200/300', name: 'Nike Alphafly 2', price: 9.999, category: 'Ayakkabı', stock: 6 },
  { id: 12, pic: 'https://picsum.photos/id/12/200/300', name: 'Deviate Nitro 2', price: 4.550, category: 'Ayakkabı', stock: 4 },
  { id: 13, pic: 'https://picsum.photos/id/13/200/300', name: 'Levi’s Slim Fit T-Shirt', price: 500, category: 'Giyim', stock: 20 },
  { id: 14, pic: 'https://picsum.photos/id/14/200/300', name: 'H&M Slim Fit Gömlek', price: 750, category: 'Giyim', stock: 15 },
  { id: 15, pic: 'https://picsum.photos/id/15/200/300', name: 'Zara Skinny Fit Jean Pantolon', price: 999, category: 'Giyim', stock: 10 },
  { id: 16, pic: 'https://picsum.photos/id/16/200/300', name: 'Bosch Çamaşır Makinesi', price: 16.098, category: 'Ev', stock: 3 },
  { id: 17, pic: 'https://picsum.photos/id/17/200/300', name: 'Samsung Buzdolabı', price: 19.018, category: 'Ev', stock: 2 },
  { id: 18, pic: 'https://picsum.photos/id/18/200/300', name: 'Arçelik Bulaşık Makinesi', price: 14.804, category: 'Ev', stock: 5 }
];
  
// ürünleri listeleme fonksiyonu 
function listProducts() {
  const productList = products.map((product, i) => `
    <tr>
      ${window.location.pathname.includes('admin.html') ? `<td><img src="${product.pic}" alt="${product.name}" width="100" height="150"></td>` : ''}
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price} TL</td>
      <td>${product.category}</td>
      <td>${product.stock} adet&nbsp;&nbsp;&nbsp;</td>
      <td><button onclick="addToCart(${i})">Sepete Ekle</button></td>
    </tr>
  `).join('');

  document.getElementById('product-list').innerHTML = productList;
}

// sepete ürün ekleme fonksiyonu
let cart = [];

function addToCart(index) {
  let product = products[index];
  if (product.stock > 0) {
    let cartItem = cart.find(item => item.name === product.name);
    if (cartItem) {
      cartItem.quantity++;
    } else {
      cart.push({ name: product.name, price: product.price, quantity: 1 });
    }
    product.stock--; // Ürün stok sayısını azalt
    listCart();
    listProducts();
  } else {
    alert('Üzgünüz, bu ürün şu anda stokta bulunmamaktadır.');
  }
}

// sepeti listeleme fonksiyonu
function listCart() {
  let cartList = document.getElementById('cart-list');
  cartList.innerHTML = '';
  for (let i = 0; i < cart.length; i++) {
    let cartItem = cart[i];
    let cartItemElement = document.createElement('li');
    cartItemElement.innerHTML = `<span class="quantity">${cartItem.quantity}</span> Adet&nbsp;&nbsp;${cartItem.name} &nbsp;&nbsp; ${cartItem.price} &nbsp;TL`;
    cartItemElement.setAttribute('data-product', cartItem.name);
    cartItemElement.setAttribute('data-price', cartItem.price);
    cartList.appendChild(cartItemElement);
  }
  updateCartTotal();
}


// sepeti güncelleme fonksiyonu
function updateCartTotal() {
  let cartItems = document.querySelectorAll('#cart-list li');
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) {
    let quantity = parseInt(cartItems[i].querySelector('.quantity').innerHTML);
    let price = parseFloat(cartItems[i].getAttribute('data-price'));
    total += quantity * price;
  }
  let cartTotal = document.getElementById('cart-total');
  if (cartTotal) {
    cartTotal.innerHTML = total.toFixed(2);
  }
}

// ürünleri filtreleme fonksiyonu
function filterProducts() {
  const searchValue = document.getElementById('search').value.toLowerCase();
  const categoryValue = document.getElementById('category').value.toLowerCase();
  const filteredProducts = products.filter(({ name, category }) => 
    name.toLowerCase().includes(searchValue) &&
  (!categoryValue || category.toLowerCase() === categoryValue));
  displayFilteredProducts(filteredProducts);
}
    
//  filtrelenmiş ürünleri gösterme fonksiyonu
function displayFilteredProducts(products) {
  let productList = '';
  for (let i = 0; i < products.length; i++) {
    productList += `
      <tr>
        <td>${products[i].id}</td>
        <td>${products[i].name}</td>
        <td>${products[i].price} TL</td>
        <td>${products[i].category}</td>
        <td>${products[i].stock} adet</td>
        <td><button onclick="addToCart(${i})">Sepete Ekle</button></td>
      </tr>`;
  }
  document.getElementById('product-list').innerHTML = productList;
}


// liste temizleme fonksiyonu
function clearList() {
  products = [];
  listProducts();
}

// yeni ürün ekleme fonksiyonu
function addProduct() {
  const pic = prompt("Ürün resim linkini giriniz:");
  const id = prompt("Ürün id'si giriniz:");
  const name = prompt("Ürün adını giriniz:");
  const price = parseFloat(prompt("Ürün fiyatını giriniz:"));
  const category = prompt("Ürün kategorisini giriniz:");
  const stock = parseInt(prompt("Ürün stok sayısını giriniz:"));

  const newProduct = { id, pic, name, price, category, stock };
  products.push(newProduct);

  listProducts();
}


// istenilen ürünü getirme fonksiyonu
function getProductById() {
  const productId = parseInt(prompt("Lütfen ürün ID'sini girin:"));
  const product = products.find(product => product.id === productId);

  if (product) {
    const filteredProducts = [product];
    displayFilteredProducts(filteredProducts);
  }
};

function displayFilteredProducts(products) {
  let productList = products.map(product => `
    <tr>
      ${window.location.pathname.includes('admin.html') ? `<td><img src="${product.pic}" alt="${product.name}" width="100" height="150"></td>` : ''}
      <td>${product.id}</td>
      <td>${product.name}</td>
      <td>${product.price} TL</td>
      <td>${product.category}</td>
      <td>${product.stock} adet</td>
      <td><button onclick="addToCart(${product.id})">Sepete Ekle</button></td>
    </tr>`).join('');
  document.getElementById('product-list').innerHTML = productList;
}

// ürün güncelleme fonksiyonu
const updateProduct = () => {
  const productId = prompt("Lütfen güncellenecek ürünün ID'sini girin:");
  const updatedName = prompt("Lütfen yeni ürün adını girin:");
  const updatedPrice = prompt("Lütfen yeni ürün fiyatını girin:");
  const updateCategory = prompt("Lütfen yeni kategori ismini girin:");
  const updateStock = prompt("Lütfen yeni stok miktarını girin:");
  const product = products.find(product => product.id == productId);

  if (product) {
    product.name = updatedName;
    product.price = updatedPrice;
    product.category = updateCategory;
    product.stock = updateStock;

    listProducts();
    alert(`Güncellenen ürün ID'si: ${productId}, Yeni adı: ${updatedName}, Yeni fiyatı: ${updatedPrice}, Yeni kategori: ${updateCategory}, Yeni stok: ${updateStock}`);
  }
};

// ürün silme fonksiyonu
const deleteProduct = () => {
  const productId = prompt("Lütfen silinecek ürünün ID'sini girin:");
  const productIndex = products.findIndex(product => product.id == productId);

  if (productIndex !== -1) {
    products.splice(productIndex, 1);
    listProducts();
    alert(`${productId} numaralı ürün silindi!`);
  }
};

window.onload = function() {
  listProducts();
};