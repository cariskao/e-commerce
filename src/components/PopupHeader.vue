<style lang="stylus">
  .side-popup-header
    display flex
    justify-content space-between
    font-size 18px
    padding 15px 10px 15px 30px
    height 50px
    background-color #27bec2
    border 1px solid #27bec2
    color #ffffff
    font-weight 500

    &__cross
      cursor pointer
</style>

<template>
  <div class="side-popup-header">
    <div class="side-popup-header__name">
      <slot></slot>
    </div>
    <div class="side-popup-header__cross">
      <i class="el-icon-close" @click.stop.prevent="setPopupComponent('')"></i>
    </div>
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
    ...mapActions(["setPopupComponent"])
  }
};
</script>