<template>
  <section class="game-info">
    <h2>Round: <span data-round="0">{{ score }}</span></h2>
    <button
      v-show="showStartBtn"
      class="start" ref="startBtn"
      @click="startGame"
    >Start</button>
    <span
      v-show="showInfo"
      class="info"
      ref="info"
    >{{ infoMessage }}</span>
  </section>
</template>

<script>
import { eventEmitter } from '../../main';

export default {
  props: {
    score: {
      type: Number,
      required: true,
    },
  },

  data() {
    return {
      showStartBtn: true,
      showInfo: false,
      infoMessage: '',
    };
  },

  methods: {
    startGame() {
      eventEmitter.$emit('startGames');
    },
  },

  created() {
    eventEmitter.$on('hideStartBtn', () => {
      this.showStartBtn = !this.showStartBtn;
    });
    eventEmitter.$on('showInfo', (payload) => {
      this.showInfo = !this.showInfo;
      this.infoMessage = (this.showInfo) ? payload : '';
    });
  },
};
</script>

<style lang="scss" scoped>

.start {
  cursor: pointer;
}

</style>
