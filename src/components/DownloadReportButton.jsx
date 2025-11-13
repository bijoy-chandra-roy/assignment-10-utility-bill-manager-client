import React from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const DownloadReportButton = ({ bills }) => {
    const handleDownload = () => {
        const doc = new jsPDF();
        doc.setFontSize(18);
        doc.text("Paid Bills Report", 14, 22);

        const tableColumn = ["Title", "Category", "Amount", "Date", "Location"];
        const tableRows = bills.map(bill => [
            bill.title,
            bill.category,
            `$${bill.amount}`,
            new Date(bill.date).toLocaleDateString('en-GB'),
            bill.location || "N/A",
        ]);

        // Use autoTable function imported separately
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
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
