<style lang="stylus">
.background-mask
  &[data-color-type='default']
    background-color rgba(0, 0, 0, 0)

  &[data-color-type='dark']
    background-color rgba(0, 0, 0, 0.3)

  position absolute
  left 0
  top 0
  height 100%
  width 100%
  z-index 100
</style>
<template>
  <div class="background-mask" :data-color-type="colorType"></div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  components: {},
  props: {
    colorType: {
      type: String,
      default: () => {
        return "dark";
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
  methods: {
    ...mapActions(["setPopupComponent"])
  }
};
</script>