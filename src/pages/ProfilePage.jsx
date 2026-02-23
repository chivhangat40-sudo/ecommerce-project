import React from "react";
import { Icon } from "../utils/icons";

export function ProfilePage({ T, wishlist, PRODUCTS, toggleWishlist, addToCart, viewProduct }) {
  const wlProducts = PRODUCTS.filter(p=>wishlist.includes(p.id));
  
  return (
    <div style={{maxWidth:860,margin:"0 auto",padding:"36px 20px"}}>
      <div style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:18,padding:26,marginBottom:28,display:"flex",alignItems:"center",gap:18,flexWrap:"wrap"}}>
        <div style={{width:66,height:66,borderRadius:"50%",background:"linear-gradient(135deg,#1A44CC,#00C8FF)",display:"flex",alignItems:"center",justifyContent:"center",fontSize:30}}>👤</div>
        <div>
          <h2 style={{fontSize:20,fontWeight:800,marginBottom:2}}>Alex Johnson</h2>
          <p style={{color:T.textSec,fontSize:12}}>alex@email.com · Member since Jan 2024</p>
          <div style={{display:"flex",gap:14,marginTop:7}}>
            {[["3","Orders"],["2","Wishlist"],["5","Reviews"]].map(([n,l])=>(
              <div key={l}><span style={{fontWeight:800,color:T.accent}}>{n}</span> <span style={{fontSize:11,color:T.textSec}}>{l}</span></div>
            ))}
          </div>
        </div>
        <button className="btn" style={{marginLeft:"auto",background:T.surface,border:`1px solid ${T.border}`,color:T.text,borderRadius:9,padding:"8px 16px",fontSize:12,fontWeight:600}}>Edit Profile</button>
      </div>

      <h2 style={{fontSize:18,fontWeight:800,marginBottom:14}}>❤️ Wishlist ({wlProducts.length})</h2>
      {wlProducts.length===0 ? (
        <div style={{textAlign:"center",padding:"56px 20px",color:T.textSec}}>
          <div style={{fontSize:52,marginBottom:10}}>💔</div>
          <div style={{fontSize:15,color:T.text,fontWeight:600,marginBottom:4}}>Wishlist is empty</div>
          <p>Save products you love for later!</p>
        </div>
      ) : (
        <div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(200px,1fr))",gap:14}}>
          {wlProducts.map(p=>(
            <div key={p.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:13,overflow:"hidden"}}>
              <div onClick={()=>viewProduct(p)} style={{background:`${p.color}22`,padding:"18px",textAlign:"center",cursor:"pointer",fontSize:48}}>{p.img}</div>
              <div style={{padding:12}}>
                <div style={{fontSize:12,fontWeight:700,marginBottom:3}}>{p.name}</div>
                <div style={{fontSize:16,fontWeight:800,color:T.accent,marginBottom:9}}>${p.price.toLocaleString()}</div>
                <div style={{display:"flex",gap:7}}>
                  <button onClick={()=>addToCart(p)} className="btn" style={{flex:1,background:"#1A44CC",color:"white",borderRadius:8,padding:"7px",fontSize:11,fontWeight:700}}>Add to Cart</button>
                  <button onClick={()=>toggleWishlist(p.id)} className="btn" style={{background:"#EF444422",border:`1px solid #EF4444`,borderRadius:8,padding:"7px 9px",color:"#EF4444"}}><Icon.Trash/></button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
