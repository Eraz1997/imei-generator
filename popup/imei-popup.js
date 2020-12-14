function listenForClicks() {
  document.addEventListener("click", (e) => {
    function openGitHubLink() {
      var creating = browser.tabs.create({
        url: "https://github.com/Eraz1997/imei-generator",
      });
    }

    function refresh() {
      let imeiValue = document.getElementById("imei-value");
      imeiValue.innerText = generateIMEI();
    }

    function copyToClipboard() {
      let imeiValue = document.getElementById("imei-value");
      let imeiText = imeiValue.innerText;
      navigator.clipboard.writeText(imeiText).then(
        function () {
          imeiValue.innerText = "Copied!";
          setTimeout(function () {
            imeiValue.innerText =
              imeiValue.innerText === "Copied!"
                ? imeiText
                : imeiValue.innerText;
          }, 1000);
        },
        function () {
          throw "Can't write to the clipboard";
        }
      );
    }

    function reportError(error) {
      console.error(`IMEI error: ${error}`);
    }

    if (e.target.classList.contains("button")) {
      if (e.target.classList.contains("icon")) {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(openGitHubLink)
          .catch(reportError);
      } else if (e.target.classList.contains("refresh")) {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(refresh)
          .catch(reportError);
      } else if (e.target.classList.contains("copy")) {
        browser.tabs
          .query({ active: true, currentWindow: true })
          .then(copyToClipboard)
          .catch(reportError);
      }
    }
  });
}

listenForClicks();

let imeiValue = document.getElementById("imei-value");
imeiValue.innerText = generateIMEI();
