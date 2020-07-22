<template>
  <div id="app">
    <TableDemo />
  </div>
</template>

<script>
import TableDemo from './components/TableDemo'

export default {
  name: 'App',
  components: {
    TableDemo
  }
}
</script>

<style>
html {
  height: 100%;
}
body {
  margin: 0;
  height: 100%;
  box-sizing: border-box;
  padding: 30px 60px;
  background-color: #F4F3F3;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}
</style>
