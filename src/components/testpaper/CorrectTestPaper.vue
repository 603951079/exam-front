<template>
  <el-dialog title="考试信息" center :visible="show" @close="close" fullscreen style="font-size:32px;">
    <el-form :rules="rules2">
      <el-col style="padding:15px;">
        <el-row v-for="(item,index) in testPaperDetailPage"
                :key="item.id">
          <el-row type="flex" style="padding-top:5px;font-weight: bold;">
            <el-col style="width:25px;">{{index+1}}、</el-col>
            <el-col>
              <span>{{item.questionTitle}}</span>
            </el-col>
          </el-row>
          <el-row v-if="item.questionOption != null && item.questionOption != ''" style="padding-top:5px;">
            <span>{{item.questionOption}}</span>
          </el-row>
          <el-row style="padding-top:5px;">
            <el-col :span="12">
              <el-input type="textarea" :rows="10" v-model="item.questionAnswer" readonly></el-input>
            </el-col>
            <el-col :span="10">
              <el-input type="textarea" :rows="10" v-model="item.questionResult" readonly></el-input>
            </el-col>
            <el-col :span="2">
              <el-input type="textarea" :rows="10"
                        v-model="item.questionScore"
                        placeholder="得分"></el-input>
            </el-col>
          </el-row>
        </el-row>
      </el-col>
      <el-col>
        <div style="height:180px;width:100px;position:fixed;
                    top:240px;right:20px;
                    text-align: center;">
          <el-row>
            <el-col>
              <el-button type="danger"
                         @click="close"
                         style="width:80px;height:40px;margin-top: 15px;">关闭
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-button type="primary"
                         @click="save"
                         style="width:80px;height:40px;margin-top: 15px;">保存
              </el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col>
              <el-button type="success"
                         @click="submit"
                         style="width:80px;height:40px;margin-top:15px;">提交
              </el-button>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-form>
  </el-dialog>
</template>

<script>
  import http from '../common/http';

  export default {
    name: "CorrectTestPaper",
    data() {
      var checkAge = (rule, value, callback) => {
        if (!value) {
          return callback(new Error('试题得分不能为空！'));
        }
        setTimeout(() => {
          if (!Number.isInteger(value)) {
            callback(new Error('请输入数字值'));
          }
        }, 1000);
      };
      return {
        testPaperDetailPage: [],
        rules2: {
          questionScore: [
            {validator: checkAge, trigger: 'blur'}
          ]
        }
      }
    },
    props: ['testPaperId', 'show'],
    methods: {
      close() {
        this.$emit('closeCorrectDetail', [false]);
      },
      submit() {
        this.$confirm('确认提交批改结果吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          http.postData('/api/testpaper/v1.0/list/detail/save', this.testPaperDetailPage).then(data => {
            this.testPaperDetailPage = data;
            //计算总分
            let testScore = 0;
            testPaperDetailPage.forEach(row => {
              testScore += row.questionScore;
            });
            http.putData('/api/testpaper/v1.0/update/correct', {
              'testPaperId': this.testPaperId,
              'orrectTime': new Date().getTime(),
              'orrectPsn': '',
              'testScore': testScore
            }).then(() => {
              this.$emit('closeCorrectDetail', [false]);
              this.$message({
                message: '提交成功！',
                type: 'success'
              });
            });
          });
        });
      },
      save() {
        http.postData('/api/testpaper/v1.0/list/detail/save', this.testPaperDetailPage).then(data => {
          this.testPaperDetailPage = data;
          this.$message({
            message: '保存成功！',
            type: 'success'
          });
        });
      }
    },
    watch: {
      testPaperId: function (val) {
        http.getData('/api/testpaper/v1.0/list/detail/' + val).then(data => {
          this.testPaperDetailPage = data;
        });
      }
    }
  }
</script>

<style scoped>

</style>
