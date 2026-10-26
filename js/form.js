const form = document.querySelector("#form-kontak");
const preview = document.querySelector("#preview");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const data = new FormData(form);
  preview.textContent = [
    "Nama: " + data.get("nama"),
    "Nomor Telepon: " + data.get("telepon"),
    "Email: " + data.get("email"),
    "Paket: " + data.get("paket"),
    "Topik: " + data.get("topik"),
    "Pesan: " + data.get("pesan"),
  ].join("\n");
});