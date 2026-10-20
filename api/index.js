const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('.'));
let db=[];
const TARGET=500;
const ADMIN_PASS="MATSKEN2026";
const CHANNEL="https://whatsapp.com/channel/0029VbDoFXD8qIzjg285xu2h";

app.get('/',(req,res)=>{
  const cur=db.length;
  const pct=Math.round((cur/TARGET)*100);
  const rem=TARGET-cur;
  res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BREAKER VCF</title>
  <style>
  body{margin:0;background:#e6e8ff;font-family:system-ui,Arial;color:#1e1b4b}
  .wrap{max-width:420px;margin:auto;padding:14px}
  .top{background:#fff;border-radius:20px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center;box-shadow:0 4px 20px rgba(0,0,0,0.06)}
  .logoB{width:48px;height:48px;background:#6366f1;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:28px;transform:rotate(-8deg)}
  .batch{border:1.5px solid #6366f1;color:#4338ca;border-radius:20px;padding:6px 12px;font-size:12px;font-weight:700}
  .title{margin:18px 4px;font-weight:900;font-size:24px;line-height:1.1}
  .title span{color:#4338ca}
  .card{background:#fff;border:2px solid #000;border-radius:22px;overflow:hidden;box-shadow:0 8px 30px rgba(0,0,0,0.08)}
  .inner{padding:16px}
  .progress-track{width:100%;height:22px;background:#e0e7ff;border:1.5px solid #6366f1;border-radius:20px;overflow:hidden;margin-top:8px}
  .progress-fill{height:100%;background:repeating-linear-gradient(45deg,#6366f1 0 10px,#818cf8 10px 20px);border-radius:20px;transition:width 0.5s}
  input{width:100%;box-sizing:border-box;padding:13px 12px;border-radius:10px;border:1.5px solid #000;margin-top:6px;font-size:15px}
  .phone-row{display:flex;gap:8px;margin-top:6px}
  .phone-row select{width:42%;padding:13px 6px;border-radius:10px;border:1.5px solid #000;font-weight:700;background:#fff;font-size:13px}
  .phone-row input{width:58%;margin-top:0}
  .btn{width:100%;padding:14px;border-radius:12px;font-weight:800;border:none;cursor:pointer;margin-top:12px}
  .btn-primary{background:#6366f1;color:#fff}
  .btn-outline{background:#fff;color:#4338ca;border:2px solid #4338ca}
  .btn-light{background:#c7c8ff;color:#4338ca;border:1.5px solid #4338ca;padding:12px;font-size:14px}
  .bottom{display:flex;gap:10px;background:#eef0ff;padding:12px}
  </style></head><body><div class="wrap">
  <div class="top"><div style="display:flex;align-items:center;gap:10px"><div class="logoB">B</div><div style="font-weight:900;line-height:0.9">BREAKER<br>VCF</div></div><div class="batch">📄 BATCH 1</div></div>
  <div class="title">END OF YEAR FREE '<br><span>VCF VIEWERS GAIN</span></div>
  <div class="card"><div class="inner">
  <div style="display:flex;justify-content:space-between;font-weight:800"><span>REGISTERED ${cur} / ${TARGET}</span><span>${pct}%</span></div>
  <div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
  <div style="margin-top:14px;font-weight:700;font-size:12px">FULL NAME</div>
  <form method="POST" action="/register" onsubmit="const cc=document.getElementById('cc').value; const num=document.getElementById('num').value; this.number.value=cc+num;">
  <input name="name" placeholder="Enter your full name" required>
  <div style="margin-top:12px;font-weight:700;font-size:12px">WHATSAPP NUMBER</div>
  <div class="phone-row">
  <select id="cc">
    <option value="+256">🇺🇬 +256 UG</option>
    <option value="+254">🇰🇪 +254 KE</option>
    <option value="+255">🇹🇿 +255 TZ</option>
    <option value="+250">🇷🇼 +250 RW</option>
    <option value="+257">🇧🇮 +257 BI</option>
    <option value="+260">🇿🇲 +260 ZM</option>
    <option value="+263">🇿🇼 +263 ZW</option>
    <option value="+265">🇲🇼 +265 MW</option>
    <option value="+251">🇪🇹 +251 ET</option>
    <option value="+234">🇳🇬 +234 NG</option>
    <option value="+233">🇬🇭 +233 GH</option>
    <option value="+27">🇿🇦 +27 ZA</option>
    <option value="+20">🇪🇬 +20 EG</option>
    <option value="+212">🇲🇦 +212 MA</option>
    <option value="+216">🇹🇳 +216 TN</option>
    <option value="+237">🇨🇲 +237 CM</option>
    <option value="+243">🇨🇩 +243 CD</option>
    <option value="+1">🇺🇸 +1 US</option>
    <option value="+44">🇬🇧 +44 UK</option>
    <option value="+91">🇮🇳 +91 IN</option>
    <option value="+971">🇦🇪 +971 AE</option>
    <option value="+966">🇸🇦 +966 SA</option>
    <option value="+90">🇹🇷 +90 TR</option>
    <option value="+49">🇩🇪 +49 DE</option>
    <option value="+33">🇫🇷 +33 FR</option>
    <option value="+39">🇮🇹 +39 IT</option>
    <option value="+34">🇪🇸 +34 ES</option>
    <option value="+351">🇵🇹 +351 PT</option>
    <option value="+31">🇳🇱 +31 NL</option>
    <option value="+32">🇧🇪 +32 BE</option>
    <option value="+41">🇨🇭 +41 CH</option>
    <option value="+46">🇸🇪 +46 SE</option>
    <option value="+47">🇳🇴 +47 NO</option>
    <option value="+45">🇩🇰 +45 DK</option>
    <option value="+61">🇦🇺 +61 AU</option>
    <option value="+64">🇳🇿 +64 NZ</option>
    <option value="+81">🇯🇵 +81 JP</option>
    <option value="+82">🇰🇷 +82 KR</option>
    <option value="+86">🇨🇳 +86 CN</option>
    <option value="+60">🇲🇾 +60 MY</option>
    <option value="+65">🇸🇬 +65 SG</option>
    <option value="+66">🇹🇭 +66 TH</option>
    <option value="+84">🇻🇳 +84 VN</option>
    <option value="+62">🇮🇩 +62 ID</option>
    <option value="+63">🇵🇭 +63 PH</option>
    <option value="+92">🇵🇰 +92 PK</option>
    <option value="+880">🇧🇩 +880 BD</option>
    <option value="+55">🇧🇷 +55 BR</option>
  </select>
  <input id="num" type="tel" placeholder="770 000000" required>
  </div>
  <input type="hidden" name="number">
  <button class="btn btn-primary" type="submit">Register</button>
  </form>
  <button class="btn btn-outline" onclick="navigator.clipboard.writeText(window.location.href);alert('Link copied!')">📋 Copy link</button>
  </div>
  <div class="bottom">
  <a href="${CHANNEL}" style="flex:1"><button class="btn btn-light" style="width:100%">💬 Channel</button></a>
  <a href="/admin" style="flex:1"><button class="btn btn-light" style="width:100%">⬇️ Get VCF</button></a>
  </div></div>
  <div style="text-align:center;margin:14px;display:flex;justify-content:center;align-items:center;gap:8px"><img src="/logo.jpg" style="width:38px;height:38px;object-fit:contain" onerror="this.style.display='none'"><div style="text-align:left;line-height:1"><div style="font-size:10px;color:#64748b">Powered by</div><div style="font-weight:800;font-size:12px;color:#334155">MATSKEN TECH</div></div></div>
  <div style="text-align:center;font-size:10px;color:#64748b">Target: ${TARGET} | Remaining: ${rem} | Admin only download</div>
  </div></body></html>`);
});

app.post('/register',(req,res)=>{
  const {name,number}=req.body;
  if(name&&number&&db.length<TARGET&&!db.find(u=>u.number===number)) db.push({name,number,date:new Date().toISOString()});
  res.send(`<html><head><meta http-equiv="refresh" content="1.5;url=${CHANNEL}"><style>body{background:#e6e8ff;font-family:Arial;text-align:center;padding:60px}</style></head><body><h2>✅ Registered!</h2><p>Redirecting to WhatsApp Channel...</p><a href="${CHANNEL}">Click if not redirected</a></body></html>`);
});

app.get('/admin',(req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.send(`<body style="background:#e6e8ff;font-family:Arial;padding:30px;text-align:center"><h2>🔒 MATSKEN ADMIN</h2><form><input name="pass" type="password" placeholder="Enter Password MATSKEN2026" style="padding:12px;width:80%;border-radius:10px;border:1.5px solid #000"><br><br><button style="padding:12px 30px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-weight:800">LOGIN</button></form><p style="font-size:12px;color:#64748b">Only admin can download VCF</p></body>`);
  if(req.query.clear==='1') db=[];
  let rows=db.map((u,i)=>`<tr><td>${i+1}</td><td>${u.name}</td><td>${u.number}</td></tr>`).join('');
  res.send(`<body style="font-family:Arial;padding:12px;background:#fff"><h2>ADMIN PANEL - ${db.length}/${TARGET} | Remaining: ${TARGET-db.length}</h2><a href="/vcf?pass=${ADMIN_PASS}"><button style="background:#6366f1;color:#fff;padding:12px 20px;border:none;border-radius:10px;font-weight:800">📥 DOWNLOAD VCF FILE (Admin Only)</button></a> <a href="/admin?pass=${ADMIN_PASS}&clear=1"><button style="background:#000;color:#fff;padding:12px;border:none;border-radius:10px">Clear All</button></a><table border="1" cellpadding="8" style="width:100%;margin-top:15px;border-collapse:collapse"><tr><th>#</th><th>Name</th><th>Number</th></tr>${rows}</table></body>`);
});

app.get('/vcf',(req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.status(403).send('<body style="padding:50px;text-align:center"><h1>403 - Admin Only</h1><p>Go to /admin to login with MATSKEN2026</p></body>');
  let vcf=''; db.forEach(c=>{vcf+=`BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nTEL;TYPE=CELL:${c.number}\nEND:VCARD\n`;});
  res.setHeader('Content-Disposition','attachment; filename=breaker_vcf_matsken.vcf');
  res.setHeader('Content-Type','text/x-vcard'); res.send(vcf);
});

module.exports=app;
