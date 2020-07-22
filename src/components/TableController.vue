<template>
  <div class="pr-TableController">
    <!--<span>mockId: {{ mockId }}</span>-->
    <!--<TableFilter />-->
    <Table class="pr-TableController__table"
           :items="filteredItems"
           :columns="columns"
           :status="status"
    />
  </div>
</template>

<script>
//import TableFilter from "./TableFilter";
import Table from "./Table";
import axios from 'axios'

export default {
  name: 'TableController',
  components: {Table/*, TableFilter*/},
  props: {
    mockId: String
  },
  data () {
    return {
      status: '',
      items: [],
      columns: []
    }
  },
  computed: {
    filteredItems() {
      const filteredItems = this.items;
      return filteredItems;
    }
  },
  mounted() {
    this.tableQuery();
  },
  watch: {
    mockId: function (newMockId) {
      console.log('mockId changed', newMockId);
      this.tableQuery();
    },
  },
  methods: {
    tableQuery() {
      console.log('1 tableQuery');
      this.status = 'request';
      axios
        .get('../mock/' + this.mockId + '.json')
        .then(response => {
          console.log('2 that', response.data);
          this.items = response.data;
          this.status = 'ok';

          // исходим из того, что колонок не знаем и получаем их из данных
          let newColumns = [];
          for (var i = 0, len = this.items.length; i < len; i++ ) {
            let item = this.items[i];
            let fields = Object.keys(item);

            // собираем уникальные поля для всех элементов
            newColumns = newColumns.concat(fields.filter((item) => newColumns.indexOf(item) < 0));
          }
          console.log('3', newColumns);
          this.columns = newColumns;
        })
        .catch(error => {
          // clear list
          this.items = [];
          this.columns = [];
          this.status = 'error';
          console.log('222', error);
        });
    }
  }
}
</script>

<style>
.pr-TableController {
  display: flex;
  flex-direction: column;
}
.pr-TableController__table {
  /* минимальная высота для таблицы; работает в паре с flex-grow, без неё высота растягивается по контенту */
  height: 200px;
  flex-grow: 1;
}
</style>
