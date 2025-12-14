import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4000;

// allow your GitHub Pages origin
app.use(cors({
  origin: ['https://YOUR-GITHUB-USERNAME.github.io'],
}));

app.use(express.json());

// in-memory "database" (replace with MongoDB / PostgreSQL later)
const registrations = [];

app.post('/api/register', (req, res) => {
  const { name, regNo, collegeEmail, whatsapp } = req.body;

  if (!name || !regNo || !collegeEmail || !whatsapp) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  const entry = {
    id: registrations.length + 1,
    name,
    regNo,
    collegeEmail,
    whatsapp,
    createdAt: new Date().toISOString()
  };

  registrations.push(entry);
  console.log('New registration:', entry);

  res.status(201).json({ message: 'Registered', entry });
});

// optional: see all registrations (protect this in production)
app.get('/api/registrations', (req, res) => {
  res.json(registrations);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
