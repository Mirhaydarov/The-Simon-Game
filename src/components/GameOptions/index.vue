<template>
  <section class="game-options">
    <h2>{{ title }}</h2>
    <input type="radio" value="normal" v-model="inputList">
      Normal
    <br>
    <input type="radio" value="middle" v-model="inputList">
      Middle
    <br>
    <input type="radio" value="hard" v-model="inputList">
      Hard
    <br>
  </section>
</template>

<script>
export default {
  data() {
    return {
      title: 'Game Options:',
      inputList: 'normal',
    };
  },

  updated() {
    this.$emit('difficult', this.inputList);
  },
};
</script>
