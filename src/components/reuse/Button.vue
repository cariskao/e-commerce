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

  &[data-color-type='small']
    background-color #ffffff
    border-color #66cfd2
    color #66cfd2
    padding 5px
    border-radius 20px
    min-width 60px
    margin 0

    &:hover
      background-color #66cfd2
      border-color #66cfd2
      color #ffffff

    &:focus
      color #ffffff
      border-color #1d8b8f
      background-color #1d8b8f

  &[data-color-type='special']
    color hsla(0, 87%, 69%, 0.7)
    padding 10px
    background-color hsla(0, 87%, 69%, 0.1)
    border-color hsla(0, 87%, 69%, 0.2)

    &:hover
      background-color hsla(0, 87%, 69%, 0.2)
      border-color hsla(0, 87%, 69%, 0.3)
      color hsla(0, 87%, 69%, 0.8)

    &:focus
      background-color rgba(245, 107, 107, 0.4)
      border-color rgba(245, 107, 107, 0.3)
      color rgba(245, 107, 107, 0.9)
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