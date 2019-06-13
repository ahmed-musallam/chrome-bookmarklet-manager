<template>
  <div>
    <button
      class="bookmark-btn"
      :class="{ edit: !isFolder, folder: isFolder, focus: isSelected }"
      @click="editBookmark"
    >
      <span class="icon" :class="{ larger: isBookmarklet }">{{ icon }}</span>
      {{ bookmark.title }}
      <div class="actions">
        <button v-if="isFolder" @click.stop="addBookmarklet">+</button>
        <button v-if="!isFolder" @click.stop="removeBookmarklet">⌫</button>
      </div>
    </button>
    <div
      v-if="bookmark.children"
      :class="{ open: open, 'bookmark-children': true }"
    >
      <Bookmark
        v-for="bkmrk in getValidChildren()"
        :key="bkmrk.id"
        :bookmark="bkmrk"
      />
    </div>
  </div>
</template>

<script>
import JavascriptUrlParser from "../util/JavascriptUrlParser";
import DynamicComponent from "../util/DynamicComponent";
import Storage from "../util/Storage";
import AddBookmarkletDialog from "./AddBookmarkletDialog";
import RemoveBookmarkletDialog from "./RemoveBookmarkletDialog";
import pEvent from "p-event";

export default {
  name: "Bookmark",
  props: ["bookmark"],
  data() {
    return {
      sharedState: this.$root.$data.sharedState,
      isFolder: false,
      open: false,
      isBookmarklet: false
    };
  },
  computed: {
    icon() {
      let icon = "";
      if (this.isFolder) {
        icon = this.open ? "◢" : "◥";
      } else {
        icon = this.isBookmarklet ? "JS" : "🔗";
      }
      return icon;
    },
    isSelected() {
      if (this.isFolder) return false;
      else return this.sharedState.currentBookmark.url === this.bookmark.url;
    }
  },
  mounted() {
    // chrome bookmark folders have `url` property omitted
    this.isFolder = this.bookmark && !this.bookmark.hasOwnProperty("url");
    this.isBookmarklet =
      !this.isFolder && JavascriptUrlParser.isValid(this.bookmark.url);
    // get stored bookmark state
    Storage.get(this.bookmark.id, item => {
      this.open = item[this.bookmark.id];
    });
  },
  methods: {
    /**
     * Open/Close folder
     */
    toggleFolder() {
      this.open = !this.open;
      Storage.set({
        [this.bookmark.id]: this.open
      });
    },
    /**
     * handles bookmark click. If folder, toggle it. if not edit it.
     */
    editBookmark() {
      if (this.isFolder) {
        this.toggleFolder();
      } else {
        // set global currentBookmark to the selected bookmark
        // yes, yes... mutating a shared global state. This app is simple enough, that I don't care :)
        this.sharedState.currentBookmark = this.bookmark;
      }
    },
    getValidChildren() {
      if (!this.bookmark.children) return;

      if (this.sharedState.config.bookmarkletsOnly) {
        return this.bookmark.children.filter(
          c => !c.hasOwnProperty("url") || JavascriptUrlParser.isValid(c.url)
        );
      } else {
        return this.bookmark.children;
      }
    },
    async promptToAddBookmarklet() {
      const instance = DynamicComponent.createAppendComponent(
        AddBookmarkletDialog
      );
      instance.showDialog();
      // wait for dialog-ready event which the dialog component will emit
      await pEvent(instance.$el, "add-dialog-closed");
      const title = instance.getTitle();
      // destroy and remove
      DynamicComponent.destroyAndRemoveCompoennt(instance);
      // return the name
      return title;
    },
    async promptToRemoveBookmarklet() {
      const instance = DynamicComponent.createAppendComponent(
        RemoveBookmarkletDialog,
        { data: { name: this.bookmark.title } }
      );
      instance.showDialog();
      // wait for dialog-ready event which the dialog component will emit
      await pEvent(instance.$el, "remove-dialog-closed");
      const del = instance.getDelete();
      // destroy and remove
      DynamicComponent.destroyAndRemoveCompoennt(instance);
      // return the name
      return del;
    },
    removeBookmarklet() {
      this.promptToRemoveBookmarklet().then(del => {
        if (del) {
          console.log("Deleting bookmark ", this.bookmark);
          chrome.bookmarks.remove(this.bookmark.id, () =>
            console.log("Deleted!")
          );
        } else console.log("Nothing was deleted.");
      });
    },
    addBookmarklet() {
      this.promptToAddBookmarklet().then(title => {
        if (!title) return;
        console.log(
          `creating bookmark with name: ${title} under bookmark`,
          this.bookmark
        );
        chrome.bookmarks.create(
          {
            parentId: this.bookmark.id,
            title: title,
            url: "javascript:"
          },
          b => console.log("Created", b)
        );
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bookmark {
  display: block;
  background: none;
  color: #d4d2cd;
  margin: 3px 0;
  outline: 0;
}
.bookmark-children {
  margin-left: 1em;
  display: none;
}
.bookmark-children.open {
  display: block;
}
.bookmark-btn {
  background: none;
  float: left;
  border: none;
  color: #d4d4d4;
  outline: 0;
  margin-left: 0;
  font-size: 1.1em;
  text-align: left;
  width: calc(100% - 15px);
  padding-left: 0.5em;
  padding-right: 0.5em;
  margin: 0.1em 0px;
  position: relative;
}

.bookmark-btn:hover {
  background: #3f71ae30;
}

.bookmark-btn:not(.folder):focus,
.bookmark-btn.focus:not(.folder) {
  background: #34649e;
}

.bookmark-btn > .icon {
  font-size: 6px;
  vertical-align: middle;
  width: 15px;
  display: inline-block;
}
.bookmark-btn > .icon.larger {
  font-size: 9px;
}
.no-padding {
  padding: 0;
}

.bookmark-toggle.folder {
  cursor: pointer;
}
/* Folder Actions */
.actions {
  display: none;
  position: absolute;
  right: 0;
  top: 0;
}
.actions button {
  background: #0000;
  color: #fff;
  border: none;
  font-size: 1.1em;
  outline: none;
}
.actions button:hover {
  background: #34649e;
}
.bookmark-btn.focus .actions button:hover {
  background: #1d1d1d;
}
.bookmark-btn:hover .actions {
  display: block;
}
</style>
