<style lang="stylus">
@import '../assets/style/_base.styl'

.text-area
  width 100%

  .el-textarea__inner:focus
    border-color #66cfd2
</style>
<template>
  <div class="text-area">
    <el-input v-model="fullValue" :readonly="readonly" type="textarea" :rows="rowHeight"></el-input>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: String,
      default: () => {
        return "";
      }
    },
    readonly: {
      type: Boolean,
      default: () => {
        return false;
      }
    },
    rowHeight: {
      type: Number,
      default: () => {
        return 2;
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
  methods: {}
};
</script>