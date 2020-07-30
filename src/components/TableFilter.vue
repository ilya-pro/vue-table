<template>
  <div class="pr-TableFilter">
    <div>Магазин</div>
    <select class="pr-TableFilter__select" v-model="shopSelected">
      <option v-for="option in filterList" :key="option.value" :value="option.value">
        {{ option.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'TableFilter',
  props: {
    filterList: Array,
    value: String
  },

  data() {
    return {
      shopSelected: ''
    }
  },
  watch: {
    shopSelected: function(/*value*/) {
      /* для работы с компонентом снаружи через v-model
         он должен отправлять событие input и принимать свойство value
       */
      this.$emit('input', this.shopSelected);
    }
  }
}
</script>

<style>
.pr-TableFilter {
  color: #BCBCBC;
  padding-bottom: 20px;
}
.pr-TableFilter__select {
  height: 50px;
  padding: 0 20px;
  border: 1px solid #ccc;
}
</style>
