<template>
  <main class="simon">
    <ul ref="tileList">
      <li class="red" data-tile="red"></li>
      <li class="blue" data-tile="blue"></li>
      <li class="yellow" data-tile="yellow"></li>
      <li class="green" data-tile="green"></li>
    </ul>
  </main>
</template>

<script>
import { nextStep } from './next-step';

export default {
  props: {
    difficult: {
      type: String,
      required: true,
    },
    info: {
      type: Element,
    },
    startBtn: {
      type: Element,
    },
    soundList: {
      type: Element,
    },
  },

  data() {
    return {
      score: 0,
      level: 0,
      sequence: [],
      humanSequence: [],
    };
  },

  methods: {
    initSimon() {
      const startGame = () => {
        this.startBtn.classList.add('hidden');
        this.info.classList.remove('hidden');
        this.info.textContent = 'Wait for the computer';
      };

      this.$emit('startGame', startGame);
    },
  },

  mounted() {
    this.initSimon();
  },
};
</script>

<style lang="scss" scoped>

.red, .green, .blue, .yellow {
  cursor: pointer;
}

</style>
