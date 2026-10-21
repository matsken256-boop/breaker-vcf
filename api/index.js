const express = require('express');
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const TARGET = 500;
let db = [];

const COUNTRIES = [
{code:"256",flag:"🇺🇬",name:"Uganda"},{code:"254",flag:"🇰🇪",name:"Kenya"},{code:"255",flag:"🇹🇿",name:"Tanzania"},{code:"250",flag:"🇷🇼",name:"Rwanda"},{code:"234",flag:"🇳🇬",name:"Nigeria"},{code:"233",flag:"🇬🇭",name:"Ghana"},{code:"27",flag:"🇿🇦",name:"South Africa"},{code:"91",flag:"🇮🇳",name:"India"},{code:"971",flag:"🇦🇪",name:"UAE"},{code:"966",flag:"🇸🇦",name:"Saudi Arabia"},{code:"974",flag:"🇶🇦",name:"Qatar"},{code:"965",flag:"🇰🇼",name:"Kuwait"},{code:"973",flag:"🇧🇭",name:"Bahrain"},{code:"968",flag:"🇴🇲",name:"Oman"},{code:"1",flag:"🇺🇸",name:"USA"},{code:"44",flag:"🇬🇧",name:"UK"},{code:"1",flag:"🇨🇦",name:"Canada"},{code:"61",flag:"🇦🇺",name:"Australia"},{code:"49",flag:"🇩🇪",name:"Germany"},{code:"33",flag:"🇫🇷",name:"France"},{code:"90",flag:"🇹🇷",name:"Turkey"},{code:"86",flag:"🇨🇳",name:"China"},{code:"81",flag:"🇯🇵",name:"Japan"},{code:"92",flag:"🇵🇰",name:"Pakistan"},{code:"880",flag:"🇧🇩",name:"Bangladesh"}
];

app.get('/', (req, res) => {
  const cur = db.length;
  res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>BREAKER</title><style>body{background:#e6e8ff;font-family:Arial;padding:20px}.card{background:#fff;border:2px solid #000;border-radius:20px;padding:16px;max-width:420px;margin:auto}input{padding:12px;border-radius:10px;border:1.5px solid #000;width:100%;margin-top:6px}button{width:100%;padding:14px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-weight:800;margin-top:10px}</style></head><body><div class="card"><h2>BREAKER VCF - ${cur}/500</h2><form method="POST" action="/register"><input name="name" placeholder="Full name" required><div style="display:flex;gap:6px"><input list="clist" id="s" value="🇺🇬 +256 Uganda" style="width:45%"><datalist id="clist"></datalist><input type="hidden" name="ccode" id="h" value="256"><input name="number" placeholder="769724124" required style="width:55%"></div><button>Register</button></form></div><script>const C=${JSON.stringify(COUNTRIES)};const dl=document.getElementById('clist');const s=document.getElementById('s');const h=document.getElementById('h');C.forEach(c=>{let o=document.createElement('option');o.value=c.flag+' +'+c.code+' '+c.name;dl.appendChild(o)});s.addEventListener('input',()=>{let m=s.value.match(/\\+(\\d+)/);if(m)h.value=m[1]});</script></body></html>`);
});

app.post('/register', (req,res)=>{
  let {name,number,ccode}=req.body;
  ccode=String(ccode).replace(/\\D/g,''); number=String(number).replace(/\\D/g,'');
  const full='+'+ccode+number;
  db.push({name,full});
  res.send('<h2>Registered '+db.length+'/500 - '+full+'</h2><a href="/">Back</a>');
});

app.get('/admin', (req,res)=>{
  if(req.query.pass!=='MATSKEN2026') return res.send('<form><input name="pass" type="password"><button>Login</button></form>');
  res.send('<h2>ADMIN '+db.length+'</h2><a href="/vcf?pass=MATSKEN2026"><button>Download VCF</button></a><pre>'+JSON.stringify(db,null,2)+'</pre>');
});

app.get('/vcf', (req,res)=>{
  if(req.query.pass!=='MATSKEN2026') return res.status(403).send('403');
  let vcf=''; db.forEach(c=>{vcf+='BEGIN:VCARD\\nVERSION:3.0\\nFN:'+c.name+'\\nTEL:'+c.full+'\\nEND:VCARD\\n';});
  res.setHeader('Content-Disposition','attachment; filename=breaker.vcf'); res.setHeader('Content-Type','text/x-vcard'); res.send(vcf);
});

module.exports=app;res) => {
  const db = await getDb();
  const cur = db.length;
  const pct = Math.min(100, Math.round((cur / TARGET) * 100));
  res.send(`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>BREAKER VCF 240</title>
<style>body{margin:0;background:#e6e8ff;font-family:system-ui}.wrap{max-width:420px;margin:auto;padding:14px}.top{background:#fff;border-radius:20px;padding:12px;display:flex;justify-content:space-between}.card{background:#fff;border:2px solid #000;border-radius:22px;overflow:hidden}.inner{padding:16px}.track{width:100%;height:22px;background:#e0e7ff;border:1.5px solid #6366f1;border-radius:20px;overflow:hidden}.fill{height:100%;background:#6366f1}.row{display:flex;gap:8px}input{padding:13px;border-radius:10px;border:1.5px solid #000}.btn{width:100%;padding:14px;border-radius:12px;font-weight:800;border:none;margin-top:12px}.btn-primary{background:#6366f1;color:#fff}</style></head><body><div class="wrap">
<div class="top"><div style="font-weight:900">BREAKER VCF 240</div><div>${cur}/${TARGET}</div></div>
<div style="margin:18px 0;font-weight:900;font-size:22px">END OF YEAR FREE<br><span style="color:#4338ca">240 COUNTRIES GLOBAL VCF</span></div>
<div class="card"><div class="inner"><div style="display:flex;justify-content:space-between;font-weight:800"><span>REGISTERED ${cur} / ${TARGET}</span><span>${pct}%</span></div><div class="track"><div class="fill" style="width:${pct}%"></div></div>
<form method="POST" action="/register" style="margin-top:14px"><div style="font-weight:700;font-size:12px">FULL NAME</div><input name="name" required style="width:100%;margin-top:6px" placeholder="Full name"><div style="font-weight:700;font-size:12px;margin-top:12px">WHATSAPP - SEARCH 240 COUNTRIES (GULF + CLASS ONE)</div><div class="row" style="margin-top:6px"><input list="countrylist" id="ccode_search" value="🇺🇬 +256 Uganda" style="width:42%" placeholder="Type USA, UAE, Qatar..."><datalist id="countrylist"></datalist><input type="hidden" name="ccode" id="ccode_val" value="256"><input name="number" type="tel" placeholder="769724124" required style="width:58%"></div><button class="btn btn-primary" type="submit">Register - 240 Countries VCF</button></form></div></div></div>
<script>
const COUNTRIES = ${JSON.stringify(COUNTRIES)};
const dl=document.getElementById('countrylist');const s=document.getElementById('ccode_search');const h=document.getElementById('ccode_val');
COUNTRIES.forEach(c=>{let o=document.createElement('option');o.value=\`\${c.flag} +\${c.code} \${c.name}\`;dl.appendChild(o);});
s.addEventListener('input',()=>{let m=s.value.match(/\\+(\\d+)/);if(m)h.value=m[1];});
</script></body></html>`);
});

