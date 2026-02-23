import React from "react";
import { Icon } from "../utils/icons";

export function ComparePage({ T, compareList, toggleCompare, addToCart, goTo }) {
  if (compareList.length===0) return (
    <div style={{textAlign:"center",padding:"72px 20px"}}>
      <div style={{fontSize:60,marginBottom:14}}>📊</div>
      <h2 style={{fontSize:22,fontWeight:800,marginBottom:6}}>No Products to Compare</h2>
      <p style={{color:T.textSec,marginBottom:18}}>Add products from the shop</p>
      <button onClick={()=>goTo("shop")} className="btn" style={{background:"#1A44CC",color:"white",borderRadius:11,padding:"11px 26px",fontSize:14,fontWeight:700}}>Go to Shop</button>
    </div>
  );
  
  return (
    <div style={{maxWidth:1060,margin:"0 auto",padding:"36px 20px"}}>
      <h1 style={{fontSize:26,fontWeight:900,marginBottom:4}}>Compare Products</h1>
      <p style={{color:T.textSec,marginBottom:28}}>Side-by-side comparison</p>
      <div style={{overflowX:"auto"}}>
        <table style={{width:"100%",borderCollapse:"separate",borderSpacing:0}}>
          <thead>
            <tr>
              <th style={{width:150,padding:"11px 14px",textAlign:"left",fontSize:11,color:T.textSec,fontWeight:700,textTransform:"uppercase",background:T.card,border:`1px solid ${T.border}`,borderRadius:"13px 0 0 0"}}>Feature</th>
              {compareList.map((p,i)=>(
                <th key={p.id} style={{padding:"11px 14px",background:T.card,border:`1px solid ${T.border}`,textAlign:"center",borderRadius:i===compareList.length-1?"0 13px 0 0":"0"}}>
                  <div style={{fontSize:32,marginBottom:3}}>{p.img}</div>
                  <div style={{fontSize:12,fontWeight:800,marginBottom:2}}>{p.name}</div>
                  <div style={{fontSize:10,color:T.textSec,marginBottom:7}}>{p.brand}</div>
                  <button onClick={()=>toggleCompare(p)} className="btn" style={{background:"none",border:`1px solid ${T.border}`,color:T.textSec,borderRadius:6,padding:"2px 7px",fontSize:10}}>Remove</button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {[
              ["Price",p=><span style={{fontSize:15,fontWeight:900,color:T.accent}}>${p.price.toLocaleString()}</span>],
              ["Rating",p=><span>{p.rating} ⭐ ({p.reviews.toLocaleString()})</span>],
              ["Stock",p=><span style={{color:p.stock>10?T.success:p.stock>3?T.warning:T.error,fontWeight:700}}>{p.stock>10?"In Stock":p.stock>3?`${p.stock} Left`:"Out of Stock"}</span>],
              ["Category",p=><span style={{textTransform:"capitalize"}}>{p.category}</span>],
              ...compareList[0].specs.map((_,i)=>[`Spec ${i+1}`,p=>p.specs[i]||"—"]),
              ["Action",p=><button onClick={()=>addToCart(p)} className="btn" style={{background:"#1A44CC",color:"white",borderRadius:8,padding:"6px 13px",fontSize:11,fontWeight:700,width:"100%"}}>Add to Cart</button>],
            ].map(([label,render],ri)=>(
              <tr key={ri} style={{background:ri%2===0?T.surface:T.card}}>
                <td style={{padding:"9px 14px",fontSize:11,color:T.textSec,fontWeight:600,border:`1px solid ${T.border}`}}>{label}</td>
                {compareList.map(p=><td key={p.id} style={{padding:"9px 14px",textAlign:"center",fontSize:12,border:`1px solid ${T.border}`}}>{render(p)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
