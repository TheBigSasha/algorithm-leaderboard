export default {
  methods: {
    download() {
      let image = this.$refs.canvas.toDataURL("image/png");
      this.$emit("generate", image);
    },
  },
};
//Thanks https://github.com/apertureless/npm-stats/blob/develop/src/mixins/Printable.js
