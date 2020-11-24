<template>
  <article v-show="show" class="modal">
    <div class="modal__content">
      <h2 class="modal__title">{{ message }}</h2>
      <button class="modal__close" type="button" @click="close">&times;</button>
  </div>
  </article>
</template>

<script>
// Utils
import { eventEmitter } from '../../main';

export default {
  data() {
    return {
      message: '',
      show: false,
    };
  },
  methods: {
    close() {
      this.show = false;
    },
  },
  created() {
    eventEmitter.$on('view', (payload) => {
      this.message = payload;
      this.show = true;
    });
  },
};
</script>

<style lang="scss" scoped>
@keyframes animatetop {
  from {
    margin: -5% auto;
    opacity: 0
  }
  to {
    margin: 10% auto;
    opacity: 1
  }
}

.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);

  &__content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-radius: 100px;
    width: 30%;
    height: 0%;
    margin: 10% auto;
    animation-name: animatetop;
    animation-duration: 0.4s;
    padding: 2rem;
    background-color: #809cda;
    border: 1px solid #888;
    transition: all .3s ease-in-out;
  }

  &__title {
    color: #fff;
    font-size: 1.5rem;
    text-align: center;
    font-weight: normal;
  }

  &__close {
    color: lighten(#809cda, 25);
    font-size: 1.5rem;
    font-weight: bold;
    width: 2rem;
    background-color: transparent;
    border: 1px solid transparent;
    border-radius: 50%;
    outline: none;
    transition: all .2s ease-in-out;
    &:hover,
    &:focus {
      color: #fff;
      border: 1px solid #fff;
      border-radius: 50%;
      width: 2rem;
      cursor: pointer;
    }
  }
}
</style>
