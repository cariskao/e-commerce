<style lang="stylus">
.button
  display inline-block
  padding 0 20px
  height auto

  &[data-color-type='default']
    background-color #ffffff
    border-color #66cfd2
    color #66cfd2
    padding 10px
    min-width 80px
    margin 0 20px

    &:hover
      background-color #66cfd2
      border-color #66cfd2
      color #ffffff

    &:focus
      color #ffffff
      border-color #1d8b8f
      background-color #1d8b8f
</style>
<template>
  <el-button class="button" :data-color-type="colorType">{{btnName}}</el-button>
</template>

<script>
export default {
  components: {},
  props: {
    colorType: {
      type: String,
      default: () => {
        return "default";
      }
    },
    btnName: {
      type: String,
      default: () => {
        return "新增";
      }
    }
  },
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