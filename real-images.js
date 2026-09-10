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

let monsGalleryIndex=0;
function openGallery(i){
 monsGalleryIndex=i;
 const g=document.getElementById('gallery'),title=document.getElementById('galleryTitle'),stage=document.getElementById('stageSvg'),thumbs=document.getElementById('thumbs');
 if(!g||!stage)return;
 title.textContent=products[i][1];
 stage.innerHTML=`<img src="${MONS_REAL_IMAGES[i]}" alt="${products[i][1]}" style="width:100%;height:100%;object-fit:contain;display:block;background:#f4f5f8">`;
 const views=[MONS_REAL_IMAGES[i],MONS_REAL_IMAGES[i],MONS_REAL_IMAGES[i],MONS_REAL_IMAGES[i]];
 thumbs.innerHTML=views.map((url,n)=>`<button class="thumb ${n===0?'active':''}" onclick="monsSetGallery(${n})"><img src="${url}" alt="View ${n+1}" style="width:100%;height:100%;object-fit:cover;display:block"></button>`).join('');
 g.classList.add('show');
}
function monsSetGallery(n){
 const i=monsGalleryIndex,stage=document.getElementById('stageSvg');
 if(stage)stage.innerHTML=`<img src="${MONS_REAL_IMAGES[i]}" alt="${products[i][1]}" style="width:100%;height:100%;object-fit:contain;display:block;background:#f4f5f8">`;
 document.querySelectorAll('#thumbs .thumb').forEach((b,x)=>b.classList.toggle('active',x===n));
}
function galleryMove(dir){monsSetGallery((dir>0?1:3));}
function closeGallery(){const g=document.getElementById('gallery');if(g)g.classList.remove('show');}

/* Stable social icons */
(function(){
 const s=document.createElement('style');
 s.textContent=`.social-links a{display:inline-flex!important;align-items:center;justify-content:center;gap:9px;min-height:48px;font-weight:900;line-height:1;border-radius:14px}.social-links .mons-social-icon{width:23px;height:23px;display:inline-block;flex:0 0 23px}.social-links .mons-social-icon svg{width:100%;height:100%;display:block}@media(max-width:600px){.social-links a{min-height:50px;padding:11px 10px}.social-links .mons-social-icon{width:22px;height:22px;flex-basis:22px}}`;
 document.head.appendChild(s);
 const icons={
  wa:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M8.2 17.1 9 14.7a6.4 6.4 0 1 1 2.1 1.1l-2.9 1.3Z" fill="#fff"/><path d="M9.2 9.2c.2-.5.5-.5.8-.5h.4c.2 0 .4.1.5.4l.6 1.3c.1.2.1.4-.1.6l-.4.5c.5 1 1.2 1.6 2.2 2l.5-.5c.2-.2.4-.2.6-.1l1.3.6c.3.1.4.3.4.5v.4c0 .3 0 .6-.5.8-1 .3-2.5-.2-4-1.6-1.4-1.4-2-3-1.7-4Z" fill="currentColor"/></svg>',
  ig:'<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="17.5" cy="6.7" r="1.2" fill="currentColor"/></svg>',
  tt:'<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M14 4v10.1a4.5 4.5 0 1 1-3-4.2V7.2c1.4 1.2 3.1 1.8 5 1.8V6.1c-1-.3-1.8-1-2-2.1H14Z" fill="currentColor"/></svg>',
  fb:'<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="10" fill="currentColor"/><path d="M13.5 19v-6h2l.3-2.3h-2.3V9.2c0-.7.2-1.2 1.2-1.2h1.2V6c-.3 0-.9-.1-1.8-.1-1.8 0-3 1.1-3 3.1v1.7H9v2.3h2.1v6h2.4Z" fill="#fff"/></svg>'
 };
 function apply(){document.querySelectorAll('.social-links a').forEach(a=>{const cls=['wa','ig','tt','fb'].find(x=>a.classList.contains(x));if(!cls)return;const label=cls==='wa'?'WhatsApp':cls==='ig'?'Instagram':cls==='tt'?'TikTok':'Facebook';a.innerHTML=`<span class="mons-social-icon">${icons[cls]}</span><span>${label}</span>`;});}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',apply);else apply();
})();

/* Keep all header actions visible on small screens. */
(function(){const s=document.createElement('style');s.textContent=`@media(max-width:700px){header .nav{overflow:hidden;align-items:center}header nav{display:flex;flex-wrap:nowrap;overflow-x:auto;max-width:72vw;scrollbar-width:none}header nav::-webkit-scrollbar{display:none}header nav a,header nav button{white-space:nowrap;flex:0 0 auto;font-size:11px;padding:8px 7px}.logo{flex:0 0 auto}.logo b{display:none}}`;document.head.appendChild(s)})();

/* Cart product details: add image, description and price to every cart item without changing the existing cart logic. */
(function(){
 const s=document.createElement('style');
 s.textContent=`#cartItems .cart-item{display:grid!important;grid-template-columns:72px 1fr auto;align-items:center;gap:12px;padding:14px 0}#cartItems .mons-cart-pic{width:72px;height:72px;border-radius:12px;overflow:hidden;background:#f4f5f8;border:1px solid var(--line);display:block}#cartItems .mons-cart-pic img{width:100%;height:100%;object-fit:cover;display:block}#cartItems .mons-cart-info{min-width:0}#cartItems .mons-cart-name{font-weight:900;font-size:15px;margin-bottom:4px}#cartItems .mons-cart-desc{font-size:12px;color:var(--muted);line-height:1.35;margin-bottom:5px}#cartItems .mons-cart-price{font-size:13px;font-weight:900;color:#5b3ee8}#cartItems .qty{white-space:nowrap}@media(max-width:600px){#cartItems .cart-item{grid-template-columns:58px 1fr;gap:9px}#cartItems .mons-cart-pic{width:58px;height:58px}#cartItems .qty{grid-column:2;justify-self:start}}
 `;
 document.head.appendChild(s);
 function enrich(){
  const box=document.getElementById('cartItems');if(!box||!window.products)return;
  box.querySelectorAll('.cart-item').forEach(item=>{
   if(item.querySelector('.mons-cart-info'))return;
   const text=item.innerText||'';
   let idx=-1;
   for(let i=0;i<products.length;i++){if(text.includes(products[i][1])){idx=i;break;}}
   if(idx<0)return;
   const img=document.createElement('div');img.className='mons-cart-pic';img.innerHTML=`<img src="${MONS_REAL_IMAGES[idx]}" alt="${products[idx][1]}">`;
   const info=document.createElement('div');info.className='mons-cart-info';info.innerHTML=`<div class="mons-cart-name">${products[idx][1]}</div><div class="mons-cart-desc">${products[idx][2]}</div><div class="mons-cart-price">AED ${products[idx][3]} each</div>`;
   const qty=item.querySelector('.qty');
   while(item.firstChild)item.removeChild(item.firstChild);
   item.appendChild(img);item.appendChild(info);if(qty)item.appendChild(qty);
  });
 }
 const mo=new MutationObserver(enrich);mo.observe(document.body,{childList:true,subtree:true});
 document.addEventListener('click',e=>{if(e.target.closest('[onclick*="addToCart"],#cartModal,.cart'))setTimeout(enrich,80);});
 window.addEventListener('load',()=>setTimeout(enrich,200));
})();

window.addEventListener('load',renderProductsWithRealImages);
