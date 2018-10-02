<template>
  <div class="options">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Options"
};
</script>

<style scoped>
.options {
  display: block;
  border: solid #fefefe 1px;
  padding: 0.5em;
  margin-bottom: 1em;
}
</style>
