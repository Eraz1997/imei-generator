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