<style lang="stylus">
.shoppingCart
  width 100%
  height 100%

  &__banner
    min-height 100vh
    height 100%
    color #fcfcfc
    position relative
    &:after
      content ''
      background url('../../assets/img/thankyou.jpg') no-repeat center center 
      background-size cover
      opacity: 0.2;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      position: absolute;
      z-index -1
  &__text
    color black
    border-color black 1px solid

</style>
<template>
  <div class="shoppingCart">
    <header>
      <div class="shoppingCart__banner">
        <MainPageHeader :textContent="headerTextContent">
          <Checkout class="shoppingCart__text"/>
        </MainPageHeader>
      </div>
    </header>
    <footer>
      <Footer/>
    </footer>
  </div>
</template>

<script>
import MainPageHeader from "@/components/MainPageHeader";
import Checkout from "@/views/dashboard/Checkout";
import Footer from "@/components/reuse/Footer";
export default {
  components: {
    Checkout,
    MainPageHeader,
    Footer
  },
  props: {},
  data() {
    return {
      headerTextContent: {
        title: "",
        description: ""
      }
    };
  },
  watch: {},
  computed: {},
  created() {},
  mounted() {},
  destroyed() {},
  methods: {}
};
</script>
