(function(){
const groups={
"Men’s Fashion":["Classic Cotton T-Shirt","Slim Fit Polo Shirt","Casual Linen Shirt","Regular Fit Jeans","Stretch Chino Pants","Lightweight Hoodie","Casual Bomber Jacket","Classic Denim Jacket","Formal Dress Shirt","Oxford Casual Shoes","Running Sneakers","Leather Belt","Minimal Wallet","Baseball Cap","Polarized Sunglasses","Cotton Socks Pack","Classic Wrist Watch","Travel Backpack","Crossbody Bag","Lightweight Joggers"],
"Women’s Fashion":["Ribbed T-Shirt","Elegant Blouse","Linen Summer Dress","Wide Leg Jeans","High Waist Trousers","Casual Cardigan","Lightweight Jacket","Denim Jacket","Maxi Dress","Comfort Sandals","Fashion Sneakers","Leather Handbag","Crossbody Purse","Classic Scarf","Fashion Sunglasses","Cotton Socks Pack","Minimal Watch","Everyday Tote Bag","Travel Backpack","Comfort Joggers"],
"Beauty":["Hydrating Face Cleanser","Vitamin C Face Serum","Daily Moisturizer","Hyaluronic Acid Serum","Gentle Face Toner","SPF 50 Sunscreen","Lip Balm Set","Matte Lipstick","Liquid Foundation","Makeup Brush Set","Mascara","Eyeliner Pen","Blush Palette","Eyeshadow Palette","Hair Shampoo","Hair Conditioner","Hair Brush","Body Lotion","Body Wash","Perfume Spray"],
"Home & Kitchen":["Nonstick Frying Pan","Stainless Steel Saucepan","Kitchen Knife Set","Bamboo Cutting Board","Digital Kitchen Scale","Electric Kettle","Coffee Maker","Insulated Travel Mug","Glass Food Container Set","Water Bottle","Dinner Plate Set","Ceramic Mug Set","Kitchen Storage Jars","Spice Rack Organizer","Dish Drying Rack","Microfiber Cleaning Kit","LED Desk Lamp","Storage Basket","Foldable Laundry Basket","Home Organizer Set"],
"Gadgets":["Smart Watch","Wireless Earbuds","Bluetooth Speaker","Power Bank","Wireless Charger","USB-C Hub","Mechanical Keyboard","Wireless Mouse","Phone Stand","Fast USB Charger","Multi Charging Cable","Portable Neck Fan","Mini Projector","Smart LED Bulb","Digital Alarm Clock","USB Desk Fan","Tablet Stand","Laptop Cooling Pad","Portable SSD Case","Smart Tracker Tag"],
"Pet Products":["Adjustable Dog Collar","Reflective Dog Leash","Dog Harness","Soft Pet Bed","Pet Feeding Bowl","Automatic Water Bowl","Interactive Dog Toy","Rubber Chew Toy","Dog Grooming Brush","Pet Nail Clipper","Cat Collar","Cat Scratching Mat","Cat Toy Ball Set","Cat Litter Scoop","Pet Travel Carrier","Pet Food Storage Box","Pet Bath Towel","Pet Waste Bag Holder","Pet Cooling Mat","Pet Blanket"],
"Electronics":["Smart LED TV","Bluetooth Soundbar","Noise Cancelling Headphones","Wireless Earbuds Pro","Smart Watch Pro","Android Tablet","Laptop Computer","USB Webcam","WiFi Router","Bluetooth Keyboard","Wireless Mouse Pro","Portable Power Bank","Fast Wall Charger","USB-C Dock","HDMI Adapter","Portable Bluetooth Speaker","Smart Home Camera","LED Monitor","External SSD","Gaming Controller"],
"Accessories":["Everyday Backpack","Leather Wallet","Card Holder","Travel Organizer","Key Holder","Minimal Sunglasses","Classic Cap","Leather Belt","Phone Case","Laptop Sleeve","Cable Organizer","Travel Pouch","Waterproof Pouch","Passport Holder","Luggage Tag","Reusable Shopping Bag","Compact Umbrella","Travel Pillow","Sports Water Bottle","Keychain"]};
const colors=["Black","White","Blue","Beige","Green"];
let id=1;const out=[];
for(const cat of Object.keys(groups)){
  groups[cat].forEach((name,i)=>{
    const pid=id++, keyword=name.replace(/[^a-zA-Z0-9 ]/g,' ').trim();
    const image=`https://loremflickr.com/700/700/${encodeURIComponent(keyword)}?lock=${pid}`;
    out.push({id:pid,name,description:`${name} designed for practical everyday use. Quality-focused MONS selection with a modern look, useful features and comfortable handling.`,category:cat,brand:`MONS ${cat==='Beauty'?'Beauty':cat==='Pet Products'?'Pet':'Store'}`,price:25+(i%10)*7+(cat.length%5)*3,image,gallery:[image,`https://loremflickr.com/700/700/${encodeURIComponent(keyword)}?lock=${pid+1000}`],stock:'In Stock',colors});
  });
}
window.MONS_PRODUCTS=out;
function img(p){return p.image||`https://loremflickr.com/700/700/${encodeURIComponent(p.name)}?lock=${p.id}`}
window.dailyImage=img;
window.render=function(list,q=''){
  const g=document.getElementById('productGrid');if(!g)return;
  g.innerHTML=list.map(p=>`<article class="card"><div class="pic mons-view-pic" onclick="monsOpenProduct(${p.id})" role="button" tabindex="0" aria-label="View ${p.name}"><img src="${img(p)}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='https://loremflickr.com/700/700/${encodeURIComponent(p.name)}?lock=${p.id+5000}'></div><span class="tag">${p.brand}</span><h3>${p.name}</h3><p>${p.description}</p><div class="meta"><span>${p.stock}</span><span>${p.category}</span></div><div class="price-row"><span class="price">AED ${Number(p.price).toFixed(2)}</span><div class="product-actions"><button class="mini" type="button" onclick="event.stopPropagation();monsAdd(${p.id})">Add to Cart</button><button class="mini buy" type="button" onclick="event.stopPropagation();monsBuy(${p.id})">Buy Now</button></div></div></article>`).join('');
  const r=document.getElementById('resultText');if(r)r.textContent=q?`Showing ${list.length} products for “${q}”`:`Showing all ${list.length} products`;
  const e=document.getElementById('empty');if(e)e.style.display=list.length?'none':'block';
};
window.search=function(q=''){q=q.toLowerCase().trim();window.render(window.MONS_PRODUCTS.filter(p=>(p.name+' '+p.description+' '+p.category+' '+p.brand).toLowerCase().includes(q)),q)};
window.monsOpenProduct=function(pid){location.href='view.html?id='+encodeURIComponent(pid)};
window.monsAdd=function(pid){const p=window.MONS_PRODUCTS.find(x=>String(x.id)===String(pid));if(!p)return;let c=JSON.parse(localStorage.getItem('monsCart')||'[]'),x=c.find(a=>String(a.id)===String(p.id));if(x)x.qty=Number(x.qty||1)+1;else c.push({id:p.id,name:p.name,price:Number(p.price),image:img(p),qty:1});localStorage.setItem('monsCart',JSON.stringify(c));const n=document.getElementById('cartCount');if(n)n.textContent=c.reduce((s,a)=>s+Number(a.qty||1),0)};
window.monsBuy=function(pid){window.monsAdd(pid);location.href='cart.html'};
window.addEventListener('load',function(){window.render(window.MONS_PRODUCTS);document.querySelectorAll('.cat').forEach(c=>{const q=(c.dataset.q||'').trim().toLowerCase();if(q){const n=window.MONS_PRODUCTS.filter(p=>p.category.toLowerCase()===q).length;c.textContent=c.textContent.replace(/\s*·\s*\d+$/,'')+' · '+n;}});const n=document.getElementById('cartCount');if(n){const c=JSON.parse(localStorage.getItem('monsCart')||'[]');n.textContent=c.reduce((s,a)=>s+Number(a.qty||1),0)}});
})();

