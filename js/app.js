// 1. Keterangan P10 Aktif
"use strict";

console.log("P10 JavaScript aktif");

// 2. Data produk UMKM
const produkUmkm = [
    { nama: "Kopi Tubruk Signature", kategori: "Kopi", harga: 10000, stok: 5, unggulan: true},
    { nama: "Caffe Latte", kategori: "Kopi", harga: 12000, stok: 10, unggulan: true},
    { nama: "Matcha Latte", kategori: "Non Kopi", harga: 15000, stok: 8, unggulan: false},
    { nama: "Milk Tea Combination", kategori: "Non Kopi", harga: 13500, stok: 0, unggulan: false},
];

console.table(produkUmkm);

// 3. Function Format Rupiah
function formatRupiah(nilai) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(nilai);
}

console.log(formatRupiah(10000));

// 4. Function Status Stok
function statusStok(stok) {
    if (stok <= 0) {
        return { label: "Habis", className: "empty"};
    }

    if (stok <= 5) {
        return { label: "Stok terbatas", className: "warning"};
    }

    return { label: "Tersedia", className: ""};
}

console.log(statusStok(0));
console.log(statusStok(3));
console.log(statusStok(12));

// 5. Function Label Kategori
function labelKategori(kategori) {
  switch (kategori) {
    case "Kopi":
      return "Produk kopi pilihan";
    case "Non Kopi":
      return "Produk non-kopi pilihan";
    default:
      return "Produk UMKM";
  }
}

// 6. Function Membuat Kartu Produk
function buatKartuProduk(produk) {
  const status = statusStok(produk.stok);

  return `
    <article class="js-product-card">
      <h3>${produk.nama}</h3>
      <p class="category-note">${produk.kategori}</p>
      <p class="price">${formatRupiah(produk.harga)}</p>
      <span class="stock-badge ${status.className}">${status.label}</span>
    </article>
  `;
}

produkUmkm.forEach((produk) => {
  console.log("Debug produk:", produk.nama, "stok:", produk.stok);
});

// 7. Function Render Produk
function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");
  const unggulan = document.querySelector("#produk-unggulan");

  if (!grid || !ringkasan || !unggulan) {
    console.warn("Target render produk belum lengkap.")
    return;
  }

  const produkTersedia = produkUmkm.filter((produk) => produk.stok > 0);
  const produkUnggulan = produkUmkm.find((produk) => produk.unggulan === true);
  const markupProduk = produkTersedia.map(buatKartuProduk).join("");

  produkUmkm.forEach((produk) => {
    console.log("Debug produk:", produk.nama, "stok:", produk.stok);
  });

  grid.innerHTML = markupProduk;
  ringkasan.textContent = `${produkTersedia.length} produk tersedia dari ${produkUmkm.length} data.`;
  unggulan.textContent = produkUnggulan
    ? `Produk unggulan: ${produkUnggulan.nama}`
    : "Belum ada produk unggulan.";

  console.table(produkUmkm);
}

document.addEventListener("DOMContentLoaded", renderProduk);