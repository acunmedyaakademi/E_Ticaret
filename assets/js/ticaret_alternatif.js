let products = [
    { pic: 'https://cdn.vatanbilgisayar.com/Upload/PRODUCT/samsung/thumb/137425-3-1_large.jpg', name: 'Samsung Galaxy S23', price: 34.999, category: 'Elektronik', category:'Cep Telefonu', stock: 5 },
    { pic: 'https://specifications-pro.com/wp-content/uploads/2023/01/iPhone-15-Pro.jpeg', name: 'IPhone 15 Pro', price: 70.999, category: 'Elektronik', category:'Cep Telefonu', stock: 2 },
    { pic: 'https://cdn.akakce.com/z/xiaomi/xiaomi-13.jpg', name: 'Xiaomi 13', price: 39.999, category: 'Elektronik', stock: 15 },
    { pic: 'https://productimages.hepsiburada.net/s/6/1500/9741595181106.jpg', name: 'L’oréal Paris Feline Özel Tasarım Maskara', price: 355, category: 'Kozmetik', stock: 20 },
    { pic: 'https://cdn.akakce.com/z/maybelline/maybelline-new-york-super-stay-vinyl-ink-likit-parlak-110-awestruck.jpg', name: 'Maybelline New York Super Ruj', price: 286.90, category: 'Kozmetik', stock: 15 },
    { pic: 'https://cdn.cimri.io/image/1000x1000/chanelcocomademoiselleedpmlkadnparfm_220991258.jpg', name: 'Chanel Coco Mademoiselle Edp 50 Ml Parfum', price: 6.700, category: 'Kozmetik', stock: 6 },
    { pic: 'https://i.dr.com.tr/cache/600x600-0/originals/0000000105409-1.jpg', name: 'Hayvan Çiftliği', price: 24.90, category: 'Kitap', stock: 8 },
    { pic: 'https://i.dr.com.tr/cache/600x600-0/originals/0000000064022-1.jpg', name: 'Dönüşüm', price: 19.90, category: 'Kitap', stock: 12 },
    { pic: 'https://www.panamayayincilik.com/images/urunler/Sefiller-resim-393.jpg', name: 'Sefiller', price: 29.90, category: 'Kitap', stock: 5 },
    { pic: 'https://cdn-images.italist.com/image/upload/t_medium_mobile_dpr_2_q_auto_v_2,f_auto/85e09fd2b3dc2a24ce88cd87db515d6c.jpg', name: 'Y-3 Takumi Sen 9 / Siyah', price: 10.849, category: 'Ayakkabı', stock: 8 },
    { pic: 'https://static.ticimax.cloud/cdn-cgi/image/width=540,quality=85/2605/uploads/urunresimleri/buyuk/nike-alphafly-2-erkek-yol-yaris-ayakka-431c-b.jpg', name: 'Nike Alphafly 2', price: 9.999, category: 'Ayakkabı', stock: 6 },
    { pic: 'https://images.puma.net/images/376807/03/sv01/fnd/TUR/', name: 'Deviate Nitro 2', price: 4.550, category: 'Ayakkabı', stock: 4 },
    { pic: 'https://johnlewis.scene7.com/is/image/JohnLewis/005898283', name: 'Levi’s Slim Fit T-Shirt', price: 500, category: 'Giyim', stock: 20 },
    { pic: 'https://picsum.photos/id/14/200/300', name: 'H&M Slim Fit Gömlek', price: 750, category: 'Giyim', stock: 15 },
    { pic: 'https://static.zara.net/photos///2023/I/0/2/p/5575/320/822/2/w/1920/5575320822_6_1_1.jpg?ts=1685370984485', name: 'Zara Skinny Fit Jean Pantolon', price: 999, category: 'Giyim', stock: 10 },
    { pic: 'https://cdn.akakce.com/z/bosch/bosch-wax32mhxtr-1600-devir-10-kg.jpg', name: 'Bosch Çamaşır Makinesi 10KG', price: 16.098, category: 'Ev', stock: 3 },
    { pic: 'https://cdn.akakce.com/samsung/samsung-rt53k6360sl-a-cift-kapili-no-frost-z.jpg', name: 'Samsung RT53EK128M Çift Kapılı', price: 19.018, category: 'Ev', stock: 2 },
    { pic: 'https://cdn.akakce.com/z/arcelik/arcelik-6167-beyaz.jpg', name: 'Arçelik 6167 6 Programlı (Beyaz)', price: 14.804, category: 'Ev', stock: 5 }
  ];
