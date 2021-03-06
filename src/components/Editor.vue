<template>
  <div class="container">
    <!--
    <Options>
      <Button>
        Save
      </Button>
      <Button>
        New
      </Button>
    </Options>
    -->
    <div class="editor" ref="editor"></div>
  </div>
</template>

<script>
import EditorHelper from "../util/EditorHelper";
// import Storage from '../util/Storage'
import JSParser from "../util/JavascriptUrlParser";
import Options from "./Options";
import Button from "./Button";

export default {
  name: "Editor",
  data() {
    return {
      sharedState: this.$root.$data.sharedState
    };
  },
  components: {
    Options,
    Button
  },
  mounted() {
    /**
     * Watch changes to the currentBookmark and update editor
     */
    this.$root.$watch(
      "sharedState.currentBookmark",
      newVal => {
        this.editor.setValue(JSParser.decode(newVal.url));
      },
      {
        deep: true
      }
    );
  },
  methods: {
    init() {
      // Set worker urls here, before creating an editor
      // EditorHelper.initWorkerUrls();
      this.editor = EditorHelper.create(this.$refs.editor);
      // add overlay widget might not need it.
      this.addSaveBtn();
    },
    layout() {
      this.editor.layout();
    },
    showSuccess() {
      this.$toasted.show("Bookmark Saved!", {
        position: "bottom-right",
        duration: "2000",
        type: "success",
        class: "toast",
        action: {
          text: "dismiss",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        },
        icon: "✓"
      });
    },
    showError() {
      this.$toasted.show("Please Select a Bookmark", {
        position: "bottom-right",
        duration: "2000",
        type: "error",
        class: "toast",
        action: {
          text: "dismiss",
          onClick: (e, toastObject) => {
            toastObject.goAway(0);
          }
        },
        icon: "✘"
      });
    },
    addSaveBtn() {
      EditorHelper.addBtn(this.editor, {
        text: "Save",
        id: "save-btn",
        onClick: () => {
          var script = this.editor.getValue();
          var encoded = JSParser.encode(script);
          if (!this.sharedState.currentBookmark) {
            this.showError();
          } else {
            chrome.bookmarks.update(
              this.sharedState.currentBookmark.id,
              { url: encoded },
              () => {
                this.showSuccess();
              }
            );
          }
        }
      });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.container,
.editor,
.editor > .monaco-editor {
  height: 100%;
  width: 100%;
  overflow: hidden;
}

[widgetid="save-btn"] {
  background: #34649e;
  color: white;
  border: none;
  padding: 1em;
  outline: 0;
}

[widgetid="save-btn"]:active {
  background: #1e3054;
  color: #d4d2cd;
  outline: 0;
}
</style>
