<template>
  <el-container>
    <el-header style="height:40px;padding-top:8px;">
      <el-row type="flex">
        <el-col style="width:90px;">
          <el-button type="primary" size="mini" @click="createClick('new')">新建试题</el-button>
        </el-col>
        <el-col style="width:auto;">
          <el-select v-model="questionBankSearch.questionClassCode"
                     placeholder="请选择分类"
                     size="mini"
                     style="width:auto;"
                     @change="searchClick" clearable>
            <el-option v-for="item in this.questionClass"
                       v-bind:label="item.className"
                       v-bind:value="item.classCode"
                       v-bind:key="item.classCode"></el-option>
          </el-select>
        </el-col>
        <el-col style="width:auto;">
          <el-select v-model="questionBankSearch.questionTypeCode"
                     placeholder="请选择类型"
                     size="mini"
                     style="width:auto;"
                     @change="searchClick" clearable>
            <el-option v-for="item in this.questionType"
                       v-bind:label="item.label"
                       v-bind:value="item.value"
                       v-bind:key="item.value"></el-option>
          </el-select>
        </el-col>
        <el-col style="width:170px;">
          <el-input
            size="mini"
            placeholder="请输入标题"
            style="width:160px;"
            v-model="questionBankSearch.questionTitle"
            @keyup.enter.native="searchClick"></el-input>
        </el-col>
        <el-col style="width:90px;">
          <el-button type="primary" size="mini" @click="searchClick">查询</el-button>
        </el-col>
      </el-row>
    </el-header>
    <el-main style="padding-top:5px;padding-bottom: 5px;">
      <el-table
        :data="questionBankPage"
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
          prop="questionClass"
          label="大分类"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          fixed
          prop="questionType"
          label="小分类"
          width="100"
          align="center">
        </el-table-column>
        <el-table-column
          prop="questionTitle"
          label="标题"
          width="180">
        </el-table-column>
        <el-table-column
          prop="questionOption"
          label="选项"
          width="180"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="questionResult"
          label="答案"
          width="300"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop=""
          label="操作"
          width="160"
          align="center">
          <template slot-scope="scope">
            <el-button @click="editClick('edit',scope.row.id)" size="mini" type="success">编辑</el-button>
            <el-button @click="deleteClick(scope.row.id)" size="mini" type="danger">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="试题信息" :visible.sync="dialogFormVisible" width="90%">
        <el-form :model="questionBank"
                 ref="form"
                 label-width="100px"
                 size="mini"
                 :rules="questionBankRules">
          <el-row>
            <el-col :span="12">
              <el-form-item label="大分类" prop="questionClassCode">
                <el-select v-model="questionBank.questionClassCode" placeholder="请选择分类" @change="selectClassChange">
                  <el-option v-for="item in this.questionClass"
                             v-bind:label="item.className"
                             v-bind:value="item.classCode"
                             v-bind:key="item.classCode"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="小分类" prop="questionTypeCode">
                <el-select v-model="questionBank.questionTypeCode" placeholder="请选择分类" @change="selectTypeChange">
                  <el-option v-for="item in this.questionType"
                             v-bind:key="item.value"
                             v-bind:label="item.label"
                             v-bind:value="item.value"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="序号" prop="questionNum">
                <el-input v-model="questionBank.questionNum"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="标题" prop="questionTitle">
                <el-input type="textarea" :rows="5" v-model="questionBank.questionTitle" placeholder="请输入标题"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="选项" prop="questionOption">
                <el-input type="textarea" :rows="5" v-model="questionBank.questionOption"
                          placeholder="请输入选项"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-form-item label="答案" prop="questionResult">
                <el-input type="textarea" :rows="5" v-model="questionBank.questionResult"
                          placeholder="请输入答案"></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24" style="text-align: center;">
              <el-form-item>
                <el-button @click="dialogFormVisible=false">取消</el-button>
                <el-button type="primary" @click="submitForm('form')">确定</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
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

  export default {
    name: "SysUser",
    data() {
      return {
        questionBankPage: [],
        questionBank: {
          id: '',
          questionNum: '',
          questionTitle: '',
          questionOption: '',
          questionResult: '',
          questionClass: '',
          questionClassCode: '',
          questionType: '',
          questionTypeCode: '',
          version: '',
          createByUser: '',
          createTime: '',
          modifyByUser: '',
          modeifyByTime: ''
        },
        questionBankSearch: {
          questionClassCode: '',
          questionTypeCode: '',
          questionTitle: ''
        },
        page_current: 1,
        page_size: 10,
        page_total: 0,
        dialogFormVisible: false,
        questionBankRules: {
          questionClassCode: [
            {required: true, message: '请选择试题分类', trigger: 'blur'}
          ],
          questionTypeCode: [
            {required: true, message: '请选择试题分类', trigger: 'blur'}
          ],
          questionTitle: [
            {required: true, message: '请输入试题标题', trigger: 'blur'}
          ],
          questionResult: [
            {required: true, message: '请输入试题答案', trigger: 'blur'}
          ]
        },
        operator: '',
        questionClass: [],
        questionType: [
          {label: '填空题', value: '01'},
          {label: '单选题', value: '02'},
          {label: '多选题', value: '03'},
          {label: '问答题', value: '04'}
        ]
      }
    },
    methods: {
      handleSizeChange: function (val) { // page_size变化时重新加载数据
        this.page_current = 0;
        http.postData('/api/questionbank/v1.0/list', {
          number: this.page_current,
          size: val,
          condition: this.questionBankSearch
        }).then(data => {
          console.log(data);
          this.questionBankPage = data.content;
          this.page_total = data.totalElements;
          this.page_size = val;
        });
      },
      handleCurrentChange: function (val) { // page_current变化时重新加载数据
        http.postData('/api/questionbank/v1.0/list', {
          number: val - 1,
          size: this.page_size,
          condition: this.questionBankSearch
        }).then(data => {
          this.questionBankPage = data.content;
          this.page_total = data.totalElements;
          this.page_current = val;
        });
      },
      deleteClick: function (val) { // 单击删除按钮
        this.$confirm('此操作将永久删除该试题, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.deleteData("/api/questionbank/v1.0/delete/" + val).then(() => {
            http.postData('/api/questionbank/v1.0/list', {
              number: this.page_current - 1,
              size: this.page_size,
              condition: this.questionBankSearch
            }).then(data => {
              this.questionBankPage = data.content;
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
        this.dialogFormVisible = true;
        // 获取数据
        http.getData('/api/questionbank/v1.0/list/' + val).then(data => {
          console.log(data);
          this.questionBank = data;
        });
      },
      createClick: function (operator) {
        this.operator = operator;
        this.dialogFormVisible = true;
        // 将sysUser对象的所有属性置为空
        for (var key in this.questionBank) {
          delete this.questionBank[key];
        }
      },
      searchClick: function () {
        http.postData('/api/questionbank/v1.0/list', {
          number: 0,
          size: this.page_size,
          condition: this.questionBankSearch,
          sort: [
            {
              'direction': 'asc',
              'property': 'questionClassCode'
            }, {
              'direction': 'asc',
              'property': 'questionTypeCode'
            }, {
              'direction': 'asc',
              'property': 'questionNum'
            }
          ]
        }).then(data => {
          this.questionBankPage = data.content;
          this.page_total = data.totalElements;
        });
      },
      submitForm: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operator === 'edit') {
              http.putData('/api/questionbank/v1.0/update', this.questionBank).then(data => {
                this.dialogFormVisible = false;
                http.postData('/api/questionbank/v1.0/list', {
                  number: this.page_current - 1,
                  size: this.page_size,
                  condition: this.questionBankSearch
                }).then(data => {
                  this.questionBankPage = data.content;
                  this.page_total = data.totalElements;
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  });
                });
              });
            } else if (this.operator === 'new') {
              http.postData('/api/questionbank/v1.0/save', this.questionBank).then(data => {
                if (data) {
                  this.dialogFormVisible = false;
                  http.postData('/api/questionbank/v1.0/list', {
                    number: this.page_current - 1,
                    size: this.page_size,
                    condition: this.questionBankSearch
                  }).then(data => {
                    this.questionBankPage = data.content;
                    this.page_total = data.totalElements;
                    this.$message({
                      type: 'success',
                      message: '创建成功!'
                    });
                  });
                } else {
                  this.$message({
                    type: 'danger',
                    message: '创建失败!'
                  });
                }
              });
            }
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      selectTypeChange: function (val) {
        var obj = this.questionType.find(item => {
          return item.value === val;
        });
        this.questionBank.questionType = obj.label;
      },
      selectClassChange: function (val) {
        var obj = this.questionClass.find(item => {
          return item.classCode === val;
        });
        this.questionBank.questionClass = obj.className;
      }
    },
    created: function () { // 声明周期钩子,实例化之后给列表赋值
      http.postData('/api/questionbank/v1.0/list', {
        number: 0,
        size: this.page_size,
        condition: this.questionBankSearch,
        sort: [
          {
            'direction': 'asc',
            'property': 'questionClassCode'
          }, {
            'direction': 'asc',
            'property': 'questionTypeCode'
          }, {
            'direction': 'asc',
            'property': 'questionNum'
          }
        ]
      }).then(data => {
        this.questionBankPage = data.content;
        this.page_total = data.totalElements;
      });

      http.postData('/api/config/v1.0/main/list', {
        number: 0,
        size: 500,
        condition: {},
        sort: [{
          'direction': 'asc',
          'property': 'classNum'
        }]
      }).then(data => {
        this.questionClass = data.content;
      });
    }
  }
</script>

<style scoped>

</style>