const basket = [];
const myProducts = document.querySelector('#myProducts');
const checkOut = document.querySelector('#checkOut');
const basketClearButton = document.querySelector('#basketClearButton');

function renderProducts() {
    myProducts.innerHTML = '';
    for (let i = 0; i < products.length; i++){
        let product = products[i];
        let tableRow = document.createElement('tr');
        tableRow.innerHTML= ` 
        <td>${product.pic}</td>
        <td>${product.name}</td>
        <td>${product.category}</td>
        <td>${product.stock}</td>
        <td><button class="add-to-basket" data-id="${product.id}">Sepete Ekle</button></td>
        `;
        myProducts.appendChild(tableRow);
    }
   
}

function renderBasket(){
    checkOut.innerHTML = '';
    if(basket.length === 0){
        checkOut.innerHTML = "<p>Cimri herif sepete üç beş parça bir şey at</p>"
    }else {
        for(let item of basket){
        basketItem.innerHTML = `
        <td>${item.name}</td>
        <td>Adet: ${item.stock}</td>
        <td>Toplam Tutar: ${item.price * item.stock} ₺</td>
        <button class="remove-from-basket" data-id="${item.id}">Sepetten Çıkart</button>
        `;
    checkOut.appendChild(basketItem);
        }
}
    updatePrice();
}

function updatePrice(){
    let total = 0;
    for(let item of basket){
        total += item.price * item.stock;
    }
    const totalPrice = document.getElementById("totalPrice");
    totalPrice.textContent = `Toplam Tutar: ${total} ₺`;
}

function addToBasket(productId){
    let productIndex = -1;
    for (let i=0; i< products.length; i++){
        if(products[i].id === productId){
            productIndex = i;
            break;
        }
    }
    if (productIndex !==-1 && products[productIndex].stock > 0) {
        let inBasketItemIndex = -1;
        for(let i=0; i < basket.length; i++){
            if(basket[i].id === productId){
                inBasketItemIndex = i;
                break;
            }
        }
        if(inBasketItemIndex !== -1){
            basket[inBasketItemIndex].stock++;
        } else {
            basket.push({
                name: products[productIndex].name,
                price: products[productIndex].price,
                stock: 1
            });
        }
        products[productIndex].stock--;
        renderProducts();
        renderBasket();
    }
};
function removeFromBasket(productId) {
    let basketItemIndex = -1;
    for (let i = 0; i < basket.length; i++) {
        if (basket[i].id === productId) {
            basketItemIndex = i;
            break;
        }
    }
  
    if (basketItemIndex !== -1) {
        let productIndex = -1;
        for (let i = 0; i < products.length; i++) {
            if (products[i].id === productId) {
                productIndex = i;
                break;
            }
        }
  
        if (productIndex !== -1) {
            products[productIndex].stock += basket[basketItemIndex].stock;
        }
  
        basket.splice(basketItemIndex, 1);
        renderProducts();
        renderBasket();
    }
  }
  
  
  
  function clearBasket() {
      for (let i = 0; i < basket.length; i++) {
          const basketItem = basket[i];
          for (let j = 0; j < products.length; j++) {
              const product = products[j];
              if (product.id === basketItem.id) {
                  product.stock += basketItem.stock;
                  break;
              }
          }
      }
      basket.length = 0;
      renderProducts();
      renderBasket();
  }
  
  
  
  myProducts.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("add-to-basket")) {
      const productId = event.target.getAttribute("data-id");
      addToBasket(productId);
    }
  });
  
  
  basketContainer.addEventListener("click", function (event) {
    if (event.target && event.target.classList.contains("remove-from-basket")) {
      const productId = event.target.getAttribute("data-id");
      removeFromBasket(productId);
    }
  });
  
  
  renderProducts();
