<template>
  <div id="TodoList">
    <h1 v-text="title"></h1>
    <input v-model="newItem" v-on:keyup.enter="createitem"/>
    <ul>
      <li v-for="item in items"
          :class="{finished: item.isFinished}"
          @click="toggleFinish(item)"
          class="item">
        {{item.label}}
      </li>
    </ul>
    <div>
      <el-radio-group v-model="radioValue">
        <el-radio v-for="(item,index) in radioArray"
                  :label="item">{{item}}
        </el-radio>
      </el-radio-group>
      <div v-for="item in radioArray">{{item}}</div>
      <br/>
      <el-radio-group v-model="radio2">
        <el-radio :label="3">备选项</el-radio>
        <br/>
        <el-radio :label="6">备选项</el-radio>
        <el-radio :label="9">备选项</el-radio>
      </el-radio-group>
      <br/>
      {{radioValue}}
      <br/>
      {{radio2}}
      <br/>
      <!--checkboxgroup这里v-model绑定的必须是一个数组-->
      <el-checkbox-group v-model="checkedCities">
        <el-checkbox v-for="kc in checkboxArray"
                     :label="kc"
                     :key="kc">{{kc}}
        </el-checkbox>
      </el-checkbox-group>
      <br/>
      {{checkedCities}}
      ------------------------------------------------------------------
      <div v-if="0">
        v-if
      </div>
      <div v-show="-1">
        v-show
      </div>
    </div>
  </div>
</template>

<script>
  import store from '@/components/common/store';

  export default {
    name: "TodoList",
    data() {
      return {
        title: 'this is a todo list',
        items: store.fetch(),
        newItem: '',
        radioArray: ['北京', '上海', '杭州'],
        radioValue: '',
        radio2: '',
        checkboxArray: ['语文', '数学', '英语'],
        checkedCities: [],
        visible:false
      }
    },
    methods: {
      toggleFinish: function (item) {
        console.log(item);
        item.isFinished = !item.isFinished;
      },
      createitem: function () {
        this.items.push({label: this.newItem, isFinished: false});
        this.newItem = '';
      }
    },
    watch: {
      items: {
        handler: function (result) {
          console.log('watch---items');
          store.save(result);
        },
        deep: true // 深度watch，如果items中存储的对象的属性发生变化，也会观察到
      }
    },
    beforeCreate(){
      console.log('beforeCreate执行了');
      console.log('this.title='+this.title);
      console.log('this.$el='+this.$el);
    },
    created(){
      console.log('created执行了！');
      console.log('this.title='+this.title);
      console.log('this.$el='+this.$el);
    },
    beforeMount(){
      console.log('beforeMount 执行了！');
      console.log('this.title='+this.title);
      console.log('this.$el='+this.$el);
    },
    mounted(){
      console.log('mounted 执行了！');
      console.log('this.title='+this.title);
      console.log('this.$el='+this.$el);
      console.log(this.$el);
    },
    beforeUpdate(){

    },
    updated(){

    },
    beforeDestroy(){

    },
    destroyed(){

    }
  }
</script>

<style scoped>
  .finished {
    text-decoration: line-through;
  }

  .item {
    color: green;
    font-family: Bahnschrift;
    font-size: large;
    font-weight: bold;
    cursor: pointer;
  }
</style>
