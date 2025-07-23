// src/components/QuotationPDF.js
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import logo from "./logo.png"; // path logo perusahaan
import { supabase } from "@/lib/supabase";

const formatCurrency = (num) =>
  new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 2,
  })
    .format(num)
    .replace("Rp", "")
    .trim();

export const generateCustomQuotationPDF = async (inquiry, items) => {
  const dueDate = new Date(inquiry?.due_date);
  const plus7Days = new Date(dueDate.setDate(dueDate.getDate() + 7));
  const formatted = plus7Days.toLocaleDateString("id-ID", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const doc = new jsPDF({ unit: "mm", format: "A4" });
  const blob = doc.output("blob");
  const fileName = `quotation-inq-${inquiry?.id}-${Date.now()}.pdf`;

  const { error: uploadError } = await supabase.storage.from("tmi").upload(fileName, blob, {
    contentType: "application/pdf",
    upsert: true,
  });

  if (uploadError) {
    console.error("Upload failed", uploadError.message);
    return;
  }

  const { data: publicData } = supabase.storage.from("tmi").getPublicUrl(fileName);

  await supabase.from("inquiry_quotation").insert([
    {
      inquiry_id: inquiry.id,
      qou_id: publicData.publicUrl,
    },
  ]);
  // ==== HEADER: LOGO & PERUSAHAAN ====
  const img = new Image();
  img.src = logo;
  await new Promise((resolve) => {
    img.onload = resolve;
  });
  // Atur lebar tetap, dan tinggi sesuai rasio asli logo
  const logoWidth = 40; // kamu bisa sesuaikan
  const aspectRatio = img.height / img.width;
  const logoHeight = logoWidth * aspectRatio;
  doc.addImage(img, "PNG", 14, 10, logoWidth, logoHeight);

  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  doc.text("PT. TIGA MITRA INTERNUSA", 200, 15, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  const headerLines = ["Jl. Kayu Agung 1 No. C/14, Bandung, BANDUNG, JAWA BARAT, 40264", "Phone: 08112256355", "Email: sales@tminternusa.com", "NPWP: 62.841.159.7-422.000"];
  headerLines.forEach((line, i) => doc.text(line, 200, 21 + i * 5, { align: "right" }));

  // ==== JUDUL ====
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  doc.text("SALES QUOTE", 105, 50, { align: "center" });

  // ==== INFO QUOTE ====
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  doc.text(`QUOTE #:INQ-2025-${inquiry?.id}`, 14, 60);
  doc.text(`DATE: ${inquiry?.due_date}`, 160, 60);

  // ==== CUSTOMER INFO ====
  doc.setFont("helvetica", "bold");
  doc.text("CUSTOMER", 14, 70);
  doc.setFont("helvetica", "normal");
  const custInfo = [`NAME: ${inquiry?.customer_name}`, `CONTACT PERSON: ${inquiry?.contact_person}`, "ADDRESS:", "Jl. Baranang Siang, Kebon Pisang, Kec. Sumur", "Bandung, Kota. Bandung, Jawa Barat 40112", `EXPIRED DATE: ${formatted}`];
  custInfo.forEach((line, i) => doc.text(line, 14, 76 + i * 5));

  // ==== DATA ITEMS ====
  const itemsa = [
    {
      description: "Dyna Bolt M12 (Selongsong) x 135\nZinc Coating",
      qty: 2,
      unit: "EA",
      price: 12000,
    },
    {
      description: "Dyna Bolt M16 (Selongsong) x 135\nZinc Coating",
      qty: 2,
      unit: "EA",
      price: 14000,
    },
    {
      description: "Dyna Bolt M20 (Selongsong) x 135\nZinc Coating",
      qty: 2,
      unit: "EA",
      price: 16000,
    },
    {
      description: "Dyna Bolt M24 (Selongsong) x 135\nZinc Coating",
      qty: 2,
      unit: "EA",
      price: 18000,
    },
    {
      description: "Dyna Bolt M30 (Selongsong) x 135\nZinc Coating",
      qty: 2,
      unit: "EA",
      price: 20000,
    },
  ];

  const tableBody = items.map((item, idx) => [idx + 1, item?.product_name, item?.quantity, item?.unit, formatCurrency(item?.price), "X", formatCurrency(item?.quantity * item?.price)]);

  autoTable(doc, {
    startY: 105,
    head: [["NO.", "DESCRIPTION", "QTY", "UNIT", "UNIT PRICE", "TAXED", "AMOUNT"]],
    body: tableBody,
    styles: { fontSize: 9, cellPadding: 2 },
    headStyles: { fillColor: [220, 220, 220], textColor: 20 },
    columnStyles: {
      0: { cellWidth: 10, halign: "center" },
      1: { cellWidth: 78 }, // Lebar maksimal untuk description
      2: { cellWidth: 12, halign: "center" },
      3: { cellWidth: 14, halign: "center" },
      4: { cellWidth: 25, halign: "right" },
      5: { cellWidth: 10, halign: "center" },
      6: { cellWidth: 33, halign: "right" },
    },
  });

  // ==== SUBTOTAL ====
  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0);
  const ppn = subtotal * 0.11;
  const total = subtotal + ppn;
  const y = doc.lastAutoTable.finalY + 5;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const rightEdge = 196; // Sesuai sisi kanan tabel

  doc.setFont("helvetica", "normal");
  doc.text(`Subtotal: ${formatCurrency(subtotal)}`, rightEdge, y, { align: "right" });
  doc.text(`PPN 11%: ${formatCurrency(ppn)}`, rightEdge, y + 6, { align: "right" });

  doc.setFont("helvetica", "bold");
  doc.text(`TOTAL: ${formatCurrency(total)}`, rightEdge, y + 12, { align: "right" });

  // ==== MESSAGE ====
  const msgY = y + 25;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(10);
  doc.text("MESSAGE", 14, msgY);
  doc.setFont("helvetica", "normal");
  const messages = [
    "1. Prices and stock are subjected to change without prior notice.",
    "2. Delivery Time : 1 Week",
    "3. Term of Payment : Cash On Delivery (COD)",
    "4. Price Validity is 14 days after quotation date",
    "5. Prices listed above are include shipping costs",
  ];
  messages.forEach((m, i) => doc.text(m, 14, msgY + 6 + i * 5));

  // ==== PAYMENT ====
  const payY = msgY + 38;
  doc.setFont("helvetica", "bold");
  doc.text("PAYMENT DETAIL", 14, payY);
  doc.setFont("helvetica", "normal");
  const payments = ["BANK NAME: BANK CENTRAL ASIA", "BANK BRANCH: BURANGRANG", "BANK ACCOUNT NUMBER: 4380350942", "BANK ACCOUNT NAME: TIGA MITRA INTERNUSA PT"];
  payments.forEach((p, i) => doc.text(p, 14, payY + 6 + i * 6));

  // ==== AMOUNT IN WORD ====
  const inWordY = payY + 36;
  doc.setFont("helvetica", "bold");
  doc.text("AMOUNT IN WORD", 14, inWordY);
  doc.setFont("helvetica", "normal");

  // ==== FOOTER ====
  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  doc.text("__________________________", 14, 285);
  doc.text("Sales Quote #11139 Page 1 of 1", 105, 292, { align: "center" });

  doc.save("quotation-11139.pdf");
};
