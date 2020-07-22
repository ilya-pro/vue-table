<template>
  <div class="pr-TableController">
    <TableFilter :shopList="shopList"/>
    <Table class="pr-TableController__table"
           :items="filteredItems"
           :columns="columns"
           :status="status"
    />
  </div>
</template>

<script>
import TableFilter from "./TableFilter";
import Table from "./Table";
import axios from 'axios'

export default {
  name: 'TableController',
  components: {Table, TableFilter},
  props: {
    mockId: String
  },
  data () {
    return {
      status: '',
      items: [],
      columns: [],
      columnDict: {
        age: {
          name: 'Возраст'
        },
        answer_code: {
          name: 'Код ответа'
        },
        author: {
          name: 'Автор'
        },
        location: {
          name: 'Магазин'
        },
        payment_date: {
          name: 'Дата платежа',
          sortable: true,
          width: '150px'
        },
        request: {
          name: 'Заявка'
        },
        service: {
          name: 'Сервисы'
        },
        service_message: {
          name: 'Сообщение сервиса'
        },
        slot_date: {
          name: 'Дата слота'
        },
        title: {
          name: 'Название'
        },
      },
      shopList: [
        'Химки', 'Тёплый стан'
      ]
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
          let newColumnIds = [];
          for (var i = 0, len = this.items.length; i < len; i++ ) {
            let item = this.items[i];
            let fields = Object.keys(item);

            // собираем уникальные поля для всех элементов
            newColumnIds = newColumnIds.concat(fields.filter((item) => newColumnIds.indexOf(item) < 0));
          }
          // готовим колонки с параметрами из словаря
          let newColumns = [];
          for (i = 0, len = newColumnIds.length; i < len; i++ ) {
            let columnId = newColumnIds[i];
            let column;
            if (this.columnDict[columnId]) {
              // идентификатор колонки есть в словаре
              column = Object.assign({}, this.columnDict[columnId]);
            } else {
              // не известная колонка
              column = {
                name: columnId.toUpperCase()
              }
            }
            column.id = columnId;
            column.width = column.width || '' + 100 / newColumnIds.length + '%';
            newColumns.push(column);
          }
          this.columns = newColumns;
        })
        .catch((/*error*/) => {
          // clear list
          this.items = [];
          this.columns = [];
          this.status = 'error';
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
