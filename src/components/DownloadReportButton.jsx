import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DownloadReportButton = ({ bills }) => {
  const handleDownload = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text("Paid Bills Report", 14, 22);

    const tableColumn = [
      "Username",
      "Email",
      "Bill Title",
      "Category",
      "Amount (Tk)",
      "Address",
      "Phone",
      "Date",
    ];

    const tableRows = bills.map((bill) => [
      bill.username,
      bill.email,
      bill.title,
      bill.category,
      bill.amount,
      bill.address,
      bill.phone,
      new Date(bill.date).toLocaleDateString("en-GB"),
    ]);

    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: {
        fontSize: 8,
        cellPadding: 2,
      },
      headStyles: {
        fillColor: [37, 99, 235],
        textColor: [255, 255, 255],
        fontSize: 9,
      },
      alternateRowStyles: {
        fillColor: [240, 240, 240],
      },
    });

    doc.save("paid_bills_report.pdf");
  };

  return (
    <button
      onClick={handleDownload}
      className="p-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition"
    >
      Download PDF Report
    </button>
  );
};

export default DownloadReportButton;