import React from "react";
import { Icon } from "../utils/icons";

export function OrdersPage({ T, orders }) {
  const statusIcon = {
    "Delivered": <Icon.CheckCircle/>,
    "Shipped": <Icon.Truck/>,
    "Processing": <Icon.Clock/>,
  };
  
  const statusColor = {
    "Delivered": T.success,
    "Shipped": T.warning,
    "Processing": T.accent2,
  };

  return (
    <div style={{maxWidth:780,margin:"0 auto",padding:"36px 20px"}}>
      <h1 style={{fontSize:26,fontWeight:900,marginBottom:6}}>My Orders</h1>
      <p style={{color:T.textSec,marginBottom:28}}>Track and manage your purchases</p>
      {orders.map(order=>(
        <div key={order.id} style={{background:T.card,border:`1px solid ${T.border}`,borderRadius:16,padding:22,marginBottom:14}}>
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",marginBottom:14,flexWrap:"wrap",gap:9}}>
            <div>
              <div style={{fontSize:15,fontWeight:800,marginBottom:2}}>{order.id}</div>
              <div style={{fontSize:12,color:T.textSec}}>Placed on {order.date}</div>
            </div>
            <div style={{textAlign:"right"}}>
              <div style={{display:"inline-flex",alignItems:"center",gap:7,background:`${statusColor[order.status]}22`,color:statusColor[order.status],border:`1px solid ${statusColor[order.status]}55`,borderRadius:18,padding:"6px 13px",fontSize:11,fontWeight:700,marginBottom:3}}>
                <span style={{display:"flex",alignItems:"center",color:statusColor[order.status]}}>{statusIcon[order.status]}</span>
                {order.status}
              </div>
              <div style={{fontSize:16,fontWeight:900,color:T.accent}}>${order.total.toLocaleString()}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:10,flexWrap:"wrap"}}>
            {order.items.map(item=>(
              <div key={item.id} style={{display:"flex",alignItems:"center",gap:7,background:T.surface,borderRadius:9,padding:"7px 11px"}}>
                <span style={{fontSize:22}}>{item.img}</span>
                <div>
                  <div style={{fontSize:11,fontWeight:600}}>{item.name}</div>
                  <div style={{fontSize:10,color:T.textSec}}>${item.price.toLocaleString()}</div>
                </div>
              </div>
            ))}
          </div>
          <div style={{display:"flex",gap:9,marginTop:14}}>
            <button className="btn" style={{background:T.surface,border:`1px solid ${T.border}`,color:T.text,borderRadius:8,padding:"7px 14px",fontSize:12,fontWeight:600}}>Track Order</button>
            {order.status==="Delivered"&&<button className="btn" style={{background:"none",border:`1px solid ${T.border}`,color:T.textSec,borderRadius:8,padding:"7px 14px",fontSize:12}}>Write Review</button>}
          </div>
        </div>
      ))}
    </div>
  );
}
