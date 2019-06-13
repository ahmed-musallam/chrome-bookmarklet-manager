<template>
  <main id="app">
    <div id="bookmarks-container" class="split split-horizontal">
      <div class="split content no-padding">
      <BookmarkSideBar/>
      </div>
    </div>
    <div id="editor-container" class="split split-horizontal">
      <div class="split content">
        <Editor ref="editor"/>
      </div>
    </div>
  </main>

</template>

<script>
import Editor from "./components/Editor.vue";
import BookmarkSideBar from "./components/BookmarkSideBar";
import Split from "split.js";
import AddBookmarkletDialog from "./components/AddBookmarkletDialog";

export default {
  name: "app",
  components: {
    Editor,
    BookmarkSideBar,
    AddBookmarkletDialog
  },
  data() {
    return {
      sharedState: this.$root.$data.sharedState
    };
  },
  methods: {
    getEditor() {
      return this.$refs.editor;
    },
    initEditor() {
      this.getEditor().init();
    },
    layoutEditor() {
      this.getEditor().layout();
    },
    /**
     * Use Split.js to show split View
     */
    split() {
      // split view of the first direct children of root element of this component
      const children = this.$el.children;
      Split([children[0], children[1]], {
        sizes: [25, 75],
        gutterSize: 10,
        cursor: "col-resize",
        // TODO: optimize this.
        onDrag: () => {
          this.layoutEditor();
        }
      });
    }
  },
  /**
   * Component is rendered, call split and initialize editor
   */
  mounted() {
    this.split();
    this.initEditor();
  }
};
</script>

<style>
/* Split.js styles */
html,
body,
main {
  height: 100%;
  margin: 0;
}

body {
  padding: 8px;
  background-color: #1e1e1e;
  box-sizing: border-box;
}
.split {
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  overflow-y: auto;
  overflow-x: hidden;
}

.content {
  border: 1px solid #848484;
  color: #d4d2cd;
  height: 100%;
  padding: 1em;
}

.gutter {
  background-color: transparent;
  background-repeat: no-repeat;
  background-position: 50%;
}

.gutter.gutter-vertical {
  cursor: row-resize;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAFAQMAAABo7865AAAABlBMVEVHcEzMzMzyAv2sAAAAAXRSTlMAQObYZgAAABBJREFUeF5jOAMEEAIEEFwAn3kMwcB6I2AAAAAASUVORK5CYII=");
}

.gutter.gutter-horizontal {
  cursor: col-resize;
  background-image: url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAeCAYAAADkftS9AAAAIklEQVQoU2M4c+bMfxAGAgYYmwGrIIiDjrELjpo5aiZeMwF+yNnOs5KSvgAAAABJRU5ErkJggg==");
}

.split.split-horizontal,
.gutter.gutter-horizontal {
  height: 100%;
  float: left;
}
</style>
