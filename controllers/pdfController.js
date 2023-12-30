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
      const browser = await puppeteer.launch();
      const page = await browser.newPage();

      // Load the template dynamically
      const templatePath = path.join(__dirname, '../views', 'pages/pdf-template.ejs');
      const templateHtml = await ejs.renderFile(templatePath, { data });

      await page.setContent(templateHtml);
      const pdfBuffer = await page.pdf({ format: 'A4' });

      await browser.close();

      // Stream the PDF to the user for download
      const stream = new Readable();
      stream.push(pdfBuffer);
      stream.push(null);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=${data.Formnumber || 'document'}.pdf`);

      stream.pipe(res);
      // res.json({success: true})
    } catch (error) {
      let on = 'Adding a new administrator';
      let msg = error.message;
      res.redirect('/error?on=' + on + '&msg=' + msg);
    }
  },
};

module.exports = pdfController;
