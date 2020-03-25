<template>
  <div id="app">
    <div class="layout column">
      <component-a class="box my-2"/>
      <component-a class="box my-2"/>
    </div>
  </div>
</template>

<script>
import ComponentA from '@/components/ComponentA.vue'

export default {
  name: 'App',
  components: {
    ComponentA
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.my-1 {
  margin-top: 4px;
  margin-bottom: 4px;
}
.my-2 {
  margin-top: 8px;
  margin-bottom: 8px;
}
.mx-1 {
  margin-left: 4px;
  margin-right: 4px;
}
.mx-2 {
  margin-left: 8px;
  margin-right: 8px;
}
.layout {
  display: flex;

  &.column {
    flex-direction: column;
  }
}
.box {
  border: 1px solid #eee;
}
</style>
