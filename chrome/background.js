// runtime installed
chrome.runtime.onInstalled.addListener(() => {

  console.log('onInstalled');
})
let tId = -1

// action onClicked
chrome.action.onClicked.addListener((tab) => {
  if (tId < 0) {
    chrome.tabs.create({url: chrome.runtime.getURL('index.html')})
      .then(t => {
        console.log('tab created');
        tId = t.id;
      });
    return;
  }
  chrome.tabs.get(tId).then(t => {
    if (!t.active) {
      chrome.tabs.update(tId, {active: true});
    }
  })
})
// tabs onRemoved
chrome.tabs.onRemoved.addListener((tabId, detachInfo) => {
  if (tabId === tId) {
    console.log('tab removed');
    tId = -1;
  }
})
