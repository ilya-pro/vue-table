<template>
  <div class="pr-Filter">
    <div>Магазин</div>
    <select v-model="shopSelected">
      <option v-for="option in shopList" :key="option" :value="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'TableFilter',
  props: {
    shopList: Array
  },
  data() {
    return {
      shopSelected: 'all'
    }
  }
}
</script>

<style>
.pr-Filter {
  color: #BCBCBC;
}
</style>
