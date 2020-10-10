const currentPages: string[] = [];

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (
    changeInfo.status == 'complete' &&
    tab.url &&
    !currentPages?.some((url) => tab?.url?.includes(url))
  ) {
    chrome.tabs.executeScript(tabId, { file: 'key-listener.js' });
    currentPages.push(tab.url);
  }
});
