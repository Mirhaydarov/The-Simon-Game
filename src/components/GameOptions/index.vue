<template>
  <section class="game-options">
    <h2>{{ title }}</h2>
    <label
      v-for="{ label, value } of inputLabel"
      :key="label"
    >
      <input
        type="radio"
        :value="value"
        @click="changeDifficult($event)"
        v-model="inputList">{{ label }}<br>
    </label>
  </section>
</template>

<script>
import { eventEmitter } from '../../main';

export default {
  data() {
    return {
      title: 'Game Options:',
      inputLabel: [
        { label: 'Normal', value: 'normal' },
        { label: 'Middle', value: 'middle' },
        { label: 'Hard', value: 'hard' },
      ],
      inputList: 'normal',
    };
  },

  methods: {
    changeDifficult({ target }) {
      const { value } = target;
      eventEmitter.$emit('difficult', value);
    },
  },

};
</script>
