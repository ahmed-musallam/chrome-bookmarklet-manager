
import { h } from "hyperapp"
import EventBus from "../util/EventBus"
import JavascriptUrlParser from "../util/JavascriptUrlParser"


const state = {}

const actions = {
  toggle(bookmark) {
    if(!actions.isFolder(bookmark)) return;
    EventBus.post("toggle-bookmark", bookmark)
  },
  edit(bookmark) {
    if(actions.isFolder(bookmark)) return;
    EventBus.post("edit-bookmark", bookmark)
  },
  isFolder(bookmark){
    return bookmark.children && bookmark.children.length;
  },
  isOpen(bookmark){
    if (bookmark.open === undefined){
      return true
    } else return bookmark.open
  }
}

const Bookmark = (bookmark) => (_state, _actions) => (
  <div>
    <button
      className={actions.isFolder(bookmark) ? "bookmark-btn toggle folder": "bookmark-btn toggle"}
      onclick={e => actions.toggle(bookmark)}
    >
      {() => {
        if (!actions.isFolder(bookmark)){
          return ""
        }
        else return actions.isOpen(bookmark) ? "-" : "+"
      }}
    </button>
    <button
      className={actions.isFolder(bookmark) ? "bookmark-btn": "bookmark-btn edit"}
      disabled={actions.isFolder(bookmark)}
      onclick={e => actions.edit(bookmark)}
    >
      {bookmark.title}
    </button>
    <div className={actions.isOpen(bookmark) ? "bookmark-children open" : "bookmark-children"}>
      {
        bookmark.children
        ? bookmark.children
            .filter(c => !c.url || JavascriptUrlParser.isValid(c.url))
            .map((child) => Bookmark(child))
        : ""
      }
    </div>
  </div>
)


const Bookmarks = ({bookmarks}) => (_state, _actions) => (
  <div class="sidebar">
  { () => {
    console.log("got bookmarks ", bookmarks)
  }}

  { 
    Object.keys(bookmarks)
          .map(key => Bookmark(bookmarks[key]))
  }
  </div>
)
export default Bookmarks