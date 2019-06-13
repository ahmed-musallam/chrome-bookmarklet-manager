import Vue from "vue";
export default class DynamicComponent {
  static createAppendComponent(component, config) {
    // new instance
    var ComponentClass = Vue.extend(component);
    var instance = new ComponentClass(config);
    // mont, add to dom and show
    instance.$mount();
    document.body.appendChild(instance.$el);
    return instance;
  }
  static destroyAndRemoveCompoennt(instance) {
    if (!instance) return;
    instance.$destroy();
    instance.$el.parentNode.removeChild(instance.$el);
  }
}
