<template>
  <div class="sidebar">
    <div class="options">
      <label class="container">Show Bookmarklets only
        <input type="checkbox" checked="checked" v-model="sharedState.config.bookmarkletsOnly">
        <span class="checkmark"></span>
      </label>
    </div>
    <Bookmark 
      v-for="bookmark in sharedState.bookmarks"
      :bookmark="bookmark"
      :key="bookmark.id"/>
  </div>
</template>

<script>
import Bookmark from './Bookmark'

export default {
  name: "BookmarkSideBar",
  props: {},
  components: {
    Bookmark
  },
  data () {
    return {
      sharedState: this.$root.$data.sharedState
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.options {
  display: block;
  border: solid #fefefe 1px;
  padding: 1em;
  margin-bottom: 1em;
}

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