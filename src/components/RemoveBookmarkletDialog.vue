<template>
  <dialog ref="dialog">
    <h3>
      Are you sure you want to remove the bookmaklet: <i>{{ name }}</i
      >?
    </h3>
    <menu>
      <button @click="no">no</button>
      <button @click="yes">yes</button>
    </menu>
  </dialog>
</template>

<script>
export default {
  name: "remove-bookmarklet-dialog",
  data: () => ({
    name: null,
    delete: false
  }),
  methods: {
    showDialog() {
      this.$refs.dialog.showModal();
    },
    no() {
      this.delete = false;
      this.close();
    },
    yes() {
      this.delete = true;
      this.close();
    },
    close() {
      this.$refs.dialog.close();
      this.$refs.dialog.dispatchEvent(new Event("remove-dialog-closed"));
    },
    getDelete() {
      return this.delete;
    }
  }
};
</script>
<style scoped>
dialog {
  top: 20%;
  color: #d4d4d4;
  background: #2e5a8d;
  box-shadow: black 0px 0px 15px;
  border: 0;
  min-width: 400px;
  padding: 2em 2em;
}

dialog label {
  font-size: 2em;
  display: block;
}

dialog input {
  padding: 0.25em;
  font-size: 1.5em;
  background-color: #1a1a1a;
  color: #d4d4d4;
  border: 0;
  line-height: 1.5em;
  outline: none;
  width: 100%;
}
dialog menu {
  float: right;
  height: 2em;
}

dialog menu button {
  color: #d4d4d4;
  background: #1a1a1a;
  border: none;
  padding: 1em;
  outline: 0;
  float: right;
  margin: 0.25em;
}

dialog menu button:hover {
  box-shadow: inset 0px 0px 0px 1px #d4d4d4;
}
</style>
