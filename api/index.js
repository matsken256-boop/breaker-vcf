const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const TARGET = 500;
const ADMIN_PASS = "MATSKEN2026";
const CHANNEL = "https://whatsapp.com/channel/0029VbDoFXD8qIzjg285xu2h";

let memoryDb = [];
let kvClient = null;
try { const { kv } = require('@vercel/kv'); kvClient = kv; } catch { kvClient = null; }
async function getDb() {
  if (kvClient) { try { const d = await kvClient.get("breaker_db"); if (Array.isArray(d)) { memoryDb = d; return d; } } catch {} }
  return memoryDb;
}
async function saveDb(newDb) { memoryDb = newDb; if (kvClient) { try { await kvClient.set("breaker_db", newDb); } catch {} } }

const COUNTRIES = [
{code:"93",flag:"🇦🇫",name:"Afghanistan"},{code:"355",flag:"🇦🇱",name:"Albania"},{code:"213",flag:"🇩🇿",name:"Algeria"},{code:"376",flag:"🇦🇩",name:"Andorra"},{code:"244",flag:"🇦🇴",name:"Angola"},{code:"1",flag:"🇦🇮",name:"Anguilla"},{code:"1",flag:"🇦🇬",name:"Antigua"},{code:"54",flag:"🇦🇷",name:"Argentina"},{code:"374",flag:"🇦🇲",name:"Armenia"},{code:"297",flag:"🇦🇼",name:"Aruba"},{code:"61",flag:"🇦🇺",name:"Australia"},{code:"43",flag:"🇦🇹",name:"Austria"},{code:"994",flag:"🇦🇿",name:"Azerbaijan"},{code:"1",flag:"🇧🇸",name:"Bahamas"},{code:"973",flag:"🇧🇭",name:"Bahrain"},{code:"880",flag:"🇧🇩",name:"Bangladesh"},{code:"1",flag:"🇧🇧",name:"Barbados"},{code:"375",flag:"🇧🇾",name:"Belarus"},{code:"32",flag:"🇧🇪",name:"Belgium"},{code:"501",flag:"🇧🇿",name:"Belize"},{code:"229",flag:"🇧🇯",name:"Benin"},{code:"1",flag:"🇧🇲",name:"Bermuda"},{code:"975",flag:"🇧🇹",name:"Bhutan"},{code:"591",flag:"🇧🇴",name:"Bolivia"},{code:"387",flag:"🇧🇦",name:"Bosnia"},{code:"267",flag:"🇧🇼",name:"Botswana"},{code:"55",flag:"🇧🇷",name:"Brazil"},{code:"1",flag:"🇻🇬",name:"British Virgin"},{code:"673",flag:"🇧🇳",name:"Brunei"},{code:"359",flag:"🇧🇬",name:"Bulgaria"},{code:"226",flag:"🇧🇫",name:"Burkina Faso"},{code:"257",flag:"🇧🇮",name:"Burundi"},{code:"855",flag:"🇰🇭",name:"Cambodia"},{code:"237",flag:"🇨🇲",name:"Cameroon"},{code:"1",flag:"🇨🇦",name:"Canada"},{code:"238",flag:"🇨🇻",name:"Cape Verde"},{code:"1",flag:"🇰🇾",name:"Cayman"},{code:"236",flag:"🇨🇫",name:"Central Africa"},{code:"235",flag:"🇹🇩",name:"Chad"},{code:"56",flag:"🇨🇱",name:"Chile"},{code:"86",flag:"🇨🇳",name:"China"},{code:"57",flag:"🇨🇴",name:"Colombia"},{code:"269",flag:"🇰🇲",name:"Comoros"},{code:"242",flag:"🇨🇬",name:"Congo"},{code:"243",flag:"🇨🇩",name:"DR Congo"},{code:"682",flag:"🇨🇰",name:"Cook Islands"},{code:"506",flag:"🇨🇷",name:"Costa Rica"},{code:"385",flag:"🇭🇷",name:"Croatia"},{code:"53",flag:"🇨🇺",name:"Cuba"},{code:"599",flag:"🇨🇼",name:"Curacao"},{code:"357",flag:"🇨🇾",name:"Cyprus"},{code:"420",flag:"🇨🇿",name:"Czech"},{code:"45",flag:"🇩🇰",name:"Denmark"},{code:"253",flag:"🇩🇯",name:"Djibouti"},{code:"1",flag:"🇩🇲",name:"Dominica"},{code:"1",flag:"🇩🇴",name:"Dominican Republic"},{code:"593",flag:"🇪🇨",name:"Ecuador"},{code:"20",flag:"🇪🇬",name:"Egypt"},{code:"503",flag:"🇸🇻",name:"El Salvador"},{code:"240",flag:"🇬🇶",name:"Equatorial Guinea"},{code:"291",flag:"🇪🇷",name:"Eritrea"},{code:"372",flag:"🇪🇪",name:"Estonia"},{code:"268",flag:"🇸🇿",name:"Eswatini"},{code:"251",flag:"🇪🇹",name:"Ethiopia"},{code:"500",flag:"🇫🇰",name:"Falkland"},{code:"298",flag:"🇫🇴",name:"Faroe Islands"},{code:"679",flag:"🇫🇯",name:"Fiji"},{code:"358",flag:"🇫🇮",name:"Finland"},{code:"33",flag:"🇫🇷",name:"France"},{code:"594",flag:"🇬🇫",name:"French Guiana"},{code:"689",flag:"🇵🇫",name:"French Polynesia"},{code:"241",flag:"🇬🇦",name:"Gabon"},{code:"220",flag:"🇬🇲",name:"Gambia"},{code:"995",flag:"🇬🇪",name:"Georgia"},{code:"49",flag:"🇩🇪",name:"Germany"},{code:"233",flag:"🇬🇭",name:"Ghana"},{code:"350",flag:"🇬🇮",name:"Gibraltar"},{code:"30",flag:"🇬🇷",name:"Greece"},{code:"299",flag:"🇬🇱",name:"Greenland"},{code:"1",flag:"🇬🇩",name:"Grenada"},{code:"590",flag:"🇬🇵",name:"Guadeloupe"},{code:"1",flag:"🇬🇺",name:"Guam"},{code:"502",flag:"🇬🇹",name:"Guatemala"},{code:"224",flag:"🇬🇳",name:"Guinea"},{code:"245",flag:"🇬🇼",name:"Guinea-Bissau"},{code:"592",flag:"🇬🇾",name:"Guyana"},{code:"509",flag:"🇭🇹",name:"Haiti"},{code:"504",flag:"🇭🇳",name:"Honduras"},{code:"852",flag:"🇭🇰",name:"Hong Kong"},{code:"36",flag:"🇭🇺",name:"Hungary"},{code:"354",flag:"🇮🇸",name:"Iceland"},{code:"91",flag:"🇮🇳",name:"India"},{code:"62",flag:"🇮🇩",name:"Indonesia"},{code:"98",flag:"🇮🇷",name:"Iran"},{code:"964",flag:"🇮🇶",name:"Iraq"},{code:"353",flag:"🇮🇪",name:"Ireland"},{code:"972",flag:"🇮🇱",name:"Israel"},{code:"39",flag:"🇮🇹",name:"Italy"},{code:"225",flag:"🇨🇮",name:"Ivory Coast"},{code:"1",flag:"🇯🇲",name:"Jamaica"},{code:"81",flag:"🇯🇵",name:"Japan"},{code:"962",flag:"🇯🇴",name:"Jordan"},{code:"7",flag:"🇰🇿",name:"Kazakhstan"},{code:"254",flag:"🇰🇪",name:"Kenya"},{code:"686",flag:"🇰🇮",name:"Kiribati"},{code:"383",flag:"🇽🇰",name:"Kosovo"},{code:"965",flag:"🇰🇼",name:"Kuwait"},{code:"996",flag:"🇰🇬",name:"Kyrgyzstan"},{code:"856",flag:"🇱🇦",name:"Laos"},{code:"371",flag:"🇱🇻",name:"Latvia"},{code:"961",flag:"🇱🇧",name:"Lebanon"},{code:"266",flag:"🇱🇸",name:"Lesotho"},{code:"231",flag:"🇱🇷",name:"Liberia"},{code:"218",flag:"🇱🇾",name:"Libya"},{code:"423",flag:"🇱🇮",name:"Liechtenstein"},{code:"370",flag:"🇱🇹",name:"Lithuania"},{code:"352",flag:"🇱🇺",name:"Luxembourg"},{code:"853",flag:"🇲🇴",name:"Macao"},{code:"261",flag:"🇲🇬",name:"Madagascar"},{code:"265",flag:"🇲🇼",name:"Malawi"},{code:"60",flag:"🇲🇾",name:"Malaysia"},{code:"960",flag:"🇲🇻",name:"Maldives"},{code:"223",flag:"🇲🇱",name:"Mali"},{code:"356",flag:"🇲🇹",name:"Malta"},{code:"692",flag:"🇲🇭",name:"Marshall"},{code:"596",flag:"🇲🇶",name:"Martinique"},{code:"222",flag:"🇲🇷",name:"Mauritania"},{code:"230",flag:"🇲🇺",name:"Mauritius"},{code:"262",flag:"🇾🇹",name:"Mayotte"},{code:"52",flag:"🇲🇽",name:"Mexico"},{code:"691",flag:"🇫🇲",name:"Micronesia"},{code:"373",flag:"🇲🇩",name:"Moldova"},{code:"377",flag:"🇲🇨",name:"Monaco"},{code:"976",flag:"🇲🇳",name:"Mongolia"},{code:"382",flag:"🇲🇪",name:"Montenegro"},{code:"1",flag:"🇲🇸",name:"Montserrat"},{code:"212",flag:"🇲🇦",name:"Morocco"},{code:"258",flag:"🇲🇿",name:"Mozambique"},{code:"95",flag:"🇲🇲",name:"Myanmar"},{code:"264",flag:"🇳🇦",name:"Namibia"},{code:"674",flag:"🇳🇷",name:"Nauru"},{code:"977",flag:"🇳🇵",name:"Nepal"},{code:"31",flag:"🇳🇱",name:"Netherlands"},{code:"687",flag:"🇳🇨",name:"New Caledonia"},{code:"64",flag:"🇳🇿",name:"New Zealand"},{code:"505",flag:"🇳🇮",name:"Nicaragua"},{code:"227",flag:"🇳🇪",name:"Niger"},{code:"234",flag:"🇳🇬",name:"Nigeria"},{code:"683",flag:"🇳🇺",name:"Niue"},{code:"850",flag:"🇰🇵",name:"North Korea"},{code:"389",flag:"🇲🇰",name:"North Macedonia"},{code:"1",flag:"🇲🇵",name:"Northern Mariana"},{code:"47",flag:"🇳🇴",name:"Norway"},{code:"968",flag:"🇴🇲",name:"Oman"},{code:"92",flag:"🇵🇰",name:"Pakistan"},{code:"680",flag:"🇵🇼",name:"Palau"},{code:"970",flag:"🇵🇸",name:"Palestine"},{code:"507",flag:"🇵🇦",name:"Panama"},{code:"675",flag:"🇵🇬",name:"Papua New Guinea"},{code:"595",flag:"🇵🇾",name:"Paraguay"},{code:"51",flag:"🇵🇪",name:"Peru"},{code:"63",flag:"🇵🇭",name:"Philippines"},{code:"48",flag:"🇵🇱",name:"Poland"},{code:"351",flag:"🇵🇹",name:"Portugal"},{code:"1",flag:"🇵🇷",name:"Puerto Rico"},{code:"974",flag:"🇶🇦",name:"Qatar"},{code:"262",flag:"🇷🇪",name:"Reunion"},{code:"40",flag:"🇷🇴",name:"Romania"},{code:"7",flag:"🇷🇺",name:"Russia"},{code:"250",flag:"🇷🇼",name:"Rwanda"},{code:"1",flag:"🇰🇳",name:"Saint Kitts"},{code:"1",flag:"🇱🇨",name:"Saint Lucia"},{code:"590",flag:"🇧🇱",name:"Saint Barthelemy"},{code:"1",flag:"🇻🇨",name:"Saint Vincent"},{code:"685",flag:"🇼🇸",name:"Samoa"},{code:"378",flag:"🇸🇲",name:"San Marino"},{code:"239",flag:"🇸🇹",name:"Sao Tome"},{code:"966",flag:"🇸🇦",name:"Saudi Arabia"},{code:"221",flag:"🇸🇳",name:"Senegal"},{code:"381",flag:"🇷🇸",name:"Serbia"},{code:"248",flag:"🇸🇨",name:"Seychelles"},{code:"232",flag:"🇸🇱",name:"Sierra Leone"},{code:"65",flag:"🇸🇬",name:"Singapore"},{code:"1",flag:"🇸🇽",name:"Sint Maarten"},{code:"421",flag:"🇸🇰",name:"Slovakia"},{code:"386",flag:"🇸🇮",name:"Slovenia"},{code:"677",flag:"🇸🇧",name:"Solomon"},{code:"252",flag:"🇸🇴",name:"Somalia"},{code:"27",flag:"🇿🇦",name:"South Africa"},{code:"82",flag:"🇰🇷",name:"South Korea"},{code:"211",flag:"🇸🇸",name:"South Sudan"},{code:"34",flag:"🇪🇸",name:"Spain"},{code:"94",flag:"🇱🇰",name:"Sri Lanka"},{code:"249",flag:"🇸🇩",name:"Sudan"},{code:"597",flag:"🇸🇷",name:"Suriname"},{code:"46",flag:"🇸🇪",name:"Sweden"},{code:"41",flag:"🇨🇭",name:"Switzerland"},{code:"963",flag:"🇸🇾",name:"Syria"},{code:"886",flag:"🇹🇼",name:"Taiwan"},{code:"992",flag:"🇹🇯",name:"Tajikistan"},{code:"255",flag:"🇹🇿",name:"Tanzania"},{code:"66",flag:"🇹🇭",name:"Thailand"},{code:"670",flag:"🇹🇱",name:"Timor"},{code:"228",flag:"🇹🇬",name:"Togo"},{code:"690",flag:"🇹🇰",name:"Tokelau"},{code:"676",flag:"🇹🇴",name:"Tonga"},{code:"1",flag:"🇹🇹",name:"Trinidad"},{code:"216",flag:"🇹🇳",name:"Tunisia"},{code:"90",flag:"🇹🇷",name:"Turkey"},{code:"993",flag:"🇹🇲",name:"Turkmenistan"},{code:"1",flag:"🇹🇨",name:"Turks and Caicos"},{code:"688",flag:"🇹🇻",name:"Tuvalu"},{code:"1",flag:"🇻🇮",name:"US Virgin"},{code:"256",flag:"🇺🇬",name:"Uganda"},{code:"380",flag:"🇺🇦",name:"Ukraine"},{code:"971",flag:"🇦🇪",name:"UAE"},{code:"44",flag:"🇬🇧",name:"UK"},{code:"1",flag:"🇺🇸",name:"USA"},{code:"598",flag:"🇺🇾",name:"Uruguay"},{code:"998",flag:"🇺🇿",name:"Uzbekistan"},{code:"678",flag:"🇻🇺",name:"Vanuatu"},{code:"39",flag:"🇻🇦",name:"Vatican"},{code:"58",flag:"🇻🇪",name:"Venezuela"},{code:"84",flag:"🇻🇳",name:"Vietnam"},{code:"681",flag:"🇼🇫",name:"Wallis"},{code:"212",flag:"🇪🇭",name:"Western Sahara"},{code:"967",flag:"🇾🇪",name:"Yemen"},{code:"260",flag:"🇿🇲",name:"Zambia"},{code:"263",flag:"🇿🇼",name:"Zimbabwe"}
];

app.get('/', async (req, res) => {
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
