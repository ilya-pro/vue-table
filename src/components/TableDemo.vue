<template>
  <div class="pr-TableDemo">
    <div class="pr-TableDemo__head">
      <span>Входные данные:</span>
      <!-- выбор данных -->
      <select v-model="mockSelected">
        <option v-for="option in dataOptions" v-bind:key="option.value" v-bind:value="option.value">
          {{ option.text }}
        </option>
      </select>
    </div>

    <!--<span>Выбрано: {{ mockSelected }}</span>-->
    <TableController class="pr-TableDemo__tableController" :mock-id="mockSelected"/>
  </div>
</template>

<script>
import TableController from "./TableController";

export default {
  name: 'TableDemo',
  components: {TableController},
  data () {
    return {
      dataOptions: [
        { text: 'Полный список', value: 'full-list' },
        { text: 'Один элемент', value: 'single-item' },
        { text: 'Список книг', value: 'book-list' },
        { text: '404', value: '404' }
      ],
      mockSelected: 'full-list'
    }
  }
}
</script>

<style>
.pr-TableDemo {
  height: 100%;
  display: flex;
  flex-direction: column;
  text-align: left;
}
.pr-TableDemo__head {
  flex-grow: 0;
  line-height: 50px;
}
.pr-TableDemo__tableController {
  flex-grow: 1;
}
</style>
