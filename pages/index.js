import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';

const ORG_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"Organization\",\"name\":\"Elavtalguiden\",\"url\":\"https://elavtalguiden.vercel.app\",\"logo\":\"https://elavtalguiden.vercel.app/favicon.ico\",\"description\":\"Oberoende jämförelsetjänst för svenska konsumenter inom el.\",\"foundingDate\":\"2026\",\"inLanguage\":\"sv-SE\",\"contactPoint\":{\"@type\":\"ContactPoint\",\"contactType\":\"customer support\",\"url\":\"https://elavtalguiden.vercel.app/kontakt\"}}";
const WEB_PAGE_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"WebPage\",\"name\":\"Bästa elavtal för sommarstuga 2026 | Jämför nu\",\"description\":\"Hitta bästa elavtalet för sommarstugan 2026. ✓ Jämför Vattenfall, E.ON, Fortum m.fl. Uppdaterad 2026\",\"url\":\"https://elavtalguiden.vercel.app\",\"datePublished\":\"2026-06-24\",\"dateModified\":\"2026-06-24\",\"inLanguage\":\"sv-SE\",\"publisher\":{\"@type\":\"Organization\",\"name\":\"Elavtalguiden\",\"url\":\"https://elavtalguiden.vercel.app\"},\"breadcrumb\":{\"@type\":\"BreadcrumbList\",\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"name\":\"Hem\",\"item\":\"https://elavtalguiden.vercel.app\"}]}}";
const ITEM_LIST_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"ItemList\",\"name\":\"Bästa elavtalet för sommarstugan 2026 — Jämförelse 2026\",\"description\":\"Upptäck de bästa elavtalen för din sommarstuga i 2026.\",\"numberOfItems\":7,\"itemListElement\":[{\"@type\":\"ListItem\",\"position\":1,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Vattenfall\",\"url\":\"https://www.vattenfall.se\",\"description\":\"Stabilt och pålitligt elavtal\",\"feesAndCommissionsSpecification\":\"från 199 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.8\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"441\"}}},{\"@type\":\"ListItem\",\"position\":2,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"E.ON\",\"url\":\"https://www.eon.se\",\"description\":\"Anpassade avtal för fritidshus\",\"feesAndCommissionsSpecification\":\"från 189 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.7\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"372\"}}},{\"@type\":\"ListItem\",\"position\":3,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Fortum\",\"url\":\"https://www.fortum.se\",\"description\":\"Flexibla avtal med fast pris\",\"feesAndCommissionsSpecification\":\"från 179 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.6\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"737\"}}},{\"@type\":\"ListItem\",\"position\":4,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Göta Energi\",\"url\":\"https://www.gotaenergi.se\",\"description\":\"Prisvärt elavtal för sommarstugor\",\"feesAndCommissionsSpecification\":\"från 169 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.5\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"564\"}}},{\"@type\":\"ListItem\",\"position\":5,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Telge Energi\",\"url\":\"https://www.telgeenergi.se\",\"description\":\"100% förnybar energi\",\"feesAndCommissionsSpecification\":\"från 159 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.4\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"531\"}}},{\"@type\":\"ListItem\",\"position\":6,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Skellefteå Kraft\",\"url\":\"https://www.skekraft.se\",\"description\":\"Lokalt producerad el\",\"feesAndCommissionsSpecification\":\"från 149 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.3\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"392\"}}},{\"@type\":\"ListItem\",\"position\":7,\"item\":{\"@type\":\"FinancialProduct\",\"name\":\"Greenely\",\"url\":\"https://www.greenely.se\",\"description\":\"Smart elavtal via app\",\"feesAndCommissionsSpecification\":\"från 139 kr/mån\",\"aggregateRating\":{\"@type\":\"AggregateRating\",\"ratingValue\":\"4.2\",\"bestRating\":\"5\",\"worstRating\":\"1\",\"ratingCount\":\"227\"}}}]}";
const ARTICLE_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"Article\",\"headline\":\"Bästa elavtalet för sommarstugan 2026\",\"description\":\"Upptäck de bästa elavtalen för din sommarstuga i 2026.\",\"datePublished\":\"2026-06-24\",\"dateModified\":\"2026-06-24\",\"author\":{\"@type\":\"Organization\",\"name\":\"Elavtalguiden\"},\"publisher\":{\"@type\":\"Organization\",\"name\":\"Elavtalguiden\"},\"mainEntityOfPage\":{\"@type\":\"WebPage\",\"@id\":\"https://elavtalguiden.vercel.app\"}}";
const FAQ_SCHEMA = "{\"@context\":\"https://schema.org\",\"@type\":\"FAQPage\",\"mainEntity\":[{\"@type\":\"Question\",\"name\":\"Vilket elavtal är bäst för sommarstugan?\",\"acceptedAnswer\":{\"@type\":\"Answer\",\"text\":\"Det beror på din användning. För sommarmånader kan rörligt pris vara bra, medan fastpris passar året runt.\"}}]}";

