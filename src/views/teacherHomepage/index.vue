<template>
  <div class="dashboard-editor-container">
        <el-row class="panel-group" :gutter="20">
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class='card-panel' @click="goToStudentBasic">
                <div class="card-panel-icon-wrapper icon-people">
                    <svg-icon icon-class="peoples" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">学生基本信息</div>
                    <div class="card-panel-detail">日常表现/评测报告</div>
                </div>
            </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="goToDailyWork">
                <div class="card-panel-icon-wrapper icon-form">
                    <svg-icon icon-class="form" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">作业管理</div>
                    <div class="card-panel-detail">学生作业 </div>
                </div>
            </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="goToReviewe">
                <div class="card-panel-icon-wrapper icon-clipboard">
                    <svg-icon icon-class="clipboard" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">评定系统</div>
                    <div class="card-panel-detail">评定</div>
                </div>
            </div>
            </el-col>
            <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
            <div class="card-panel" @click="goToLeave">
                <div class="card-panel-icon-wrapper icon-table">
                    <svg-icon icon-class="table" class-name="card-panel-icon" />
                </div>
                <div class="card-panel-description">
                    <div class="card-panel-text">其他</div>
                    <div class="card-panel-detail">学生请假</div>
                </div>
            </div>
            </el-col>
        </el-row>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="10">
            <el-card>
                <div slot="header" class="clearfix">
                    <span><svg-icon icon-class="table" />&nbsp;系统公告</span>
                    <el-button style="float: right; padding: 3px 0" type="text" @click="goToAnnocument" >更多</el-button>
                </div>
                <el-table :data="announcementData" style="width: 100%"  >
                    <el-table-column prop="atitle" label="公告"> 
                    </el-table-column>
                    <el-table-column fixed="right" prop="atime" label="发布日期" width="100" align="center"> 
                    </el-table-column>
                </el-table>
            </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="14">
            <el-row :gutter="20">
                <el-col :xs="24" :sm="24" :lg="13">
                    <el-row :gutter="20">
                        <el-card>
                            <div slot="header" class="clearfix" style="align:center">
                                <span><svg-icon icon-class="example" />&nbsp;出勤概况</span>
                                <el-button @click="goToParticipation" style="float: right; padding: 3px 0" type="text">更多</el-button>
                            </div>
                            <el-row type="flex" justify="center" :gutter="20">
                                <el-col :xs="24" :sm="24" :lg="11">
                                    <div style="width:126px;margin:0px auto"><el-progress type="circle" :percentage="arrived*10" status="success"></el-progress></div>
                                    <div style="width:126px;margin:30px auto 0px auto"><el-button @click="goToParticipation" type="primary">&nbsp;&nbsp;&nbsp;查看详情&nbsp;&nbsp;&nbsp;</el-button></div>
                                </el-col>
                                <el-col :xs="24" :sm="24" :lg="13">
                                    <el-row :gutter="1">
                                        <el-alert title="" type="success" :closable="false">
                                            <div style="line-height:30px;font-size:18px;">已到:{{arrived}}人</div>
                                        </el-alert>
                                    </el-row>
                                    <el-row :gutter="1">
                                        <el-alert title="" type="info" :closable="false">
                                            <div style="line-height:30px;font-size:16px;">请假:{{askForLeave}}人</div>
                                        </el-alert>
                                    </el-row>
                                    <el-row :gutter="1">
                                        <el-alert title="" type="warning" :closable="false">
                                            <div style="line-height:30px;font-size:16px;">迟到:{{later}}人</div>
                                        </el-alert>
                                    </el-row>
                                    <el-row :gutter="1">
                                        <el-alert title="" type="error" :closable="false">
                                            <div style="line-height:30px;font-size:16px;">未到:{{unarrived}}人</div>
                                        </el-alert>
                                    </el-row>
                                </el-col>
                            </el-row>
                        </el-card>
                    </el-row>
                    <el-row :gutter="20">
                        <el-card>
                            <div slot="header" class="clearfix" style="align:center">
                                <span><svg-icon icon-class="form" />&nbsp;学生作业概况</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="goToWorkManagement">更多</el-button>
                            </div>
                            <el-table :data="taskData" style="width: 100%">
                                <el-table-column prop="title" width="150px" align="center" label="学生作业">
                                    <template slot-scope="scope">
                                        <span>
                                        {{scope.row.title}}
                                        </span>
                                    </template>
                                </el-table-column>
                                <el-table-column  prop="endtime" label="截止时间" align="center">
                                    <template slot-scope="scope">
                                        <i class="el-icon-time"></i>
                                        <span>{{scope.row.endtime}}</span>
                                    </template>            
                                </el-table-column>
                                <el-table-column label="上交进度" width="150px" align="center" fixed="right">
                                    <template slot-scope="scope">
                                    <el-progress :percentage="scope.row.submit/scope.row.sum*100" :show-text="false"></el-progress><span>{{scope.row.submit}}/{{scope.row.sum}}</span>
                                </template>         
                                </el-table-column>
                            </el-table>
                        </el-card>
                    </el-row>
                </el-col>
                <el-col :xs="24" :sm="24" :lg="11">
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-card>
                                <div slot="header" class="clearfix" style="align:center">
                                    <span><svg-icon icon-class="user" />&nbsp;教师信息</span>
                                    <el-button style="float: right; padding: 3px 0" type="text" @click="goToInformation">修改个人信息</el-button>
                                </div>
                                <el-row type="flex" justify="center" :gutter="20">
                                    <el-col :span="24">
                                        <div style="width:100%">
                                            <div style="line-height:28px;width:150px;margin:0px auto">
                                                <img style="width:150px;height:150px;border-radius:75px" :src="avatar"/>
                                            </div>
                                            <div style="line-height:28px;width:150px;margin:0px auto">&nbsp;<svg-icon icon-class="people" />&nbsp;&nbsp;姓名:&nbsp;&nbsp;{{tname}}</div>
                                            <div style="line-height:28px;width:150px;margin:0px auto">&nbsp;<i class="el-icon-info"/>&nbsp;&nbsp;工号:&nbsp;&nbsp;{{tno}}</div>
                                        </div>
                                    </el-col>
                                </el-row>
                            </el-card>
                        </el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="24">
                            <el-card>
                                <div slot="header" class="clearfix">
                                    <span><svg-icon icon-class="clipboard" />&nbsp;备忘录</span>
                                </div>
                                <el-tag :key="tag" v-for="tag in dynamicTags" closable :disable-transitions="false" @close="handleClose(tag)" class="el-tag-todoList"> {{tag}} </el-tag>
                                    <el-input class="input-new-tag" v-if="inputVisible" v-model="inputValue" ref="saveTagInput" size="small" @keyup.enter.native="handleInputConfirm" @blur="handleInputConfirm" >
                                    </el-input>
                                <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新 事 务</el-button>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
  </div>
