/**
 * Insert text at a given text position 
 * @param inputElement element that is receiving the text
 * @param text the text has to be inserted 
 */
function insertAtCursor(inputElement: HTMLInputElement, text: string) {
  if (inputElement.selectionStart || inputElement.selectionStart === 0) {
    const startPos = inputElement.selectionStart;
    const endPos = inputElement.selectionEnd || 0;
    inputElement.value =
      inputElement.value.substring(0, startPos) +
      text +
      inputElement.value.substring(endPos, inputElement.value.length);
  } else {
    inputElement.value += text;
  }
}

/**
 * Listen for keyboard events and, for each key
 * combination pressed, check if it exist in the stored shortcuts 
 */
document.addEventListener('keydown', (e) => {

  // a hash is used for faster lookup
  const shortcutHash = `${e.shiftKey}${e.code}${Boolean(e.code.match(/^Numpad/))}`;

  chrome.storage.sync.get('shortcuts', (data) => {
    const { shortcuts } = data;
    const shortcutObj = shortcuts[shortcutHash];
    if (shortcutObj) {
      // identifies where to input based on the active element
      const inputElement = document.activeElement as HTMLInputElement;
      if (inputElement) {
        insertAtCursor(inputElement, shortcutObj.text);
      }
    }
  });
});
