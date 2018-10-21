<template>
  <div>
  <!--
    <Options>
      <Checkbox 
        v-model="sharedState.config.bookmarkletsOnly"
        text="Show Bookmarklets only"
      />
    </Options>
  -->
    <h2>Bookmarklets</h2>
    <Bookmark 
      v-for="bookmark in sharedState.bookmarks"
      :bookmark="bookmark"
      :key="bookmark.id"/>
  </div>
</template>

<script>
import Bookmark from './Bookmark'
import Checkbox from './Checkbox'
import Options from './Options'

export default {
  name: "BookmarkSideBar",
  props: {},
  components: {
    Bookmark,
    Checkbox,
    Options
  },
  data () {
    return {
      sharedState: this.$root.$data.sharedState
    }
  }
};
</script>

<style scoped>
  h2 {
    margin-top: 0;
    margin-bottom: 0.25em;
  }
</style>