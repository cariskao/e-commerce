<style lang="stylus">
.input
  width calc(100% - 40px)
  border-radius 4px
  font-size 14px
  border 1px solid rgba(0, 0, 0, 0.15)
  height 32px
  padding 2px 10px

  &::placeholder
    color #bfbfbf

  &:focus, &:active
    outline none
    border-color $primary-color

  &:hover
    border-color #66cfd2
</style>
<template>
    <input
      class="input"
      :value="value"
      @input="$emit('input',$event.target.value)"
      :placeholder="placeholder"
      type="text"/>
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
    validate: {
      type: String,
      default: ""
    },
    name: {
      type: String,
      default: ""
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