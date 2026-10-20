const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const TARGET=500;
const ADMIN_PASS="MATSKEN2026";
const CHANNEL="https://whatsapp.com/channel/0029VbDoFXD8qIzjg285xu2h";
const DB_FILE = '/tmp/breaker_db.json';

function getDB(){
  try{
    if(fs.existsSync(DB_FILE)) return JSON.parse(fs.readFileSync(DB_FILE,'utf8'));
  }catch(e){}
  return [];
}
function saveDB(db){
  try{ fs.writeFileSync(DB_FILE, JSON.stringify(db)); }catch(e){}
}

const countries = [
"+256 Uganda","+254 Kenya","+255 Tanzania","+250 Rwanda","+257 Burundi","+260 Zambia","+263 Zimbabwe","+265 Malawi","+251 Ethiopia","+234 Nigeria","+233 Ghana","+27 South Africa","+20 Egypt","+212 Morocco","+216 Tunisia","+237 Cameroon","+243 DRC",
"+971 UAE Dubai","+966 Saudi Arabia","+974 Qatar","+965 Kuwait","+968 Oman","+973 Bahrain","+967 Yemen",
"+1 USA","+44 UK","+1 Canada","+61 Australia","+49 Germany","+33 France","+31 Netherlands","+46 Sweden","+47 Norway","+41 Switzerland","+65 Singapore","+81 Japan","+82 South Korea","+39 Italy","+34 Spain","+351 Portugal","+32 Belgium","+45 Denmark","+64 New Zealand","+90 Turkey",
"+91 India","+62 Indonesia","+60 Malaysia","+63 Philippines","+66 Thailand","+84 Vietnam","+86 China","+92 Pakistan","+880 Bangladesh"
];

app.get('/',(req,res)=>{
  const db = getDB();
  const cur=db.length;
  const pct=Math.round(cur/TARGET*100);
  const rem=TARGET-cur;
  const opts = countries.map(c=>{
    const code=c.split(' ')[0];
    const name=c.split(' ').slice(1).join(' ');
    const sel=c.startsWith('+256')?'selected':'';
    return `<option value="${code}" ${sel}>${code} ${name}</option>`;
  }).join('');
  res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>BREAKER VCF</title>
<style>body{margin:0;background:#e6e8ff;font-family:system-ui;color:#1e1b4b}.wrap{max-width:420px;margin:auto;padding:14px}.top{background:#fff;border-radius:20px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center}.logoB{width:48px;height:48px;background:#6366f1;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:28px}.batch{border:1.5px solid #6366f1;color:#4338ca;border-radius:20px;padding:6px 12px;font-size:12px;font-weight:700}.title{margin:18px 4px;font-weight:900;font-size:24px;line-height:1.1}.title span{color:#4338ca}.card{background:#fff;border:2px solid #000;border-radius:22px;overflow:hidden}.inner{padding:16px}.progress-track{width:100%;height:22px;background:#e0e7ff;border:1.5px solid #6366f1;border-radius:20px;overflow:hidden;margin-top:8px}.progress-fill{height:100%;background:repeating-linear-gradient(45deg,#6366f1 0 10px,#818cf8 10px 20px);border-radius:20px}.phone-row{display:flex;gap:6px;margin-top:6px}.phone-row select{width:60%;padding:12px;border-radius:10px;border:1.5px solid #000;font-weight:700}.phone-row input{width:40%;margin-top:0;padding:12px;border-radius:10px;border:1.5px solid #000}input{width:100%;box-sizing:border-box;padding:12px;border-radius:10px;border:1.5px solid #000;margin-top:6px}.btn{width:100%;padding:14px;border-radius:12px;font-weight:800;border:none;cursor:pointer;margin-top:12px}.btn-primary{background:#6366f1;color:#fff}.btn-outline{background:#fff;color:#4338ca;border:2px solid #4338ca}.btn-light{background:#c7c8ff;color:#4338ca;border:1.5px solid #4338ca;padding:12px;font-size:14px}.bottom{display:flex;gap:10px;background:#eef0ff;padding:12px}</style></head><body><div class="wrap">
<div class="top"><div style="display:flex;align-items:center;gap:10px"><div class="logoB">B</div><div style="font-weight:900;line-height:0.9">BREAKER<br>VCF</div></div><div class="batch">BATCH 1</div></div>
<div class="title">END OF YEAR FREE '<br><span>VCF VIEWERS GAIN</span></div>
<div class="card"><div class="inner">
<div style="display:flex;justify-content:space-between;font-weight:800"><span>REGISTERED ${cur} / ${TARGET}</span><span>${pct}%</span></div>
<div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
<div style="margin-top:14px;font-weight:700;font-size:12px">FULL NAME</div>
<form id="regForm" method="POST" action="/register">
<input name="name" id="name" placeholder="Enter your full name" required>
<div style="margin-top:12px;font-weight:700;font-size:12px">WHATSAPP NUMBER</div>
<div class="phone-row"><select id="cc">${opts}</select><input id="num" type="tel" placeholder="769724124" required></div>
<input type="hidden" name="number" id="fullNumber">
<button class="btn btn-primary" type="submit">Register</button>
</form>
<button class="btn btn-outline" onclick="navigator.clipboard.writeText(location.href);alert('Link copied!')">Copy link</button>
</div>
<div class="bottom"><a href="${CHANNEL}" style="flex:1"><button class="btn btn-light" style="width:100%">Channel</button></a><a href="/admin?pass=${ADMIN_PASS}" style="flex:1"><button class="btn btn-light" style="width:100%">Get VCF</button></a></div></div>
<div style="text-align:center;margin:14px;font-size:12px;font-weight:800">Powered by MATSKEN TECH</div>
<div style="text-align:center;font-size:10px;color:#64748b">Target:${TARGET} | Remaining:${rem} | Saved:${cur}</div>
</div>
<script>
document.getElementById('regForm').addEventListener('submit', function(e){
  const cc = document.getElementById('cc').value;
  const num = document.getElementById('num').value.replace(/\\s+/g,'');
  document.getElementById('fullNumber').value = cc + num;
});
</script>
</body></html>`);
});

app.post('/register',(req,res)=>{
  let db = getDB();
  const {name,number}=req.body;
  const cleanNum = (number||'').replace(/\\s+/g,'');
  if(name && cleanNum && db.length<TARGET && !db.find(u=>u.number===cleanNum)){
    db.push({name,number:cleanNum,date:new Date().toISOString()});
    saveDB(db);
  }
  res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>Registered</title>
  <style>body{margin:0;background:#e6e8ff;font-family:system-ui;text-align:center;padding:20px} .card{max-width:380px;margin:40px auto;background:#fff;border:2px solid #000;border-radius:22px;padding:24px} .btn{display:block;width:100%;padding:16px;border-radius:12px;font-weight:900;text-decoration:none;margin-top:14px} .primary{background:#6366f1;color:#fff} .outline{background:#fff;color:#4338ca;border:2px solid #4338ca}</style></head><body>
  <div class="card"><h2>✅ Registered!</h2><p><b>${name}</b><br>${cleanNum} saved!</p><p style="font-size:13px;color:#64748b">Now follow channel to complete</p>
  <a href="${CHANNEL}" class="btn primary">💬 OPEN WHATSAPP CHANNEL & FOLLOW</a>
  <a href="/" class="btn outline">Back to Home</a>
  <p style="font-size:11px;margin-top:12px">If not opening, copy link: <br>${CHANNEL}</p></div>
  <script>setTimeout(()=>{ window.location.href="${CHANNEL}"; }, 1200);</script>
  </body></html>`);
});

