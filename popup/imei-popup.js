/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
function listenForClicks() {
  document.addEventListener("click", (e) => {
    function openGitHubLink() {
      try {
        var creating = browser.tabs.create({
          url: "https://github.com/Eraz1997/imei-generator",
        });
      } catch (e) {
        try {
          if (!e.toString().includes("browser is not defined")) {
            reportError(e);
            return;
          }
          var creating = chrome.tabs.create({
            url: "https://github.com/Eraz1997/imei-generator",
          });
        } catch (e) {
          throw e;
        }
      }
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

    function callFunction(f) {
      try {
        browser.tabs.query({ active: true, currentWindow: true }).then(f);
      } catch (e) {
        if (!e.toString().includes("browser is not defined")) {
          reportError(e);
          return;
        }
        try {
          chrome.tabs.query({ active: true, currentWindow: true }, f);
        } catch (e) {
          reportError(e);
        }
      }
    }

    if (e.target.classList.contains("button")) {
      if (e.target.classList.contains("icon")) {
        callFunction(openGitHubLink);
      } else if (e.target.classList.contains("refresh")) {
        callFunction(refresh);
      } else if (e.target.classList.contains("copy")) {
        callFunction(copyToClipboard);
      }
    }
  });
}

listenForClicks();

let imeiValue = document.getElementById("imei-value");
imeiValue.innerText = generateIMEI();
