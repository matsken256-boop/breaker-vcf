const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const { kv } = require('@vercel/kv');

const TARGET = 500;
const ADMIN_PASS = "MATSKEN2026";
const CHANNEL = "https://whatsapp.com/channel/0029VbDoFXD8qIzjg285xu2h";
const KV_KEY = "breaker_vcf_final_db";

// ===== PERSISTENT DB - NEVER WIPES =====
async function getDb() {
  try {
    const data = await kv.get(KV_KEY);
    return Array.isArray(data) ? data : [];
  } catch { return []; }
}
async function saveDb(db) {
  try { await kv.set(KV_KEY, db); } catch {}
}

// ===== YOUR HUGE COUNTRY LIST - 100+ COUNTRIES =====
const COUNTRIES = [
  {code:"93",flag:"🇦🇫",name:"Afghanistan"}, {code:"355",flag:"🇦🇱",name:"Albania"},
  {code:"213",flag:"🇩🇿",name:"Algeria"}, {code:"244",flag:"🇦🇴",name:"Angola"},
  {code:"54",flag:"🇦🇷",name:"Argentina"}, {code:"61",flag:"🇦🇺",name:"Australia"},
  {code:"43",flag:"🇦🇹",name:"Austria"}, {code:"973",flag:"🇧🇭",name:"Bahrain"},
  {code:"880",flag:"🇧🇩",name:"Bangladesh"}, {code:"32",flag:"🇧🇪",name:"Belgium"},
  {code:"229",flag:"🇧🇯",name:"Benin"}, {code:"55",flag:"🇧🇷",name:"Brazil"},
  {code:"226",flag:"🇧🇫",name:"Burkina Faso"}, {code:"257",flag:"🇧🇮",name:"Burundi"},
  {code:"855",flag:"🇰🇭",name:"Cambodia"}, {code:"237",flag:"🇨🇲",name:"Cameroon"},
  {code:"1",flag:"🇨🇦",name:"Canada"}, {code:"56",flag:"🇨🇱",name:"Chile"},
  {code:"86",flag:"🇨🇳",name:"China"}, {code:"57",flag:"🇨🇴",name:"Colombia"},
  {code:"242",flag:"🇨🇬",name:"Congo"}, {code:"243",flag:"🇨🇩",name:"DR Congo"},
  {code:"506",flag:"🇨🇷",name:"Costa Rica"}, {code:"385",flag:"🇭🇷",name:"Croatia"},
  {code:"53",flag:"🇨🇺",name:"Cuba"}, {code:"45",flag:"🇩🇰",name:"Denmark"},
  {code:"20",flag:"🇪🇬",name:"Egypt"}, {code:"251",flag:"🇪🇹",name:"Ethiopia"},
  {code:"358",flag:"🇫🇮",name:"Finland"}, {code:"33",flag:"🇫🇷",name:"France"},
  {code:"241",flag:"🇬🇦",name:"Gabon"}, {code:"220",flag:"🇬🇲",name:"Gambia"},
  {code:"49",flag:"🇩🇪",name:"Germany"}, {code:"233",flag:"🇬🇭",name:"Ghana"},
  {code:"30",flag:"🇬🇷",name:"Greece"}, {code:"224",flag:"🇬🇳",name:"Guinea"},
  {code:"91",flag:"🇮🇳",name:"India"}, {code:"62",flag:"🇮🇩",name:"Indonesia"},
  {code:"98",flag:"🇮🇷",name:"Iran"}, {code:"964",flag:"🇮🇶",name:"Iraq"},
  {code:"353",flag:"🇮🇪",name:"Ireland"}, {code:"972",flag:"🇮🇱",name:"Israel"},
  {code:"39",flag:"🇮🇹",name:"Italy"}, {code:"81",flag:"🇯🇵",name:"Japan"},
  {code:"962",flag:"🇯🇴",name:"Jordan"}, {code:"254",flag:"🇰🇪",name:"Kenya"},
  {code:"965",flag:"🇰🇼",name:"Kuwait"}, {code:"856",flag:"🇱🇦",name:"Laos"},
  {code:"961",flag:"🇱🇧",name:"Lebanon"}, {code:"266",flag:"🇱🇸",name:"Lesotho"},
  {code:"231",flag:"🇱🇷",name:"Liberia"}, {code:"218",flag:"🇱🇾",name:"Libya"},
  {code:"352",flag:"🇱🇺",name:"Luxembourg"}, {code:"261",flag:"🇲🇬",name:"Madagascar"},
  {code:"265",flag:"🇲🇼",name:"Malawi"}, {code:"60",flag:"🇲🇾",name:"Malaysia"},
  {code:"223",flag:"🇲🇱",name:"Mali"}, {code:"230",flag:"🇲🇺",name:"Mauritius"},
  {code:"52",flag:"🇲🇽",name:"Mexico"}, {code:"212",flag:"🇲🇦",name:"Morocco"},
  {code:"258",flag:"🇲🇿",name:"Mozambique"}, {code:"264",flag:"🇳🇦",name:"Namibia"},
  {code:"977",flag:"🇳🇵",name:"Nepal"}, {code:"31",flag:"🇳🇱",name:"Netherlands"},
  {code:"64",flag:"🇳🇿",name:"New Zealand"}, {code:"227",flag:"🇳🇪",name:"Niger"},
  {code:"234",flag:"🇳🇬",name:"Nigeria"}, {code:"47",flag:"🇳🇴",name:"Norway"},
  {code:"968",flag:"🇴🇲",name:"Oman"}, {code:"92",flag:"🇵🇰",name:"Pakistan"},
  {code:"507",flag:"🇵🇦",name:"Panama"}, {code:"51",flag:"🇵🇪",name:"Peru"},
  {code:"63",flag:"🇵🇭",name:"Philippines"}, {code:"48",flag:"🇵🇱",name:"Poland"},
  {code:"351",flag:"🇵🇹",name:"Portugal"}, {code:"974",flag:"🇶🇦",name:"Qatar"},
  {code:"40",flag:"🇷🇴",name:"Romania"}, {code:"7",flag:"🇷🇺",name:"Russia"},
  {code:"250",flag:"🇷🇼",name:"Rwanda"}, {code:"966",flag:"🇸🇦",name:"Saudi Arabia"},
  {code:"221",flag:"🇸🇳",name:"Senegal"}, {code:"65",flag:"🇸🇬",name:"Singapore"},
  {code:"27",flag:"🇿🇦",name:"South Africa"}, {code:"82",flag:"🇰🇷",name:"South Korea"},
  {code:"211",flag:"🇸🇸",name:"South Sudan"}, {code:"34",flag:"🇪🇸",name:"Spain"},
  {code:"94",flag:"🇱🇰",name:"Sri Lanka"}, {code:"249",flag:"🇸🇩",name:"Sudan"},
  {code:"46",flag:"🇸🇪",name:"Sweden"}, {code:"41",flag:"🇨🇭",name:"Switzerland"},
  {code:"255",flag:"🇹🇿",name:"Tanzania"}, {code:"66",flag:"🇹🇭",name:"Thailand"},
  {code:"228",flag:"🇹🇬",name:"Togo"}, {code:"216",flag:"🇹🇳",name:"Tunisia"},
  {code:"90",flag:"🇹🇷",name:"Turkey"}, {code:"256",flag:"🇺🇬",name:"Uganda"},
  {code:"380",flag:"🇺🇦",name:"Ukraine"}, {code:"971",flag:"🇦🇪",name:"UAE"},
  {code:"44",flag:"🇬🇧",name:"UK"}, {code:"1",flag:"🇺🇸",name:"USA"},
  {code:"58",flag:"🇻🇪",name:"Venezuela"}, {code:"84",flag:"🇻🇳",name:"Vietnam"},
  {code:"967",flag:"🇾🇪",name:"Yemen"}, {code:"260",flag:"🇿🇲",name:"Zambia"},
  {code:"263",flag:"🇿🇼",name:"Zimbabwe"}
];

