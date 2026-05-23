import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportReportAsPDF = async (elementId: string, filename = 'kissanai_report.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Report element not found');

  // 1. Configure the canvas capture
  const canvas = await html2canvas(element, { 
    backgroundColor: '#020617', // Match your dark theme background (e.g., slate-950)
    scale: 2,                   // High resolution
    useCORS: true,              // Allows loading external assets/icons
    logging: false,
    windowWidth: element.scrollWidth
  });

  const imageData = canvas.toDataURL('image/png', 1.0);

  // 2. Adjust PDF settings for a vertical report (A4 portrait)
  // Dashboard content is usually long; portrait mode keeps the layout readable.
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

  // 3. Multi-page support (if the report exceeds 1 page)
  let heightLeft = pdfHeight;
  let position = 0;

  pdf.addImage(imageData, 'PNG', 0, position, pdfWidth, pdfHeight);
  heightLeft -= 297; // A4 page height in mm

  while (heightLeft > 0) {
    position = heightLeft - pdfHeight;
    pdf.addPage();
    pdf.addImage(imageData, 'PNG', 0, position, pdfWidth, pdfHeight);
    heightLeft -= 297;
  }

  pdf.save(filename);
};