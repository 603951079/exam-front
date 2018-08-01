<template>
  <el-dialog title="考试信息" :visible="show" @close="close" width="60%">
    <el-form :model="testPaper"
             ref="form"
             label-width="100px"
             size="mini"
             :rules="testPaperRules">
      <el-row>
        <el-col :span="9">
          <el-form-item label="姓名" prop="testPsn">
            <el-input v-model="testPaper.testPsn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="手机号" prop="testPhone">
            <el-input v-model="testPaper.testPhone"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="18">
          <el-form-item label="试题类型" prop="classCodesList">
            <el-select v-model="testPaper.classCodesList"
                       placeholder="请选择类型"
                       multiple style="width:100%;">
              <el-option v-for="item in this.questionClass"
                         v-bind:label="item.className"
                         v-bind:value="item.classCode"
                         v-bind:key="item.classCode"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="9">
          <el-form-item label="考试时间" prop="testTime">
            <el-input v-model="testPaper.testTime"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="考试得分" prop="testScore">
            <el-input v-model="testPaper.testScore"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <!--<el-row>
        <el-col :span="9">
          <el-form-item label="批改人" prop="orrectPsn">
            <el-input v-model="testPaper.orrectPsn"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="9">
          <el-form-item label="批改时间" prop="orrectTime">
            <el-input v-model="testPaper.orrectTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>-->
      <el-row>
        <el-col :span="18" style="text-align: center;">
          <el-form-item>
            <el-button @click="close">取消</el-button>
            <el-button type="primary" @click="submitForm('form')">确定</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
  </el-dialog>
</template>

<script>
  import http from '../common/http';
  import testPaperModel from './TestPaperModel';

  export default {
    name: "TestPaperView",
    data() {
      return {
        testPaper: testPaperModel,
        testPaperRules: {
          testPsn: [
            {required: true, message: '请输入姓名', trigger: 'blur'}
          ],
          testPhone: [
            {required: true, message: '请输入手机号', trigger: 'blur'}
          ],
          classCodes: [
            {required: true, message: '选择应聘类型', trigger: 'blur'}
          ]
        },
        questionClass: [],
      }
    },
    methods: {
      close() {
        this.$emit('closeDialog', [false, false]);
        // 关闭窗口后删除表单中的数据
        for (var key in this.testPaper) {
          if (key !== 'classCodesList') {
            delete this.testPaper[key];
          } else {
            this.testPaper[key].splice(0, this.testPaper[key].length);
          }
        }
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.$confirm('试题类型确定后，将不可更改，是否确认！', '提示', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'warning'
            }).then(() => {
              console.log(this.testPaper);
              http.postData('/api/testpaper/v1.0/save', this.testPaper).then(data => {
                this.$emit('closeDialog', [false, true]);
              });
            });
          }
        });
      }
    },
    props: ['show'],
    created() {
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
