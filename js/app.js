"use strict";

console.log("P09 JavaScript aktif");

const produkUmkm = [
    { nama: "Kopi Tubruk Signature", kategori: "Kopi", harga: 10000, stok: 5, unggulan: true},
    { nama: "Caffe Latte", kategori: "Kopi", harga: 12000, stok: 10, unggulan: true},
    { nama: "Matcha Latte", kategori: "Non Kopi", harga: 15000, stok: 8, unggulan: false},
    { nama: "Milk Tea Combination", kategori: "Non Kopi", harga: 13500, stok: 0, unggulan: false},
];

console.table(produkUmkm);

const formatRupiah = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
});

console.log(formatRupiah.format(produkUmkm[0].harga));

function statusStok(stok) {
    if (stok === 0) {
        return { label: "Habis", className: "empty"};
    }

    if (stok <= 5) {
        return { label: "Stok terbatas", className: "warning"};
    }

    return { label: "Tersedia", className: ""};
}

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

function renderProduk() {
  const grid = document.querySelector("#produk-dinamis");
  const ringkasan = document.querySelector("#produk-ringkasan");

  if (!grid || !ringkasan) {
    return;
  }

  let jumlahTersedia = 0;
  let markup = "";

  for (const produk of produkUmkm) {
    const status = statusStok(produk.stok);
    const kategori = labelKategori(produk.kategori);
    const labelAksi = produk.stok > 0 ? "Siap dipesan" : "Hubungi admin";

    if (produk.stok > 0) {
      jumlahTersedia = jumlahTersedia + 1;
    }

    markup = markup + `
      <article class="js-product-card">
        <h3>${produk.nama}</h3>
        <p>${kategori}</p>
        <p class="price">${formatRupiah.format(produk.harga)}</p>
        <span class="stock-badge ${status.className}">${status.label}</span>
        <p>${labelAksi}</p>
      </article>
    `;
  }

  grid.innerHTML = markup;
  ringkasan.textContent = `${jumlahTersedia} produk tersedia dari ${produkUmkm.length} data.`;
}

document.addEventListener("DOMContentLoaded", renderProduk);