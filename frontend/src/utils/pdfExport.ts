import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const exportReportAsPDF = async (elementId: string, filename = 'kissanai_report.pdf') => {
  const element = document.getElementById(elementId);
  if (!element) throw new Error('Report element not found');

  const canvas = await html2canvas(element, { backgroundColor: '#08180f', scale: 2 });
  const imageData = canvas.toDataURL('image/png');
  const pdf = new jsPDF({ orientation: 'landscape', unit: 'px', format: 'a4' });
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  pdf.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  pdf.save(filename);
};
