<template>
  <section class="game-info">
    <h2>Round: <span data-round="0">{{ score }}</span></h2>
    <button class="start" ref="startBtn" @click="startGame">Start</button>
    <span class="info hidden" ref="info"></span>
  </section>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      required: true,
    },
    startGame: {
      type: Function,
      default: () => {},
    },
  },

  mounted() {
    this.$emit('startBtn', this.$refs.startBtn);
    this.$emit('info', this.$refs.info);
  },
};
</script>

<style lang="scss" scoped>

.start {
  cursor: pointer;
}

</style>
