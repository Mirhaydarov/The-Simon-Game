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

      this.setScore(0);
      this.viewStartBtn(true);
      this.setInfo({ infoBoolean: false, message: '' });
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
        const successMessage = 'Success! Keep going!';

        this.humanSequence = [];
        this.setInfo(successMessage);

        setTimeout(() => {
          this.nextRound();
        }, 1000);
        return;
      }
      this.humanTurn(remainingTaps);
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
    activateTile(color) {
      const tile = filterTile(this.$refs.tileList, color);
      const sound = filterSound(this.soundList, color);

      tile.classList.add('active');
      playSound(sound);

      setTimeout(() => {
        tile.classList.remove('active');
      }, sum(this.difficult, 1000));
    },
    nextRound() {
      this.level += 1;
      this.score = this.level;
      this.setScore(this.score);
      this.setInfo({ infoBoolean: true, message: 'Wait for the computer' });

      const nextSequence = [...this.sequence];
      nextSequence.push(nextStep());
      playRound(nextSequence, this.activateTile, this.difficult);
      this.sequence = [...nextSequence];

      setTimeout(() => {
        this.humanTurn(this.level);
      }, this.level * sum(this.difficult, 1100) + sum(this.difficult, 1100));
    },
    setScore(value) {
      eventEmitter.$emit('score', value);
    },
    humanTurn(level) {
      const message = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
      this.setInfo({ infoBoolean: true, message });
    },
    setInfo(message) {
      eventEmitter.$emit('setInfo', message);
    },
    viewStartBtn(btnBoolean) {
      eventEmitter.$emit('hideStartBtn', btnBoolean);
    },
  },

  created() {
    eventEmitter.$on('startGame', () => {
      this.viewStartBtn(false);
      this.nextRound();
    });
    eventEmitter.$on('difficult', (payload) => {
      this.difficult = payload;
    });
  },
};
</script>

<style lang="scss" scoped>

.red, .green, .blue, .yellow {
  cursor: pointer;
}

</style>
