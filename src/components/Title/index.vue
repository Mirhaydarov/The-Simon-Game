<template>
  <header>
    <h1 class="title">{{ title }}</h1>
  </header>
</template>

<script>
export default {
  data() {
    return {
      title: 'Simon Says',
    };
  },
};
</script>

<style lang="scss" scoped>

.title {
  margin: 1em 0 2em;
  text-align: center;
}

</style>
