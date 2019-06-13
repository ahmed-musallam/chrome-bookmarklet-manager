export default class Storage {
  static set(items, callback) {
    chrome.storage.sync.set(items, callback);
  }
  static get(keys, callback) {
    chrome.storage.sync.get(keys, callback);
  }
  static remove(keys, callback) {
    chrome.storage.sync.remove(keys, callback);
  }
  static getAll(callback) {
    chrome.storage.sync.get(null, callback);
  }
  static clean() {
    Storage.getAll(items => {
      Object.keys(items).forEach(key => {
        chrome.bookmarks.get([key], bookmarks => {
          if (!bookmarks || !bookmarks.length) {
            Storage.remove([key]);
          }
        });
      });
    });
  }
}
