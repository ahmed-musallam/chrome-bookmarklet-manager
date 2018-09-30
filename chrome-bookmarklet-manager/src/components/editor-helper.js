const DEFAULT_VALUE =
  `function sayHi() {
  console.log("Hello world!");
}`;
export default class EditorHelper {
  /**
   * Set worker urls
   */
  static initWorkerUrls () {
    self.MonacoEnvironment = {
      getWorkerUrl: function(moduleId, label) {
        if (label === "json") {
          return "./app/json.worker.js";
        }
        if (label === "css") {
          return "./app/css.worker.js";
        }
        if (label === "html") {
          return "./app/html.worker.js";
        }
        if (label === "typescript" || label === "javascript") {
          return "./app/ts.worker.js";
        }
        return "./app/editor.worker.js";
      }
    };
  }
  static getConfig () {
    return {
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
    }
  }
}