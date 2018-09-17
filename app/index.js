import { h, app } from 'hyperapp';
import MonacoEditor from "./components/monaco-editor"
import Bookmarks from "./components/bookmarks"
import Split from "split.js"
import EventBus from "./util/EventBus"
import "./css/main.css"

const state = {
  title: "hi there",
  bookmarks: {},
};
const actions = {
  split(el) {
    const children = el.children;
    Split([children[0], children[1]], {
      gutterSize: 10,
      cursor: 'col-resize',
      // TODO: optimize this.
      onDrag: function(){ EventBus.post('split-drag') }
    });
    EventBus.post('split-done')
  },
  getBookmarks: value => (state, actions) => {
    chrome.bookmarks.getTree(function(marks){
      console.log("chrome has ", Object.assign({}, marks))
      actions.setBookmarks(marks)
      console.log("state bookmarks", state.bookmarks);
    })
  },
  setBookmarks: value => state => ({bookmarks: value}),
  toggleBookmark: bookmark => state => { 
    if(bookmark.open === undefined) {
      bookmark.open = false
    } else  bookmark.open = !bookmark.open
    return {bookmarks: state.bookmarks}
  },
  saveBookmark: bookmark => state => {
    return {bookmarks: state.bookmarks}
  },
  init: value => (state, actions) => {
    actions.getBookmarks();
    chrome.bookmarks.onCreated.addListener(actions.getBookmarks)
    chrome.bookmarks.onRemoved.addListener(actions.getBookmarks)
    chrome.bookmarks.onMoved.addListener(actions.getBookmarks)
    EventBus.subscribe('toggle-bookmark', function(bookmark){
      actions.toggleBookmark(bookmark)
    })
    EventBus.subscribe('save-bookmark', function(bookmark){
      console.log("subscribe save-bookmark", bookmark)
      actions.saveBookmark(bookmark)
      chrome.bookmarks.update(bookmark.id, {url: bookmark.url}, function(){
        console.log("updated!") // do not remove
      })
    })
  },
};

const view = (state, actions) => (
  <main oncreate={el => actions.split(el)}>
    <div id="bookmarks-container" class="split split-horizontal">
      <div class="split content">
      <Bookmarks bookmarks={state.bookmarks}/>
      </div>
    </div>
    <div id="editor-container" class="split split-horizontal">
      <div class="split content">
        <MonacoEditor appActions={actions}/>
      </div>
    </div>
  </main>
)

const main = app(state, actions, view, document.body);
main.init()
console.log(main)