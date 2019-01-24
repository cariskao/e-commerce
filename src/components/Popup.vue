<style lang="stylus">
.side-popup-wrapper
  z-index 100

.side-popup
  width 100%
  height 100%
</style>
<template>
  <div class="side-popup-wrapper">
    <component class="side-popup" :is="PopupComponent"></component>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import CreateProductForm from "@/components/form/CreateProductForm.vue";
export default {
  components: { CreateProductForm },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["PopupComponent"])
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {
    this.emptyPopupForm();
  },
  methods: {
    ...mapActions(["setPopupData"]),
    emptyPopupForm() {
      this.setPopupData("");
    }
  }
};
</script>