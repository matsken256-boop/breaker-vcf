const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
let db=[];
const TARGET=500;
const ADMIN_PASS="MATSKEN2026";
const CHANNEL="https://whatsapp.com/channel/0029VbDoFXD8qIzjg285xu2h";

const countries = [
"+256 Uganda","+254 Kenya","+255 Tanzania","+250 Rwanda","+257 Burundi","+260 Zambia","+263 Zimbabwe","+265 Malawi","+258 Mozambique","+251 Ethiopia","+234 Nigeria","+233 Ghana","+27 South Africa","+20 Egypt","+212 Morocco","+216 Tunisia","+237 Cameroon","+243 Congo DRC",
"+971 UAE Dubai","+966 Saudi Arabia","+974 Qatar","+965 Kuwait","+968 Oman","+973 Bahrain","+967 Yemen",
"+1 USA","+44 UK","+1 Canada","+61 Australia","+49 Germany","+33 France","+31 Netherlands","+46 Sweden","+47 Norway","+41 Switzerland","+65 Singapore","+81 Japan","+82 South Korea","+39 Italy","+34 Spain","+351 Portugal","+32 Belgium","+45 Denmark","+64 New Zealand","+90 Turkey","+380 Ukraine","+48 Poland","+40 Romania","+357 Cyprus",
"+91 India","+62 Indonesia","+60 Malaysia","+63 Philippines","+66 Thailand","+84 Vietnam","+86 China","+92 Pakistan","+880 Bangladesh","+94 Sri Lanka","+95 Myanmar","+977 Nepal","+856 Laos","+855 Cambodia","+976 Mongolia",
"+55 Brazil","+54 Argentina","+57 Colombia","+51 Peru","+56 Chile","+58 Venezuela","+52 Mexico","+507 Panama","+506 Costa Rica","+502 Guatemala","+503 El Salvador","+504 Honduras","+595 Paraguay","+598 Uruguay","+591 Bolivia","+593 Ecuador",
"+93 Afghanistan","+355 Albania","+213 Algeria","+376 Andorra","+244 Angola","+374 Armenia","+994 Azerbaijan","+880 Bangladesh","+375 Belarus","+229 Benin","+975 Bhutan","+387 Bosnia","+267 Botswana","+359 Bulgaria","+226 Burkina Faso","+253 Djibouti","+372 Estonia","+679 Fiji","+358 Finland","+241 Gabon","+220 Gambia","+995 Georgia","+30 Greece","+224 Guinea","+592 Guyana","+509 Haiti","+36 Hungary","+354 Iceland","+98 Iran","+964 Iraq","+353 Ireland","+972 Israel","+962 Jordan","+7 Kazakhstan","+996 Kyrgyzstan","+371 Latvia","+961 Lebanon","+266 Lesotho","+231 Liberia","+218 Libya","+423 Liechtenstein","+370 Lithuania","+352 Luxembourg","+960 Maldives","+223 Mali","+356 Malta","+222 Mauritania","+230 Mauritius","+373 Moldova","+377 Monaco","+382 Montenegro","+268 Eswatini","+211 South Sudan","+249 Sudan","+421 Slovakia","+386 Slovenia","+94 Sri Lanka","+963 Syria","+886 Taiwan","+992 Tajikistan","+228 Togo","+993 Turkmenistan","+998 Uzbekistan"
];

app.get('/',(req,res)=>{
  const cur=db.length;
  const pct=Math.round(cur/TARGET*100);
  const rem=TARGET-cur;
  const opts = countries.map(c=>{
    const parts = c.split(' ');
    const code = parts[0];
    const name = parts.slice(1).join(' ');
    const sel = c.startsWith('+256') ? 'selected' : '';
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
<form method="POST" action="/register" onsubmit="this.number.value=document.getElementById('cc').value+document.getElementById('num').value">
<input name="name" placeholder="Enter your full name" required>
<div style="margin-top:12px;font-weight:700;font-size:12px">WHATSAPP NUMBER</div>
<div class="phone-row"><select id="cc">${opts}</select><input id="num" type="tel" placeholder="770000000" required></div>
<input type="hidden" name="number">
<button class="btn btn-primary" type="submit">Register</button>
</form>
<button class="btn btn-outline" onclick="navigator.clipboard.writeText(location.href);alert('Link copied!')">Copy link</button>
</div>
<div class="bottom"><a href="${CHANNEL}" style="flex:1"><button class="btn btn-light" style="width:100%">Channel</button></a><a href="/admin" style="flex:1"><button class="btn btn-light" style="width:100%">Get VCF</button></a></div></div>
<div style="text-align:center;margin:14px;font-size:12px;font-weight:800">Powered by MATSKEN TECH</div>
<div style="text-align:center;font-size:10px;color:#64748b">Target:${TARGET} | Remaining:${rem}</div>
</div></body></html>`);
});

app.post('/register',(req,res)=>{
  const {name,number}=req.body;
  if(name&&number&&db.length<TARGET&&!db.find(u=>u.number===number)) db.push({name,number});
  res.send(`<html><head><meta http-equiv="refresh" content="1;url=${CHANNEL}"></head><body style="text-align:center;padding:60px;font-family:Arial"><h2>Registered!</h2><p>Redirecting to Channel...</p><a href="${CHANNEL}">Click here</a></body></html>`);
});

app.get('/admin',(req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.send(`<body style="text-align:center;padding:30px;font-family:Arial"><h2>MATSKEN ADMIN</h2><form><input name="pass" type="password" placeholder="MATSKEN2026" style="padding:12px;border-radius:10px;border:1px solid #000"><br><br><button style="padding:12px 30px;background:#6366f1;color:#fff;border:none;border-radius:10px">LOGIN</button></form></body>`);
  if(req.query.clear==='1') db=[];
  let rows=db.map((u,i)=>`<tr><td>${i+1}</td><td>${u.name}</td><td>${u.number}</td></tr>`).join('');
  res.send(`<body style="font-family:Arial;padding:12px"><h2>ADMIN ${db.length}/${TARGET}</h2><a href="/vcf?pass=${ADMIN_PASS}"><button style="background:#6366f1;color:#fff;padding:12px;border:none;border-radius:10px">DOWNLOAD VCF (Admin Only)</button></a><table border=1 cellpadding=8 style="width:100%;margin-top:12px;border-collapse:collapse"><tr><th>#</th><th>Name</th><th>Number</th></tr>${rows}</table></body>`);
});

app.get('/vcf',(req,res)=>{
  if(req.query.pass!==ADMIN_PASS) return res.status(403).send('Admin Only');
  let vcf=''; db.forEach(c=>{ vcf+=`BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nTEL;TYPE=CELL:${c.number}\nEND:VCARD\n`; });
  res.setHeader('Content-Disposition','attachment; filename=breaker_vcf.vcf');
  res.setHeader('Content-Type','text/x-vcard');
  res.send(vcf);
});

module.exports=app;
