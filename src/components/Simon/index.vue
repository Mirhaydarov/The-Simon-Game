<template>
  <main class="simon">
    <ul ref="tileList">
      <li class="red" data-tile="red"></li>
      <li class="blue" data-tile="blue"></li>
      <li class="yellow" data-tile="yellow"></li>
      <li class="green" data-tile="green"></li>
    </ul>
  </main>
</template>

<script>
export default {
};
</script>

<style lang="scss" scoped>

.red, .green, .blue, .yellow {
  cursor: pointer;
}

</style>
