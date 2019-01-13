<style lang="stylus">
.side-popup-footer
  border 1
  display flex
  height 50px
  box-shadow -1px 0 6px 0 rgba(197, 197, 197, 0.5)
  justify-content flex-end
  align-items center
  padding 15px 30px
</style>
<template>
  <div class="side-popup-footer">
    <slot></slot>
  </div>
</template>

<script>
import { mapActions } from "vuex";
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
  methods: {
    ...mapActions(["setPopupComponent"]),
    closeSidePopup() {
      this.setPopupComponent("");
    }
  }
};
</script>