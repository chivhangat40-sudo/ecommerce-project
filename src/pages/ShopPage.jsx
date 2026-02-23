import React, { useState } from "react";
import { Icon } from "../utils/icons";

function Stars({ rating, reviews, T }) {
  return (
    <div style={{display:"flex",alignItems:"center",gap:5}}>
      <div style={{display:"flex",gap:1}}>
        {Array.from({length:5},(_,i)=>(
          <Icon.Star key={i} fill={i<Math.floor(rating)?"#F59E0B":i<rating?"#F59E0B88":T.textMuted}/>
        ))}
      </div>
      <span style={{fontSize:11,color:T.textSec}}>{rating}{reviews!=null&&` (${reviews.toLocaleString()})`}</span>
    </div>
  );
}

function FilterBox({ T, title, children }) {
  const [open, setOpen] = useState(true);
  return (
    <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:13,overflow:"hidden"}}>
      <button onClick={()=>setOpen(o=>!o)} className="btn" style={{width:"100%",padding:"11px 14px",display:"flex",justifyContent:"space-between",alignItems:"center",background:"none",color:T.text,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:.6}}>
        {title} <span style={{transform:open?"rotate(90deg)":"none",transition:"transform .2s",color:T.textSec,fontSize:14}}>›</span>
      </button>
      {open && <div style={{padding:"0 14px 12px"}}>{children}</div>}
    </div>
  );
}

