<template>
  <dialog ref="dialog">
    <input v-model="name" type="text"/>
      <menu>
        <button @click="cancel">Cancel</button>
        <button @click="confirm">Confirm</button>
      </menu>
  </dialog>
</template>

<script>
export default {
  name: "add-bookmarklet-dialog",
  data: () => ({
    name: ""
  }),
  methods: {
    showDialog() {
      this.$refs.dialog.showModal();
    },
    cancel() {
      this.name = null; // clear name
      this.close();
    },
    confirm() {
      this.close();
    },
    close() {
      this.$refs.dialog.close();
      this.$refs.dialog.dispatchEvent(new Event("add-dialog-closed"));
    },
    getName() {
      return this.name;
    }
  }
};
</script>
<style scoped>
</style>
