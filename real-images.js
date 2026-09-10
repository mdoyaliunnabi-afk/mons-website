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
'https://images.casativo.ch/images/product_images/popup_images/ch8248_1.jpg',
'https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1527814050087-3793815479db?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1600086827875-a63b01f1335c?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1625842268584-8f3296236761?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1556656793-08538906a9f8?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1519834785169-98be25ec3f84?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=1200&q=80',
'https://images.unsplash.com/photo-1584464491033-06628f3a6b7b?auto=format&fit=crop&w=1200&q=80'
];
const MONS_EXTRA_PRODUCTS=[
['keyboard','Wireless Keyboard','Slim wireless keyboard for laptops, tablets and home office desks.',65,'⌨️'],
['mouse','Wireless Mouse','Comfortable wireless mouse for office, study and everyday computer use.',35,'🖱️'],
['holder','Car Phone Holder','Adjustable phone holder for navigation, calls and daily driving.',32,'🚗'],
['charger','Fast USB Charger','Compact wall charger for compatible phones and everyday devices.',45,'🔌'],
['cable','Multi Charging Cable','Convenient multi-connector charging cable for compatible devices.',25,'🔗'],
['nightlight','Motion Sensor Night Light','Compact sensor light for bedrooms, halls, wardrobes and stairs.',29,'🌙'],
['storage','Foldable Storage Box','Practical organizer for clothes, toys and household items.',38,'📦'],
['neckfan','Portable Neck Fan','Hands-free rechargeable fan for commuting, travel and outdoor use.',59,'🌀'],
['scale','Digital Kitchen Scale','Compact digital scale for cooking, baking and everyday kitchen use.',33,'⚖️'],
['organizer','Desk Organizer','Multi-compartment organizer for stationery, gadgets and everyday desk items.',31,'🗂️']
];
const MONS_PRODUCT_DESCRIPTIONS=[
'Advanced smartwatch with fitness tracking, call notifications and a stylish everyday design. Great for work, workouts and daily activities.',
'Compact wireless earbuds with a comfortable fit for music, videos and hands-free calls. Easy to carry and ideal for everyday use.',
'Adjustable LED desk lamp designed for study, work and bedside use. Its modern shape provides practical lighting while saving desk space.',
'Portable power bank for keeping smartphones and other compatible devices charged while travelling, working or spending the day outside.',
'Adjustable phone stand that keeps your device at a comfortable viewing angle for calls, videos, meetings, recipes and desk use.',
'Useful home cleaning kit with practical essentials for everyday cleaning around the house, helping you keep surfaces and spaces fresh and tidy.',
'Reusable insulated travel mug designed to help keep drinks hot or cold while commuting, travelling, working or enjoying a day outdoors.',
'Modern reusable water bottle suitable for work, gym and travel. A convenient everyday choice for carrying water while reducing single-use bottles.',
'Compact travel organizer bag with dedicated space for cables, chargers, small gadgets and accessories. Ideal for keeping your travel gear organized.',
'Compact cordless hand vacuum for quick cleaning of desks, cars, furniture and small areas. Handy for everyday dust and crumbs.',
'Slim wireless keyboard for laptops, tablets and home-office desks. A practical everyday accessory for typing and work.',
'Comfortable wireless mouse for office, study and everyday computer use. Compact and easy to carry with a laptop.',
'Adjustable car phone holder for navigation, calls and daily driving. Keeps a compatible phone visible at a convenient angle.',
'Compact USB wall charger for compatible phones and everyday devices. Easy to carry for home, office and travel use.',
'Multi-connector charging cable designed to make everyday device charging more convenient while travelling or working.',
'Motion-sensor night light for bedrooms, hallways, wardrobes and stairs. A compact lighting option for dark areas.',
'Foldable storage box for clothes, toys and household items. Helps keep rooms, shelves and wardrobes organized.',
'Hands-free portable neck fan for commuting, travel and outdoor use. Designed for convenient personal airflow.',
'Compact digital kitchen scale for cooking and baking. Useful for measuring ingredients and everyday kitchen preparation.',
'Multi-compartment desk organizer for stationery, small gadgets and everyday accessories. Keeps a workspace neat and tidy.'
];
function applyMonsExtraProducts(){if(!window.products||window.__monsExtrasAdded)return;MONS_EXTRA_PRODUCTS.forEach(p=>products.push(p));window.__monsExtrasAdded=true}
function applyMonsDescriptions(){if(window.products)products.forEach((p,i)=>{if(MONS_PRODUCT_DESCRIPTIONS[i])p[2]=MONS_PRODUCT_DESCRIPTIONS[i]})}
function renderProductsWithRealImages(){const g=document.getElementById('productGrid');if(!g||!window.products)return;applyMonsExtraProducts();applyMonsDescriptions();g.innerHTML=products.map((p,i)=>`<article class="card"><div class="pic real-pic"><img src="${MONS_REAL_IMAGES[i]||''}" alt="${p[1]}" loading="lazy"></div><span class="tag">Product ${String(i+1).padStart(2,'0')}</span><h3>${p[1]}</h3><p>${p[2]}</p><div class="price-row"><span class="price">AED ${p[3]}</span><div class="product-actions"><button class="mini dark" onclick="openGallery(${i})">View Product</button><button class="mini" onclick="addToCart(${i})">Add to Cart</button><button class="mini buy" onclick="buyNow(${i})">Buy Now</button></div></div></article>`).join('')}
let monsGalleryIndex=0;
function openGallery(i){applyMonsExtraProducts();monsGalleryIndex=i;const g=document.getElementById('gallery'),t=document.getElementById('galleryTitle'),s=document.getElementById('stageSvg'),th=document.getElementById('thumbs');if(!g||!s)return;applyMonsDescriptions();t.textContent=products[i][1];s.innerHTML=`<img src="${MONS_REAL_IMAGES[i]}" alt="${products[i][1]}" style="width:100%;height:100%;object-fit:contain;display:block;background:#f4f5f8"><div style="position:absolute;left:18px;right:18px;bottom:14px;background:#ffffffeb;padding:12px 14px;border-radius:12px;color:#30354a;font-size:13px;line-height:1.45;box-shadow:0 5px 20px #0002">${products[i][2]}</div>`;th.innerHTML=[0,1,2,3].map(n=>`<button class="thumb ${n===0?'active':''}" onclick="monsSetGallery(${n})"><img src="${MONS_REAL_IMAGES[i]}" alt="View ${n+1}" style="width:100%;height:100%;object-fit:cover;display:block"></button>`).join('');g.classList.add('show')}
function monsSetGallery(n){const s=document.getElementById('stageSvg');if(s){applyMonsDescriptions();s.innerHTML=`<img src="${MONS_REAL_IMAGES[monsGalleryIndex]}" alt="${products[monsGalleryIndex][1]}" style="width:100%;height:100%;object-fit:contain;display:block;background:#f4f5f8"><div style="position:absolute;left:18px;right:18px;bottom:14px;background:#ffffffeb;padding:12px 14px;border-radius:12px;color:#30354a;font-size:13px;line-height:1.45;box-shadow:0 5px 20px #0002">${products[monsGalleryIndex][2]}</div>`}document.querySelectorAll('#thumbs .thumb').forEach((b,i)=>b.classList.toggle('active',i===n))}
function galleryMove(dir){monsSetGallery(dir>0?1:3)}
function closeGallery(){const g=document.getElementById('gallery');if(g)g.classList.remove('show')}
(function(){const s=document.createElement('style');s.textContent=`.social{display:none!important}@media(max-width:700px){header .nav{overflow:hidden;align-items:center}header nav{display:flex;flex-wrap:nowrap;overflow-x:auto;max-width:72vw;scrollbar-width:none}header nav::-webkit-scrollbar{display:none}header nav a,header nav button{white-space:nowrap;flex:0 0 auto;font-size:11px;padding:8px 7px}.logo{flex:0 0 auto}.logo b{display:none}}#cartItems .cart-item{display:grid!important;grid-template-columns:76px 1fr auto;align-items:center;gap:12px;padding:14px 0;border-bottom:1px solid var(--line)}#cartItems .mons-cart-pic{width:76px;height:76px;border-radius:13px;overflow:hidden;background:#f4f5f8;border:1px solid var(--line)}#cartItems .mons-cart-pic img{width:100%;height:100%;object-fit:cover;display:block}#cartItems .mons-cart-info{min-width:0}#cartItems .mons-cart-name{font-weight:900;font-size:15px;margin-bottom:4px}#cartItems .mons-cart-desc{font-size:12px;color:var(--muted);line-height:1.35;margin-bottom:5px}#cartItems .mons-cart-price{font-size:13px;font-weight:900;color:#5b3ee8}@media(max-width:600px){#cartItems .cart-item{grid-template-columns:62px 1fr;gap:9px}#cartItems .mons-cart-pic{width:62px;height:62px}#cartItems .qty{grid-column:2;justify-self:start;margin-top:4px}}`;document.head.appendChild(s)})();
(function(){function enrich(){const box=document.getElementById('cartItems');if(!box||!window.products)return;applyMonsExtraProducts();applyMonsDescriptions();box.querySelectorAll('.cart-item').forEach(item=>{let i=products.findIndex(p=>(item.innerText||'').includes(p[1]));if(i<0)return;const q=item.querySelector('.qty');if(!q)return;if(!item.querySelector('.mons-cart-pic')){const pic=document.createElement('div');pic.className='mons-cart-pic';pic.innerHTML=`<img src="${MONS_REAL_IMAGES[i]}" alt="${products[i][1]}">`;item.insertBefore(pic,item.firstChild)}if(!item.querySelector('.mons-cart-info')){const info=document.createElement('div');info.className='mons-cart-info';info.innerHTML=`<div class="mons-cart-name">${products[i][1]}</div><div class="mons-cart-desc">${products[i][2]}</div><div class="mons-cart-price">AED ${products[i][3]} each</div>`;item.insertBefore(info,q)}})}new MutationObserver(()=>setTimeout(enrich,0)).observe(document.body,{childList:true,subtree:true});window.addEventListener('load',()=>{applyMonsExtraProducts();setTimeout(enrich,300);setTimeout(enrich,1000);renderProductsWithRealImages()})})();