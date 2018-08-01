<template>
  <el-dialog title="考试信息" center :visible="show" @close="close" fullscreen style="font-size:32px;">
    <el-form>
      <el-col style="padding:15px;">
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
            <el-radio-group v-model="item.questionAnswer" disabled>
              <el-radio v-for="ra in item.questionOptionList"
                        :label="ra"
                        :key="ra">{{ra}}
              </el-radio>
            </el-radio-group>
          </el-row>
          <!--多选题-->
          <el-row v-else-if="item.questionTypeCode==='03'"
                  style="line-height:50px;height:50px;">
            <el-checkbox-group v-model="item.questionAnswerList"
                               disabled>
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
                        v-model="item.questionAnswer"
                        readonly></el-input>
            </el-row>
          </el-row>
        </el-row>
      </el-col>
      <el-col>
        <el-button type="danger"
                   @click="close"
                   style="width:80px;height:40px;position:fixed;top:300px;right:35px;">关闭
        </el-button>
      </el-col>
    </el-form>
  </el-dialog>
</template>

<script>
  import http from '../common/http';

  export default {
    name: "TestPaperDetailView",
    data() {
      return {
        testPaperDetailPage: []
      }
    },
    props: ['testPaperId', 'show'],
    methods: {
      close() {
        this.$emit('closeDetail', [false]);
      }
    },
    watch: {
      testPaperId: function (val) {
        http.getData('/api/testpaper/v1.0/list/detail/' + val)
          .then(data => {
            this.testPaperDetailPage = data;
          });
      }
    }
  }
</script>

<style scoped>

</style>
