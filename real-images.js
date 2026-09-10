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
'https://www.pejesmart.com/','https://itlifehack.jp/','https://www.leroymerlin.fr/','https://ctinews.com/','https://www.creationsglf.fr/','https://www.takfajn.sk/','https://www.netzsieger.de/','https://unsplash.com/','https://storage.googleapis.com/fga-public/2023/05/99f744f1-ana66502942_e-zeze.jpg','https://www.casativo.ch/fr/aspirateur-a-main-sans-fil-ch8248.html'
];

function renderProductsWithRealImages(){
 const grid=document.getElementById('productGrid'); if(!grid)return;
 grid.innerHTML=products.map((p,i)=>`<article class="card"><div class="pic real-pic"><img src="${MONS_REAL_IMAGES[i]}" alt="${p[1]}" loading="lazy" onerror="this.style.display='none'"></div><span class="tag">Product ${String(i+1).padStart(2,'0')}</span><h3>${p[1]}</h3><p>${p[2]}</p><div class="price-row"><span class="price">AED ${p[3]}</span><div class="product-actions"><button class="mini dark" onclick="openGallery(${i})">View Product</button><button class="mini" onclick="addToCart(${i})">Add to Cart</button><button class="mini buy" onclick="buyNow(${i})">Buy Now</button><a class="mini" href="${MONS_PRODUCT_SOURCES[i]}" target="_blank" rel="noopener">🎥 Video</a></div></div></article>`).join('');
}

/* Real-photo product gallery: View Product now shows the actual product photo. */
let monsGalleryIndex=0;
function openGallery(i){
 monsGalleryIndex=i;
 const g=document.getElementById('gallery');
 const title=document.getElementById('galleryTitle');
 const stage=document.getElementById('stageSvg');
 const thumbs=document.getElementById('thumbs');
 if(!g||!stage)return;
 title.textContent=products[i][1];
 const makeImg=(url,extra='')=>`<img src="${url}" alt="${products[i][1]}" style="width:100%;height:100%;object-fit:contain;display:block;background:#f4f5f8;${extra}" onerror="this.style.display='none'">`;
 stage.innerHTML=makeImg(MONS_REAL_IMAGES[i]);
 const views=[MONS_REAL_IMAGES[i],MONS_REAL_IMAGES[i],MONS_REAL_IMAGES[i],MONS_REAL_IMAGES[i]];
 thumbs.innerHTML=views.map((url,n)=>`<button class="thumb ${n===0?'active':''}" onclick="monsSetGallery(${n})"><img src="${url}" alt="View ${n+1}" style="width:100%;height:100%;object-fit:cover;display:block"></button>`).join('');
 g.classList.add('show');
}
function monsSetGallery(n){
 const i=monsGalleryIndex;
 const stage=document.getElementById('stageSvg');
 if(stage)stage.innerHTML=`<img src="${MONS_REAL_IMAGES[i]}" alt="${products[i][1]}" style="width:100%;height:100%;object-fit:contain;display:block;background:#f4f5f8">`;
 document.querySelectorAll('#thumbs .thumb').forEach((b,x)=>b.classList.toggle('active',x===n));
}
function galleryMove(dir){monsSetGallery((dir>0?1:3));}
function closeGallery(){const g=document.getElementById('gallery');if(g)g.classList.remove('show');}

/* Keep all header actions visible on small screens. */
(function(){const s=document.createElement('style');s.textContent=`@media(max-width:700px){header .nav{overflow:hidden;align-items:center}header nav{display:flex;flex-wrap:nowrap;overflow-x:auto;max-width:72vw;scrollbar-width:none}header nav::-webkit-scrollbar{display:none}header nav a,header nav button{white-space:nowrap;flex:0 0 auto;font-size:11px;padding:8px 7px}.logo{flex:0 0 auto}.logo b{display:none}}`;document.head.appendChild(s)})();

window.addEventListener('load',renderProductsWithRealImages);