app.get('/', async (req, res) => {
  const db = await getDb();
  const cur = db.length;
  const pct = Math.min(100, Math.round((cur / TARGET) * 100));
  const rem = TARGET - cur;

  res.send(`<!DOCTYPE html>
<html><head><meta name="viewport" content="width=device-width, initial-scale=1"><title>BREAKER VCF</title>
<style>
body{margin:0;background:#e6e8ff;font-family:system-ui,Arial;color:#1e1b4b}
.wrap{max-width:420px;margin:auto;padding:14px}
.top{background:#fff;border-radius:20px;padding:12px 16px;display:flex;justify-content:space-between;align-items:center}
.logoB{width:48px;height:48px;background:#6366f1;border-radius:16px;display:flex;align-items:center;justify-content:center;color:#fff;font-weight:900;font-size:28px;transform:rotate(-8deg)}
.card{background:#fff;border:2px solid #000;border-radius:22px;overflow:hidden}
.inner{padding:16px}
.track{width:100%;height:22px;background:#e0e7ff;border:1.5px solid #6366f1;border-radius:20px;overflow:hidden;margin-top:8px}
.fill{height:100%;background:#6366f1}
.row{display:flex;gap:8px;margin-top:6px}
input,select{padding:13px;border-radius:10px;border:1.5px solid #000;font-size:15px}
.btn{width:100%;padding:14px;border-radius:12px;font-weight:800;border:none;cursor:pointer;margin-top:12px}
.btn-primary{background:#6366f1;color:#fff}
.btn-outline{background:#fff;color:#4338ca;border:2px solid #4338ca}
</style></head><body><div class="wrap">
<div class="top"><div style="display:flex;align-items:center;gap:10px"><div class="logoB">B</div><div style="font-weight:900">BREAKER<br>VCF</div></div><div style="border:1.5px solid #6366f1;border-radius:20px;padding:6px 12px;font-size:12px;font-weight:700">📄 BATCH 1 - GLOBAL</div></div>
<div style="margin:18px 4px;font-weight:900;font-size:24px">END OF YEAR FREE<br><span style="color:#4338ca">VCF VIEWERS GAIN</span></div>
<div class="card"><div class="inner">
<div style="display:flex;justify-content:space-between;font-weight:800"><span>REGISTERED ${cur} / ${TARGET}</span><span>${pct}%</span></div>
<div class="track"><div class="fill" style="width:${pct}%"></div></div>

<div style="margin-top:14px;font-weight:700;font-size:12px">FULL NAME</div>
<form method="POST" action="/register">
<input name="name" placeholder="Enter your full name" required minlength="2" style="width:100%;margin-top:6px">

<div style="margin-top:12px;font-weight:700;font-size:12px">WHATSAPP NUMBER - SEARCH YOUR COUNTRY</div>
<div class="row">
<input list="countrylist" id="ccode_search" value="🇺🇬 +256 Uganda" style="width:42%" placeholder="Type Kenya...">
<datalist id="countrylist"></datalist>
<input type="hidden" name="ccode" id="ccode_val" value="256">
<input name="number" type="tel" placeholder="769724124" required style="width:58%">
</div>

<button class="btn btn-primary" type="submit">Register - Global VCF</button>
</form>
<button class="btn btn-outline" onclick="navigator.clipboard.writeText(window.location.href)">📋 Copy link - ${rem} left</button>
</div>
<div style="display:flex;gap:10px;background:#eef0ff;padding:12px">
<a href="${CHANNEL}" style="flex:1"><button class="btn btn-outline" style="margin:0">💬 Channel</button></a>
<a href="/admin" style="flex:1"><button class="btn btn-outline" style="margin:0">⬇️ Get VCF</button></a>
</div></div>
<div style="text-align:center;margin:16px;font-size:11px;color:#64748b">Powered by MATSKEN TECH | ${cur} registered | Global</div>
</div>

<script>
const COUNTRIES = ${JSON.stringify(COUNTRIES)};
const dl = document.getElementById('countrylist');
const search = document.getElementById('ccode_search');
const hidden = document.getElementById('ccode_val');
COUNTRIES.forEach(c=>{
  let o=document.createElement('option');
  o.value = \`\${c.flag} +\${c.code} \${c.name}\`;
  dl.appendChild(o);
});
search.addEventListener('input',()=>{
  let m = search.value.match(/\\+(\\d+)/);
  if(m) hidden.value = m[1];
});
</script>

</body></html>`);
});