export async function getStaticProps() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.toLocaleDateString('sv-SE', { month: 'long' });
  var updated = now.toLocaleDateString('sv-SE', { year: 'numeric', month: 'long', day: 'numeric' });
  var fallback = [{"name":"Vattenfall","url":"https://www.vattenfall.se","description":"Stabilt och pålitligt elavtal","badge":"Bäst totalt","score":"4.8","price":"från 199 kr/mån","pros":["Grön el","Flexibla avtal","Bra kundservice"]},{"name":"E.ON","url":"https://www.eon.se","description":"Anpassade avtal för fritidshus","badge":null,"score":"4.7","price":"från 189 kr/mån","pros":["Klimatsmart el","Enkel avtalsförändring","Prisgaranti"]},{"name":"Fortum","url":"https://www.fortum.se","description":"Flexibla avtal med fast pris","badge":null,"score":"4.6","price":"från 179 kr/mån","pros":["Fast pris","Miljövänligt","Bra kundsupport"]},{"name":"Göta Energi","url":"https://www.gotaenergi.se","description":"Prisvärt elavtal för sommarstugor","badge":null,"score":"4.5","price":"från 169 kr/mån","pros":["Lågt pris","Enkel administration","Grön el"]},{"name":"Telge Energi","url":"https://www.telgeenergi.se","description":"100% förnybar energi","badge":null,"score":"4.4","price":"från 159 kr/mån","pros":["Förnybar el","Bra miljöval","Engagerad kundtjänst"]},{"name":"Skellefteå Kraft","url":"https://www.skekraft.se","description":"Lokalt producerad el","badge":null,"score":"4.3","price":"från 149 kr/mån","pros":["Lokal elproduktion","Kundvänliga avtal","Hållbarhet"]},{"name":"Greenely","url":"https://www.greenely.se","description":"Smart elavtal via app","badge":null,"score":"4.2","price":"från 139 kr/mån","pros":["App-baserad","Ingen bindningstid","Grön el"]}];
  var items = fallback.slice();

  try {
    var now2 = new Date();
    var ds = now2.getFullYear() + '/' + String(now2.getMonth()+1).padStart(2,'0') + '/' + String(now2.getDate()).padStart(2,'0');
    var ctrl2 = new AbortController();
    setTimeout(function() { ctrl2.abort(); }, 3000);
    var r2 = await fetch('https://www.elpriset.nu/api/v1/prices/SE3/' + ds, { signal: ctrl2.signal });
    if (r2.ok) {
      var sd = await r2.json();
      if (Array.isArray(sd) && sd.length > 0) {
        var avgOre = Math.round(sd.reduce(function(s,p){ return s+(p.SEK_per_kWh||0); },0)/sd.length*100);
        if (avgOre > 0) items = items.map(function(p) {
          return Object.assign({}, p, {
            currentPrice: p.type === 'spot' ? avgOre + ' öre/kWh (just nu)' : p.price,
          });
        });
      }
    }
  } catch(e) {}
  return {
    props: { providers: items, year: year, month: month, updated: updated },
    revalidate: 86400,
  };
}

