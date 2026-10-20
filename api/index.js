const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

let db = []; // stores numbers

app.get('/', (req, res) => {
  res.send(`
  <!DOCTYPE html>
  <html>
  <head><meta name="viewport" content="width=device-width, initial-scale=1">
  <title>BREAKER VCF - FREE Registration 2026</title>
  <style>
    body{background:#000;color:#fff;font-family:Arial;text-align:center;padding:20px}
    .card{background:#111;border:2px solid #ff0000;border-radius:15px;padding:25px;max-width:400px;margin:20px auto}
    input{width:90%;padding:12px;border-radius:8px;border:none;margin:10px 0}
    button{background:#ff0000;color:#fff;padding:12px 25px;border:none;border-radius:8px;font-weight:bold;width:95%}
    h1{color:#ff0000}
  </style></head>
  <body>
    <h1>🔥 BREAKER VCF 🔥</h1>
    <p><b>End Of Year Viewers FREE VCF Registration 2026</b></p>
    <p>Join 500 Contacts Batch - Free</p>
    <div class="card">
      <form method="POST" action="/register">
        <input name="name" placeholder="Your Name" required>
        <input name="number" placeholder="WhatsApp Number 256..." required>
        <button type="submit">REGISTER FREE NOW</button>
      </form>
      <p style="color:#aaa;font-size:12px">Total Registered: ${db.length}</p>
      <a href="/vcf" style="color:#ff0000">Download VCF File</a>
    </div>
  </body></html>
  `);
});

app.post('/register', (req, res) => {
  const { name, number } = req.body;
  if(name && number) db.push({name, number});
  res.redirect('/');
});

app.get('/vcf', (req, res) => {
  let vcf = "";
  db.forEach(c => {
    vcf += `BEGIN:VCARD\nVERSION:3.0\nFN:${c.name}\nTEL;TYPE=CELL:${c.number}\nEND:VCARD\n`;
  });
  res.setHeader('Content-Disposition', 'attachment; filename=BREAKER-500.vcf');
  res.setHeader('Content-Type', 'text/x-vcard');
  res.send(vcf);
});

module.exports = app;
