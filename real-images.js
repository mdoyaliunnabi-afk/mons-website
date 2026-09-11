/* MONS storefront product source + cart/checkout helpers.
   IMPORTANT: storefront products come only from catalog-v2.js.
   We intentionally do NOT replace them with Supabase `products` rows here,
   because that caused old/mismatched image URLs to overwrite the catalog. */
(function(){
  const FALLBACK_PRODUCTS = [
    ['Smart Watch Pro','Smartwatch for fitness, calls and notifications.','Electronics','MONS Tech',79],
    ['Wireless Earbuds','Compact wireless earbuds for music and calls.','Electronics','MONS Tech',49],
    ['LED Desk Lamp','Modern adjustable lamp for desk and bedside use.','Home & Kitchen','MONS Home',39],
    ['Power Bank','Portable power for phones and everyday travel.','Electronics','MONS Tech',59],
    ['Phone Stand','Adjustable stand for phones, calls and videos.','Accessories','MONS',29],
    ['Home Cleaning Kit','Practical cleaning essentials for everyday use.','Home & Kitchen','MONS Home',45]
  ];

  function placeholder(p){
    const label=encodeURIComponent((p&&p.name)||'MONS Product');
    return `https://placehold.co/700x700/f4f1ff/24164f?text=${label}`;
  }
  function dailyImage(p){
    return (p && typeof p.image==='string' && p.image.trim()) ? p.image : placeholder(p);
  }
  window.dailyImage=dailyImage;

  function style(){
    if(document.getElementById('monsFinalStyle')) return;
    const s=document.createElement('style'); s.id='monsFinalStyle';
    s.textContent=`body{background:linear-gradient(135deg,#f7f4ff,#fff 45%,#f0f8ff)!important;color:#17122f!important}body:before{opacity:.07!important;filter:none!important}.logo img{filter:none!important}.logo b{background:linear-gradient(90deg,#6c4cff,#ff3f9b,#00b8ff)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}nav a{color:#443b67!important}nav a:hover{background:#f0ebff!important;color:#6c4cff!important}.login,.btn,.app-download a{background:linear-gradient(135deg,#6c4cff,#ff3f9b)!important;color:#fff!important}.signup{color:#6c4cff!important;border-color:#b9adff!important}.cart{background:#f0ebff!important;color:#4f38c5!important}.count{background:#ff3f9b!important}.hero{background:linear-gradient(135deg,#eee9ff,#fff 48%,#e8f9ff)!important}.hero h1{color:#25184f!important}.hero h1 em{background:linear-gradient(90deg,#6c4cff,#ff3f9b,#00b8ff)!important;-webkit-background-clip:text!important;background-clip:text!important;color:transparent!important}.section h2{color:#25184f!important}.pill{color:#5a45b5!important}.price{color:#6c4cff!important}.tag{color:#6c4cff!important}.cta{background:linear-gradient(135deg,#25184f,#6c4cff,#ff3f9b)!important}`;
    document.head.appendChild(s);
  }

  function render(list,q=''){
    const g=document.getElementById('productGrid'); if(!g) return;
    g.innerHTML=list.map(p=>{const src=dailyImage(p);return `<article class="card"><div class="pic mons-view-pic" onclick="monsOpenProduct(${p.id})"><img src="${src}" alt="${p.name}" loading="lazy" onerror="this.onerror=null;this.src='${placeholder(p)}'"></div><span class="tag">${p.brand||'MONS'}</span><h3>${p.name}</h3><p>${p.description||''}</p><div class="meta"><span>${p.stock||'In Stock'}</span><span>${p.category||''}</span></div><div class="price-row"><span class="price">AED ${Number(p.price||0).toFixed(2)}</span><div class="product-actions"><button class="mini" type="button" onclick="event.stopPropagation();monsAdd(${p.id})">Add to Cart</button><button class="mini buy" type="button" onclick="event.stopPropagation();monsBuy(${p.id})">Buy Now</button></div></div></article>`}).join('');
    const r=document.getElementById('resultText'); if(r) r.textContent=q?`Showing ${list.length} product${list.length===1?'':'s'} for “${q}”`:`Showing all ${list.length} products`;
    const e=document.getElementById('empty'); if(e)e.style.display=list.length?'none':'block';
  }
  window.render=render;

  function search(q=''){
    q=q.toLowerCase().trim();
    const products=window.MONS_PRODUCTS||[];
    render(products.filter(p=>(p.name+' '+p.description+' '+p.category+' '+p.brand).toLowerCase().includes(q)),q);
  }
  window.search=search;
  window.monsOpenProduct=id=>{location.href='view.html?id='+encodeURIComponent(id)};

  window.monsAdd=function(id){
    const products=window.MONS_PRODUCTS||[];
    const p=products.find(x=>String(x.id)===String(id)); if(!p)return;
    let c=JSON.parse(localStorage.getItem('monsCart')||'[]');
    const old=c.find(x=>String(x.id)===String(p.id));
    if(old){old.qty=Math.max(1,Number(old.qty||1)+1);old.price=Number(p.price);old.image=dailyImage(p)}
    else c.push({id:p.id,name:p.name,price:Number(p.price),image:dailyImage(p),qty:1});
    localStorage.setItem('monsCart',JSON.stringify(c));
    const n=document.getElementById('cartCount'); if(n)n.textContent=c.reduce((s,x)=>s+Number(x.qty||1),0);
  };
  window.monsBuy=function(id){window.monsAdd(id);location.href='cart.html'};

  function loadScript(src){return new Promise((ok,no)=>{const existing=[...document.scripts].find(s=>s.src&&s.src.includes(src));if(existing){if(window.MONS_PRODUCTS)ok();else existing.addEventListener('load',ok,{once:true});return}const s=document.createElement('script');s.src=src;s.onload=ok;s.onerror=no;document.head.appendChild(s)})}

  async function connectCheckout(){
    if(!document.getElementById('items'))return;
    try{
      await loadScript('supabase-config.js');
      if(!window.supabase)await loadScript('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2');
      const db=supabase.createClient(MONS_SUPABASE_URL,MONS_SUPABASE_KEY);
      window.submitToEcom=async function(e){
        e.preventDefault();
        const cart=JSON.parse(localStorage.getItem('monsCart')||'[]');
        if(!cart.length){alert('Cart is empty');return}
        const items=cart.map(x=>({product_id:x.id,name:x.name,quantity:Math.max(1,Number(x.qty||1)),price:Number(x.price||0),image:x.image||''}));
        const total=items.reduce((s,x)=>s+x.price*x.quantity,0);
        const orderRef='MONS-'+Date.now();
        const address=[document.getElementById('apartment')?.value,document.getElementById('building')?.value,document.getElementById('street')?.value,document.getElementById('area')?.value,document.getElementById('details')?.value].filter(Boolean).join(', ');
        const {data:{user}}=await db.auth.getUser();
        const payload={order_ref:orderRef,customer_id:user?.id||null,customer_name:document.getElementById('name')?.value.trim()||'',mobile:document.getElementById('phone')?.value.trim()||'',address,total,status:'Pending',items,currency:'AED'};
        const {error}=await db.from('orders').insert(payload);
        if(error){alert('Order could not be saved. Please try again.');return}
        localStorage.setItem('monsCheckout',JSON.stringify({...payload,source:'MONS',channel:'checkout'}));
        if(document.getElementById('orderRef'))document.getElementById('orderRef').textContent='Order reference: '+orderRef;
        if(document.getElementById('success'))document.getElementById('success').style.display='block';
        localStorage.removeItem('monsCart');
      };
    }catch(e){console.error(e)}
  }

  // Keep a tiny fallback only if catalog-v2.js fails to load.
  window.MONS_PRODUCTS=window.MONS_PRODUCTS||FALLBACK_PRODUCTS.map((p,i)=>({id:i+1,name:p[0],description:p[1],category:p[2],brand:p[3],price:p[4],image:placeholder({name:p[0]}),gallery:[placeholder({name:p[0]})],stock:'In Stock'}));

  window.addEventListener('load',async()=>{
    style();
    // catalog-v2 is the single source of truth for storefront products/images.
    try{await loadScript('catalog-v2.js')}catch(e){console.error('MONS catalog-v2 failed to load',e)}
    render(window.MONS_PRODUCTS||[]);
    await connectCheckout();
  });
})();
