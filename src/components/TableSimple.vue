<template>
  <div class="pr-Table">
    <div class="pr-Table__head"
         :style="'grid-template-columns: repeat(' + columns.length + ', ' + 100/columns.length
          +'%); padding-right: ' + scrollPadding + 'px;'">
      <div class="pr-Table__headCell" v-for="column in columns" :key="column.id" :title="column.name">
        {{ column.name }}
        <i v-if="column.sort"
           class="pr-Table__headSortIcon"
           :class="iconClass(column.sort)"
           v-on:click="columnSort(column)"></i> <!--{{ column.sort }}<i class="fa fa-sort" aria-hidden="true"></i> 2 {{ column.name }} width -->
      </div>
    </div>
    <div ref="items" class="pr-Table__items" :style="'grid-template-columns: repeat(' + columns.length + ', ' + 100/columns.length +'%)'">
      <div class="pr-Table__row" v-for="item in items" :key="item.id">
        <div class="pr-Table__cell" v-for="column in columns" :key="column.id">
          {{ item[column.id] }}
        </div>
      </div>
    </div>
    <div class="pr-Table__status" v-if="status === 'error'">
      <span>Ошибка получения данных</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  name: 'TableSimple',
  props: {
    status: String,
    items: Array,
    columns: Array
  },
  watch: {
    items() {
      let itemsContainer = this.$refs['items'];
      let self = this;
      // после обновления верстки элементов, вычисляем ширину скроллбара для отступа в шапке
      Vue.nextTick(function () {
        self.scrollPadding = itemsContainer.offsetWidth - itemsContainer.clientWidth;
      })
    }
  },
  data() {
    return {
      scrollPadding: 0
    }
  },
  methods: {
    columnSort(column) {
      const nextSortMap = {
        'unset': 'asc',
        'asc': 'desc',
        'desc': 'unset'
      }
      this.$emit('column-sort-change', column.id, nextSortMap[column.sort]);
    },
    // метод-хелпер для генерации класса иконки
    iconClass(sortType) {
      const iconSortMap = {
        unset: 'fa-sort',
        asc: 'fa-sort-asc',
        desc: 'fa-sort-desc'
      }
      return `pr-Table__headSortIcon_${sortType}` + ' fa '+ iconSortMap[sortType];
    }
  }
}
</script>

<style>
.pr-Table {
  background-color: white;
  height: 100%;
  position: relative;
}
.pr-Table__head {
  display: grid;
  width: 100%;
  box-sizing: border-box;
  color: #B0B0B0;
}
.pr-Table__headSortIcon {
  cursor: pointer;
  padding: 5px;
}
.pr-Table__headSortIcon_asc,
.pr-Table__headSortIcon_desc {
  color: #444;
}

.pr-Table__items {
  display: grid;
  grid-auto-rows: max-content; /* ограничиваем высоту строки контентом */
  width: 100%;
  height: calc(100% - 60px); /* 60px - шапка таблицы */
  overflow-y: auto;
  overflow-x: hidden;
  color: #444;
}
.pr-Table__row {
  display: contents;
  flex-grow: 0;
}
.pr-Table__headCell {
  padding: 0 10px;
  line-height: 60px;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #ccc;
}
.pr-Table__cell {
  padding: 20px 10px;
  border-bottom: 1px solid #ccc;
  overflow: hidden;
}

.pr-Table__cell + .pr-Table__cell,
.pr-Table__headCell + .pr-Table__headCell {
  /*border-left: 1px solid #ccc;*/
}
.pr-Table__status {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  top: 0;
}
</style>
