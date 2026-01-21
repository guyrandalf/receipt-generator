"use client";

import { Button } from "@/components/ui/button";
import { Receipt } from "../types/receipt";
import { Card, CardContent } from "@/components/ui/card";

import { Printer, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ReceiptDisplayProps {
  receipt: Receipt;
  onPrint: () => void;
  onDownload: () => void;
}

export function ReceiptDisplay({
  receipt,
  onPrint,
  onDownload,
}: ReceiptDisplayProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Receipt Preview</h2>
        <div className="flex gap-2 no-print">
          <Button onClick={onPrint} variant="outline">
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={onDownload}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      <Card className="max-w-4xl mx-auto print:shadow-none print:border-none">
        <CardContent className="p-8">
          {/* Header */}
          <div className="text-center mb-8 border-b pb-4">
            <h1 className="text-3xl font-bold mb-2">{receipt.company.name}</h1>
            <div className="text-sm text-gray-600 space-y-1">
              <p>{receipt.company.address}</p>
              <p>
                Phone: {receipt.company.phone} | Email: {receipt.company.email}
              </p>
            </div>
          </div>

          {/* Receipt Info */}
          <div className="flex justify-between items-start mb-6">
            <div>
              <h3 className="font-semibold mb-2">Bill To:</h3>
              <div className="text-sm">
                <p className="font-medium">{receipt.customer.name}</p>
                <p>{receipt.customer.address}</p>
                <p>Phone: {receipt.customer.phone}</p>
                <p>Email: {receipt.customer.email}</p>
              </div>
            </div>
            <div className="text-right">
              <Badge variant="outline" className="mb-2">
                RECEIPT
              </Badge>
              <div className="text-sm space-y-1">
                <p>
                  <span className="font-medium">Receipt #:</span>{" "}
                  {receipt.receiptNumber}
                </p>
                <p>
                  <span className="font-medium">Date:</span>{" "}
                  {new Date(receipt.date).toLocaleDateString()}
                </p>
                <p>
                  <span className="font-medium">Payment:</span>{" "}
                  {receipt.paymentMethod}
                </p>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-6">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 font-medium">Description</th>
                  <th className="text-center py-2 font-medium">Qty</th>
                  <th className="text-right py-2 font-medium">Unit Price</th>
                  <th className="text-right py-2 font-medium">Total</th>
                </tr>
              </thead>
              <tbody>
                {receipt.items.map((item) => (
                  <tr key={item.id} className="border-b border-gray-100">
                    <td className="py-3">{item.description}</td>
                    <td className="text-center py-3">{item.quantity}</td>
                    <td className="text-right py-3">
                      ₦{item.unitPrice.toFixed(2)}
                    </td>
                    <td className="text-right py-3 font-medium">
                      ₦{item.total.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totals */}
          <div className="flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>₦{receipt.subtotal.toFixed(2)}</span>
              </div>
              {receipt.tax > 0 && (
                <div className="flex justify-between">
                  <span>Tax:</span>
                  <span>₦{receipt.tax.toFixed(2)}</span>
                </div>
              )}
              {receipt.discount > 0 && (
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span>-₦{receipt.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between font-bold text-lg border-t pt-2">
                <span>Total:</span>
                <span>₦{receipt.total.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {receipt.notes && (
            <div className="mt-6 pt-4 border-t">
              <h4 className="font-medium mb-2">Notes:</h4>
              <p className="text-sm text-gray-600">{receipt.notes}</p>
            </div>
          )}

          {/* Footer */}
          <div className="mt-8 pt-4 border-t text-center text-sm text-gray-500">
            <p>Thank you for your business!</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
