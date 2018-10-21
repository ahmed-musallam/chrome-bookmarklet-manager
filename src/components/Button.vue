<template>
  <button>
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: "Button",
  data () {
    return {}
  },
}
</script>
<style scoped>
  button {
    background: #34649e;
    color: #fff;
    border: none;
    padding: 1em;
    margin: 0.5em;
    outline: 0;
  }
</style>