</template>

<script>
    import { fetchList } from '@/api/announcement'
    import { fetchWorkInfoList } from '@/api/work'
    import { getStatisticsByWid } from '@/api/studentwork'
    import { mapGetters } from 'vuex'
    import { fetchListDaily } from '@/api/participation'
    
    import { getCurrentUser } from '@/api/user'
    export default {
    
      data() {
        return {
          dailyList: null,
          active: null,
          announcementData: null,
          taskData: null,
          participation: [],
          askForLeave: 0,
          arrived: 0,
          unarrived: 0,
          later: 0,
          figure: 0,
          dynamicTags: ['今晚检查学生学生作业', '周五下午四点行政楼开会', '今天有5人迟到', '提醒课代表收作业', '前台使用的技术是Vue.js', '主要的组件是Element UI', '后台使用的是SQLserver'], // 动态编辑标签
          inputVisible: false,
          inputValue: '',
    
          signIn: false,
          signInText: '签到',
          signInButton: false,

          listQuery: {
            page: 1,
            limit: 15,
            sort: '-id'
          },
          taskQuery: {
            page: 1,
            limit: 5
          },
          wid: null,
          tno: null,
          tname: null
        }
      },
      computed: {
        ...mapGetters([
          'avatar'
        ])
      },
      created() {
        this.getAnnouncementData()
        this.getTaskData()
        getCurrentUser().then(response => {
          this.tno = response.data.user.tno
          this.tname = response.data.user.tname
        })
        // if (this.$storage.get('worklist') !== null) {
    
        //   console.log(12)
        //   console.log(this.$storage.get('worklist'))
        // } else {
        this.getList()
        // }
      },
      methods: {
        getList() {
          console.log(1)
          fetchListDaily().then(response => {
            const date = new Date().getFullYear() + '/' + (+new Date().getMonth() + +1) + '/' + (+new Date().getDate())
            this.dailyList = response.data.items
            const figure = response.data.total
            console.log(date)
            for (let i = 0; i < figure; i++) {
              if (this.dailyList[i].date === date) {
                console.log(1)
                this.participation.push({
                  sid: this.dailyList[i].sid,
                  sclass: this.dailyList[i].sclass,
                  sname: this.dailyList[i].sname,
                  status: this.dailyList[i].status,
                  date: this.dailyList[i].date,
                  time: this.dailyList[i].time,
                  reason: this.dailyList[i].reason
                })
              }
            }
            this.askForLeave = 0
            this.arrived = 0
            this.unarrived = 0
            this.later = 0
            console.log(this.dailyList.length)
            for (let i = 0; i < this.participation.length; i++) {
              if (this.participation[i].status === '已到') {
                this.arrived++
              } else if (this.participation[i].status === '请假') {
                this.askForLeave++
              } else if (this.participation[i].status === '未到') {
                this.unarrived++
              } else if (this.participation[i].status === '迟到') {
                this.later++
              }
            }
            console.log(2)
            console.log(this.arrived)
            console.log(this.participation)
          })
        },
    
        goToInformation() {
          this.$router.push({ path: '/teacherInformation/index' })
        },
        goToWorkManagement() {
          this.$router.push({ path: '/workManagement/index' })
        },
        goToStudentBasic() {
          this.$router.push({ path: '/studentsInformation/index' })
        },
        goToDailyWork() {
          this.$router.push({ path: '/workManagement/index' })
        },
        goToReviewe() {
          this.$router.push({ path: '/reviewSystem/midReviewIndex' })
        },
        goToLeave() {
          this.$router.push({ path: '/dailyPerformance/index' })
        },
        goToParticipation() {
          this.$router.push({ path: '/dailyPerformance/participation' })
        },
        goToAnnocument() {
          this.$router.push({ path: '/other/announcement' })
        },
        handleClose(tag) { // 动态编辑标签
          this.dynamicTags.splice(this.dynamicTags.indexOf(tag), 1)
        },

        showInput() {
          this.inputVisible = true
          this.$nextTick(_ => {
            this.$refs.saveTagInput.$refs.input.focus()
          })
        },

        handleInputConfirm() {
          const inputValue = this.inputValue
          if (inputValue) {
            this.dynamicTags.push(inputValue)
          }
          this.inputVisible = false
          this.inputValue = ''
        },

        open2() { // 签到弹窗
          this.$message({
            message: '签到成功!',
            type: 'success'
          })
          this.signIn = true
          this.signInText = '已签到'
          this.signInButton = true
        },
        getAnnouncementData() {
          fetchList(this.listQuery).then(response => {
            this.announcementData = response.data.items
          })
        },
        getTaskData() {
          fetchWorkInfoList(this.taskQuery).then(response => {
            this.taskData = response.data.items
            for (let i = 0; i < this.taskData.length; i++) {
              this.wid = this.taskData[i].wid
              getStatisticsByWid({ wid: this.wid }).then(response => {
                this.taskData[i].submit = response.data.complete
                this.taskData[i].sum = response.data.total
              })
            }
          })
        },
        indexMethod(index) {
          return index + 1
        }
      }
    }
  </script>


