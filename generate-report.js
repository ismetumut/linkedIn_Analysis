import { listCSVs, downloadCSV } from '../../lib/storageService.js';
import { parseConnectionsCSV, diffConnections, csvFromList } from '../../lib/csvUtils.js';
import { sendConnectionsReport } from '../../lib/emailService.js';

export default async function handler(req, res) {
  try {
    const csvFiles = await listCSVs();
    if (csvFiles.length < 2) throw new Error('Not enough CSV files for comparison.');

    // Use last 2 files for comparison (yesterday & today)
    const [latest, prev] = csvFiles;

    const prevCSVBuffer = await downloadCSV(prev.name);
    const latestCSVBuffer = await downloadCSV(latest.name);

    const prevList = parseConnectionsCSV(prevCSVBuffer);
    const latestList = parseConnectionsCSV(latestCSVBuffer);

    const { added, removed } = diffConnections(prevList, latestList);

    const reportCSV = [
      'Added Connections:',
      csvFromList(added),
      '',
      'Removed Connections:',
      csvFromList(removed)
    ].join('\n');

    await sendConnectionsReport({
      added,
      removed,
      to: process.env.SENDGRID_TO_EMAIL,
      date: new Date().toLocaleDateString('en-CA'),
      reportCSV,
    });

    res.status(200).json({
      message: 'Report sent',
      added: added.length,
      removed: removed.length,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
}
