


const BookmarkStore = {
  debug: true,
  state: {
    bookmarks: [],
    currentBookmark: "",
    config: {
      bookmarkletsOnly: true
    }
  }
}

function getBookmarks() {
  chrome.bookmarks.getTree((bookmarks) => {
    BookmarkStore.state.bookmarks = bookmarks[0].children;
  })
}
chrome.bookmarks.onCreated.addListener(getBookmarks)
chrome.bookmarks.onRemoved.addListener(getBookmarks)
chrome.bookmarks.onMoved.addListener(getBookmarks)

getBookmarks()
export default BookmarkStore;