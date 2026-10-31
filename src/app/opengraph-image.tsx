import { ImageResponse } from "next/og";

export const alt = "Siddhesh Gawade — The Internet Scrapbook. I make things for the internet.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ display:"flex", flexDirection:"column", width:"100%", height:"100%", padding:"60px 72px", background:"#F6F2E9", color:"#252520", fontFamily:"sans-serif" }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:21, borderBottom:"1px solid #d4d0c4", paddingBottom:24 }}><span>SIDDHESH GAWADE</span><span>THE INTERNET SCRAPBOOK</span></div>
      <div style={{ display:"flex", flexDirection:"column", fontSize:86, letterSpacing:-5, lineHeight:1.08, marginTop:48 }}><span>I make things</span><span style={{ color:"#315BD9" }}>for the internet.</span></div>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:22, marginTop:48 }}><span>Work. Ideas. A little curiosity.</span><span>siddheshgawade.dev ↗</span></div>
      <div style={{ position:"absolute", right:66, bottom:166, width:128, height:30, background:"#F5D77E", transform:"rotate(-7deg)" }} />
    </div>, size,
  );
}
