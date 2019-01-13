<style lang="stylus">
</style>
<template>
  <el-switch v-model="switchValue" active-text="啟用" inactive-text="停用"></el-switch>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {
      switchValue: true
    };
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
  watch: {
    fullValue(newValue) {
      newValue === 1 ? (this.switchValue = true) : (this.switchValue = false);
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>