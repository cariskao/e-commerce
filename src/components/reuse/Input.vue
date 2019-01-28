<style lang="stylus">
@import '../../assets/style/_base.styl'

.input
  width calc(100% - 20px)
  border-radius 4px
  font-size 14px
  border 1px solid rgba(0, 0, 0, 0.15)
  height 32px
  padding 2px 10px
  margin-top 5px

  &::placeholder
    color #bfbfbf

  &:focus, &:active
    outline none
    border-color $primary-color

  &:hover
    border-color #66cfd2

input[type='number']::-webkit-outer-spin-button, input[type='number']::-webkit-inner-spin-button
  -webkit-appearance none
  margin 0
</style>
<template>
  <input
    class="input"
    :value="value"
    @input="$emit('input',$event.target.value)"
    :placeholder="placeholder"
    :type="type"
  >
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: [String, Number],
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
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