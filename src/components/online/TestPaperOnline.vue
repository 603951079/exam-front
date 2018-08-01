<template>
  <el-form>
    <el-col style="padding:15px;">
      <el-row v-show="!isvible">
      <span>
        未找到关联的试卷，请与管理员联系！
      </span>
      </el-row>
      <el-row v-for="(item,index) in testPaperDetailPage"
              :key="item.id">
        <!--标题-->
        <el-row type="flex" style="padding-top:5px;margin:5px;">
          <el-col style="width:28px;">{{index+1}}、</el-col>
          <el-col>
            <span style="font-weight:bold;">{{item.questionTitle}}</span>
          </el-col>
        </el-row>
        <!--试题选项-->
        <!--单选题-->
        <el-row v-if="item.questionTypeCode==='02'"
                style="line-height:50px;height:50px;">
          <el-radio-group v-model="item.questionAnswer">
            <el-radio v-for="ra in item.questionOptionList"
                      :label="ra"
                      :key="ra">{{ra}}
            </el-radio>
          </el-radio-group>
        </el-row>
        <!--多选题-->
        <el-row v-else-if="item.questionTypeCode==='03'"
                style="line-height:50px;height:50px;">
          <el-checkbox-group v-model="item.questionAnswerList">
            <el-checkbox v-for="ch in item.questionOptionList"
                         :label="ch"
                         :key="ch">{{ch}}
            </el-checkbox>
          </el-checkbox-group>
        </el-row>
        <!--填空题或者问答题-->
        <el-row v-else>
          <el-row v-if="item.questionOption != null && item.questionOption != ''"
                  style="padding-top:5px;">
            <span>{{item.questionOption}}</span>
          </el-row>
          <!--考生答案-->
          <el-row style="padding-top:5px;">
            <el-input type="textarea" :rows="10"
                      v-model="item.questionAnswer"></el-input>
          </el-row>
        </el-row>
      </el-row>
    </el-col>
    <el-col>
      <div style="height:130px;width:100px;
                    position:fixed;
                    top:280px;right:20px;
                    text-align: center;"
           v-show="isvible">
        <el-row>
          <el-col>
            <el-button type="info"
                       @click="save"
                       style="width:80px;height:40px;">保存
            </el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button type="danger"
                       @click="submit"
                       style="margin-top:15px;width:80px;height:40px;">交卷
            </el-button>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-form>
</template>

<script>
  import http from '../common/http';

  export default {
    name: "TestPaperOnline",
    data() {
      return {
        testPaperDetailPage: [],
        testPaperId: '',
        userId: '',
        isvible: true
      }
    },
    methods: {
      save() {
        console.log(this.testPaperDetailPage);
        http.postData('/api/testpaper/v1.0/list/detail/save',
          this.testPaperDetailPage)
          .then(data => {
            this.testPaperDetailPage = data;
            this.$message({
              message: '保存成功！',
              type: 'success'
            });
          });
      },
      submit() {
        this.$confirm('交卷之后，将不能修改，确认交卷?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          // 保存数据
          http.postData('/api/testpaper/v1.0/list/detail/save', this.testPaperDetailPage)
            .then(data => {
            });

          http.putData('/api/testpaper/v1.0/update/testtime', {
            'endTime': new Date().getTime(),
            'testPaperId': 220
          }).then(() => {
            // 将用户置为不可用
            http.putData('/api/sysuser/v1.0/disabled/' + this.userId)
              .then(() => {
                // 试卷提交之后，清空浏览器缓存中数据，跳转到登录页
                sessionStorage.removeItem('user');
                sessionStorage.removeItem('menus');
                sessionStorage.removeItem('Authorization');
                sessionStorage.removeItem('menuindexs');
                this.$message({
                  type: 'success',
                  message: '试卷提交成功!'
                });
                this.$router.push('/login');
              });
          });
        });
      }
    },
    created() {
      this.userId = (JSON.parse(sessionStorage.getItem('user'))).id;
      let phone = (JSON.parse(sessionStorage.getItem('user'))).phone;
      http.getData('/api/testpaper/v1.0/get/testpaperid/' + phone)
        .then(data => {
          if (data) {
            this.testPaperId = data;
            http.getData('/api/testpaper/v1.0/list/detail/'
              + this.testPaperId)
              .then(result => {
                console.log(result);
                this.testPaperDetailPage = result;
              });

            // 给考试开始字段赋值
            http.putData('/api/testpaper/v1.0/update/testtime', {
              'beginTime': new Date().getTime(),
              'testPaperId': this.testPaperId
            }).then(() => {
              console.log('考试开始！');
            });
          } else {
            this.isvible = false;
          }
        });
    }
  }
</script>

<style scoped>

</style>