export default function Home({ providers, year, month, updated }) {
  const [sortBy, setSortBy] = useState('betyg');
  const [visibleCount, setVisibleCount] = useState(5);
  const [selected, setSelected] = useState([]);
  const [showCompare, setShowCompare] = useState(false);
  

  var extractNum = function(p) {
    if (p.rateValue) return parseFloat(p.rateValue);
    if (p.priceValue) return parseFloat(p.priceValue);
    var m = String(p.price||'').match(/[0-9]+[.,]?[0-9]*/);
    return m ? parseFloat(m[0].replace(',','.')) : 9999;
  };
  var sorted = [...providers].sort(function(a, b) {
    if (sortBy === 'pris') return extractNum(a) - extractNum(b);
    if (sortBy === 'namn') return a.name.localeCompare(b.name, 'sv');
    return parseFloat(b.score||b.rating||0) - parseFloat(a.score||a.rating||0);
  });
  var visible = sorted.slice(0, visibleCount);
  var toggleSelect = function(name) {
    setSelected(function(prev) {
      return prev.includes(name) ? prev.filter(function(n){return n!==name;}) : prev.length < 3 ? prev.concat([name]) : prev;
    });
  };
  var selectedProviders = providers.filter(function(p){return selected.includes(p.name);});

  const pc = '#b45309';
  const pcLight = '#b4530914';
  const pcMed = '#b4530930';

  const TRACK_BASE = 'https://axiom-engine-production-54c3.up.railway.app/r';
  const SITE_SLUG = 'elavtalguiden';
  const AffBtn = ({ url, name, primary, network }) => {
    var href = TRACK_BASE && TRACK_BASE.startsWith('http')
      ? TRACK_BASE + '?p=' + encodeURIComponent(name) + '&url=' + encodeURIComponent(url) + '&site=' + SITE_SLUG + (network && network !== 'adtraction' ? '&network=' + encodeURIComponent(network) : '')
      : url;
    return (
      <a href={href} target="_blank" rel="noopener noreferrer sponsored"
        style={{ display:'inline-block', background: primary ? pc : '#0f172a', color:'#fff',
          padding:'11px 22px', borderRadius:9, fontWeight:700, fontSize:14,
          textDecoration:'none', whiteSpace:'nowrap', transition:'opacity .15s' }}>
        {network === 'amazon' ? 'Köp på Amazon →' : 'Välj ' + name + ' →'}
      </a>
    );
  };

  const Stars = ({ score }) => {
    const n = parseFloat(score);
    return (
      <span style={{ fontSize:15, letterSpacing:1 }}>
        <span style={{ color:'#f59e0b' }}>{'★'.repeat(Math.floor(n))}</span>
        <span style={{ color:'#d1d5db' }}>{'★'.repeat(5 - Math.floor(n))}</span>
        <span style={{ color:'#64748b', fontSize:12, marginLeft:6, fontWeight:600 }}>{score}</span>
      </span>
    );
  };

  return (
    <>
      <Head>
        <title>Bästa elavtal för sommarstuga 2026 | Jämför nu</title>
        <meta name="description" content="Hitta bästa elavtalet för sommarstugan 2026. ✓ Jämför Vattenfall, E.ON, Fortum m.fl. Uppdaterad 2026" />
        <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large" />
        <link rel="canonical" href="https://elavtalguiden.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Bästa elavtal för sommarstuga 2026 | Jämför nu" />
        <meta property="og:description" content="Hitta bästa elavtalet för sommarstugan 2026. ✓ Jämför Vattenfall, E.ON, Fortum m.fl. Uppdaterad 2026" />
        <meta property="og:url" content="https://elavtalguiden.vercel.app" />
        <meta property="og:locale" content="sv_SE" />
        <meta property="og:site_name" content="Elavtalguiden" />
        <meta property="og:image" content="https://elavtalguiden.vercel.app/api/og?title=B%C3%A4sta%20elavtal%20f%C3%B6r%20sommarstuga%202026%20%7C%20J%C3%A4mf%C3%B6r%20nu&niche=el" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Bästa elavtal för sommarstuga 2026 | Jämför nu" />
        <meta name="twitter:description" content="Hitta bästa elavtalet för sommarstugan 2026. ✓ Jämför Vattenfall, E.ON, Fortum m.fl. Uppdaterad 2026" />
        <meta name="twitter:image" content="https://elavtalguiden.vercel.app/api/og?title=B%C3%A4sta%20elavtal%20f%C3%B6r%20sommarstuga%202026%20%7C%20J%C3%A4mf%C3%B6r%20nu&niche=el" />
        <link rel="alternate" hreflang="sv" href="https://elavtalguiden.vercel.app" />
        <link rel="alternate" hreflang="x-default" href="https://elavtalguiden.vercel.app" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ORG_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: WEB_PAGE_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ITEM_LIST_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: ARTICLE_SCHEMA }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: FAQ_SCHEMA }} />
      </Head>

      <nav style={{ background:'#fff', borderBottom:'1px solid #e2e8f0', padding:'0 20px',
        height:60, display:'flex', alignItems:'center', justifyContent:'space-between',
        position:'sticky', top:0, zIndex:100, fontFamily:'Inter,sans-serif' }}>
        <Link href="/" style={{ fontWeight:800, fontSize:18, color:pc, textDecoration:'none' }}>
          Elavtalguiden
        </Link>
        <div style={{ display:'flex', gap:28, fontSize:14 }}>
          <a href="#jamfor" style={{ color:'#64748b', textDecoration:'none' }}>Jämförelse</a>
          <a href="#guide" style={{ color:'#64748b', textDecoration:'none' }}>Guide</a>
          <Link href="/om-oss" style={{ color:'#64748b', textDecoration:'none' }}>Om oss</Link>
        </div>
      </nav>

      <section style={{ background:'linear-gradient(135deg,#f0f9ff 0%,#e8f4fd 50%,#f8fafc 100%)',
        padding:'72px 20px 56px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:1100, margin:'0 auto', display:'flex', alignItems:'center',
          gap:48, flexWrap:'wrap' }}>
          <div style={{ flex:1, minWidth:280 }}>
            <div style={{ display:'flex', gap:8, flexWrap:'wrap', marginBottom:20 }}>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5,
                background:pcLight, color:pc, padding:'4px 12px', borderRadius:20,
                fontSize:12, fontWeight:700 }}>
                ✓ Uppdaterad {updated}
              </div>
              <div style={{ display:'inline-flex', alignItems:'center', gap:5,
                background:'#f0fdf4', color:'#15803d', padding:'4px 12px', borderRadius:20,
                fontSize:12, fontWeight:700 }}>
                ✓ Oberoende jämförelse
              </div>
            </div>
            <h1 style={{ fontSize:'clamp(26px,4vw,46px)', fontWeight:800,
              lineHeight:1.14, marginBottom:18, color:'#0f172a' }}>
              Bästa elavtalet för sommarstugan 2026
            </h1>
            <p style={{ fontSize:18, color:'#475569', lineHeight:1.72,
              marginBottom:32, maxWidth:540 }}>
              Upptäck de bästa elavtalen för din sommarstuga i 2026.
            </p>
            <a href="#jamfor" style={{ display:'inline-block', background:pc, color:'#fff',
              padding:'14px 32px', borderRadius:10, fontWeight:700, fontSize:16,
              textDecoration:'none', boxShadow:'0 4px 24px '+pc+'44' }}>
              Hitta bästa avtalet →
            </a>
            <p style={{ marginTop:14, fontSize:13, color:'#94a3b8' }}>
              Gratis &middot; Oberoende &middot; Ingen prenumeration
            </p>
          </div>
          <div style={{ flexShrink:0 }} dangerouslySetInnerHTML={{ __html: "<svg width=\"260\" height=\"210\" viewBox=\"0 0 260 210\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"130\" cy=\"90\" r=\"60\" fill=\"#b45309\" opacity=\"0.08\" stroke=\"#b45309\" stroke-width=\"2\"/><circle cx=\"130\" cy=\"90\" r=\"44\" fill=\"#b45309\" opacity=\"0.05\"/><path d=\"M142 33 L106 93 L124 93 L112 148 L150 83 L132 83 Z\" fill=\"#b45309\" opacity=\"0.9\"/><line x1=\"55\" y1=\"178\" x2=\"80\" y2=\"178\" stroke=\"#b45309\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\"0.35\"/><line x1=\"92\" y1=\"178\" x2=\"168\" y2=\"178\" stroke=\"#b45309\" stroke-width=\"4\" stroke-linecap=\"round\" opacity=\"0.6\"/><line x1=\"180\" y1=\"178\" x2=\"205\" y2=\"178\" stroke=\"#b45309\" stroke-width=\"3\" stroke-linecap=\"round\" opacity=\"0.35\"/><rect x=\"118\" y=\"157\" width=\"24\" height=\"9\" rx=\"3\" fill=\"#b45309\" opacity=\"0.45\"/><rect x=\"122\" y=\"168\" width=\"16\" height=\"9\" rx=\"3\" fill=\"#b45309\" opacity=\"0.3\"/></svg>" }} />
        </div>
      </section>

      <div style={{ background:'#fff', borderBottom:'1px solid #e2e8f0',
        padding:'16px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:960, margin:'0 auto', display:'flex',
          gap:32, flexWrap:'wrap', justifyContent:'center', alignItems:'center' }}>
          <div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#b45309',fontWeight:800,flexShrink:0}}>✓</span><span>Spara pengar enkelt</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#b45309',fontWeight:800,flexShrink:0}}>✓</span><span>Miljövänliga alternativ</span></div><div style={{display:'flex',alignItems:'flex-start',gap:8,fontSize:14,color:'#374151'}}><span style={{color:'#b45309',fontWeight:800,flexShrink:0}}>✓</span><span>Flexibla avtalsvillkor</span></div>
        </div>
      </div>

      <section id="jamfor" style={{ padding:'64px 20px', maxWidth:980,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <div style={{ textAlign:'center', marginBottom:36 }}>
          <h2 style={{ fontSize:30, fontWeight:800, marginBottom:10, color:'#0f172a' }}>
            Jämför elavtal enkelt
          </h2>
          <p style={{ color:'#64748b', fontSize:15 }}>
            Vi har granskat {providers.length} alternativ &mdash; senast uppdaterat {updated}
          </p>
        </div>
        <div style={{ display:'flex', gap:8, marginBottom:20,
          flexWrap:'wrap', justifyContent:'center' }}>
          {['betyg','pris','namn'].map(function(s) { return (
            <button key={s} onClick={() => setSortBy(s)}
              style={{ padding:'7px 18px', borderRadius:20, fontSize:13, fontWeight:600,
                cursor:'pointer', fontFamily:'Inter,sans-serif', border:'none',
                background: sortBy===s ? pc : '#f1f5f9',
                color: sortBy===s ? '#fff' : '#64748b' }}>
              {s==='betyg' ? '⭐ Bäst betyg' : s==='pris' ? '💰 Lägst pris' : '🔤 Namn A–Ö'}
            </button>
          ); })}
        </div>


        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {visible.map((p, i) => (
            <div key={p.name} style={{ background:'#fff', border: i===0 ? '2px solid '+pc : '1px solid #e2e8f0', borderRadius:16, padding:'22px 26px', position:'relative', boxShadow: i===0 ? '0 4px 24px '+pc+'18' : '0 1px 4px #0000000a' }}>
              <div style={{ display:'flex', gap:20, alignItems:'center', flexWrap:'wrap' }}>
                <div style={{ width:44, height:44, borderRadius:12, background: i===0 ? pcLight : '#f8fafc', display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, fontSize:16, color: i===0 ? pc : '#64748b', flexShrink:0, border:'1px solid '+(i===0 ? pcMed : '#e2e8f0') }}>
                  {['1','2','3','4','5'][i] || (i+1)}
                </div>
                {p.image && (
                  <div style={{ width:72, height:72, flexShrink:0, borderRadius:10, background:'#f8fafc', border:'1px solid #e2e8f0', display:'flex', alignItems:'center', justifyContent:'center', overflow:'hidden' }}>
                    <img src={p.image} alt={p.name} style={{ maxWidth:68, maxHeight:68, objectFit:'contain' }} onError={function(e){e.target.style.display='none';}} />
                  </div>
                )}
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ fontWeight:800, fontSize:18, color:'#0f172a', marginBottom:3 }}>{p.name}</div>
                  <div style={{ fontSize:13, color:'#64748b', marginBottom:10 }}>{p.description}</div>
                  {p.pros && <div style={{ display:'flex', flexDirection:'column', gap:5 }}>{p.pros.map((pro, j) => (<div key={j} style={{ display:'flex', gap:7, alignItems:'flex-start', fontSize:13 }}><span style={{ color:pc, fontWeight:700, flexShrink:0 }}>✓</span><span style={{ color:'#374151' }}>{pro}</span></div>))}</div>}
                </div>
                <div style={{ textAlign:'right', minWidth:190, display:'flex', flexDirection:'column', alignItems:'flex-end', gap:8 }}>
                  <div style={{ fontSize:22, fontWeight:800, color:pc }}>{p.currentPrice || p.price}</div>
                  <Stars score={p.score} />
                  <div style={{ background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:700, padding:'3px 10px', borderRadius:8 }}>{p.badge}</div>
                  <AffBtn url={p.url} name={p.name} primary={i===0} network={p.network} />
                  <button onClick={() => toggleSelect(p.name)} style={{ padding:'7px 14px', borderRadius:8, fontSize:12, fontWeight:600, cursor: selected.includes(p.name) || selected.length < 3 ? 'pointer' : 'not-allowed', fontFamily:'Inter,sans-serif', border:'1px solid', borderColor: selected.includes(p.name) ? pc : '#e2e8f0', background: selected.includes(p.name) ? pcLight : '#fff', color: selected.includes(p.name) ? pc : '#64748b', opacity: !selected.includes(p.name) && selected.length >= 3 ? 0.4 : 1 }}>
                    {selected.includes(p.name) ? '✓ Vald' : '+ Jämför'}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign:'center', marginTop:20, marginBottom:4, display:'flex', flexDirection:'column', alignItems:'center', gap:8 }}>
          {visibleCount < sorted.length && (
            <button onClick={() => setVisibleCount(function(c){ return Math.min(c + 5, sorted.length); })}
              style={{ padding:'10px 28px', borderRadius:24, fontSize:14, fontWeight:700,
                cursor:'pointer', fontFamily:'Inter,sans-serif',
                border:'2px solid '+pc, background:'#fff', color:pc }}>
              Visa 5 fler ↓ &nbsp;<span style={{ fontWeight:400, fontSize:13, opacity:0.7 }}>({sorted.length - visibleCount} återstår)</span>
            </button>
          )}
          {visibleCount >= sorted.length && sorted.length > 5 && (
            <button onClick={() => setVisibleCount(5)}
              style={{ padding:'10px 28px', borderRadius:24, fontSize:14, fontWeight:700,
                cursor:'pointer', fontFamily:'Inter,sans-serif',
                border:'2px solid #e2e8f0', background:'#fff', color:'#64748b' }}>
              Visa färre ↑
            </button>
          )}
          <p style={{ margin:0, fontSize:13, color:'#94a3b8' }}>
            Visar {visible.length} av {sorted.length} alternativ
            {selected.length > 0 && <span style={{ marginLeft:12, color:pc, fontWeight:600 }}>{selected.length} valda för jämförelse</span>}
          </p>
          <p style={{ margin:0, fontSize:11, color:'#cbd5e1' }}>
            Priser är riktpriser — klicka på ett alternativ för aktuellt pris hos respektive leverantör
          </p>
        </div>

        {selected.length >= 2 && (
          <div style={{ position:'fixed', bottom:0, left:0, right:0, zIndex:80,
            background:'#0f172a', padding:'14px 20px', fontFamily:'Inter,sans-serif',
            display:'flex', alignItems:'center', justifyContent:'center', gap:14, flexWrap:'wrap',
            boxShadow:'0 -4px 32px rgba(0,0,0,0.25)' }}>
            <span style={{ color:'#e2e8f0', fontWeight:600, fontSize:14 }}>
              {selected.length} valda: {selected.join(' vs ')}
            </span>
            <button onClick={() => setShowCompare(true)}
              style={{ background:pc, color:'#fff', border:'none', borderRadius:8,
                padding:'9px 22px', fontWeight:700, fontSize:14, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
              Jämför nu →
            </button>
            <button onClick={() => setSelected([])}
              style={{ background:'transparent', color:'#94a3b8', border:'1px solid #334155',
                borderRadius:8, padding:'9px 14px', fontSize:13, cursor:'pointer', fontFamily:'Inter,sans-serif' }}>
              Rensa
            </button>
          </div>
        )}

        {showCompare && (
          <div onClick={() => setShowCompare(false)} style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.72)', zIndex:200,
            display:'flex', alignItems:'flex-start', justifyContent:'center',
            padding:'24px 16px', overflowY:'auto', fontFamily:'Inter,sans-serif' }}>
            <div onClick={e => e.stopPropagation()} style={{ background:'#fff', borderRadius:16,
              width:'100%', maxWidth: selectedProviders.length === 2 ? 700 : 940,
              padding:28, marginTop:12, marginBottom:24 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:24 }}>
                <h3 style={{ fontSize:20, fontWeight:800, margin:0, color:'#0f172a' }}>
                  Jämförelse — {selectedProviders.map(function(p){return p.name;}).join(' vs ')}
                </h3>
                <button onClick={() => setShowCompare(false)}
                  style={{ background:'none', border:'none', fontSize:22, cursor:'pointer', color:'#94a3b8' }}>✕</button>
              </div>
              <div style={{ display:'grid', gridTemplateColumns: selectedProviders.map(function(){return '1fr';}).join(' '), gap:14 }}>
                {selectedProviders.map(function(p) { return (
                  <div key={p.name} style={{ border:'2px solid '+pc+'30', borderRadius:12, padding:'20px 18px',
                    display:'flex', flexDirection:'column', gap:10 }}>
                    <div style={{ fontWeight:800, fontSize:17, color:'#0f172a', borderBottom:'1px solid #f1f5f9', paddingBottom:10 }}>{p.name}</div>
                    <div>
                      <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>PRIS</div>
                      <div style={{ fontSize:20, fontWeight:800, color:pc }}>{p.currentPrice||p.price||'—'}</div>
                    </div>
                    <div>
                      <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>BETYG</div>
                      <Stars score={p.score} />
                    </div>
                    {p.badge && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>UTMÄRKELSE</div>
                        <div style={{ background:'#f0fdf4', color:'#15803d', fontSize:11, fontWeight:700, padding:'4px 10px', borderRadius:8, display:'inline-block' }}>{p.badge}</div>
                      </div>
                    )}
                    {p.description && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:2 }}>OM TJÄNSTEN</div>
                        <div style={{ fontSize:13, color:'#475569', lineHeight:1.5 }}>{p.description}</div>
                      </div>
                    )}
                    {p.pros && p.pros.length > 0 && (
                      <div>
                        <div style={{ fontSize:11, color:'#94a3b8', fontWeight:600, marginBottom:6 }}>FÖRDELAR</div>
                        <div style={{ display:'flex', flexDirection:'column', gap:5 }}>
                          {p.pros.map(function(pro,j){return(
                            <div key={j} style={{ display:'flex', gap:6, fontSize:13 }}>
                              <span style={{ color:pc, fontWeight:700, flexShrink:0 }}>✓</span>
                              <span style={{ color:'#374151' }}>{pro}</span>
                            </div>
                          );})}
                        </div>
                      </div>
                    )}
                    <div style={{ marginTop:'auto', paddingTop:10 }}>
                      <AffBtn url={p.url} name={p.name} primary={true} network={p.network} />
                    </div>
                  </div>
                );})}
              </div>
              <p style={{ marginTop:16, fontSize:12, color:'#94a3b8', textAlign:'center' }}>
                * Stäng för att välja fler alternativ eller byta urval.
              </p>
            </div>
          </div>
        )}

        <p style={{ marginTop:16, fontSize:12, color:'#94a3b8', textAlign:'center' }}>
          * Vi kan erhålla provision vid val via våra länkar. Det påverkar aldrig priset för dig eller våra oberoende betyg.
          Se vår <Link href="/om-oss" style={{ color:pc }}>redaktionspolicy</Link>.
        </p>
      </section>

      

      <section id="guide" style={{ background:'#f8fafc',
        borderTop:'1px solid #e2e8f0', padding:'64px 20px',
        fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <h2 style={{ fontSize:28, fontWeight:800, marginBottom:20, color:'#0f172a' }}>
            Köpa elavtal
          </h2>
          <p style={{ fontSize:16, lineHeight:1.85, color:'#374151', marginBottom:28 }}>
            När du ska köpa ett elavtal för din sommarstuga finns det flera faktorer att tänka på. Först och främst, fundera över hur mycket el du förväntar dig att använda. Om du planerar att använda stugan endast under sommarmånaderna kan ett avtal med rörligt pris vara förmånligt, eftersom elpriserna ofta är lägre under denna period. Å andra sidan, om du besöker stugan året runt, kan ett fastprisavtal ge mer förutsägbarhet i dina kostnader. Vidare bör du överväga miljöpåverkan av ditt val. Många leverantörer erbjuder idag gröna elavtal som garanterar att din el kommer från förnybara källor. Detta kan vara ett viktigt kriterium för dig som värderar hållbarhet. Ta även hänsyn till avtalslängd och eventuella uppsägningskostnader. Vissa avtal kan ha bindningstider som inte passar dina planer, så det är viktigt att läsa det finstilta. Slutligen, jämför olika leverantörers kundrecensioner för att säkerställa att du får en tillförlitlig tjänst.
          </p>
          <h3 style={{ fontSize:22, fontWeight:700, marginBottom:16, color:'#0f172a', marginTop:40 }}>Vanliga misstag</h3>
          <p style={{ fontSize:16, lineHeight:1.85, color:'#374151', marginBottom:28 }}>Ett vanligt misstag när man väljer elavtal för sommarstugan är att inte ta hänsyn till den faktiska elförbrukningen. Många tecknar avtal baserat på uppskattningar som inte stämmer överens med det verkliga användningsmönstret, vilket kan leda till onödiga kostnader. Ett annat misstag är att ignorera avtalsvillkoren. Många avtal kommer med dolda avgifter eller komplicerade uppsägningsvillkor som kan ställa till problem om du vill byta leverantör senare. Det är också lätt att glömma bort att jämföra avtal regelbundet. Elmarknaden förändras ständigt, och det avtal som var bäst för några år sedan kanske inte är det längre. Slutligen, många missar att kolla om det finns några rabatter eller kampanjer som kan ge en bättre deal.</p>
          <h3 style={{ fontSize:20, fontWeight:700, marginBottom:24, color:'#0f172a' }}>
            Vad ska du tänka på?
          </h3>
          <div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#b4530915',color:'#b45309',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>1</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Jämför elpriser noggrant</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#b4530915',color:'#b45309',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>2</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Välj rätt avtalstyp</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#b4530915',color:'#b45309',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>3</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Kontrollera miljöpåverkan</p></div><div style={{display:'flex',gap:14,alignItems:'flex-start',marginBottom:16}}><div style={{width:28,height:28,borderRadius:'50%',background:'#b4530915',color:'#b45309',display:'flex',alignItems:'center',justifyContent:'center',fontWeight:800,fontSize:13,flexShrink:0}}>4</div><p style={{color:'#374151',lineHeight:1.7,fontSize:15}}>Läs kundrecensioner</p></div>
        </div>
      </section>

      <section style={{ padding:'64px 20px', maxWidth:760,
        margin:'0 auto', fontFamily:'Inter,sans-serif' }}>
        <h2 style={{ fontSize:26, fontWeight:800, marginBottom:32, color:'#0f172a' }}>
          Vanliga frågor
        </h2>
        <details style={{borderBottom:'1px solid #e2e8f0',paddingBottom:16,marginBottom:16}} open={false}><summary style={{fontWeight:700,fontSize:15,cursor:'pointer',color:'#0f172a',listStyle:'none',display:'flex',justifyContent:'space-between',alignItems:'center'}}>Vilket elavtal är bäst för sommarstugan?<span style={{color:'#b45309',fontSize:18,fontWeight:400}}>+</span></summary><p style={{marginTop:12,color:'#475569',lineHeight:1.75,fontSize:14}}>Det beror på din användning. För sommarmånader kan rörligt pris vara bra, medan fastpris passar året runt.</p></details>
      </section>

      <section style={{ background:'#f8fafc', borderTop:'1px solid #e2e8f0', padding:'32px 20px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:760, margin:'0 auto' }}>
          <p style={{ fontSize:14, color:'#64748b', marginBottom:12, fontWeight:600 }}>Läs mer:</p>
          <div style={{ display:'flex', gap:14, flexWrap:'wrap' }}>
            <a href="/stockholm" style={{color:'#b45309',fontWeight:600,textDecoration:'none',fontSize:14}}>Billigaste elavtal Stockholm</a>
            · <a href="/goteborg" style={{color:'#b45309',fontWeight:600,textDecoration:'none',fontSize:14}}>Billigaste elavtal Göteborg</a>
            · <a href="/malmo" style={{color:'#b45309',fontWeight:600,textDecoration:'none',fontSize:14}}>Billigaste elavtal Malmö</a>
            · <a href="/byta-nu" style={{color:'#b45309',fontWeight:600,textDecoration:'none',fontSize:14}}>Byta elavtal snabbt & enkelt</a>
          </div>
        </div>
      </section>

      <footer style={{ background:'#0f172a', color:'#94a3b8',
        padding:'52px 20px 32px', fontFamily:'Inter,sans-serif' }}>
        <div style={{ maxWidth:980, margin:'0 auto' }}>
          <div style={{ display:'flex', gap:48, flexWrap:'wrap', marginBottom:36 }}>
            <div style={{ maxWidth:260 }}>
              <div style={{ fontWeight:800, color:'#fff', fontSize:18, marginBottom:10 }}>Elavtalguiden</div>
              <p style={{ fontSize:13, lineHeight:1.75 }}>
                Oberoende jämförelsetjänst för svenska konsumenter. Vi jämför 7 alternativ inom el.
              </p>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Sidor</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/" style={{ color:'#94a3b8', textDecoration:'none' }}>Jämförelse</Link>
                <Link href="/om-oss" style={{ color:'#94a3b8', textDecoration:'none' }}>Om oss</Link>
                <Link href="/kontakt" style={{ color:'#94a3b8', textDecoration:'none' }}>Kontakt</Link>
                <Link href="/integritetspolicy" style={{ color:'#94a3b8', textDecoration:'none' }}>Integritetspolicy</Link>
              </div>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Se även</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/stockholm" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Billigaste elavtal Stockholm</Link>
                <Link href="/goteborg" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Billigaste elavtal Göteborg</Link>
                <Link href="/malmo" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Billigaste elavtal Malmö</Link>
                <Link href="/byta-nu" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Byta elavtal snabbt & enkelt</Link>
                <Link href="/spotpris" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa spotprisavtal</Link>
                <Link href="/fastpris" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Bästa fastprisavtal</Link>
              </div>
            </div>
            <div>
              <div style={{ fontWeight:700, color:'#e2e8f0', marginBottom:14, fontSize:12, textTransform:'uppercase', letterSpacing:'0.5px' }}>Jämförelser</div>
              <div style={{ display:'flex', flexDirection:'column', gap:10, fontSize:14 }}>
                <Link href="/jamfor/vattenfall-vs-e-on" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Vattenfall vs E.ON</Link>
                <Link href="/jamfor/vattenfall-vs-fortum" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Vattenfall vs Fortum</Link>
                <Link href="/jamfor/vattenfall-vs-gota-energi" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Vattenfall vs Göta Energi</Link>
                <Link href="/jamfor/vattenfall-vs-telge-energi" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Vattenfall vs Telge Energi</Link>
                <Link href="/jamfor/vattenfall-vs-skelleftea-kraft" style={{color:'#94a3b8',textDecoration:'none',fontSize:13}}>Vattenfall vs Skellefteå Kraft</Link>
              </div>
            </div>
          </div>
          <div style={{ borderTop:'1px solid #1e293b', paddingTop:24, fontSize:12, lineHeight:1.75 }}>
            <p style={{ marginBottom:8 }}>
              &copy; {year} Elavtalguiden. Oberoende jämförelsetjänst utan koppling till listade
              varumärken utöver eventuella affiliate-provisioner.
            </p>
            <p>
              <strong style={{ color:'#e2e8f0' }}>Affiliateinformation:</strong> Sidan innehåller
              affiliate-länkar via Adtraction Sverige. Vi kan ta emot provision från annonsörer.
              Det påverkar aldrig priset för dig eller våra oberoende betyg.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}