<template>
  <main class="simon" @click="handleClick($event.target)">
    <ul ref="tileList">
      <li
        v-for="({ className, data }) of tileList"
        :key="data"
        :class="[className, { 'active': (currentTile === data && isTileActive) }]"
        :data-tile="data"
      ></li>
    </ul>
  </main>
</template>

<script>
import { sum } from './sum';
import { nextStep } from './next-step';
import { playRound } from './play-round';

import { eventEmitter } from '../../main';

export default {
  data() {
    return {
      tileList: [
        { className: 'red', data: 'red' },
        { className: 'blue', data: 'blue' },
        { className: 'yellow', data: 'yellow' },
        { className: 'green', data: 'green' },
      ],
      currentTile: '',
      isTileActive: false,
      score: 0,
      level: 0,
      sequence: [],
      humanSequence: [],
      totalLevels: 35,
      difficult: 'normal',
    };
  },

  methods: {
    resetGame(message) {
      this.viewModal(message);
      this.sequence = [];
      this.humanSequence = [];
      this.level = 0;
      this.score = 0;

      this.setScore(0);
      this.viewStartBtn(true);
      this.setInfo({ show: false });
    },
    activeTileAfterClick(color) {
      this.setTileActive(true, color);

      setTimeout(() => {
        this.setTileActive(false, color);
      }, 100);
    },
    handleClick(target) {
      if (this.score === 0) return;

      const { tile } = target.dataset;

      const index = this.humanSequence.push(tile) - 1;

      this.activeTileAfterClick(tile);
      this.playSound(tile);

      if (this.gameOver(index)) return;

      if (this.humanSequence.length === this.sequence.length) {
        if (this.endGame()) return;
        this.humanSequence = [];

        const message = 'Success! Keep going!';
        this.setInfo({ show: true, message });

        setTimeout(() => {
          this.nextRound();
        }, 1000);
        return;
      }

      const remainingTaps = this.sequence.length - this.humanSequence.length;
      this.humanTurnMessage(remainingTaps);
    },
    endGame() {
      const condition = this.humanSequence.length === this.totalLevels;
      const message = `Congrats! You completed all ${this.totalLevels} levels`;
      return this.setGameOverCondition(condition, message);
    },
    gameOver(index) {
      const condition = this.humanSequence[index] !== this.sequence[index];
      const message = 'Oops! Game over';
      return this.setGameOverCondition(condition, message);
    },
    setGameOverCondition(condition, message) {
      if (condition) {
        this.resetGame(message);
        return true;
      }
      return false;
    },
    activateTile(color) {
      const tile = this.tileList.find(({ data }) => data === color);

      this.setTileActive(true, tile.data);
      this.playSound(color);

      setTimeout(() => {
        this.setTileActive(false, tile.data);
      }, sum(this.difficult, 1000));
    },
    nextRound() {
      this.level += 1;
      this.score = this.level;
      this.setScore(this.score);

      const message = 'Wait for the computer';
      this.setInfo({ show: true, message });

      const nextSequence = [...this.sequence];
      nextSequence.push(nextStep());
      playRound(nextSequence, this.activateTile, this.difficult);
      this.sequence = [...nextSequence];

      setTimeout(() => {
        this.humanTurnMessage(this.level);
      }, this.level * sum(this.difficult, 1100) + sum(this.difficult, 1100));
    },
    setScore(value) {
      eventEmitter.$emit('setScore', value);
    },
    humanTurnMessage(level) {
      const message = `Your turn: ${level} Tap${level > 1 ? 's' : ''}`;
      this.setInfo({ show: true, message });
    },
    setTileActive(show, color) {
      this.isTileActive = show;
      this.currentTile = color;
    },
    setInfo(settings) {
      eventEmitter.$emit('setInfo', settings);
    },
    viewStartBtn(show) {
      eventEmitter.$emit('viewStartBtn', show);
    },
    playSound(color) {
      eventEmitter.$emit('playSound', color);
    },
    viewModal(message) {
      eventEmitter.$emit('viewModal', message);
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
