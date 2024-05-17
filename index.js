const fs = require('fs');
const PDFDocument = require('pdfkit');


const name = 'Kevin';
const secondname = 'James';
console.log(secondname)

// Create a new PDF document
const doc = new PDFDocument();

// Set up the file stream to write the PDF
const stream = doc.pipe(fs.createWriteStream('invoice.pdf'));

// Draw the logo
// doc.image('logo.png', 50, 45, { width: 50 });

// Add the heading
doc.fontSize(18).text('BILL', 100, 50);
doc.fontSize(18).text('DETAILS', 200, 50);
doc.fontSize(18).text('PAYMENT', 300, 50);

// Add the table headers
doc.fontSize(12).text('Item', 50, 80);
doc.fontSize(12).text('QTY', 200, 80);
doc.fontSize(12).text('PRICE', 250, 80);
doc.fontSize(12).text('AMOUNT', 300, 80);

// Set the initial y-coordinate for the table rows
let y = 100;

// Simulate some data for the table rows
const items = [
  { name: 'Product 1', qty: 2, price: 10 },
  { name: 'Product 2', qty: 1, price: 20 },
  { name: 'Product 3', qty: 3, price: 5 },
];

// Add the table rows
items.forEach((item, index) => {
  doc.fontSize(10).text(item.name, 50, y);
  doc.fontSize(10).text(item.qty.toString(), 200, y);
  doc.fontSize(10).text(`$${item.price.toFixed(2)}`, 250, y);
  doc.fontSize(10).text(`$${(item.qty * item.price).toFixed(2)}`, 300, y);
  y += 20;
});

// Add the totals
y += 10;
doc.fontSize(12).text('Subtotal:', 50, y);
doc.fontSize(12).text(`$${calculateSubtotal(items).toFixed(2)}`, 300, y);

y += 20;
doc.fontSize(12).text('Total Due:', 50, y);
doc.fontSize(12).text(`$${calculateSubtotal(items).toFixed(2)}`, 300, y);

// Finalize the PDF file
doc.end();

// Helper function to calculate the subtotal
function calculateSubtotal(items) {
  return items.reduce((total, item) => total + item.qty * item.price, 0);
}

// Event listener for the 'finish' event to indicate when the PDF is ready
stream.on('finish', () => {
  console.log('PDF generated successfully.');
});