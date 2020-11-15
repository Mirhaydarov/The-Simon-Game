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
import { sum } from './sum';
import { nextStep } from './next-step';
import { playRound } from './play-round';
import { playSound } from './play-sound';
import { filterTile } from './filter-tile';
import { filterSound } from './filter-sound';
import { showTotalTurn } from './show-total-turn';

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
    resetGame(text) {
      alert(text);
      this.sequence = [];
      this.humanSequence = [];
      this.level = 0;
      this.score = 0;

      this.startBtn.classList.remove('hidden');
      this.info.classList.add('hidden');
      return true;
    },
    emitScore() {
      return this.$emit('score', this.score);
    },
    activateTile(color) {
      const tile = filterTile(this.$refs.tileList, color);
      const sound = filterSound(this.soundList, color);

      tile.classList.add('active');
      playSound(sound);

      setTimeout(() => {
        tile.classList.remove('active');
      }, sum(this.difficult, 1000));
    },
    humanTurn(level) {
      showTotalTurn(level)(this.info);
    },
    nextRound() {
      this.level += 1;
      this.score = this.level;
      this.emitScore();
      this.info.textContent = 'Wait for the computer';

      const nextSequence = [...this.sequence];
      nextSequence.push(nextStep());
      playRound(nextSequence, this.activateTile, this.difficult);
      this.sequence = [...nextSequence];

      setTimeout(() => {
        this.humanTurn(this.level);
      }, this.level * sum(this.difficult, 1100) + sum(this.difficult, 1100));
    },
    initSimon() {
      const startGame = () => {
        this.startBtn.classList.add('hidden');
        this.info.classList.remove('hidden');
        this.info.textContent = 'Wait for the computer';
        this.nextRound();
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