function ProdCard({ T, product, viewMode, wishlisted, inCompare, onWishlist, onCompare, onAddToCart, onView }) {
  const disc = product.originalPrice>product.price ? Math.round((1-product.price/product.originalPrice)*100) : 0;

  if (viewMode==="list") {
    return (
      <div className="card" style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:13,display:"flex",alignItems:"center",gap:14,padding:14,boxShadow:"0 2px 10px rgba(0,0,0,0.12)"}}>
        <div onClick={onView} style={{width:80,height:80,background:`${product.color}22`,borderRadius:10,display:"flex",alignItems:"center",justifyContent:"center",fontSize:40,cursor:"pointer",flexShrink:0}}>{product.img}</div>
        <div style={{flex:1,minWidth:0}}>
          <div style={{fontSize:10,color:T.textSec,marginBottom:1}}>{product.brand}</div>
          <div onClick={onView} style={{fontSize:14,fontWeight:700,marginBottom:3,cursor:"pointer"}}>{product.name}</div>
          <Stars rating={product.rating} reviews={product.reviews} T={T}/>
        </div>
        <div style={{textAlign:"right",flexShrink:0}}>
          <div style={{fontSize:18,fontWeight:900,color:T.accent,marginBottom:1}}>${product.price.toLocaleString()}</div>
          {disc>0&&<div style={{fontSize:11,color:T.textSec,textDecoration:"line-through",marginBottom:7}}>${product.originalPrice.toLocaleString()}</div>}
          <div style={{display:"flex",gap:6}}>
            <button onClick={onWishlist} className="btn" style={{background:T.surface,border:`1px solid ${T.border}`,borderRadius:7,width:32,height:32,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon.Heart f={wishlisted}/></button>
            <button onClick={onAddToCart} className="btn" style={{background:"linear-gradient(135deg,#1A44CC,#2255E0)",color:"white",borderRadius:7,padding:"0 13px",height:32,fontSize:12,fontWeight:700}}>Add to Cart</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card" style={{background:T.card,border:`1px solid ${inCompare?T.accent2:T.border}`,borderRadius:15,overflow:"hidden",display:"flex",flexDirection:"column",boxShadow:"0 3px 16px rgba(0,0,0,0.18)"}}>
      <div style={{background:`linear-gradient(135deg,${product.color}18,${product.color}30)`,padding:"22px 14px",position:"relative",cursor:"pointer",textAlign:"center",minHeight:120}} onClick={onView}>
        <span style={{fontSize:56}}>{product.img}</span>
        {disc>0 && <div style={{position:"absolute",top:9,right:9,background:T.error,color:"white",fontSize:9,fontWeight:800,padding:"2px 6px",borderRadius:4}}>-{disc}%</div>}
        <div style={{position:"absolute",bottom:7,right:7,display:"flex",gap:4}}>
          <button onClick={e=>{e.stopPropagation();onWishlist();}} className="btn" style={{background:"rgba(0,0,0,0.48)",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center"}}><Icon.Heart f={wishlisted}/></button>
          <button onClick={e=>{e.stopPropagation();onCompare();}} className="btn" style={{background:inCompare?`${T.accent2}cc`:"rgba(0,0,0,0.48)",border:"none",borderRadius:"50%",width:28,height:28,display:"flex",alignItems:"center",justifyContent:"center",color:"white"}}><Icon.Compare/></button>
        </div>
      </div>
      <div style={{padding:"13px",flex:1,display:"flex",flexDirection:"column",gap:4}}>
        <div style={{fontSize:9,color:T.textSec,fontWeight:700,textTransform:"uppercase",letterSpacing:.5}}>{product.brand}</div>
        <div onClick={onView} style={{fontSize:12,fontWeight:700,lineHeight:1.3,cursor:"pointer"}}>{product.name}</div>
        <Stars rating={product.rating} reviews={product.reviews} T={T}/>
        <div style={{fontSize:10,color:product.stock>10?T.success:product.stock>3?T.warning:T.error,fontWeight:600}}>
          {product.stock>10?"✓ In Stock":product.stock>3?`⚠ Only ${product.stock} left`:"🔴 Almost Gone"}
        </div>
        <div style={{display:"flex",alignItems:"baseline",gap:7,marginTop:3}}>
          <span style={{fontSize:17,fontWeight:900,color:T.accent}}>${product.price.toLocaleString()}</span>
          {disc>0&&<span style={{fontSize:11,color:T.textSec,textDecoration:"line-through"}}>${product.originalPrice.toLocaleString()}</span>}
        </div>
        <button onClick={onAddToCart} disabled={product.stock===0} className="btn" style={{marginTop:7,padding:"9px",borderRadius:8,border:"none",background:product.stock>0?"linear-gradient(135deg,#1A44CC,#2255E0)":`${T.border}`,color:product.stock>0?"white":T.textSec,fontSize:11,fontWeight:700,display:"flex",alignItems:"center",justifyContent:"center",gap:5}}>
          <Icon.Cart/> {product.stock>0?"Add to Cart":"Out of Stock"}
        </button>
      </div>
    </div>
  );
}

export default function ShopPage({ filtered, category, setCategory, priceRange, setPriceRange, selBrands, setSelBrands, selTags, setSelTags, sortBy, setSortBy, viewMode, setViewMode, wishlist, compareList, toggleWishlist, toggleCompare, addToCart, viewProduct, T, PRODUCTS, CATEGORIES, BRANDS, ALL_TAGS }) {
  const [pg, setPg] = useState(1);
  const perPage = 12;
  const totalPgs = Math.ceil(filtered.length/perPage);
  const paged = filtered.slice((pg-1)*perPage, pg*perPage);
  const activeFilters = selBrands.length + selTags.length + (priceRange[1]<4000?1:0);

  return (
    <div style={{maxWidth:1380,margin:"0 auto",padding:"22px 16px",display:"flex",gap:22}}>
      <aside className="hide-mobile" style={{width:230,flexShrink:0}}>
        <div style={{position:"sticky",top:72,display:"flex",flexDirection:"column",gap:12}}>
          <FilterBox T={T} title="Categories">
            {CATEGORIES.map(cat=>(
              <div key={cat.id} onClick={()=>{setCategory(cat.id);setPg(1);}} style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"7px 9px",borderRadius:7,cursor:"pointer",background:category===cat.id?`${T.accent}20`:"none",color:category===cat.id?T.accent:T.textSec,fontWeight:category===cat.id?700:400,fontSize:12,transition:"all .15s"}}
                onMouseEnter={e=>category!==cat.id&&(e.currentTarget.style.background=T.surface)}
                onMouseLeave={e=>category!==cat.id&&(e.currentTarget.style.background="none")}
              >
                <span>{cat.icon} {cat.label}</span>
                <span style={{fontSize:10,color:T.textSec,background:T.surface,borderRadius:4,padding:"1px 5px"}}>{cat.id==="all"?PRODUCTS.length:PRODUCTS.filter(p=>p.category===cat.id).length}</span>
              </div>
            ))}
          </FilterBox>

          <FilterBox T={T} title="Price Range">
            <div style={{padding:"0 4px"}}>
              <div style={{display:"flex",justifyContent:"space-between",marginBottom:8,fontSize:12}}>
                <span style={{color:T.accent,fontWeight:700}}>${priceRange[0]}</span>
                <span style={{color:T.accent,fontWeight:700}}>${priceRange[1].toLocaleString()}</span>
              </div>
              <input type="range" min="0" max="4000" step="50" value={priceRange[1]} onChange={e=>setPriceRange([priceRange[0],+e.target.value])} style={{width:"100%",marginBottom:8}}/>
              <div style={{display:"grid",gridTemplateColumns:"1fr 1fr 1fr",gap:5}}>
                {[[0,500,"Budget"],[500,1500,"Mid"],[1500,4000,"Prem"]].map(([min,max,label])=>(
                  <button key={label} onClick={()=>setPriceRange([min,max])} className="btn" style={{background:priceRange[0]===min&&priceRange[1]===max?T.accent:T.surface,color:priceRange[0]===min&&priceRange[1]===max?"#000":T.textSec,border:`1px solid ${T.border}`,borderRadius:6,padding:"4px",fontSize:10,fontWeight:600}}>{label}</button>
                ))}
              </div>
            </div>
          </FilterBox>

          <FilterBox T={T} title="Brands">
            {BRANDS.map(b=>(
              <label key={b} style={{display:"flex",alignItems:"center",gap:7,padding:"5px 0",cursor:"pointer",fontSize:12}}>
                <input type="checkbox" checked={selBrands.includes(b)} onChange={()=>setSelBrands(p=>p.includes(b)?p.filter(x=>x!==b):[...p,b])}/>
                <span style={{color:selBrands.includes(b)?T.accent:T.textSec}}>{b}</span>
                <span style={{marginLeft:"auto",fontSize:10,color:T.textSec}}>({PRODUCTS.filter(p=>p.brand===b).length})</span>
              </label>
            ))}
          </FilterBox>

          <FilterBox T={T} title="Tags">
            <div style={{display:"flex",flexWrap:"wrap",gap:5}}>
              {ALL_TAGS.map(tag=>(
                <button key={tag} onClick={()=>setSelTags(p=>p.includes(tag)?p.filter(x=>x!==tag):[...p,tag])} className="btn chip" style={{background:selTags.includes(tag)?T.accent:T.surface,color:selTags.includes(tag)?"#000":T.textSec,border:`1px solid ${selTags.includes(tag)?T.accent:T.border}`,borderRadius:14,padding:"3px 9px",fontSize:10,fontWeight:600}}>#{tag}</button>
              ))}
            </div>
          </FilterBox>

          {activeFilters>0 && (
            <button onClick={()=>{setSelBrands([]);setSelTags([]);setPriceRange([0,4000]);setCategory("all");}} className="btn" style={{background:"none",border:`1px solid ${T.error}`,color:T.error,borderRadius:9,padding:"7px",fontSize:12,fontWeight:600,width:"100%"}}>
              Clear {activeFilters} filter{activeFilters!==1?"s":""}
            </button>
          )}
        </div>
      </aside>

      <main style={{flex:1,minWidth:0}}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18,gap:10,flexWrap:"wrap"}}>
          <div>
            <h2 style={{fontSize:18,fontWeight:800}}>{category==="all"?"All Products":CATEGORIES.find(c=>c.id===category)?.label}</h2>
            <p style={{color:T.textSec,fontSize:11,marginTop:1}}>{filtered.length} results</p>
          </div>
          <div style={{display:"flex",gap:7,alignItems:"center",flexWrap:"wrap"}}>
            <select value={sortBy} onChange={e=>{setSortBy(e.target.value);setPg(1);}} style={{background:T.card,border:`1px solid ${T.border}`,color:T.text,borderRadius:8,padding:"7px 11px",fontSize:12,cursor:"pointer"}}>
              {[["featured","Featured"],["price-asc","Price ↑"],["price-desc","Price ↓"],["rating","Top Rated"],["newest","Newest"],["popular","Popular"]].map(([v,l])=><option key={v} value={v}>{l}</option>)}
            </select>
            {[["grid",<Icon.Grid/>],["list",<Icon.List/>]].map(([m,ico])=>(
              <button key={m} onClick={()=>setViewMode(m)} className="btn" style={{background:viewMode===m?T.accent:T.card,color:viewMode===m?"#000":T.textSec,border:`1px solid ${T.border}`,borderRadius:8,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center"}}>{ico}</button>
            ))}
          </div>
        </div>

        {filtered.length===0 ? (
          <div style={{textAlign:"center",padding:"70px 20px"}}>
            <div style={{fontSize:56,marginBottom:14}}>🔍</div>
            <h3 style={{fontSize:18,fontWeight:700,marginBottom:6}}>No products found</h3>
            <p style={{color:T.textSec,marginBottom:18}}>Try adjusting your filters</p>
            <button onClick={()=>{setSelBrands([]);setSelTags([]);setPriceRange([0,4000]);setCategory("all");}} className="btn" style={{background:T.primary,color:"white",borderRadius:9,padding:"9px 22px",fontSize:13,fontWeight:600}}>Clear Filters</button>
          </div>
        ) : (
          <>
            <div style={{
              display:viewMode==="list"?"flex":"grid",
              flexDirection:viewMode==="list"?"column":undefined,
              gridTemplateColumns:viewMode==="grid"?"repeat(auto-fill,minmax(195px,1fr))":undefined,
              gap:14,
            }}>
              {paged.map(p=>(
                <ProdCard key={p.id} T={T} product={p} viewMode={viewMode} wishlisted={wishlist.includes(p.id)} inCompare={!!compareList.find(x=>x.id===p.id)} onWishlist={()=>toggleWishlist(p.id)} onCompare={()=>toggleCompare(p)} onAddToCart={()=>addToCart(p)} onView={()=>viewProduct(p)}/>
              ))}
            </div>
            {totalPgs>1 && (
              <div style={{display:"flex",justifyContent:"center",gap:7,marginTop:28,alignItems:"center"}}>
                <button onClick={()=>setPg(p=>Math.max(1,p-1))} disabled={pg===1} className="btn" style={{background:T.card,border:`1px solid ${T.border}`,color:pg===1?T.textSec:T.text,borderRadius:8,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",opacity:pg===1?.5:1}}><Icon.ChevL/></button>
                {Array.from({length:totalPgs},(_,i)=>i+1).map(p=>(
                  <button key={p} onClick={()=>setPg(p)} className="btn" style={{background:p===pg?T.accent:T.card,color:p===pg?"#000":T.textSec,border:`1px solid ${p===pg?T.accent:T.border}`,borderRadius:8,width:34,height:34,fontSize:13,fontWeight:p===pg?800:400}}>{p}</button>
                ))}
                <button onClick={()=>setPg(p=>Math.min(totalPgs,p+1))} disabled={pg===totalPgs} className="btn" style={{background:T.card,border:`1px solid ${T.border}`,color:pg===totalPgs?T.textSec:T.text,borderRadius:8,width:34,height:34,display:"flex",alignItems:"center",justifyContent:"center",opacity:pg===totalPgs?.5:1}}><Icon.ChevR/></button>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}
