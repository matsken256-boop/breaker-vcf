const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const TARGET=500;
const ADMIN_PASS="MATSKEN2026";
const CHANNEL="https://whatsapp.com/channel/0029VbDoFXD8qIzjg285xu2h";
const DB_FILE='/tmp/breaker_db.json';
function getDB(){try{if(fs.existsSync(DB_FILE))return JSON.parse(fs.readFileSync(DB_FILE,'utf8'))}catch(e){}return[]}
function saveDB(d){try{fs.writeFileSync(DB_FILE,JSON.stringify(d))}catch(e){}}

const countries=[
"+256 Uganda","+254 Kenya","+255 Tanzania","+250 Rwanda","+257 Burundi","+260 Zambia","+263 Zimbabwe","+265 Malawi","+251 Ethiopia","+234 Nigeria","+233 Ghana","+27 South Africa","+20 Egypt","+212 Morocco","+216 Tunisia","+237 Cameroon","+243 DRC","+971 UAE","+966 Saudi","+974 Qatar","+965 Kuwait","+968 Oman","+973 Bahrain","+1 USA","+44 UK","+1 Canada","+61 Australia","+49 Germany","+33 France","+31 Netherlands","+46 Sweden","+47 Norway","+41 Switzerland","+65 Singapore","+81 Japan","+82 Korea","+39 Italy","+34 Spain","+351 Portugal","+32 Belgium","+45 Denmark","+64 NewZealand","+90 Turkey","+91 India","+62 Indonesia","+60 Malaysia","+63 Philippines","+66 Thailand","+84 Vietnam","+86 China","+92 Pakistan","+880 Bangladesh"
];

