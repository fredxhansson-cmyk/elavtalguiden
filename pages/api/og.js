import { ImageResponse } from 'next/og';
export const config = { runtime: 'edge' };
export default function OgImage(req) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get('title') || 'Elavtalguiden';
  const niche = searchParams.get('niche') || 'el';
  const pc = '#b45309';
  return new ImageResponse(
    <div style={{ width:1200, height:630, background:'linear-gradient(135deg,#f0f9ff 0%,#e8f4fd 60%,#f8fafc 100%)', display:'flex', flexDirection:'column', justifyContent:'center', padding:'72px 80px', fontFamily:'system-ui,sans-serif', position:'relative' }}>
      <div style={{ position:'absolute', top:0, left:0, right:0, height:8, background:pc }} />
      <div style={{ fontSize:16, fontWeight:700, color:pc, textTransform:'uppercase', letterSpacing:3, marginBottom:24 }}>
        {niche} · Elavtalguiden
      </div>
      <div style={{ fontSize:62, fontWeight:800, lineHeight:1.12, color:'#0f172a', marginBottom:32, maxWidth:900 }}>
        {title}
      </div>
      <div style={{ display:'flex', gap:20, marginTop:8 }}>
        {['✓ Oberoende', '✓ Uppdaterad 2026', '✓ Gratis att jämföra'].map((b) => (
          <div key={b} style={{ background:'#fff', border:'1.5px solid '+pc+'30', borderRadius:24, padding:'8px 20px', fontSize:16, fontWeight:600, color:'#374151' }}>{b}</div>
        ))}
      </div>
      <div style={{ position:'absolute', bottom:0, left:0, right:0, height:8, background:pc, opacity:0.3 }} />
    </div>,
    { width:1200, height:630 }
  );
}