app.post('/register', async (req,res)=>{
  let {name,number,ccode}=req.body; ccode=String(ccode).replace(/\\D/g,''); number=String(number).replace(/\\D/g,''); const full='+'+ccode+number;
  let db=await getDb(); if(db.find(u=>u.full===full)) return res.send('Already Registered '+full+' <a href="/">Back</a>');
  db.push({name,ccode,number,full,date:new Date().toISOString()}); await saveDb(db);
  res.send('<h2>Registered '+db.length+'/'+TARGET+'! '+full+'</h2><a href="/">Back</a>');
});
app.get('/admin', async (req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.send('<form><input name="pass" type="password"><button>LOGIN</button></form>');
  const db=await getDb(); let rows=db.map((u,i)=>'<tr><td>'+(i+1)+'</td><td>'+u.name+'</td><td>'+u.full+'</td></tr>').join('');
  res.send('<h2>ADMIN '+db.length+'</h2><a href="/vcf?pass=${ADMIN_PASS}"><button>DOWNLOAD VCF</button></a><table border=1 cellpadding=8 style="width:100%;margin-top:10px"><tr><th>#</th><th>Name</th><th>Number</th></tr>'+rows+'</table>');
});
app.get('/vcf', async (req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.status(403).send('403');
  const db=await getDb(); let vcf=''; db.forEach(c=>{vcf+='BEGIN:VCARD\\nVERSION:3.0\\nFN:'+c.name+'\\nTEL;TYPE=CELL:'+c.full+'\\nEND:VCARD\\n';});
  res.setHeader('Content-Disposition','attachment; filename=breaker_240_'+db.length+'.vcf'); res.setHeader('Content-Type','text/x-vcard'); res.send(vcf);
});
module.exports=app;d:#e6e8ff;font-family:Arial;padding:30px;text-align:center"><h2>🔒 MATSKEN ADMIN</h2><form><input name="pass" type="password" placeholder="MATSKEN2026" style="padding:12px;width:80%;border-radius:10px;border:1.5px solid #000"><br><br><button style="padding:12px 30px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-weight:800">LOGIN</button></form></body>\`);
  const db = await getDb();
  if(req.query.clear==='1'){ await saveDb([]); return res.redirect(\`/admin?pass=\${ADMIN_PASS}\`); }
  let rows = db.map((u,i)=>\`<tr><td>\${i+1}</td><td>\${u.name}</td><td>\${u.full}</td></tr>\`).join('');
  res.send(\`<body style="font-family:Arial;padding:12px"><h2>ADMIN - \${db.length}/\${TARGET} Global</h2><a href="/vcf?pass=${ADMIN_PASS}"><button style="background:#6366f1;color:#fff;padding:12px 20px;border:none;border-radius:10px;font-weight:800">📥 DOWNLOAD VCF (\${db.length})</button></a> <a href="/admin?pass=${ADMIN_PASS}&clear=1"><button style="background:#000;color:#fff;padding:12px;border:none;border-radius:10px">Clear</button></a><table border="1" cellpadding="8" style="width:100%;margin-top:15px;border-collapse:collapse"><tr><th>#</th><th>Name</th><th>Full Number</th></tr>\${rows}</table></body>\`);
});

app.get('/vcf', async (req,res)=>{
  if(req.query.pass !== ADMIN_PASS) return res.status(403).send('403');
  const db = await getDb();
  let vcf='';
  db.forEach(c=>{ vcf+=\`BEGIN:VCARD\\nVERSION:3.0\\nFN:\${c.name}\\nTEL;TYPE=CELL:\${c.full}\\nEND:VCARD\\n\`; });
  res.setHeader('Content-Disposition', \`attachment; filename=breaker_global_\${db.length}.vcf\`);
  res.setHeader('Content-Type','text/x-vcard');
  res.send(vcf);
});

module.exports = app;e="flex:1"><button class="btn btn-light" style="width:100%">⬇️ Get VCF</button></a>
</div></div>
<div style="text-align:center;margin:16px;font-size:11px;color:#64748b">Powered by MATSKEN TECH | Global Country Codes | ${cur} registered</div>
</div></body></html>`);
});

