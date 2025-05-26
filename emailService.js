import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export async function sendConnectionsReport({ added, removed, to, date, reportCSV }) {
  const subject = `LinkedIn Connections Daily Report - ${date}`;
  const html = `
    <h3>Daily LinkedIn Connections Report</h3>
    <p><strong>Added:</strong> ${added.length}</p>
    <p><strong>Removed:</strong> ${removed.length}</p>
    <br>
    <p>See attached CSV for full details.</p>
  `;
  const attachments = [
    {
      content: Buffer.from(reportCSV).toString('base64'),
      filename: `connections-report-${date}.csv`,
      type: 'text/csv',
      disposition: 'attachment',
    }
  ];

  await sgMail.send({
    to,
    from: process.env.SENDGRID_FROM_EMAIL,
    subject,
    html,
    attachments,
  });
}
