import Mock from 'mockjs'
const List = []
const List1 = []
const List2 = []
const List3 = []
const count = 20
const statu = ['请假', '未到', '已到', '已到', '已到', '已到', '请假', '已到', '请假', '迟到', '请假', '已到', '请假', '已到', '请假', '已到', '请假', '迟到', '请假', '迟到']
const time = ['--:--:--', '--:--:--', '08:00:00', '07:50:00', '08:02:00', '07:23:00', '--:--:--', '08:30:00', '--:--:--', '09:01:00', '--:--:--', '08:40:00', '--:--:--', '08:21:00', '--:--:--', '08:43:00', '--:--:--', '09:30:00', '--:--:--', '09:21:00']
let askForLeave = 0
let unarrived = 0
let arrived = 0
let later = 0
const List4 = []
for (let i = 0; i < count; i++) {
  List.push(Mock.mock({
    sno: 101,
    sname: '摇滚兔子',
    ssex: '男',
    sclass: '101',
    sprofession: 'Vue.js',
    status: statu[i],
    note: '无',
    time: time[i],
    date: '2018.9.' + +(i + 1)
  }))
}
let askForLeaveMid = 0
let unarrivedMid = 0
let arrivedMid = 0
let laterMid = 0
for (let i = 0; i < List.length; i++) {
  switch (statu[i]) {
    case '请假':
      askForLeave = askForLeave + 1
      break
    case '未到':
      unarrived = unarrived + 1
      break
    case '已到':
      arrived = arrived + 1
      break
    case '迟到':
      later = later + 1
      break
  }
}
for (let i = 0; i < List.length / 2; i++) {
  switch (statu[i]) {
    case '请假':
      askForLeaveMid = askForLeaveMid + 1
      break
    case '未到':
      unarrivedMid = unarrivedMid + 1
      break
    case '已到':
      arrivedMid = arrivedMid + 1
      break
    case '迟到':
      laterMid = laterMid + 1
      break
  }
}
const breakRule = List1.length
const breakRuleMid = parseInt(List1.length / 2)

const extrude = List2.length
const extrudeMid = parseInt(List2.length / 2)
for (let i = List.length - 1; i > List.length - 6; i--) {
  List4.push(Mock.mock({
    sno: List[i].sno,
    sname: List[i].sname,
    ssex: List[i].ssex,
    sclass: List[i].sclass,
    sprofession: List[i].sprofession,
    time: List[i].time,
    status: List[i].status,
    note: List[i].note
  }))
}
const great = List3.length
const greatMid = parseInt(List3.length / 2)
let dailyCount = {
  arrived,
  unarrived,
  later,
  askForLeave,
  arrivedMid,
  unarrivedMid,
  laterMid,
  askForLeaveMid,
  breakRule,
  extrude,
  great,
  breakRuleMid,
  extrudeMid,
  greatMid
}
const dailyListCount = List.length
export default {
  getList: config => {
    // sname: undefined,
    // time: undefined,
    // order: '+id',
    // sclass: undefined
    return {
      items: List,
      item: List4,
      breakRule: List1,
      extrude: List2,
      great: List3,
      dailyCount: dailyCount,
      dailyListCount: dailyListCount
    }
  },

  getParticipation: () => ({
    id: 120000000001,
    author: { key: 'mockPan' },
    source_name: '原创作者',
    category_item: [{ key: 'global', name: '全球' }],
    comment_disabled: true,
    content: '<p>我是测试数据我是测试数据</p><p><img class="wscnph" src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943" data-wscntype="image" data-wscnh="300" data-wscnw="400" data-mce-src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>"',
    content_short: '我是测试数据',
    display_time: +new Date(),
    image_uri: 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3',
    platforms: ['a-platform'],
    source_uri: 'https://github.com/PanJiaChen/vue-element-admin',
    status: 'published',
    tags: [],
    title: 'vue-element-admin'
  }),
  createParticipation: () => ({
    data: 'success'
  }),
  updateParticipation: function(tempList) {
    const temp = JSON.parse(tempList.body)
    for (let i = 0; i < 5; i++) {
      if (List4[i].time === temp.time) {
        List4[i].sno = temp.sno
        List4[i].sname = temp.sname
        List4[i].ssex = temp.ssex
        List4[i].sclass = temp.sclass
        List4[i].sprofession = temp.sprofession
        List4[i].time = temp.time
        List4[i].status = temp.status
        List4[i].note = temp.note
      }
    }
    for (let i = 0; i < List.length; i++) {
      if (List[i].time === temp.time) {
        if (List[i].status === '请假') {
          askForLeave = askForLeave - 1
        } else if (List[i].status === '迟到') {
          later = later - 1
        } else if (List[i].status === '已到') {
          arrived = arrived - 1
        } else {
          unarrived = unarrived - 1
        }
        switch (temp.status) {
          case '请假':
            askForLeave = askForLeave + 1
            break
          case '未到':
            unarrived = unarrived + 1
            break
          case '已到':
            arrived = arrived + 1
            break
          case '迟到':
            later = later + 1
            break
        }
        List[i].sno = temp.sno
        List[i].sname = temp.sname
        List[i].ssex = temp.ssex
        List[i].sclass = temp.sclass
        List[i].sprofession = temp.sprofession
        List[i].time = temp.time
        List[i].status = temp.status
        List[i].note = temp.note
      }
    }
    dailyCount = {
      arrived,
      unarrived,
      later,
      askForLeave,
      arrivedMid,
      unarrivedMid,
      laterMid,
      askForLeaveMid,
      breakRule,
      extrude,
      great,
      breakRuleMid,
      extrudeMid,
      greatMid
    }
    console.log(dailyCount)
  }
}