app.get('/admin',(req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.send(`<body style="text-align:center;padding:30px;font-family:Arial;background:#e6e8ff"><h2>🔒 MATSKEN ADMIN</h2><form><input name="pass" type="password" placeholder="MATSKEN2026" style="padding:12px;border-radius:10px;border:1.5px solid #000;width:80%"><br><br><button style="padding:12px 30px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-weight:800">LOGIN</button></form></body>`);
  let db=getDB();
  if(req.query.clear==='1'){ db=[]; saveDB(db); }
  let rows=db.map((u,i)=>`<tr><td>${i+1}</td><td>${u.name}</td><td>${u.number}</td></tr>`).join('');
  res.send(`<body style="font-family:Arial;padding:12px"><h2>ADMIN ${db.length}/${TARGET} | Remaining:${TARGET-db.length}</h2><a href="/vcf?pass=${ADMIN_PASS}"><button style="background:#6366f1;color:#fff;padding:12px 20px;border:none;border-radius:10px;font-weight:800">📥 DOWNLOAD VCF FILE (Admin Only)</button></a> <a href="/admin?pass=${ADMIN_PASS}&clear=1"><button style="background:#000;color:#fff;padding:8px 12px;border:none;border-radius:8px;margin-left:10px">Clear</button></a><table border=1 cellpadding=8 style="width:100%;margin-top:15px;border-collapse:collapse"><tr><th>#</th><th>Name</th><th>Number</th></tr>${rows}</table></body>`);
});

app.get('/vcf',(req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.status(403).send('Admin Only');
  const db=getDB();
  let vcf=''; db.forEach(c=>{ vcf+=`BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nTEL;TYPE=CELL:${c.number}\nEND:VCARD\n`; });
  res.setHeader('Content-Disposition','attachment; filename=breaker_vcf_matsken.vcf');
  res.setHeader('Content-Type','text/x-vcard');
  res.send(vcf);
});

module.exports=app;
