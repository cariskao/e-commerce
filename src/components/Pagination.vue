<style lang="stylus">
</style>
<template>
  <div class="block">
    <el-pagination
      v-model="fullValue"
      @current-change="changePage"
      :page-size="10"
      layout="total, prev, pager, next"
      :page-count="fullValue.total_pages"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
export default {
  components: {},
  props: {
    value: {
      type: Object,
      default: () => {
        return {};
      }
    },
    changePage: {
      type: Function,
      default: () => {
        return "";
      }
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
  destroyed() {},
  methods: {
    handleCurrentChange(val) {
      this.$emit("pagination:onChangePage", val);
    }
  }
};
</script>