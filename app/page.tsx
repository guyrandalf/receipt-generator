"use client";

import { useState } from "react";

import { Receipt } from "./types/receipt";
import { ReceiptForm } from "./components/receipt-form";
import { ReceiptDisplay } from "./components/receipt-display";

export default function Home() {
  const [generatedReceipt, setGeneratedReceipt] = useState<Receipt | null>(
    null
  );

  const handleReceiptSubmit = (receipt: Receipt) => {
    setGeneratedReceipt(receipt);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    // For PDF download, you might want to use a library like jsPDF or react-to-pdf
    // For now, we'll use the browser's print to PDF functionality
    const printWindow = window.open("", "_blank");
    if (printWindow) {
      printWindow.document.write(`
        <!DOCTYPE html>
        <html>
          <head>
            <title>Receipt - ${generatedReceipt?.receiptNumber}</title>
            <style>
              body { font-family: Arial, sans-serif; margin: 20px; }
              .receipt { max-width: 800px; margin: 0 auto; }
              table { width: 100%; border-collapse: collapse; }
              th, td { padding: 8px; text-align: left; border-bottom: 1px solid #ddd; }
              .text-right { text-align: right; }
              .text-center { text-align: center; }
              .font-bold { font-weight: bold; }
              .border-b { border-bottom: 1px solid #000; }
              .mb-4 { margin-bottom: 16px; }
              .mt-4 { margin-top: 16px; }
            </style>
          </head>
          <body>
            <div class="receipt">
              <div style="text-align: center; margin-bottom: 20px; border-bottom: 1px solid #000; padding-bottom: 10px;">
                <h1 style="margin: 0;">${generatedReceipt?.company.name}</h1>
                <p style="margin: 5px 0;">${
                  generatedReceipt?.company.address
                }</p>
                <p style="margin: 5px 0;">Phone: ${
                  generatedReceipt?.company.phone
                } | Email: ${generatedReceipt?.company.email}</p>
              </div>
              
              <div style="display: flex; justify-content: space-between; margin-bottom: 20px;">
                <div>
                  <h3 style="margin: 0 0 10px 0;">Bill To:</h3>
                  <p style="margin: 5px 0;"><strong>${
                    generatedReceipt?.customer.name
                  }</strong></p>
                  <p style="margin: 5px 0;">${
                    generatedReceipt?.customer.address
                  }</p>
                  <p style="margin: 5px 0;">Phone: ${
                    generatedReceipt?.customer.phone
                  }</p>
                  <p style="margin: 5px 0;">Email: ${
                    generatedReceipt?.customer.email
                  }</p>
                </div>
                <div style="text-align: right;">
                  <div style="background: #f0f0f0; padding: 5px 10px; display: inline-block; margin-bottom: 10px;">RECEIPT</div>
                  <p style="margin: 5px 0;"><strong>Receipt #:</strong> ${
                    generatedReceipt?.receiptNumber
                  }</p>
                  <p style="margin: 5px 0;"><strong>Date:</strong> ${new Date(
                    generatedReceipt?.date || ""
                  ).toLocaleDateString()}</p>
                  <p style="margin: 5px 0;"><strong>Payment:</strong> ${
                    generatedReceipt?.paymentMethod
                  }</p>
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Description</th>
                    <th style="text-align: center;">Qty</th>
                    <th style="text-align: right;">Unit Price</th>
                    <th style="text-align: right;">Total</th>
                  </tr>
                </thead>
                <tbody>
                  ${generatedReceipt?.items
                    .map(
                      (item) => `
                    <tr>
                      <td>${item.description}</td>
                      <td style="text-align: center;">${item.quantity}</td>
                      <td style="text-align: right;">₦${item.unitPrice.toFixed(
                        2
                      )}</td>
                      <td style="text-align: right; font-weight: bold;">₦${item.total.toFixed(
                        2
                      )}</td>
                    </tr>
                  `
                    )
                    .join("")}
                </tbody>
              </table>

              <div style="display: flex; justify-content: flex-end; margin-top: 20px;">
                <div style="width: 200px;">
                  <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Subtotal:</span>
                    <span>₦${generatedReceipt?.subtotal.toFixed(2)}</span>
                  </div>
                  ${
                    generatedReceipt?.tax
                      ? `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Tax:</span>
                    <span>₦${generatedReceipt?.tax.toFixed(2)}</span>
                  </div>`
                      : ""
                  }
                  ${
                    generatedReceipt?.discount
                      ? `<div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span>Discount:</span>
                    <span>-₦${generatedReceipt?.discount.toFixed(2)}</span>
                  </div>`
                      : ""
                  }
                  <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 18px; border-top: 1px solid #000; padding-top: 10px; margin-top: 10px;">
                    <span>Total:</span>
                    <span>₦${generatedReceipt?.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              ${
                generatedReceipt?.notes
                  ? `
                <div style="margin-top: 20px; padding-top: 10px; border-top: 1px solid #000;">
                  <h4 style="margin: 0 0 10px 0;">Notes:</h4>
                  <p style="margin: 0; color: #666;">${generatedReceipt.notes}</p>
                </div>
              `
                  : ""
              }

              <div style="margin-top: 30px; padding-top: 10px; border-top: 1px solid #000; text-align: center; color: #666;">
                <p style="margin: 0;">Thank you for your business!</p>
              </div>
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Receipt Generator
          </h1>
          <p className="text-lg text-gray-600">
            Create professional receipts with ease
          </p>
        </div>

        {!generatedReceipt ? (
          <div className="max-w-4xl mx-auto">
            <ReceiptForm onSubmit={handleReceiptSubmit} />
          </div>
        ) : (
          <div className="space-y-6">
            <div className="text-center">
              <button
                onClick={() => setGeneratedReceipt(null)}
                className="text-blue-600 hover:text-blue-800 underline"
              >
                ← Back to Form
              </button>
            </div>
            <ReceiptDisplay
              receipt={generatedReceipt}
              onPrint={handlePrint}
              onDownload={handleDownload}
            />
          </div>
        )}
      </div>
    </div>
  );
}
