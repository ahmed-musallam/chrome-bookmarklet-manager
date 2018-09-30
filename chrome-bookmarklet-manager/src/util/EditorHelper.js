/**
 * A few helpers for editor... the Editor component was getting too large :)
 */
import * as monaco from 'monaco-editor';

export default class EditorHelper {
  /**
   * Set worker urls.
   * Those are particularly set this way since that's where webpack outputs them in the extension
   */
  static initWorkerUrls () {
    const PREFIX = "./app/";
    self.MonacoEnvironment = {
      getWorkerUrl: function(moduleId, label) {
        if (label === "json") {
          return PREFIX + "json.worker.js";
        }
        if (label === "css") {
          return PREFIX + "css.worker.js";
        }
        if (label === "html") {
          return PREFIX + "html.worker.js";
        }
        if (label === "typescript" || label === "javascript") {
          return PREFIX + "ts.worker.js";
        }
        return PREFIX + "editor.worker.js";
      }
    };
  }
  /**
   * Default editor configs
   */
  static getConfig () {
    return {
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
    }
  }
  static create (el) {
    return monaco.editor.create(el, EditorHelper.getConfig())
  }
  /**
   * Add an overlay button to the editor
   * @param {*} editor 
   * @param {*} options
   * {
   *  text: 'the button text',
   *  onClick: () => (), // the click handler
   *  id: 'id' // the id
   * }
   */
  static addBtn (editor, options) {
    editor.addOverlayWidget({
      getDomNode: () => {
        var btn = document.createElement('button');
        btn.innerHTML = options.text;
        btn.onclick = options.onClick
        return btn;
      },
      getId(){
        return options.id
      },
      getPosition(){
        return {
          preference: 0
        }
      }
    })
  }
}