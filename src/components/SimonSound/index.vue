<template>
  <footer ref="soundList">
    <audio
      src="../../sounds/1.mp3"
      ref="red"
    ></audio>
    <audio
      src="../../sounds/2.mp3"
      ref="green"
    ></audio>
    <audio
      src="../../sounds/3.mp3"
      ref="blue"
    ></audio>
    <audio
      src="../../sounds/4.mp3"
      ref="yellow"
    ></audio>
  </footer>
</template>

<script>
import { eventEmitter } from '../../main';

export default {
  created() {
    eventEmitter.$on('playSound', (payload) => {
      this.$refs[payload].play();
    });
  },
};
</script>
