const Data = require("../models/dataModel");
const puppeteer = require('puppeteer');
const { Readable } = require('stream');
const path = require('path');
const ejs = require('ejs');

const pdfController = {
  processPdf: async (req, res) => {
    try {
      const uid = req.params.id;
      const data = await Data.findById(uid);

      // Use puppeteer to generate PDF from HTML template
      const browser = await puppeteer.launch({ headless: 'new' });
      const page = await browser.newPage();

      // Load the template dynamically
      const templatePath = path.join(__dirname, '../views', 'pages/pdf-template.ejs');
      const templateHtml = await ejs.renderFile(templatePath, { data });

      await page.setContent(templateHtml);
      const pdfBuffer = await page.pdf({ format: 'A3' });

      await browser.close();

      // Stream the PDF to the user for download
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${data.Formnumber || 'document'}.pdf`);

      // Send the PDF buffer as the response
      res.end(pdfBuffer);

    } catch (error) {
      console.error("Error generating PDF:", error);
      let on = 'Adding a new administrator';
      let msg = error.message;
      res.redirect('/error?on=' + on + '&msg=' + msg);
    }
  },
};

module.exports = pdfController;
