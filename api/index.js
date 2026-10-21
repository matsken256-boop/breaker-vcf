module.exports = (req, res) => {
  const dbCount = 0; // will be 0 for now, but site will load
  res.setHeader('Content-Type', 'text/html');
  res.status(200).send(`
<!DOCTYPE html>
<html>
<head><meta name="viewport" content="width=device-width, initial-scale=1"><title>BREAKER VCF</title>
<style>body{margin:0;background:#e6e8ff;font-family:system-ui;padding:14px}.card{background:#fff;border:2px solid #000;border-radius:20px;padding:16px;max-width:420px;margin:auto}input{padding:12px;border-radius:10px;border:1.5px solid #000;width:100%;margin-top:8px}button{width:100%;padding:14px;background:#6366f1;color:#fff;border:none;border-radius:10px;font-weight:800;margin-top:12px}</style>
</head>
<body>
<div class="card">
<h2>BREAKER VCF - ${dbCount}/500</h2>
<p style="color:green;font-weight:800">✅ SITE IS BACK ONLINE</p>
<form method="POST" action="/api/register">
<input name="name" placeholder="Full name" required>
<input name="number" placeholder="WhatsApp e.g. +256769724124" required>
<button type="submit">Register</button>
</form>
<p style="font-size:12px;margin-top:12px">If you see this, the 500 error is FIXED. Tell me and I will restore your 240 countries + admin + VCF.</p>
</div>
</body>
</html>
  `);
};r.length < 6) return res.status(400).send("Invalid number");
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
