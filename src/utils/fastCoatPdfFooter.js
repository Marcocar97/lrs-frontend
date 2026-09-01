import {
    PDFDocument as PDFLibDocument,
    StandardFonts,
    rgb,
  } from "pdf-lib";
  import {
    fastCoatLogo,
    lrsLogo,
  } from "../assets/fastcoat-pdf";
  
  const fitImage = (image, maxWidth, maxHeight) => {
    const scale = Math.min(maxWidth / image.width, maxHeight / image.height);
    return {
      width: image.width * scale,
      height: image.height * scale,
    };
  };
  
  export const addPdfFooter = async (sourceBlob) => {
    const sourceBytes = await sourceBlob.arrayBuffer();
    const pdfDocument = await PDFLibDocument.load(sourceBytes);
    const font = await pdfDocument.embedFont(StandardFonts.HelveticaBold);
    const lrsFooterLogo = await pdfDocument.embedPng(lrsLogo);
    const fastCoatFooterLogo = await pdfDocument.embedJpg(fastCoatLogo);
    const pages = pdfDocument.getPages();
    const fontSize = 8.5;
    const sideMargin = 40;
    const footerLineY = 57;
    const footerBottom = 18;
    const lrsSize = fitImage(lrsFooterLogo, 50, 31);
    const fastCoatSize = fitImage(fastCoatFooterLogo, 105, 29);
  
    pages.forEach((page, index) => {
      const label = `Page ${index + 1} of ${pages.length}`;
      const labelWidth = font.widthOfTextAtSize(label, fontSize);
      const pageWidth = page.getWidth();
  
      page.drawLine({
        start: { x: sideMargin, y: footerLineY },
        end: { x: pageWidth - sideMargin, y: footerLineY },
        thickness: 0.5,
        color: rgb(0.82, 0.82, 0.82),
      });
  
      page.drawImage(lrsFooterLogo, {
        x: sideMargin,
        y: footerBottom,
        width: lrsSize.width,
        height: lrsSize.height,
      });
  
      page.drawText(label, {
        x: (pageWidth - labelWidth) / 2,
        y: 29,
        size: fontSize,
        font,
        color: rgb(0.27, 0.27, 0.27),
      });
  
      page.drawImage(fastCoatFooterLogo, {
        x: pageWidth - sideMargin - fastCoatSize.width,
        y: footerBottom,
        width: fastCoatSize.width,
        height: fastCoatSize.height,
      });
    });
  
    const finalBytes = await pdfDocument.save({ useObjectStreams: true });
    return new Blob([finalBytes], { type: "application/pdf" });
  };