// ===== REGISTER =====
app.post('/register', async (req, res) => {
  try {
    let { name, number, ccode } = req.body;
    if (!name || !number || !ccode) return res.status(400).send("Missing fields");
    ccode = String(ccode).replace(/\D/g, '');
    number = String(number).replace(/\D/g, '');
    if (number.length < 6) return res.status(400).send("Invalid number");
    const full = `+${ccode}${number}`;
    let db = await getDb();
    if (db.length >= TARGET) return res.send(`<h2>Batch Full ${TARGET}/${TARGET}</h2>`);
    if (db.find(u => u.full === full)) {
      return res.send(`<html><head><meta http-equiv="refresh" content="1;url=${CHANNEL}"></head><body style="text-align:center;padding:40px;font-family:Arial"><h2>Already Registered ✅</h2><p>${full}</p></body></html>`);
    }
    db.push({ name: name.trim(), number, ccode, full, date: new Date().toISOString() });
    await saveDb(db);
    res.send(`<html><head><meta http-equiv="refresh" content="1;url=${CHANNEL}"><style>body{background:#e6e8ff;font-family:Arial;text-align:center;padding:60px}</style></head><body><h2>✅ Registered ${db.length}/${TARGET}!</h2><p>${full}</p><p>Redirecting to Channel...</p></body></html>`);
  } catch (e) {
    res.status(500).send("Server error, retry");
  }
});

// ===== ADMIN & VCF =====
app.get('/admin', async (req, res) => {
  if (req.query.pass !== ADMIN_PASS) {
    return res.send(`<body style="background:#e6e8ff;font-family:Arial;padding:30px;text-align:center"><h2>🔒 MATSKEN ADMIN</h2><form><input name="pass" type="password" placeholder="MATSKEN2026" style="padding:12px;width:80%;border-radius:10px;border:1.5px solid #000"><br><br><button style="padding:12px 30px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-weight:800">LOGIN</button></form></body>`);
  }
  const db = await getDb();
  if (req.query.clear === '1') { await saveDb([]); return res.redirect(`/admin?pass=${ADMIN_PASS}`); }
  let rows = db.map((u, i) => `<tr><td>${i+1}</td><td>${u.name}</td><td>${u.full}</td></tr>`).join('');
  res.send(`<body style="font-family:Arial;padding:12px;background:#fff"><h2>ADMIN - ${db.length}/${TARGET} Global</h2><a href="/vcf?pass=${ADMIN_PASS}"><button style="background:#6366f1;color:#fff;padding:12px 20px;border:none;border-radius:10px;font-weight:800">📥 DOWNLOAD VCF (${db.length})</button></a> <a href="/admin?pass=${ADMIN_PASS}&clear=1"><button style="background:#000;color:#fff;padding:12px;border:none;border-radius:10px">Clear</button></a><table border="1" cellpadding="8" style="width:100%;margin-top:15px;border-collapse:collapse"><tr><th>#</th><th>Name</th><th>Full Number</th></tr>${rows}</table></body>`);
});

app.get('/vcf', async (req, res) => {
  if (req.query.pass !== ADMIN_PASS) return res.status(403).send('403 Admin Only');
  const db = await getDb();
  let vcf = '';
  db.forEach(c => { vcf += `BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nTEL;TYPE=CELL:${c.full}\nEND:VCARD\n`; });
  res.setHeader('Content-Disposition', `attachment; filename=breaker_global_${db.length}.vcf`);
  res.setHeader('Content-Type', 'text/x-vcard');
  res.send(vcf);
});

module.exports = app;
