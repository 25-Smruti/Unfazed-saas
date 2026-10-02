import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';

export const generateGSTInvoice = async (payment, therapist, client) => {
  return new Promise((resolve, reject) => {
    const invoicesDir = path.resolve('invoices');
    if (!fs.existsSync(invoicesDir)) fs.mkdirSync(invoicesDir);

    const filePath = path.join(invoicesDir, `invoice_${payment._id}.pdf`);
    const doc = new PDFDocument({ margin: 50 });
    const writeStream = fs.createWriteStream(filePath);

    doc.pipe(writeStream);
    doc.fontSize(22).text('GST TAX INVOICE', { align: 'center' });
    doc.moveDown();
    doc.fontSize(12).text(`Invoice Reference: INV-${payment._id.toString().slice(-6).toUpperCase()}`);
    doc.text(`Date: ${new Date().toLocaleDateString('en-IN')}`);
    doc.text(`Practitioner: ${therapist.name} (${therapist.email})`);
    doc.text(`Client: ${client.name} (${client.email})`);
    doc.moveDown();
    doc.text(`Net Service Amount: INR ${(payment.amount * 0.82).toFixed(2)}`);
    doc.text(`Applicable GST (18%): INR ${(payment.amount * 0.18).toFixed(2)}`);
    doc.fontSize(14).text(`Total Amount Paid: INR ${payment.amount.toFixed(2)}`, { underline: true });
    doc.end();

    writeStream.on('finish', () => resolve(filePath));
    writeStream.on('error', reject);
  });
};
