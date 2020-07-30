<template>
  <div class="pr-TableController">
    <TableFilter :filterList="filterList"
                 v-model="shopSelected"/>
    <TableSimple class="pr-TableController__table"
                 :items="filteredItems"
                 :columns="columns"
                 :status="status"
                 v-on:column-sort-change="columnSortChange"
    />
  </div>
</template>

<script>
import TableFilter from "./TableFilter";
import TableSimple from "./TableSimple";
import axios from 'axios'

export default {
  name: 'TableController',
  components: {TableSimple, TableFilter},
  props: {
    mockId: String
  },
  data () {
    return {
      status: '',
      // элементы таблицы (строки)
      items: [],
      // текущие колонки
      columns: [],
      // словарь для колонок
      columnDict: {
        age: {
          name: 'Возраст'
        },
        answer_code: {
          name: 'Код ответа'
        },
        author: {
          name: 'Автор',
          sort: 'asc'
        },
        location: {
          name: 'Магазин',
          sort: 'asc'
        },
        payment_date: {
          name: 'Дата платежа',
          sort: 'asc', // false | 'unset' | 'asc' | 'desc'
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
      // текущая колонка сортировки
      sortColumn: {
        id: '',
        sort: 'unset'
      },
      // уникальные локации (поле location в item) ['Химки', 'Тёплый стан']
      uniqueLocationIds: [],
      // выбранный магазин (location)
      shopSelected: ''
    }
  },
  computed: {
    // отфильтрованные элементы для вывода в таблицу
    filteredItems() {
      let filteredItems = this.items.filter(item => !this.shopSelected || item.location === this.shopSelected);
      const sortColumnId = this.sortColumn.id;
      // сортируем только при наличии столбца и не пустой сортировки
      if (sortColumnId && (this.sortColumn.sort === 'asc' || this.sortColumn.sort === 'desc')) {
        let sortDirection = this.sortColumn.sort === 'asc' ? 1 : -1;
        filteredItems.sort((itemA, itemB) => {
          if ((!itemA[sortColumnId] || !itemB[sortColumnId]) ||
            (itemA[sortColumnId] === itemB[sortColumnId])) {
            // не меняем порядок
            return 0;
          } else {
            return (itemA[sortColumnId] < itemB[sortColumnId]) ? -1 * sortDirection : sortDirection;
          }
        });
      }
      return filteredItems;
    },
    filterList() {
      return [{name: 'Все магазины', value: ''}].concat(this.uniqueLocationIds.map(locationId => {
        return {
          name: locationId,
          value: locationId
        }
      }));
    }
  },
  mounted() {
    this.tableQuery();
  },
  watch: {
    mockId: function (/*newMockId*/) {
      this.tableQuery();
    },
  },
  methods: {
    /**
     * Запрос данных для таблицы
     */
    tableQuery() {
      this.status = 'request';
      axios
        .get('../mock/' + this.mockId + '.json')
        .then(response => {
          this.items = response.data;
          this.status = 'ok';

          // исходим из того, что колонок не знаем и получаем их из данных
          let newColumnIds = [];
          let uniqueLocationIds = [];
          for (var i = 0, len = this.items.length; i < len; i++ ) {
            let item = this.items[i];
            let fields = Object.keys(item);

            // собираем уникальные поля для всех элементов
            newColumnIds = newColumnIds.concat(fields.filter((item) => newColumnIds.indexOf(item) < 0));

            // собираем уникальные значения location
            if (Object.prototype.hasOwnProperty.call(item, "location") && uniqueLocationIds.indexOf(item.location) === -1) {
              uniqueLocationIds.push(item.location)
            }
          }
          this.uniqueLocationIds = uniqueLocationIds;
          if (this.uniqueLocationIds.indexOf(this.shopSelected) === -1) {
            this.shopSelected = '';
          }
          // готовим колонки с параметрами из словаря
          let newColumns = [];
          let newSortColumn = {
            id: '',
            sort: 'unset'
          }
          for (i = 0, len = newColumnIds.length; i < len; i++ ) {
            let columnId = newColumnIds[i];
            let column;
            if (this.columnDict[columnId]) {
              // идентификатор колонки есть в словаре
              column = Object.assign({}, this.columnDict[columnId]);
            } else {
              // неизвестная колонка
              column = {
                name: columnId.toUpperCase()
              }
            }
            column.id = columnId;
            column.width = column.width || '' + 100 / newColumnIds.length + '%';
            if (column.sort === 'asc' || column.sort === 'desc') {
              newSortColumn.id = columnId;
              newSortColumn.sort = column.sort;
            }
            newColumns.push(column);
          }
          this.columns = newColumns;
          // устанавливаем колонку сортировки
          this.setSortColumn(newSortColumn.id, newSortColumn.sort);
        })
        .catch((/*error*/) => {
          // clear list
          this.items = [];
          this.columns = [];
          this.status = 'error';
        });
    },
    /**
     * Установить сортировку на колонке. Остальные колонки будут сброшены
     * @param columnId идентификатор колонки
     * @param sort тип сортировки 'unset' | 'asc' | 'desc'
     */
    setSortColumn(columnId, sort) {
      let sortColumn = {
        id: '',
        sort: 'unset'
      };
      // обходим все колонки чтобы сбросить с другим id и установить нужный
      for (let i = 0, len = this.columns.length; i < len; i++) {
        const column = this.columns[i];
        if (column.id === columnId) {
          column.sort = sort;
          // запоминаем колонку только если нашли её
          sortColumn.id = columnId;
          sortColumn.sort = sort;
        } else if (column.sort) {
          column.sort = 'unset';
        }
      }
      this.sortColumn = sortColumn;
    },

    columnSortChange(columnId, sort) {
      this.setSortColumn(columnId, sort);
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
