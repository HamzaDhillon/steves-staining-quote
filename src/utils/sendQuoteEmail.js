import { jsPDF } from "jspdf";
import emailjs from 'emailjs-com';

export async function sendQuoteEmail(quote) {
  const doc = new jsPDF();

  doc.setFontSize(18);
  doc.text("Quote Summary", 20, 20);

  let y = 40;

  if (quote.project_type.includes("Deck")) {
    doc.text(`Deck Staining: $${(quote.deck_price || 0).toFixed(2)}`, 20, y);
    y += 10;
  }

  if (quote.project_type.includes("Fence")) {
    doc.text(`Fence Staining: $${(quote.fence_price || 0).toFixed(2)}`, 20, y);
    y += 10;
  }

  if (quote.services && quote.services.length) {
    doc.text(`Washing Services: included`, 20, y);
    y += 10;
  }

  doc.text(`Subtotal: $${quote.subtotal.toFixed(2)}`, 20, y); y += 10;
  doc.text(`Tax: $${quote.tax.toFixed(2)}`, 20, y); y += 10;

  doc.setFontSize(16);
  doc.text(`Total: $${quote.total.toFixed(2)}`, 20, y); y += 20;

  doc.setFontSize(10);
  doc.text("Thank you for choosing Steve’s Staining Services!", 20, y);

  // Convert to base64
  const pdfBase64 = btoa(doc.output());

  const result = await emailjs.send("YOUR_SERVICE_ID", "YOUR_TEMPLATE_ID", {
    name: quote.full_name,
    email: quote.email,
    message: "Your quote is attached.",
    quote_pdf: pdfBase64,
  }, "YOUR_PUBLIC_KEY");

  return result;
}