<style rel="stylesheet/scss" lang="scss">
    .el-tag-todoList {//动态编辑标签
        margin: 5px;
        line-height: 30px;
        height: 30px;
        font-size: 16px;
        color: black;
    }
    .button-new-tag {
        margin: 5px;
        height: 32px;
        line-height: 30px;
        padding-top: 0;
        padding-bottom: 0;
    }
    .input-new-tag {
        width: 90px;
        margin-left: 10px;
        vertical-align: bottom;
    }
    .el-row {
        margin-bottom: 15px;
        &:last-child {
        margin-bottom: 0;
        }
    }
    .bg-purple-dark {
        background: #99a9bf;
    }
    .bg-purple {
        background: #d3dce6;
    }
    .bg-purple-light {
        background: #e5e9f2;
    }
    .grid-content {
        border-radius: 4px;
        min-height: 36px;
    }
    .row-bg {
        padding: 10px 0;
        background-color: #f9fafc;
    }

    .dashboard-editor-container {
        padding: 32px;
        background-color: rgb(240, 242, 245);
    }

    .el-table .danger-row{
        background: rgb(248, 240, 240);
        color:rgb(255, 0, 0);
    }
    .el-table .warning-row{
        background: rgb(253, 246, 236);
        color:rgb(220, 162, 60);
    }
    .el-table .success-row{
        background: rgb(240, 249, 235);
        color:rgb(103, 194, 58);
    }

    .chart-wrapper {
        background: #fff;
        padding: 16px 16px 0;
        margin-bottom: 32px;
    }
    .panel-group {
    .card-panel-col{
        margin-bottom: 5px;
    }
    .card-panel {
        height: 108px;
        cursor: pointer;
        font-size: 12px;
        position: relative;
        overflow: hidden;
        color: #666;
        background: #fff;
        box-shadow: 4px 4px 40px rgba(0, 0, 0, .05);
        border-color: rgba(0, 0, 0, .05);
        &:hover {
        .card-panel-icon-wrapper {
            color: #fff;
        }
        .icon-people {
            background: #40c9c6;
        }
        .icon-form {
            background: #36a3f7;
        }
        .icon-clipboard {
            background: #f4516c;
        }
        .icon-table {
            background: #34bfa3
        }
        }
        .icon-people {
            color: #40c9c6;
        }
        .icon-form {
            color: #36a3f7;
        }
        .icon-clipboard {
            color: #f4516c;
        }
        .icon-table {
            color: #34bfa3
        }
        .card-panel-icon-wrapper {
            float: left;
            margin: 14px 0 0 14px;
            padding: 16px;
            transition: all 0.38s ease-out;
            border-radius: 6px;
        }
        .card-panel-icon {
            float: left;
            font-size: 48px;
        }
        .card-panel-description {
            float: right;
            font-weight: bold;
            margin: 26px;
            margin-left: 0px;
            width:115px;
            .card-panel-text {
                line-height: 30px;
                color: rgba(0, 0, 0, 0.45);
                font-size: 18px;
                margin-bottom: 12px;
                text-align: right;
                // background: gray;
            }
            .card-panel-detail {
                font-size: 12px;
                text-align: right;
                // background: red;
            }
        }
    }
}
</style>
