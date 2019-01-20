<style lang="stylus">
.switch-button
  .el-switch__label.is-active
    color #66cfd2
    
</style>
<template>
  <div class="switch-button">
    <el-switch
      v-model="fullValue"
      :active-value="1"
      :inactive-value="0"
      active-text="啟用"
      inactive-text="停用"
      active-color="#27bec2"
    ></el-switch>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    value: {
      type: [Number, String],
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
  watch: {},
  created() {},
  mounted() {},
  methods: {}
};
</script>