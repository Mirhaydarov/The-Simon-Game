<template>
  <main class="simon" @click="handleClick($event.target)">
    <ul ref="tileList">
      <li
        v-for="{ className, data } of tileList"
        :key="data"
        :class="className"
        :data-tile="data"
      ></li>
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

import { eventEmitter } from '../../main';

export default {
  props: {
    soundList: {
      type: Element,
    },
  },

  data() {
    return {
      tileList: [
        { className: 'red', data: 'red' },
        { className: 'blue', data: 'blue' },
        { className: 'yellow', data: 'yellow' },
        { className: 'green', data: 'green' },
      ],
      score: 0,
      level: 0,
      sequence: [],
      humanSequence: [],
      totalLevels: 35,
      difficult: 'normal',
      info: null,
      startBtn: null,
    };
  },

  methods: {
    resetGame(text) {
      alert(text);
      this.sequence = [];
      this.humanSequence = [];
      this.level = 0;
      this.score = 0;

      this.viewStartBtn();
      this.setInfo('');
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
      console.log('handleClick -> index', this.humanSequence);
      console.log('handleClick -> index', index);
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
    setScore(value) {
      eventEmitter.$emit('score', value);
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
      this.setScore(this.score);
      this.setInfo('Wait for the computer');

      const nextSequence = [...this.sequence];
      nextSequence.push(nextStep());
      playRound(nextSequence, this.activateTile, this.difficult);
      this.sequence = [...nextSequence];

      setTimeout(() => {
        this.humanTurn(this.level);
      }, this.level * sum(this.difficult, 1100) + sum(this.difficult, 1100));
    },
    setInfo(message) {
      eventEmitter.$emit('showInfo', message);
    },
    viewStartBtn() {
      eventEmitter.$emit('hideStartBtn');
    },
  },

  created() {
    eventEmitter.$on('startGames', () => {
      this.viewStartBtn();
      this.setInfo('Wait for the computer');
      this.nextRound();
    });
    eventEmitter.$on('difficult', (payload) => {
      this.difficult = payload;
    });
  },

  watch: {
    score(scoreEqualZero) {
      if (this.endGame || this.gameOver) this.setScore(scoreEqualZero);
    },
  },
};
</script>

<style lang="scss" scoped>

.red, .green, .blue, .yellow {
  cursor: pointer;
}

</style>
