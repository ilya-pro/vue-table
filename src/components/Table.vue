<template>
  <div class="pr-Table">
    <div class="pr-Table__head"
         :style="'grid-template-columns: repeat(' + columns.length + ', ' + 100/columns.length
          +'%); padding-right: ' + scrollPadding + 'px;'">
      <!--TODO :key="column.id"-->
      <div class="pr-Table__headCell" v-for="column in columns" :key="column" :title="column">
        {{ column }}
      </div>
    </div>
    <div ref="items" class="pr-Table__items" :style="'grid-template-columns: repeat(' + columns.length + ', ' + 100/columns.length +'%)'">
      <div class="pr-Table__row" v-for="item in items" :key="item.id">
        <div class="pr-Table__cell" v-for="column in columns" :key="column">
          {{ item[column] }}
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
  name: 'Table',
  props: {
    status: String,
    items: Array,
    columns: Array
  },
  watch: {
    items() {
      let itemsContainer = this.$refs['items'];
      console.log('items change', itemsContainer);
      let self = this;
      // после обновления верстки, вычисляем ширину скроллбара для отступа в шапке
      Vue.nextTick(function () {
        self.scrollPadding = itemsContainer.offsetWidth - itemsContainer.clientWidth;
        console.log('nextTick');
      })

    }
  },
  data() {
    return {
      scrollPadding: 5
    }
  }
}
</script>

<style>
.pr-Table {
  /*display: flex;
  flex-direction: column;*/
  background-color: white;
  height: 100%;
  position: relative;
}
.pr-Table__head {
  /*display: flex;*/
  display: grid;
  width: 100%;
  box-sizing: border-box;
  color: #B0B0B0;
}
.pr-Table__items {
  display: grid;
  grid-auto-rows: max-content; /* ограничиваем высоту строки контентом */
  width: 100%;
  height: calc(100% - 60px); /* 60px - шапка таблицы */
  overflow-y: auto;
  overflow-x: hidden;
}
.pr-Table__row {
  display: contents;
  flex-grow: 0;
}
.pr-Table__headCell {
  padding: 20px 10px;
  overflow: hidden;
  text-overflow: ellipsis;
  border-bottom: 1px solid #ccc;
}
.pr-Table__cell {
  padding: 20px 10px;
  border-bottom: 1px solid #ccc;
}

.pr-Table__cell + .pr-Table__cell,
.pr-Table__headCell + .pr-Table__headCell {
  border-left: 1px solid #ccc;
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
