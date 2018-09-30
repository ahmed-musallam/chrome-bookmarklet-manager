<template>
<div>
    <button
      :class="{'edit' : !isFolder, 'folder' : isFolder, 'bookmark-btn': true }"
      @click="editBookmark">
      <span class="icon">{{ icon }}</span> {{ bookmark.title }}
    </button>
    <div :class="{'open' : open, 'bookmark-children': true }">
      <Bookmark 
        v-if="bookmark.children" 
        v-for="bkmrk in getValidChildren()"
        :key="bkmrk.id"
        :bookmark="bkmrk"/>
    </div>
  </div>
</template>

<script>
import JavascriptUrlParser from '../util/JavascriptUrlParser'
export default {
  name: "Bookmark",
  props: [
    "bookmark"
  ],
  data () {
    return {
      sharedState: this.$root.$data.sharedState,
      isFolder: false,
      open: false
    }
  },
  computed: {
    icon: function () {
      if (this.isFolder) {
        if (this.open) return "◢";
        else return  "◥";
      } 
      else return "🔗";
    }
  },
  // TODO - use active or sth
  mounted () {
    // chrome bookmarks have `url` property omitted
    this.isFolder = this.bookmark && !this.bookmark.hasOwnProperty('url');
  },
  methods: {
    toggleFolder () {
      console.log("toggleFolder")
      this.open = !this.open;
    },
    editBookmark () {
      console.log(this.bookmark)
      if (this.isFolder) {
        this.toggleFolder();
      } else {
        // set global currentBookmark to the selected bookmark
        this.sharedState.currentBookmark = this.bookmark;
      }
    },
    getValidChildren () {
      if (!this.bookmark.children) return;

      if (this.sharedState.config.bookmarkletsOnly) {
        return this.bookmark.children
        .filter(c => !c.hasOwnProperty('url') || JavascriptUrlParser.isValid(c.url) );
      }
      else {
        return this.bookmark.children
      }
      
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.bookmark{
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
  color: #fefefe;
  outline: 0;
  margin-left: 0;
  font-size: 1.1em;
  text-align: left;
  width: calc(100% - 15px);
  padding-left: 0.5em;
  padding-right: 0.5em;
}

.bookmark-btn:not(.folder):hover {
    background: #3f71ae30;
}

.bookmark-btn:not(.folder):focus{
    background: #34649e;
}

.bookmark-btn > .icon {
  font-size: 6px;
  vertical-align: middle;
  width: 15px;
  display: inline-block;
}

.no-padding {
    padding: 0;
}

.bookmark-toggle.folder {
  cursor: pointer;
}

</style>
