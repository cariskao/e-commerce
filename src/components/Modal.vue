<style lang="stylus">
@import '../assets/style/_base.styl'

.modal-wrapper
  width 100%
  padding-top 10%

.modal-container
  width 500px
  height auto
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

.modal
  width 100%
</style>
<template>
  <transition name="modal">
    <BackgroundMask>
      <div class="modal-wrapper">
        <div class="modal-container">
          <component class="modal" :is="modal"></component>
        </div>
      </div>
    </BackgroundMask>
  </transition>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import BackgroundMask from "@/components/reuse/BackgroundMask";
import CardModal from "@/components/form/CardModal";
import CartModal from "@/components/form/CartModal";
export default {
  components: { BackgroundMask, CardModal, CartModal },
  props: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["modal"])
  },
  watch: {},
  created() {},
  mounted() {},
  destroyed() {
    this.emptyModalForm();
  },
  methods: {
    ...mapActions(["setModalData"]),
    emptyModalForm() {
      this.setModalData("");
    }
  }
};
</script>