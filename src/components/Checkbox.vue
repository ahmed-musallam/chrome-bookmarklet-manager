<template>
  <label class="container">{{text}}
    <input 
      type="checkbox"
      :checked="checked"
      :value="value"
      @change="change">
    <span class="checkmark"></span>
  </label>
</template>

<script>
export default {
  name: "Checkbox",
  props: ["value", "text"],
  data() {
    return {
      checked: this.value
    };
  },
  methods: {
    change() {
      this.checked = !this.checked;
      this.$emit("input", this.checked);
    }
  }
};
</script>

<style scoped>
/* The container */
.container {
  display: block;
  position: relative;
  padding-left: 2em;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default checkbox */
.container input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom checkbox */
.checkmark {
  position: absolute;
  top: 0;
  left: 0;
  height: 1em;
  width: 1em;
  border: solid #fff 1px;
}

/* Create the checkmark/indicator (hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the checkmark when checked */
.container input:checked ~ .checkmark:after {
  display: block;
}

/* Style the checkmark/indicator */
.container .checkmark:after {
  left: 0.3em;
  top: 0.1em;
  width: 3px;
  height: 6px;
  border: solid #fff;
  border-width: 0 2px 2px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  transform: rotate(45deg);
}
</style>
