(() => {
  const PRODUCTS = [
    {id:"bad",artist:"Michael Jackson",title:"Bad",price:3500,group:"popular",image:"assets/shop/michael-jackson-bad.png"},
    {id:"circles",artist:"Moon Duo",title:"Circles (Coloured Vinyl)",price:3900,group:"popular",image:"assets/shop/moon-duo-circles.png"},
    {id:"pinups",artist:"David Bowie",title:"Pinups",price:4000,group:"popular",image:"assets/shop/david-bowie-pinups.png"},
    {id:"californication",artist:"Red Hot Chili Peppers",title:"Californication",price:3400,group:"new",image:"assets/shop/rhcp-californication.png"},
    {id:"help",artist:"The Beatles",title:"Help!",price:2800,group:"new",image:"assets/shop/beatles-help.png"},
    {id:"domoy",artist:"Янка",title:"Домой!",price:3000,group:"new",image:"assets/shop/yanka-domoy.png"}
  ];
  const key="vinyl-shop-cart";
  const money=value=>new Intl.NumberFormat("ru-RU").format(value)+" ₽";
  const getCart=()=>{try{return JSON.parse(localStorage.getItem(key))||{}}catch{return {}}};
  const setCart=cart=>{localStorage.setItem(key,JSON.stringify(cart));updateCount()};
  const product=id=>PRODUCTS.find(item=>item.id===id);
  const entries=()=>Object.entries(getCart()).map(([id,quantity])=>({item:product(id),quantity})).filter(row=>row.item&&row.quantity>0);
  const subtotal=rows=>rows.reduce((sum,row)=>sum+row.item.price*row.quantity,0);
  const updateCount=()=>{const count=entries().reduce((sum,row)=>sum+row.quantity,0);document.querySelectorAll(".cart-count").forEach(node=>{node.textContent=String(count);node.hidden=count===0})};
  const escape=value=>String(value).replace(/[&<>'"]/g,char=>({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[char]||char));
  const showToast=text=>{const toast=document.querySelector("#shop-toast");if(!toast)return;toast.textContent=text;toast.classList.add("is-visible");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>toast.classList.remove("is-visible"),1800)};
  const setupMenu=()=>{const header=document.querySelector(".shop-header"),button=document.querySelector(".menu-toggle");if(!header||!button)return;button.addEventListener("click",()=>{const open=header.classList.toggle("menu-open");button.setAttribute("aria-expanded",String(open))})};

  function renderCatalog(){
    const grid=document.querySelector("#product-grid"); if(!grid)return;
    const search=document.querySelector("#catalog-search"),sort=document.querySelector("#catalog-sort"),result=document.querySelector("#catalog-result");
    let filter=location.hash==="#new"?"new":location.hash==="#popular"?"popular":location.hash==="#rare"?"rare":"all";
    const paint=()=>{
      const query=search.value.trim().toLocaleLowerCase("ru");
      let list=PRODUCTS.filter(item=>(filter==="all"||item.group===filter)&&(`${item.artist} ${item.title}`.toLocaleLowerCase("ru").includes(query)));
      if(sort.value==="price-asc")list.sort((a,b)=>a.price-b.price);
      if(sort.value==="price-desc")list.sort((a,b)=>b.price-a.price);
      if(sort.value==="name")list.sort((a,b)=>`${a.artist} ${a.title}`.localeCompare(`${b.artist} ${b.title}`,"ru"));
      result.textContent=`найдено: ${list.length}`;
      grid.innerHTML=list.map(item=>`<article class="product-card" data-group="${item.group}"><div class="product-image-wrap"><img class="product-image" src="${item.image}" alt="Обложка ${escape(item.artist)} — ${escape(item.title)}"><span class="product-tag">${item.group==="new"?"новинка":"популярное"}</span></div><div class="product-meta"><h2 class="product-title"><span class="product-artist">${escape(item.artist)}</span>${escape(item.title)}</h2><p class="product-price">${money(item.price)}</p></div><button class="add-button" type="button" data-add="${item.id}">В КОРЗИНУ</button></article>`).join("")||`<div class="empty-state"><h2>ничего не нашли</h2><p>попробуйте изменить запрос или фильтр</p></div>`;
    };
    document.querySelectorAll(".filter-chip").forEach(button=>{button.classList.toggle("is-active",button.dataset.filter===filter);button.addEventListener("click",()=>{filter=button.dataset.filter;document.querySelectorAll(".filter-chip").forEach(node=>node.classList.toggle("is-active",node===button));paint()})});
    search.addEventListener("input",paint);sort.addEventListener("change",paint);
    grid.addEventListener("click",event=>{const button=event.target.closest("[data-add]");if(!button)return;const cart=getCart();cart[button.dataset.add]=(cart[button.dataset.add]||0)+1;setCart(cart);showToast("добавлено в корзину")});
    paint();
  }

  function summaryMarkup(rows,delivery=0){
    const sum=subtotal(rows);return `<h2>ваш заказ</h2><div class="summary-products">${rows.map(row=>`<div class="summary-product"><img src="${row.item.image}" alt=""><span>${escape(row.item.artist)} — ${escape(row.item.title)}</span><span>${row.quantity} × ${money(row.item.price)}</span></div>`).join("")}</div><div class="summary-row"><span>товары</span><span>${money(sum)}</span></div><div class="summary-row"><span>доставка</span><span>${delivery?money(delivery):"бесплатно"}</span></div><div class="summary-row total"><span>итого</span><span>${money(sum+delivery)}</span></div>`;
  }
  function renderCart(){
    const container=document.querySelector("#cart-items"),summary=document.querySelector("#cart-summary");if(!container||!summary)return;
    const paint=()=>{const rows=entries();if(!rows.length){container.innerHTML=`<div class="empty-state"><h2>корзина пока пустая</h2><p>соберите свою музыкальную полку в&nbsp;каталоге</p><a class="lime-button" href="catalog.html">В КАТАЛОГ</a></div>`;summary.hidden=true;return}summary.hidden=false;container.innerHTML=rows.map(({item,quantity})=>`<article class="cart-item"><img src="${item.image}" alt="Обложка ${escape(item.artist)} — ${escape(item.title)}"><div class="cart-item-copy"><h2>${escape(item.artist)} — ${escape(item.title)}</h2><p>${money(item.price)}</p><button class="remove-button" type="button" data-remove="${item.id}">удалить</button></div><div class="cart-item-actions"><div class="quantity"><button type="button" data-qty="${item.id}" data-delta="-1" aria-label="Уменьшить количество">−</button><span>${quantity}</span><button type="button" data-qty="${item.id}" data-delta="1" aria-label="Увеличить количество">+</button></div><span class="cart-item-total">${money(item.price*quantity)}</span></div></article>`).join("");summary.innerHTML=summaryMarkup(rows)+`<a class="lime-button summary-cta" href="checkout.html">ОФОРМИТЬ ЗАКАЗ</a>`};
    container.addEventListener("click",event=>{const cart=getCart(),qty=event.target.closest("[data-qty]"),remove=event.target.closest("[data-remove]");if(qty){cart[qty.dataset.qty]=(cart[qty.dataset.qty]||0)+Number(qty.dataset.delta);if(cart[qty.dataset.qty]<=0)delete cart[qty.dataset.qty]}if(remove)delete cart[remove.dataset.remove];setCart(cart);paint()});paint();
  }
  function renderCheckout(){
    const form=document.querySelector("#checkout-form"),summary=document.querySelector("#checkout-summary"),buttonTotal=document.querySelector("#checkout-button-total");if(!form||!summary)return;const rows=entries();if(!rows.length){location.replace("cart.html");return}
    const paint=()=>{const delivery=Number(form.delivery.value==="Курьером"?490:0);summary.innerHTML=summaryMarkup(rows,delivery);buttonTotal.textContent=money(subtotal(rows)+delivery)};form.addEventListener("change",paint);form.addEventListener("submit",event=>{event.preventDefault();if(!form.reportValidity())return;const data=new FormData(form),delivery=data.get("delivery"),deliveryPrice=delivery==="Курьером"?490:0,order={number:String(Date.now()).slice(-6),name:data.get("name"),email:data.get("email"),delivery,total:subtotal(rows)+deliveryPrice};localStorage.setItem("vinyl-shop-last-order",JSON.stringify(order));localStorage.removeItem(key);location.href="success.html"});paint();
  }
  function renderSuccess(){
    const root=document.querySelector("#success-page");if(!root)return;let order=null;try{order=JSON.parse(localStorage.getItem("vinyl-shop-last-order"))}catch{};order=order||{number:"000000",name:"покупатель",email:"указанную почту",delivery:"доставка",total:0};root.innerHTML=`<section class="success-card"><div><span class="success-mark" aria-hidden="true">✓</span><h1>ОПЛАТА ПРОШЛА УСПЕШНО</h1><p>${escape(order.name)}, заказ №${escape(order.number)} принят. Подтверждение и&nbsp;детали отправлены на&nbsp;${escape(order.email)}.</p></div><div class="success-details"><div><p>сумма<b>${money(order.total)}</b></p></div><div><p>получение<b>${escape(order.delivery)}</b></p></div><div class="success-actions"><a href="catalog.html">В КАТАЛОГ</a><a class="lime-button" href="catalog.html#new">СМОТРЕТЬ НОВИНКИ</a></div></div></section>`;
  }
  setupMenu();updateCount();const page=document.body.dataset.shopPage;if(page==="catalog")renderCatalog();if(page==="cart")renderCart();if(page==="checkout")renderCheckout();if(page==="success")renderSuccess();
})();