app.get('/',(req,res)=>{
  const db=getDB(); const cur=db.length; const pct=Math.round(cur/TARGET*100); const rem=TARGET-cur;
  const opts=countries.map(c=>{
    const parts=c.split(' '); const code=parts[0]; const name=parts.slice(1).join(' ');
    const sel=code==='+256'?'selected':''; 
    return `<option value="${code}" ${sel}>${code} ${name}</option>`;
  }).join('');
  res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>BREAKER VCF</title>
<style>
body{margin:0;background:#e6e8ff;font-family:system-ui;color:#1e1b4b}
.wrap{max-width:420px;margin:auto;padding:14px}
.top{background:#fff;border-radius:20px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center}
.logoB{width:48px;height:48px;background:#6366f1;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:28px}
.batch{border:1.5px solid #6366f1;color:#4338ca;border-radius:20px;padding:6px 12px;font-size:12px;font-weight:700}
.title{margin:18px 4px;font-weight:900;font-size:24px;line-height:1.1}.title span{color:#4338ca}
.card{background:#fff;border:2px solid #000;border-radius:22px;overflow:hidden}
.inner{padding:16px}
.progress-track{width:100%;height:22px;background:#e0e7ff;border:1.5px solid #6366f1;border-radius:20px;overflow:hidden;margin-top:8px}
.progress-fill{height:100%;background:linear-gradient(90deg,#6366f1,#818cf8);border-radius:20px}
.phone-row{display:flex;gap:6px;margin-top:6px}
.phone-row select{width:60%;padding:12px;border-radius:10px;border:1.5px solid #000;font-weight:700}
.phone-row input{width:40%;padding:12px;border-radius:10px;border:1.5px solid #000}
input{width:100%;box-sizing:border-box;padding:12px;border-radius:10px;border:1.5px solid #000;margin-top:6px}
.btn{width:100%;padding:14px;border-radius:12px;font-weight:800;border:none;cursor:pointer;margin-top:12px}
.btn-primary{background:#6366f1;color:#fff}.btn-outline{background:#fff;color:#4338ca;border:2px solid #4338ca}
.btn-light{background:#c7c8ff;color:#4338ca;border:1.5px solid #4338ca;padding:12px;font-size:14px}
.bottom{display:flex;gap:10px;background:#eef0ff;padding:12px}
</style></head><body><div class="wrap">
<div class="top"><div style="display:flex;align-items:center;gap:10px"><div class="logoB">B</div><div style="font-weight:900;line-height:0.9">BREAKER<br>VCF</div></div><div class="batch">BATCH 1</div></div>
<div class="title">END OF YEAR FREE '<br><span>VCF VIEWERS GAIN</span></div>
<div class="card"><div class="inner">
<div style="display:flex;justify-content:space-between;font-weight:800"><span>REGISTERED ${cur} / ${TARGET}</span><span>${pct}%</span></div>
<div class="progress-track"><div class="progress-fill" style="width:${pct}%"></div></div>
<div style="margin-top:14px;font-weight:700;font-size:12px">FULL NAME</div>
<form id="regForm" method="POST" action="/register">
<input name="name" placeholder="Enter your full name" required>
<div style="margin-top:12px;font-weight:700;font-size:12px">WHATSAPP NUMBER</div>
<div class="phone-row"><select id="cc">${opts}</select><input id="num" type="tel" placeholder="769724124" required></div>
<input type="hidden" name="number" id="fullNumber">
<button class="btn btn-primary" type="submit">Register</button>
</form>
<button class="btn btn-outline" onclick="navigator.clipboard.writeText(location.href);alert('Link copied!')">Copy link - ${rem} left</button>
</div><div class="bottom"><a href="${CHANNEL}" style="flex:1"><button class="btn btn-light" style="width:100%">Channel</button></a><a href="/admin?pass=${ADMIN_PASS}" style="flex:1"><button class="btn btn-light" style="width:100%">Get VCF</button></a></div></div></div>
<script>
document.getElementById('regForm').addEventListener('submit',function(){
  const cc=document.getElementById('cc').value;
  let num=document.getElementById('num').value; num=num.replace(/ /g,'');
  document.getElementById('fullNumber').value=cc+num;
});
</script></body></html>`);
});

app.post('/register',(req,res)=>{
  let db=getDB(); 
  const name=req.body.name;
  let number=(req.body.number||'').replace(/ /g,'');
  if(name && number && db.length<TARGET && !db.find(u=>u.number===number)){
    db.push({name,number}); saveDB(db);
  }
  res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"></head><body style="text-align:center;padding:30px;font-family:Arial;background:#e6e8ff"><div style="max-width:380px;margin:40px auto;background:#fff;border:2px solid #000;border-radius:20px;padding:20px"><h2>✅ Registered!</h2><p>${name}<br>${number}</p><a href="${CHANNEL}" style="display:block;background:#6366f1;color:#fff;padding:14px;border-radius:12px;text-decoration:none;font-weight:800;margin-top:10px">💬 OPEN CHANNEL & FOLLOW</a><a href="/" style="display:block;background:#fff;color:#4338ca;border:2px solid #4338ca;padding:12px;border-radius:12px;text-decoration:none;font-weight:800;margin-top:10px">Back Home</a></div><script>setTimeout(()=>{window.location.href="${CHANNEL}";},1200);</script></body></html>`);
});

app.get('/admin',(req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.send(`<body style="text-align:center;padding:30px;font-family:Arial;background:#e6e8ff"><h2>🔒 MATSKEN ADMIN</h2><form><input name="pass" type="password" placeholder="MATSKEN2026" style="padding:12px;border-radius:10px;border:1.5px solid #000;width:80%"><br><br><button style="padding:12px 30px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-weight:800">LOGIN</button></form></body>`);
  let db=getDB();
  if(req.query.delete!==undefined){ db.splice(parseInt(req.query.delete),1); saveDB(db); return res.redirect('/admin?pass='+ADMIN_PASS); }
  if(req.query.clear==='1'){ saveDB([]); return res.redirect('/admin?pass='+ADMIN_PASS); }
  if(req.query.dedup==='1'){ const s=new Set(); const f=[]; db.forEach(u=>{ if(!s.has(u.number)){ s.add(u.number); f.push(u);} }); saveDB(f); return res.redirect('/admin?pass='+ADMIN_PASS); }
  
  const counts={}; db.forEach(u=>{ counts[u.number]=(counts[u.number]||0)+1; });
  const dupLen=Object.keys(counts).filter(k=>counts[k]>1).length;
  let rows=db.map((u,i)=>{
    const dup=counts[u.number]>1?'style="background:#fee2e2"':'';
    return `<tr ${dup}><td>${i+1}</td><td>${u.name}</td><td>${u.number}</td><td>${counts[u.number]>1?'<b style="color:red">DUP</b>':''}</td><td><a href="/admin?pass=${ADMIN_PASS}&delete=${i}" onclick="return confirm('Delete ${u.name}?')"><button style="background:red;color:#fff;border:none;padding:5px 8px;border-radius:6px">Delete</button></a></td></tr>`;
  }).join('');
  
  res.send(`<body style="font-family:Arial;padding:12px;background:#f8fafc"><h2>Admin ${db.length}/${TARGET} | Dups:${dupLen}</h2><div style="display:flex;gap:8px;flex-wrap:wrap"><a href="/vcf?pass=${ADMIN_PASS}"><button style="background:#6366f1;color:#fff;padding:12px 20px;border:none;border-radius:10px;font-weight:800">📥 DOWNLOAD VCF</button></a><a href="/admin?pass=${ADMIN_PASS}&dedup=1"><button style="background:orange;color:#fff;padding:12px;border:none;border-radius:10px">🧹 Remove Duplicates (${dupLen})</button></a><a href="/admin?pass=${ADMIN_PASS}&clear=1" onclick="return confirm('Clear all?')"><button style="background:#000;color:#fff;padding:12px;border-radius:10px">Clear All</button></a></div><input id="s" placeholder="Search name or number..." onkeyup="filter()" style="width:100%;padding:12px;margin-top:12px;border-radius:10px;border:1.5px solid #000"><table border=1 cellpadding=8 id="t" style="width:100%;margin-top:10px;border-collapse:collapse;background:#fff"><tr><th>#</th><th>Name</th><th>Number</th><th></th><th>Action</th></tr>${rows}</table><script>function filter(){const q=document.getElementById('s').value.toLowerCase(); document.querySelectorAll('#t tr').forEach((tr,i)=>{ if(i==0)return; tr.style.display=tr.innerText.toLowerCase().includes(q)?'':'none'; });}</script></body>`);
});

app.get('/vcf',(req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.status(403).send('Admin Only');
  const db=getDB(); let vcf=''; db.forEach(c=>{ vcf+=`BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nTEL;TYPE=CELL:${c.number}\nEND:VCARD\n`; });
  res.setHeader('Content-Disposition','attachment; filename=breaker_vcf.vcf'); res.setHeader('Content-Type','text/x-vcard'); res.send(vcf);
});

module.exports=app;
