<template>
  <main class="simon" @click="handleClick($event.target)">
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
      totalLevels: 35,
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
    activeTileAfterClick(tileList, tiles) {
      const tile = filterTile(tileList, tiles);
      tile.classList.add('active');

      setTimeout(() => {
        tile.classList.remove('active');
      }, 100);
    },
    handleClick(target) {
      if (this.score === 0) return;

      const { tile } = target.dataset;

      const index = this.humanSequence.push(tile) - 1;
      this.activeTileAfterClick(this.$refs.tileList, tile);

      const sound = filterSound(this.soundList, tile);
      playSound(sound);

      const remainingTaps = this.sequence.length - this.humanSequence.length;

      if (this.gameOver(this.humanSequence, this.sequence, index)) return;

      if (this.humanSequence.length === this.sequence.length) {
        if (this.endGame(this.humanSequence)) return;

        this.humanSequence = [];
        this.info.textContent = 'Success! Keep going!';

        setTimeout(() => {
          this.nextRound();
        }, 1000);
        return;
      }

      showTotalTurn(remainingTaps)(this.info);
    },
    endGame(humanSequence) {
      if (humanSequence.length === this.totalLevels) {
        return this.resetGame(`Congrats! You completed all ${this.totalLevels} levels`);
      }
      return false;
    },
    gameOver(humanSequence, sequence, index) {
      if (humanSequence[index] !== sequence[index]) {
        return this.resetGame('Oops! Game over');
      }
      return false;
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
