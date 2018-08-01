<template>
  <el-row>
    <el-col :span="12">
      <el-container>
        <el-header style="height:40px;padding-top:8px;">
          <el-row type="flex">
            <el-col style="width:70px;">
              <el-button type="primary" size="mini" @click="addMain('new')">新建</el-button>
            </el-col>
            <el-col style="width:140px;">
              <el-input
                size="mini"
                placeholder="请输入名称"
                style="width:130px;"
                v-model="configMainSearch.className"
                @keyup.enter.native="mainSearch"></el-input>
            </el-col>
            <el-col style="width:140px;">
              <el-input
                size="mini"
                placeholder="请输入编码"
                style="width:130px;"
                v-model="configMainSearch.classCode"
                @keyup.enter.native="mainSearch"></el-input>
            </el-col>
            <el-col style="width:90px;">
              <el-button type="primary" size="mini" @click="mainSearch">查询</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="padding-top:5px;padding-bottom: 5px;">
          <el-table
            ref="configMaintable"
            :data="configMainPage"
            style="width:100%"
            highlight-current-row
            border
            height="400px"
            max-height="400px"
            @current-change="configMainTableChange">
            <el-table-column
              prop="classNum"
              label="序号"
              width="50"
              align="center">
            </el-table-column>
            <el-table-column
              prop="className"
              label="名称"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="classCode"
              label="编码"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop=""
              label="操作"
              width="160"
              align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="editMain('edit',scope.row.id)">编辑</el-button>
                <el-button size="mini" type="danger" @click="deleteMain(scope.row.id)">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="classDesc"
              label="描述"
              width="180">
            </el-table-column>
          </el-table>
          <el-dialog title="大分类信息" :visible.sync="dialogMainVisible" width="50%">
            <el-form :model="configMain"
                     ref="configMain"
                     label-width="100px"
                     size="mini"
                     :rules="configMainRules">
              <el-row>
                <el-col :span="18">
                  <el-form-item label="排序号" prop="classNum">
                    <el-input v-model="configMain.classNum"></el-input>
                  </el-form-item>
                </el-col>
                <el-col :span="18">
                  <el-form-item label="分类编码" prop="classCode">
                    <el-input v-model="configMain.classCode"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="分类名称" prop="className">
                    <el-input v-model="configMain.className"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="描述" prop="classDesc">
                    <el-input type="textarea" :rows="5" v-model="configMain.classDesc"
                              placeholder="备注"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18" style="text-align: center;">
                  <el-form-item>
                    <el-button @click="dialogMainVisible=false">取消</el-button>
                    <el-button type="primary" @click="addMainSubmit('configMain')">确定</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-dialog>
        </el-main>
      </el-container>
    </el-col>
    <el-col :span="12">
      <el-container>
        <el-header style="height:40px;padding-top:8px;">
          <el-row type="flex">
            <el-col style="width:70px;">
              <el-button type="primary" size="mini" v-on:click="addDetail('new')">新建</el-button>
            </el-col>
            <el-col style="width:140px;">
              <el-input
                size="mini"
                placeholder="请输入名称"
                style="width:130px;"
                v-model="configDetailSeach.typeName"
                @keyup.enter.native="detailSearch"></el-input>
            </el-col>
            <el-col style="width:140px;">
              <el-input
                size="mini"
                placeholder="请输入编码"
                style="width:130px;"
                v-model="configDetailSeach.typeCode"
                @keyup.enter.native="detailSearch"></el-input>
            </el-col>
            <el-col style="width:90px;">
              <el-button type="primary" size="mini" @click="detailSearch">查询</el-button>
            </el-col>
          </el-row>
        </el-header>
        <el-main style="padding-top:5px;padding-bottom: 5px;">
          <el-table
            ref="configDetailtable"
            :data="configDetailPage"
            style="width:100%"
            highlight-current-row
            border
            height="400px"
            max-height="400px">
            <el-table-column
              prop="typeNum"
              label="序号"
              width="50"
              align="center">
            </el-table-column>
            <el-table-column
              prop="typeName"
              label="名称"
              width="120"
              align="center">
            </el-table-column>
            <el-table-column
              prop="typeCode"
              label="编码"
              width="100"
              align="center">
            </el-table-column>
            <el-table-column
              prop="number"
              label="数量"
              width="50"
              align="center">
            </el-table-column>
            <el-table-column
              prop=""
              label="操作"
              width="160"
              align="center">
              <template slot-scope="scope">
                <el-button size="mini" type="success" @click="editDetail('edit',scope.row.id)">编辑</el-button>
                <el-button size="mini" @click="deleteDetail(scope.row.id)" type="danger">删除</el-button>
              </template>
            </el-table-column>
            <el-table-column
              prop="typeDesc"
              label="描述"
              width="180">
            </el-table-column>
          </el-table>
          <el-dialog title="小分类信息" :visible.sync="dialogDetailVisible" width="50%">
            <el-form :model="configDetail"
                     ref="configDetail"
                     label-width="100px"
                     size="mini"
                     :rules="configDetailRules">
              <el-row>
                <el-col :span="18">
                  <el-form-item label="排序号" prop="typeNum">
                    <el-input v-model="configDetail.typeNum"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="分类名称" prop="typeName">
                    <el-select style="width:100%;" v-model="configDetail.typeCode" placeholder="请选择分类"
                               @change="selectTypeChange">
                      <el-option v-for="item in this.questionType"
                                 v-bind:key="item.value"
                                 v-bind:label="item.label"
                                 v-bind:value="item.value"></el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="试题数目" prop="number">
                    <el-input v-model="configDetail.number"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18">
                  <el-form-item label="描述" prop="typeDesc">
                    <el-input type="textarea" :rows="5" v-model="configDetail.typeDesc"
                              placeholder="备注"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
              <el-row>
                <el-col :span="18" style="text-align: center;">
                  <el-form-item>
                    <el-button @click="dialogDetailVisible=false">取消</el-button>
                    <el-button type="primary" @click="addDetailSubmit('configDetail')">确定</el-button>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form>
          </el-dialog>
        </el-main>
      </el-container>
    </el-col>
  </el-row>
