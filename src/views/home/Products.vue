<style lang="stylus">
.productpage
  width 100%
  height 100%

  &__banner
    background url('../../assets/img/productBanner.jpg') no-repeat center center
    background-size cover
    min-height 500px
    color #fcfcfc

  &__title
    font-size 24px
    margin 30px 0
    text-align center
</style>
<template>
  <div class="productpage">
    <header>
      <div class="productpage__banner">
        <MainPageHeader :textContent="headerTextContent"/>
      </div>
    </header>
    <h2 class="productpage__title">See What We Have Now!</h2>
    <CustomerOrder/>
    <footer v-if="!isLoading">
      <Footer/>
    </footer>
  </div>
</template>

<script>
import CustomerOrder from "@/views/dashboard/CustomerOrder";
import MainPageHeader from "@/components/MainPageHeader";
import Footer from "@/components/reuse/Footer";
export default {
  components: {
    CustomerOrder,
    MainPageHeader,
    Footer
  },
  props: {},
  data() {
    return {
      headerTextContent: {
        title: "All About Quality",
        description:
          "Outstanding quality with satisfactory service is all we matter!"
      },
      isLoading: true
    };
  },
  watch: {},
  computed: {},
  created() {
    this.$root.$on("CustomerOrder:Loading", loadingStatus => {
      this.$set(this, "isLoading", loadingStatus);
    });
  },
  mounted() {},
  destroyed() {
    this.$root.$off("CustomerOrder:Loading");
  },
  methods: {}
};
</script>
