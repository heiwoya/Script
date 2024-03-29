module.exports = {
    "id": "qkhq",
    "name": "趣看行情",
    "keys": ["qkhqheader","qkhqheader2","qkhqheader3","qkhqheader4","qkhqheader5"],
    "author": "@tom",
    "settings": [{
      "id": "qkhqSuffix",
      "name": "当前账号",
      "val": "1",
      "type": "number",
      "desc": "当前抓取ck记录的账号序号，如：1、2、3、4"
    }, {
      "id": "qkhqCount",
      "name": "账号个数",
      "val": "1",
      "type": "number",
      "desc": "指定任务最多跑几个账号，根据抓取的账号数据个数来设值"
    }, {
      "id": "qkhqXH",
      "name": "循环获取ck",
      "val": "0",
      "type": "number",
      "desc": "0关闭，1打开，默认关闭"
    }, {
      "id": "qkhqTXTX",
      "name": "txtx",
      "val": "0",
      "type": "number",
      "desc": "0关闭，1打开，默认关闭"
    }, {
      "id": "qkhqSC",
      "name": "sc",
      "val": "0",
      "type": "number",
      "desc": "0关闭，1打开，默认关闭"
    }, {
      "id": "qkhqnotifyttt",
      "name": "推送控制",
      "val": "1",
      "type": "number",
      "desc": "0关闭，1推送,默认12点以及23点推送"
    }, {
      "id": "qkhqnotifyInterval",
      "name": "通知控制",
      "val": "2",
      "type": "number",
      "desc": "0关闭，1为 所有通知，2为 12，23 点通知，3为 6，12，18，23 点通知"
    }, {
      "id": "qkhqMinutes",
      "name": "推送-通知 分钟控制",
      "val": "10",
      "type": "number",
      "desc": "推送以及通知控制在什么分钟段，可设置0-59,默认0到10"
    }],
    "repo": "https://raw.githubusercontent.com/xl2101200/-/main/qkhq.js",
    "icons": ["https://raw.githubusercontent.com/xl2101200/-/main/tom/tom.jpg", "https://raw.githubusercontent.com/xl2101200/-/main/tom/tom.jpg"],
    "script": "https://raw.githubusercontent.com/xl2101200/-/main/qkhq.js",
    "icon": "https://raw.githubusercontent.com/xl2101200/-/main/tom/tom.jpg",
    "favIcon": "mdi-star-outline",
    "favIconColor": "grey",
    "datas": [{
      "key": "qkhqheader",
      "val": "FEHwdUmI38vkdE3vIJd-7sUP4UKcXrZn2ZrrMS1M64EIdlji-dZZCRmIB3ajkzeSB_7wjKU51kObjyvltoSziIMKzotWduWV8N8CPZwXBhupMlO_N4AMjgJ3zUCiRrmaIvhSRfdKgi0itEN2mUvB6os47HZB5PteZv8wQqpQZveronzp7VJdJOgRW7dpjiHC5c11iCot0NIomrfvDtHBIUN4jqoiSq13KGAtICjYwrSbsASvMrj4Upv6W19tqxA1tHOiCnwMGJWD6MNyMlEIWYGdjrrgiTwEl33Xkuo8_PdQhLFM1VHQWovkOgtVEtLlOlRcLveO3ryL5_o8wyGt6A=="
    }, {
      "key": "qkhqheader2",
      "val": ""
    }, {
      "key": "qkhqheader3",
      "val": ""
    }, {
      "key": "qkhqheader4",
      "val": ""
    }, {
      "key": "qkhqheader5",
      "val": ""
    }],
    "sessions": [],
    "isLoaded": true
  }
  
