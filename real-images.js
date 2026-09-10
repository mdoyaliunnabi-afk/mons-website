const MONS_REAL_IMAGES=[
'https://www.pejesmart.com/cdn/shop/files/Z159-_01_2dc19610-9aec-4829-ae2a-9b8998eabd3b.jpg?v=1726221899&width=1500',
'https://livedoor.blogimg.jp/itlifehack/imgs/7/1/71ed74f8.jpg',
'https://media.adeo.com/mkp/e25d975970559614d1981ef094b95871/media.jpeg?fit=bounds&format=jpg&height=650&quality=80&width=650',
'https://storage.ctinews.com/compression/files/default/cut-1777100799-KybZWpP.png',
'https://www.creationsglf.fr/globalflexit/images/img_base/boutique_article/3229/1920_1080_1_ngbu683-02.jpg',
'https://www.takfajn.sk/Media/EcommerceUpload/Category/shutterstock_1909.jpg',
'https://www.netzsieger.de/mdx/category/3293/thermobecher1d9fd.jpg',
'https://images.unsplash.com/photo-1623684194967-48075185a58c?fm=jpg&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cmV1c2FibGUlMjB3YXRlciUyMGJvdHRsZXxlbnwwfHwwfHx8MA%3D%3D&ixlib=rb-4.1.0&q=60&w=1200',
'https://storage.googleapis.com/fga-public/2023/05/99f744f1-ana66502942_e-zeze.jpg',
'https://images.casativo.ch/images/product_images/popup_images/ch8248_1.jpg'
];

const MONS_PRODUCT_SOURCES=[
'https://www.pejesmart.com/',
'https://itlifehack.jp/',
'https://www.leroymerlin.fr/',
'https://ctinews.com/',
'https://www.creationsglf.fr/',
'https://www.takfajn.sk/',
'https://www.netzsieger.de/',
'https://unsplash.com/',
'https://storage.googleapis.com/fga-public/2023/05/99f744f1-ana66502942_e-zeze.jpg',
'https://www.casativo.ch/fr/aspirateur-a-main-sans-fil-ch8248.html'
];

function renderProductsWithRealImages(){
  const grid=document.getElementById('productGrid');
  if(!grid) return;
  grid.innerHTML=products.map((p,i)=>`<article class="card"><div class="pic real-pic"><img src="${MONS_REAL_IMAGES[i]}" alt="${p[1]}" loading="lazy" onerror="this.style.display='none'"></div><span class="tag">Product ${String(i+1).padStart(2,'0')}</span><h3>${p[1]}</h3><p>${p[2]}</p><div class="price-row"><span class="price">AED ${p[3]}</span><div class="product-actions"><button class="mini dark" onclick="openGallery(${i})">View Product</button><button class="mini" onclick="addToCart(${i})">Add to Cart</button><button class="mini buy" onclick="buyNow(${i})">Buy Now</button><a class="mini" href="${MONS_PRODUCT_SOURCES[i]}" target="_blank" rel="noopener">🎥 Video</a></div></div></article>`).join('');
}

window.addEventListener('load',renderProductsWithRealImages);
