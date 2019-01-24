<style lang="stylus">
@import '../assets/style/_base.styl'

.modal-header
  width 100%
  height 50px
  color $primary-color
  text-align center

.modal-body
  margin-bottom 10px
  height calc(100% - 50px)

.modal-default-button
  float right

.modal-enter
  opacity 0

.modal-leave-active
  opacity 0

.modal-enter .modal-container, .modal-leave-active .modal-container
  transform scale(1.1)
</style>
<template>
  <div>
    <div class="modal-header">
      <slot name="header">default header</slot>
    </div>

    <div class="modal-body">
      <slot name="body">default body</slot>
    </div>

    <div class="modal-footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
export default {
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