</template>

<script>
  import http from '@/components/common/http';

  export default {
    name: "ConfigSet",
    data() {
      return {
        configMainPage: [],
        configMain: {
          classNum: '',
          className: '',
          classCode: '',
          classDesc: '',
          id: '',
          version: '',
          createByUser: '',
          createTime: '',
          modifyByUser: '',
          modeifyByTime: ''
        },
        configMainSearch: {},
        configMainRules: {
          classNum: [
            {required: true, message: '请输入分类序号', trigger: 'blur'}
          ],
          classCode: [
            {required: true, message: '请输入分类编码', trigger: 'blur'}
          ],
          className: [
            {required: true, message: '请输入分类名称', trigger: 'blur'}
          ]
        },
        configDetailPage: [],
        configDetail: {
          typeNum: '',
          classId: '',
          typeName: '',
          typeCode: '',
          number: '',
          typeDesc: '',
          id: '',
          version: '',
          createByUser: '',
          createTime: '',
          modifyByUser: '',
          modeifyByTime: ''
        },
        configDetailSeach: {
          classId: ''
        },
        configDetailRules: {
          typeNum: [
            {required: true, message: '请输入序号', trigger: 'blur'}
          ],
          typeCode: [
            {required: true, message: '请输入类型编码', trigger: 'blur'}
          ],
          typeName: [
            {required: true, message: '请输入类型名称', trigger: 'blur'}
          ],
          number: [
            {required: true, message: '请输入试题数目', trigger: 'blur'}
          ]
        },
        current_classId: '',
        dialogMainVisible: false,
        dialogDetailVisible: false,
        operator_main: '',
        operator_detail: '',
        questionType: [
          {label: '填空题', value: '01'},
          {label: '单选题', value: '02'},
          {label: '多选题', value: '03'},
          {label: '问答题', value: '04'}
        ]
      }
    },
    methods: {
      addMain: function (operator) {
        this.dialogMainVisible = true;
        this.operator_main = operator;
        for (var key in this.configMain) {
          delete this.configMain[key];
        }
      },
      addDetail: function (operator) {
        this.dialogDetailVisible = true;
        this.operator_detail = operator;
        for (var key in this.configDetail) {
          delete this.configDetail[key];
        }
      },
      editMain: function (operator, val) {
        this.dialogMainVisible = true;
        this.operator_main = operator;
        // 获取数据
        http.getData('/api/config/v1.0/main/list/' + val).then(data => {
          this.configMain = data;
        });
      },
      editDetail: function (operator, val) {
        this.dialogDetailVisible = true;
        this.operator_detail = operator;
        // 获取数据
        http.getData('/api/config/v1.0/detail/list/' + val).then(data => {
          this.configDetail = data;
        });
      },
      addMainSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log(this.operator_main);
            if (this.operator_main === 'edit') {
              http.putData('/api/config/v1.0/main/update', this.configMain).then(data => {
                this.dialogMainVisible = false;
                http.postData('/api/config/v1.0/main/list', {
                  number: 0,
                  size: 500,
                  condition: this.configMainSearch,
                  sort: [{
                    'direction': 'asc',
                    'property': 'classNum'
                  }]
                }).then(data => {
                  this.configMainPage = data.content;
                  this.current_classId = this.configMainPage[0].id;
                  this.configDetailSeach.classId = this.current_classId;
                  // 默认选中首行
                  this.$refs.configMaintable.setCurrentRow(this.configMainPage[0]);
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  });
                });
              });
            } else if (this.operator_main === 'new') {
              console.log(this.operator_main);
              http.postData('/api/config/v1.0/main/save', this.configMain).then(data => {
                if (data) {
                  this.dialogMainVisible = false;
                  http.postData('/api/config/v1.0/main/list', {
                    number: 0,
                    size: 500,
                    condition: this.configMainSearch
                  }).then(data => {
                    this.configMainPage = data.content;
                    this.current_classId = this.configMainPage[0].id;
                    this.configDetailSeach.classId = this.current_classId;
                    // 默认选中首行
                    this.$refs.configMaintable.setCurrentRow(this.configMainPage[0]);
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
      addDetailSubmit: function (formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            if (this.operator_detail === 'edit') {
              http.putData('/api/config/v1.0/detail/update', this.configDetail).then(data => {
                this.dialogDetailVisible = false;
                http.postData('/api/config/v1.0/detail/list', {
                  number: 0,
                  size: 500,
                  condition: this.configDetailSeach,
                  sort: [{
                    'direction': 'asc',
                    'property': 'typeNum'
                  }]
                }).then(data => {
                  this.configDetailPage = data.content;
                  this.$message({
                    type: 'success',
                    message: '修改成功!'
                  });
                });
              });
            } else if (this.operator_detail === 'new') {
              console.log(this.configDetail);
              this.configDetail.classId = this.current_classId;
              http.postData('/api/config/v1.0/detail/save', this.configDetail).then(data => {
                if (data) {
                  this.dialogDetailVisible = false;
                  http.postData('/api/config/v1.0/detail/list', {
                    number: 0,
                    size: 500,
                    condition: this.configDetailSeach
                  }).then(data => {
                    this.configDetailPage = data.content;
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
      deleteMain: function (val) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.deleteData('/api/config/v1.0/main/delete/' + val).then(() => {
            http.postData('/api/config/v1.0/main/list', {
              number: 0,
              size: 500,
              condition: this.configMainSearch,
              sort: [{
                'direction': 'asc',
                'property': 'classNum'
              }]
            }).then(data => {
              this.configMainPage = data.content;
              this.current_classId = this.configMainPage[0].id;
              this.configDetailSeach.classId = this.current_classId;
              // 默认选中首行
              this.$refs.configMaintable.setCurrentRow(this.configMainPage[0]);
            });
          });
        });
      },
      deleteDetail: function (val) {
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.deleteData('/api/config/v1.0/detail/delete/' + val).then(() => {
            http.postData('/api/config/v1.0/detail/list', {
              number: 0,
              size: 500,
              condition: this.configDetailSeach,
              sort: [{
                'direction': 'asc',
                'property': 'typeNum'
              }]
            }).then(data => {
              this.configDetailPage = data.content;
              this.$message({
                type: 'success',
                message: '删除成功！'
              });
            });
          });
        });
      },
      configMainTableChange: function (currentRow, oldCurrentRow) {
        this.current_classId = currentRow.id;
        this.configDetailSeach.classId = currentRow.id;
        http.postData('/api/config/v1.0/detail/list', {
          number: 0,
          size: 500,
          condition: this.configDetailSeach,
          sort: [{
            'direction': 'asc',
            'property': 'typeNum'
          }]
        }).then(data => {
          console.log(data);
          this.configDetailPage = data.content;
        });
      },
      mainSearch: function () {
        http.postData('/api/config/v1.0/main/list', {
          number: 0,
          size: 500,
          condition: this.configMainSearch,
          sort: [{
            'direction': 'asc',
            'property': 'classNum'
          }]
        }).then(data => {
          this.configMainPage = data.content;
          this.current_classId = this.configMainPage[0].id;
          this.configDetailSeach.classId = this.current_classId;
          // 默认选中首行
          this.$refs.configMaintable.setCurrentRow(this.configMainPage[0]);
        });
      },
      detailSearch: function () {
        http.postData('/api/config/v1.0/detail/list', {
          number: 0,
          size: 500,
          condition: this.configDetailSeach,
          sort: [{
            'direction': 'asc',
            'property': 'typeNum'
          }]
        }).then(data => {
          this.configDetailPage = data.content;
        });
      },
      selectTypeChange: function (val) {
        var obj = this.questionType.find(item => {
          return item.value === val;
        });
        this.configDetail.typeName = obj.label;
      },
    },
    created: function () {
      http.postData('/api/config/v1.0/main/list', {
        number: 0,
        size: 500,
        condition: this.configMainSearch,
        sort: [{
          'direction': 'asc',
          'property': 'classNum'
        }]
      }).then(data => {
        this.configMainPage = data.content;
        this.current_classId = this.configMainPage[0].id;
        this.configDetailSeach.classId = this.current_classId;
        // 默认选中首行
        this.$refs.configMaintable.setCurrentRow(this.configMainPage[0]);
      });
    }
  }
</script>

<style scoped>

</style>
