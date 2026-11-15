// 1. Keterangan P11 Aktif
"use strict";

console.log("P11 JavaScript aktif");

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

// 7. Function buatElemenProduk
function buatElemenProduk(produk) {
  const card = document.createElement("article");
  card.classList.add("product-card");

  const title = document.createElement("h3");
  title.textContent = produk.nama;

  const category = document.createElement("p");
  category.classList.add("category-note");
  category.textContent = produk.kategori;

  const price = document.createElement("p");
  price.classList.add("price");
  price.textContent = formatRupiah(produk.harga);

  const stock = document.createElement("span");
  const status = statusStok(produk.stok);
  stock.classList.add("stock-badge");
  if (status.className) {
    stock.classList.add(status.className);
  }
  stock.textContent = status.label;

  // 8. tombol yang disembunyikan untuk menampilkan detail produk
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.textContent = "Sembunyikan";
  removeButton.classList.add("ghost-button");

  removeButton.addEventListener("click", () => {
    card.remove();
    produkStatus.textContent = "Satu kartu disembunyikan dari tampilan sementara.";
  });

  card.append(title, category, price, stock);

  card.append(removeButton);
  return card;
}

// 9. Function Empty State
function buatEmptyState(kategori) {
  const empty = document.createElement("p");
  empty.classList.add("empty-state");
  empty.textContent = `Belum ada produk pada kategori ${kategori}.`;
  return empty;
}

//Pertemuan 11 DOM
const produkGrid = document.querySelector("#produk-grid");
const produkStatus = document.querySelector("#produk-status");
const tombolFilter = document.querySelectorAll("[data-filter]");

// 10. Function Render Produk
function renderProduk(kategoriAktif = "Semua") {
  if (!produkGrid || !produkStatus) {
    console.warn("Target render produk tidak ditemukan.");
    return;
  }

  const produkTampil = kategoriAktif === "Semua"
    ? produkUmkm
    : produkUmkm.filter((produk) => produk.kategori === kategoriAktif);

  produkGrid.replaceChildren();

  if (produkTampil.length === 0) {
    produkGrid.append(buatEmptyState(kategoriAktif));
    produkStatus.textContent = "0 produk ditemukan.";
    return;
  }

  produkTampil.forEach((produk) => {
    produkGrid.append(buatElemenProduk(produk));
  });

  produkStatus.textContent = `${produkTampil.length} produk ditampilkan.`;
}

// 11. Pasang event listener dan classList
tombolFilter.forEach((tombol) => {
  tombol.addEventListener("click", (event) => {
    const tombolAktif = event.currentTarget;
    const kategori = tombolAktif.dataset.filter;

    tombolFilter.forEach((item) => item.classList.remove("is-active"));
    tombolAktif.classList.add("is-active");

    renderProduk(kategori);
  });
});

const tombolSemua = document.querySelector('[data-filter="Semua"]');
if (tombolSemua) {
  tombolSemua.classList.add("is-active");
}

renderProduk("Semua");