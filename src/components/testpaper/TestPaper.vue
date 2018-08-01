<template>
  <el-container>
    <el-header style="height:40px;padding-top:8px;">
      <el-row type="flex">
        <el-col style="width:70px;">
          <el-button type="primary" size="mini" @click="createClick">新建</el-button>
        </el-col>
        <el-col style="width:170px;">
          <el-input
            size="mini"
            placeholder="请输入姓名"
            style="width:160px;"
            v-model="testPaperSearch.testPsn"
            @keyup.enter.native="searchClick"></el-input>
        </el-col>
        <el-col style="width:170px;">
          <el-input
            size="mini"
            placeholder="请输入手机号"
            style="width:160px;"
            v-model="testPaperSearch.testPhone"
            @keyup.enter.native="searchClick"></el-input>
        </el-col>
        <el-col style="width:90px;">
          <el-button type="primary" size="mini" @click="searchClick">查询</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding-top:5px;padding-bottom: 5px;">
      <el-table
        ref="singleTable"
        :data="testPaperPage"
        style="width:100%"
        highlight-current-row
        border
        height="400px"
        max-height="400px">
        <el-table-column
          fixed
          type="index"
          width="50"
          align="center">
        </el-table-column>
        <el-table-column
          fixed
          prop="testPsn"
          label="姓名"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="testPhone"
          label="手机号"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          label="试题类型"
          width="110"
          align="center">
          <template slot-scope="scope">
            <el-tag size="mini" :type="'danger'"
                    v-for="(item,index) in scope.row.classNamesList"
                    :key="scope.row.id+index"
                    style="margin-left:1px;">
              {{item}}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column
          prop="testBeginTime"
          label="考试开始时间"
          width="150"
          align="center"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          prop="testEndTime"
          label="考试结束时间"
          width="150"
          align="center"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          prop="testScore"
          label="得分"
          width="80"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orrectPsn"
          label="批改人"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="orrectTime"
          label="批改时间"
          width="140"
          align="center"
          :formatter="dateFormat">
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          width="280"
          align="center">
          <template slot-scope="scope">
            <el-button @click="viewClick(scope.row.id)" size="mini" type="danger">查看试题</el-button>
            <el-button @click="correctClick(scope.row.id)" size="mini" type="success">批改试卷</el-button>
          </template>
        </el-table-column>
      </el-table>
      <test-paper-view :show="dialogFormVisible"
                       @closeDialog="closeDialog"></test-paper-view>
      <test-paper-detail-view :show="dialogDetailVisible"
                              :testPaperId="testPaperId"
                              @closeDetail="closeDetail"></test-paper-detail-view>
      <correct-test-paper :show="dialogCorrectVisible"
                          :testPaperId="testPaperId"
                          @closeCorrectDetail="closeCorrectDialog"></correct-test-paper>
    </el-main>
    <el-footer>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page_current"
        :page-size="page_size"
        :total="page_total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </el-footer>
  </el-container>
</template>

<script>
  import http from '@/components/common/http';
  import testPaperModel from './TestPaperModel';
  import testPaperView from './TestPaperView';
  import testPaperDetailView from './TestPaperDetailView';
  import CorrectTestPaper from './CorrectTestPaper';

  export default {
    name: "TestPaper",
    components: {testPaperView, testPaperDetailView, CorrectTestPaper},
    data() {
      return {
        testPaperPage: [],
        testPaper: testPaperModel,
        testPaperSearch: {
          testPsn: '',
          testPhone: ''
        },
        page_current: 1,
        page_size: 10,
        page_total: 0,
        dialogFormVisible: false,
        operator: '',
        dialogDetailVisible: false,
        testPaperId: '',
        dialogCorrectVisible: false
      }
    },
    methods: {
      handleSizeChange: function (val) { // page_size变化时重新加载数据
        this.page_current = 0;
        http.postData('/api/testpaper/v1.0/list', {
          number: this.page_current,
          size: val,
          condition: this.sysUserSearch
        }).then(data => {
          console.log(data);
          this.sysUserPage = data.content;
          this.page_total = data.totalElements;
          this.page_size = val;
        });
      },
      handleCurrentChange: function (val) { // page_current变化时重新加载数据
        http.postData('/api/testpaper/v1.0/list', {
          number: val - 1,
          size: this.page_size,
          condition: this.sysUserSearch
        }).then(data => {
          this.sysUserPage = data.content;
          this.page_total = data.totalElements;
          this.page_current = val;
        });
      },
      deleteClick: function (val) { // 单击删除按钮
        this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.deleteData("/api/testpaper/v1.0/delete/" + val).then(() => {
            http.postData('/api/testpaper/v1.0/list', {
              number: this.page_current - 1,
              size: this.page_size,
              condition: this.sysUserSearch
            }).then(data => {
              this.sysUserPage = data.content;
              this.page_total = data.totalElements;
            }).then(() => {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            });
          });
        });
      },
      editClick: function (operator, val) {
        this.operator = operator;
        // 打开弹出框
        this.dialogFormVisible = true;
        // 获取数据
        http.getData('/api/testpaper/v1.0/list/' + val).then(data => {
          this.sysUser = data;
        });
      },
      createClick: function (operator) {
        this.dialogFormVisible = true;
        // 将sysUser对象的所有属性置为空
      },
      searchClick: function () {
        http.postData('/api/testpaper/v1.0/list', {
          number: this.page_current - 1,
          size: this.page_size,
          condition: this.testPaperSearch
        }).then(data => {
          this.testPaperPage = data.content;
          this.page_total = data.totalElements;
        });
      },
      closeDialog: function (val) {
        this.dialogFormVisible = val[0];
        if (val[1]) {
          http.postData('/api/testpaper/v1.0/list', {
            number: this.page_current - 1,
            size: this.page_size,
            condition: this.testPaperSearch
          }).then(data => {
            this.testPaperPage = data.content;
            this.page_total = data.totalElements;
          });
        }
      },
      closeDetail: function (val) {
        this.dialogDetailVisible = val[0];
      },
      closeCorrectDialog: function (val) {
        this.dialogCorrectVisible = val[0];
      },
      viewClick: function (val) {
        this.testPaperId = val;
        this.dialogDetailVisible = true;
      },
      correctClick: function (val) {
        this.testPaperId = val;
        this.dialogCorrectVisible = true;
      },
      dateFormat: function (row, column) {
        var date = row[column.property];
        if (date == undefined) {
          return "";
        }
        return this.$moment(date).format("YYYY-MM-DD HH:mm:ss");
      }
    },
    created: function () { // 声明周期钩子,实例化之后给列表赋值
      http.postData('/api/testpaper/v1.0/list', {
        number: this.page_current - 1,
        size: this.page_size,
        condition: this.testPaperSearch
      }).then(data => {
        this.testPaperPage = data.content;
        this.page_total = data.totalElements;
      });
    }
  }
</script>

<style scoped>

</style>
