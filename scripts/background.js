/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at https://mozilla.org/MPL/2.0/. */
try {
  browser.menus.create({
    id: "insert-imei",
    title: "Insert random IMEI",
    contexts: ["editable"],
    onclick(info, tab) {
      browser.tabs.executeScript(tab.id, {
        frameId: info.frameId,
        code: `
        ${generateIMEI.toString()}
        target = browser.menus.getTargetElement(${info.targetElementId});
        if (target) {
            target.value = generateIMEI();
        }`,
      });
    },
  });
} catch (e) {
  if (!e.toString().includes("browser is not defined")) {
    console.error(e);
  } else {
    try {
      chrome.contextMenus.create({
        id: "insert-imei",
        title: "Insert random IMEI",
        contexts: ["editable"],
        onclick(info, tab) {
          chrome.tabs.executeScript({
            frameId: info.frameId,
            code: `
          ${generateIMEI.toString()}
          target = document.getSelection().baseNode;
          if (target.tagName !== "INPUT" && target.children) {
            var arr = Array.prototype.slice.call(target.children)
            target = arr.find(c => c.tagName === "INPUT");
          }
          target.value = generateIMEI();`,
          });
        },
      });
    } catch (e) {
      console.error(e);
    }
  }
}
