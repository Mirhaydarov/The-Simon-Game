<template>
  <section class="game-info">
    <h2>Round: <span data-round="0">{{ score }}</span></h2>
    <button
      v-show="showStartBtn"
      class="start"
      @click="startGame"
    >Start</button>
    <span
      v-show="showInfo"
      class="info"
    >{{ infoMessage }}</span>
  </section>
</template>

<script>
import { eventEmitter } from '../../main';

export default {
  data() {
    return {
      score: 0,
      infoMessage: '',
      showStartBtn: true,
      showInfo: false,
    };
  },

  methods: {
    startGame() {
      eventEmitter.$emit('startGame');
    },
  },

  created() {
    eventEmitter.$on('viewStartBtn', (payload) => {
      this.showStartBtn = payload;
    });
    eventEmitter.$on('setInfo', ({ show, message = '' }) => {
      this.showInfo = show;
      this.infoMessage = (this.showInfo) ? message : '';
    });
    eventEmitter.$on('setScore', (payload) => {
      this.score = payload;
    });
  },
};
</script>

<style lang="scss" scoped>

.start {
  cursor: pointer;
}

</style>
