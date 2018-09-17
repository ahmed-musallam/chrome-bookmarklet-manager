import { h } from "hyperapp"
import * as monaco from "monaco-editor";
import EventBus from "../util/EventBus"
import JavascriptUrlParser from "../util/JavascriptUrlParser"

self.MonacoEnvironment = {
  getWorkerUrl: function (moduleId, label) {
    if (label === 'json') {
      return './app/json.worker.js';
    }
    if (label === 'css') {
      return './app/css.worker.js';
    }
    if (label === 'html') {
      return './app/html.worker.js';
    }
    if (label === 'typescript' || label === 'javascript') {
      return './app/ts.worker.js';
    }
    return './app/editor.worker.js';
  }
}

const state = {
  editor: null,
  bookmark: null
}

const DEFAULT_VALUE =
  `function sayHi() {
  console.log("Hello world!");
}`;

const actions = {
  initEditor(el) {
    state.editor = monaco.editor.create(el, {
      value: DEFAULT_VALUE,
      language: 'javascript',
      theme: "vs-dark",
      minimap: {
        enabled: false
      },
      codeLens: false,
      hover: {
        enabled: false
      },
      dragAndDrop: false
    });
    // add overlay widget might not need it.
    state.editor.addOverlayWidget({
      getDomNode(){
        var btn = document.createElement('button');
        btn.innerHTML = "Save";
        btn.onclick = function() {
          var script = state.editor.getValue();
          var encoded = JavascriptUrlParser.encode(script)
          state.bookmark.url = encoded
          console.log("posting save-bookmark", state.bookmark)
          EventBus.post('save-bookmark', state.bookmark)
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
    EventBus.subscribe("edit-bookmark", (bookmark) => {
      state.bookmark = bookmark;
      let script = JavascriptUrlParser.decode(bookmark.url)
      state.editor.setValue(script)
    })
  },
  layout() {
    state.editor.layout();
  }
}
// fix editor layout on page resize.
// TODO: optimize this.
window.addEventListener("resize", actions.layout);

const MonacoEditor = () => (_state, _actions) => (
  <div
    class="editor"
    oncreate={el => {
      actions.initEditor(el);
      EventBus.subscribe('split-drag', actions.layout);
      EventBus.subscribe('split-done', actions.layout);
    }}
  />
)
export default MonacoEditor