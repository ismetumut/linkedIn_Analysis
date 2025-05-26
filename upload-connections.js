import formidable from 'formidable';
import fs from 'fs';
import { uploadCSV } from '../../lib/storageService.js';

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method Not Allowed' });

  const form = new formidable.IncomingForm();
  form.parse(req, async (err, fields, files) => {
    if (err || !files.csv) return res.status(400).json({ error: 'CSV file is required.' });

    const file = files.csv;
    const buffer = await fs.promises.readFile(file.filepath);
    const now = new Date();
    const filename = `connections-${now.toISOString().split('T')[0]}-${now.getHours()}${now.getMinutes()}.csv`;
    try {
      const path = await uploadCSV(buffer, filename);
      res.status(200).json({ message: 'CSV uploaded', filename, path });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });
}