/* MONS navigation repair: keep every header control functional. */
(function(){
  const style=document.createElement('style');
  style.textContent='.mobile-menu.open{display:block!important}.mons-auth{display:flex;align-items:center;gap:6px}.mons-auth a{display:inline-flex;align-items:center;justify-content:center;padding:9px 10px;border-radius:7px;font-size:10px;font-weight:900}.mons-login{border:1px solid #d9d0f5;background:#fff;color:#44346f}.mons-signup{background:linear-gradient(135deg,#6c4cff,#ff3f9b);color:#fff}.mons-cat-link.active{color:#f5d27a!important}@media(max-width:760px){.mons-auth{display:none}}';
  document.head.appendChild(style);
  const nav=document.querySelector('.mainnav');
  if(nav){
    const labels=["Men’s Fashion","Women’s Fashion","Beauty","Home & Kitchen","Gadgets","Pet Products","Electronics"];
    nav.querySelectorAll('a').forEach(a=>{
      const label=a.textContent.trim();
      if(labels.includes(label)){
        a.classList.add('mons-cat-link');
        a.dataset.category=label;
        a.href='#products';
        a.addEventListener('click',function(e){
          e.preventDefault();
          nav.querySelectorAll('.mons-cat-link').forEach(x=>x.classList.remove('active'));
          a.classList.add('active');
          const list=window.MONS_PRODUCTS.filter(p=>p.category===label);
          const input=document.getElementById('searchInput');
          if(input)input.value='';
          if(window.render)window.render(list,label);
          document.getElementById('products')?.scrollIntoView({behavior:'smooth',block:'start'});
        });
      }
    });
    if(!nav.querySelector('a[href="about.html"]'))nav.insertAdjacentHTML('beforeend','<a href="about.html">About</a>');
    if(!nav.querySelector('a[href="contact.html"]'))nav.insertAdjacentHTML('beforeend','<a href="contact.html">Contact</a>');
  }
  const actions=document.querySelector('.nav-actions');
  if(actions && !actions.querySelector('.mons-auth')){
    const auth=document.createElement('div');
    auth.className='mons-auth';
    auth.innerHTML='<a class="mons-login" href="login.html">Log in</a><a class="mons-signup" href="signup.html">Sign up</a>';
    actions.insertBefore(auth,actions.firstChild);
  }
  const menu=document.getElementById('mobileMenu');
  if(menu){
    if(!menu.querySelector('a[href="about.html"]'))menu.insertAdjacentHTML('beforeend','<a href="about.html">About</a>');
    if(!menu.querySelector('a[href="contact.html"]'))menu.insertAdjacentHTML('beforeend','<a href="contact.html">Contact</a>');
    if(!menu.querySelector('a[href="login.html"]'))menu.insertAdjacentHTML('beforeend','<a href="login.html">Log in</a>');
    if(!menu.querySelector('a[href="signup.html"]'))menu.insertAdjacentHTML('beforeend','<a href="signup.html">Sign up</a>');
  }
})();