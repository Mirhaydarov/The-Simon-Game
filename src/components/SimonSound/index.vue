<template>
  <footer data-action="sound" ref="soundList">
    <audio
      src="../../sounds/1.mp3"
      data-sound="red"
    ></audio>
    <audio
      src="../../sounds/2.mp3"
      data-sound="green"
    ></audio>
    <audio
      src="../../sounds/3.mp3"
      data-sound="blue"
    ></audio>
    <audio
      src="../../sounds/4.mp3"
      data-sound="yellow"
    ></audio>
  </footer>
</template>

<script>
export default {
  mounted() {
    this.$emit('soundList', this.$refs.soundList);
  },
};
</script>
