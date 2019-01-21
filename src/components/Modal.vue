<style lang="stylus">
.modal-wrapper
  width 100%
  padding-top 10%

.modal-container
  width 500px
  height 500px
  display flex
  align-items center
  flex-direction column
  margin 0px auto
  padding 20px 30px
  background-color #fff
  border-radius 2px
  box-shadow 0 2px 8px rgba(0, 0, 0, 0.33)
  transition all 0.3s ease
  font-family Helvetica, Arial, sans-serif

.modal-header h3
  margin-top 0
  color #42b983

.modal-body
  margin 20px 0

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
  <transition name="modal">
    <BackgroundMask>
      <div class="modal-wrapper">
        <div class="modal-container">
          <div class="modal-header">
            <slot name="header">default header</slot>
          </div>

          <div class="modal-body">
            <slot name="body">default body</slot>
          </div>

          <div class="modal-footer">
            <slot name="footer">
              default footer
              <button class="modal-default-button" @click="$emit('close')">OK</button>
            </slot>
          </div>
        </div>
      </div>
    </BackgroundMask>
  </transition>
</template>
<script>
import BackgroundMask from "@/components/reuse/BackgroundMask";
export default {
  components: { BackgroundMask },
  props: {
    value: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  computed: {
    fullValue: {
      get() {
        return this.value;
      },
      set(newValue) {
        this.$emit("input", newValue);
      }
    }
  },
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>