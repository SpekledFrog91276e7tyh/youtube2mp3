document.getElementById("ytform").addEventListener("submit", function (event) {
  event.preventDefault();
  const url = document.getElementById("ytlink").value;
  const loadingDiv = document.getElementById("loading");
  loadingDiv.style.display = "block";

  fetch(
    `https://tesfgaydgsa-si2d.vercel.app//download-audio?url=${encodeURIComponent(url)}`,
  )
    .then((response) => {
      if (response.ok) {
        return response.blob();
      }
      throw new Error("Network response was not ok.");
    })
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.style.display = "none";
      a.href = url;
      a.download = "audio.mp3";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      loadingDiv.style.display = "none";
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
      loadingDiv.style.display = "none";
    });
});
