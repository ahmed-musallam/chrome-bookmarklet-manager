<template>
  <dialog ref="dialog">
      <h3>Are you sure you want to remove the bookmaklet: <i>{{name}}</i>?</h3>
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
    name: "",
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
</style>
