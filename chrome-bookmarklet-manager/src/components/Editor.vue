<template>
  <div class="editor" id="editor"></div>
</template>

<script>
import * as monaco from 'monaco-editor';
import EditorHelper from './editor-helper'
import JavascriptUrlParser from '../util/JavascriptUrlParser'

EditorHelper.initWorkerUrls();


export default {
  name: "Editor",
  data () {
    return {
      sharedState: this.$root.$data.sharedState
    }
  },
  mounted () {
    this.$root.$watch("sharedState.currentBookmark", (newVal) => {
      this.editor.setValue(JavascriptUrlParser.decode(newVal.url))
    },{
      deep: true
    })
  },
  methods: {
    init () {
      this.editor = monaco.editor.create(this.$el, EditorHelper.getConfig())
      // add overlay widget might not need it.
      this.addSaveBtn()
    },
    layout () {
      this.editor.layout()
    },
    addSaveBtn () {
      this.editor.addOverlayWidget({
        getDomNode: () => {
          var btn = document.createElement('button');
          btn.innerHTML = "Save";
          btn.onclick = () => {
            var script = this.editor.getValue();
            var encoded = JavascriptUrlParser.encode(script)
            //state.bookmark.url = encoded
            this.$emit('save', encoded)
          }
          return btn;
        },
        getId(){
          return 'save-btn'
        },
        getPosition(){
          return {
            preference: 0
          }
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
