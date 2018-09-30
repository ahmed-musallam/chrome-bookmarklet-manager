<template>
  <div class="editor" id="editor"></div>
</template>

<script>
import EditorHelper from '../util/EditorHelper'
import JSParser  from '../util/JavascriptUrlParser'

export default {
  name: "Editor",
  data () {
    return {
      sharedState: this.$root.$data.sharedState
    }
  },
  mounted () {
    /**
     * Watch changes to the currentBookmark and update editor
     */
    this.$root.$watch("sharedState.currentBookmark", (newVal) => {
      this.editor.setValue(JSParser.decode(newVal.url))
    },{
      deep: true
    })
  },
  methods: {
    init () {
      // Set worker urls here, before creating an editor
      EditorHelper.initWorkerUrls();
      this.editor = EditorHelper.create(this.$el)
      // add overlay widget might not need it.
      this.addSaveBtn()
    },
    layout () {
      this.editor.layout()
    },
    addSaveBtn () {
      EditorHelper.addBtn(this.editor, {
        text: 'Save',
        id: 'save-btn',
        onClick: () => {
          var script = this.editor.getValue();
          var encoded = JSParser.encode(script)
          //state.bookmark.url = encoded
          this.$emit('save', encoded)
        }
      })
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.editor, .editor > .monaco-editor {
  height: 100%;
  width:100%;
  overflow: hidden;
}

[widgetid="save-btn"]{
  background: #34649e;
  color: white;
  border: none;
  padding: 1em;
  outline:0;
}

[widgetid="save-btn"]:active {
  background: #1e3054;
  color: #d4d2cd;
  outline:0;
}
</style>
