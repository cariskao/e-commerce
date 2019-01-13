<style lang="stylus">
.side-popup-content
  height calc(100% - 210px)
  overflow-y auto
  padding 20px 30px
  box-shadow -1px 0 6px 0 rgba(197, 197, 197, 0.5)
  &::-webkit-scrollbar
    display none

</style>
<template>
<div class="side-popup-content">
  <slot></slot>
</div>
</template>

<script>
export default {
  components: {},
  props: {},
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>