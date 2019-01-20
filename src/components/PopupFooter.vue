<style lang="stylus">
.side-popup-footer
  display flex
  height 50px
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