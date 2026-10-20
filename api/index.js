const express = require('express');
const fs = require('fs');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

const TARGET=500;
const ADMIN_PASS="MATSKEN2026";
const CHANNEL="https://whatsapp.com/channel/0029VbDoFXD8qIzjg285xu2h";
const DB_FILE='/tmp/db.json';
const getDB=()=>{try{if(fs.existsSync(DB_FILE))return JSON.parse(fs.readFileSync(DB_FILE,'utf8'))}catch(e){}return[]};
const saveDB=(d)=>{try{fs.writeFileSync(DB_FILE,JSON.stringify(d))}catch(e){}};

app.get('/',(req,res)=>{
  const db=getDB();
  res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width,initial-scale=1"><title>BREAKER VCF</title>
  <style>body{background:#e6e8ff;font-family:Arial;padding:20px;text-align:center}.card{max-width:380px;margin:auto;background:#fff;border:2px solid #000;border-radius:20px;padding:20px}input,select{width:100%;padding:12px;margin-top:8px;border-radius:10px;border:1.5px solid #000;box-sizing:border-box}.btn{width:100%;padding:14px;margin-top:10px;border-radius:12px;font-weight:800;border:none;background:#6366f1;color:#fff}</style></head><body>
  <div class="card"><h2>BREAKER VCF</h2><p>Registered ${db.length}/${TARGET}</p>
  <form method="POST" action="/register">
  <input name="name" placeholder="Full Name" required>
  <select name="code"><option value="+256">+256 Uganda</option><option value="+254">+254 Kenya</option><option value="+255">+255 Tanzania</option><option value="+971">+971 UAE</option><option value="+1">+1 USA</option><option value="+44">+44 UK</option></select>
  <input name="number" placeholder="769724124" required>
  <button class="btn" type="submit">Register</button>
  </form>
  <p><a href="${CHANNEL}">Channel</a> | <a href="/admin?pass=${ADMIN_PASS}">Admin</a></p></div></body></html>`);
});

app.post('/register',(req,res)=>{
  let db=getDB();
  const full = (req.body.code||'') + (req.body.number||'');
  if(req.body.name && full && !db.find(x=>x.number===full)){ db.push({name:req.body.name,number:full}); saveDB(db); }
  res.send(`<h2 style="font-family:Arial;text-align:center;margin-top:40px">✅ ${req.body.name} Registered as ${full}<br><br><a href="${CHANNEL}" style="background:#6366f1;color:#fff;padding:14px 20px;border-radius:10px;text-decoration:none">FOLLOW CHANNEL</a><br><br><a href="/">Back Home</a></h2><script>setTimeout(()=>{location.href="${CHANNEL}"},1500)</script>`);
});

app.get('/admin',(req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.send('<form><input name="pass" type="password" placeholder="MATSKEN2026"><button>Login</button></form>');
  let db=getDB();
  if(req.query.delete!==undefined){ db.splice(parseInt(req.query.delete),1); saveDB(db); return res.redirect('/admin?pass='+ADMIN_PASS); }
  if(req.query.clear==='1'){ saveDB([]); return res.redirect('/admin?pass='+ADMIN_PASS); }
  if(req.query.dedup==='1'){ const s=new Set(); const f=[]; db.forEach(u=>{ if(!s.has(u.number)){ s.add(u.number); f.push(u);} }); saveDB(f); return res.redirect('/admin?pass='+ADMIN_PASS); }
  let rows=db.map((u,i)=>`<tr><td>${i+1}</td><td>${u.name}</td><td>${u.number}</td><td><a href="/admin?pass=${ADMIN_PASS}&delete=${i}">Delete</a></td></tr>`).join('');
  res.send(`<h2>Admin ${db.length}/${TARGET}</h2><a href="/vcf?pass=${ADMIN_PASS}">Download VCF</a> | <a href="/admin?pass=${ADMIN_PASS}&dedup=1">Remove Duplicates</a> | <a href="/admin?pass=${ADMIN_PASS}&clear=1">Clear All</a><table border=1 cellpadding=8><tr><th>#</th><th>Name</th><th>Number</th><th>Action</th></tr>${rows}</table>`);
});

app.get('/vcf',(req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.status(403).send('Forbidden');
  const db=getDB(); let vcf=''; db.forEach(c=>{ vcf+=`BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nTEL:${c.number}\nEND:VCARD\n`; });
  res.setHeader('Content-Disposition','attachment; filename=breaker.vcf'); res.setHeader('Content-Type','text/x-vcard'); res.send(vcf);
});

module.exports=app;
