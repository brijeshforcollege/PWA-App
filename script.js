const urlInput = document.getElementById("urlInput");
const generateBtn = document.getElementById("generateBtn");
const errorText = document.getElementById("error");
const qrContainer = document.getElementById("qrContainer");
const qrImage = document.getElementById("qrImage");
const qrUrl = document.getElementById("qrUrl");

generateBtn.addEventListener("click", () => {
  const url = urlInput.value.trim();

  if (!url) {
    errorText.textContent = "Please enter a URL";
    qrContainer.classList.add("hidden");
    return;
  }

  QRCode.toDataURL(url)
    .then((dataUrl) => {
      qrImage.src = dataUrl;
      qrUrl.textContent = url;
      qrContainer.classList.remove("hidden");
      errorText.textContent = "";
    })
    .catch(() => {
      errorText.textContent = "Failed to generate QR code";
      qrContainer.classList.add("hidden");
    });
});

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
      navigator.serviceWorker
        .register("service-worker.js")
        .then((reg) => {
          console.log("Service worker registered.", reg);
        })
        .catch((err) => console.error("SW registration failed: ", err));
    });
  }
  