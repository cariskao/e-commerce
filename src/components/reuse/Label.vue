<style lang="stylus">
.label
  display inline-block
  font-size rem(14px)
  width 100%
  font-weight 600

  label
    &[data-required='true']
      &:before
        content '*'
        font-size rem(14px)
        color #ff7384
</style>
<template>
  <div class="label">
    <label :for="forName" :data-required="dataRequired">{{labelName}}</label>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    forName: {
      type: String,
      default: () => {
        return "";
      }
    },
    labelName: {
      type: String,
      default: () => {
        return "";
      }
    },
    dataRequired: {
      type: Boolean,
      default: () => {
        return false;
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
  methods: {}
};
</script>