app.post('/register', async (req, res) => {
  let { name, number, ccode } = req.body;
  if(!name || !number || !ccode) return res.status(400).send("Missing");
  ccode = String(ccode).replace(/\\D/g,'');
  number = String(number).replace(/\\D/g,'');
  if(number.length < 6) return res.status(400).send("Invalid number");
  const full = \`+\${ccode}\${number}\`;
  let db = await getDb();
  if(db.length >= TARGET) return res.send(\`Batch Full \${TARGET}/\${TARGET}\`);
  if(db.find(u=>u.full===full)) return res.send(\`<h2 style="text-align:center;padding:40px">Already Registered ✅<br>\${full}</h2>\`);
  db.push({name:name.trim(), ccode, number, full, date:new Date().toISOString()});
  await saveDb(db);
  res.send(\`<html><head><meta http-equiv="refresh" content="1;url=${CHANNEL}"></head><body style="text-align:center;padding:60px;font-family:Arial"><h2>✅ Registered \${db.length}/\${TARGET}!</h2><p>\${full}</p></body></html>\`);
});

app.get('/admin', async (req,res)=>{
  if(req.query.pass !== ADMIN_PASS) return res.send(\`<body style="background:#e6e8ff;font-family:Arial;padding:30px;text-align:center"><h2>🔒 MATSKEN ADMIN</h2><form><input name="pass" type="password" placeholder="MATSKEN2026" style="padding:12px;width:80%;border-radius:10px;border:1.5px solid #000"><br><br><button style="padding:12px 30px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-weight:800">LOGIN</button></form></body>\`);
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
