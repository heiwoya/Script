/*
软件名：悦看点
下载链接：https://yuekandian.yichengw.cn/download?app=1&referrer=465331
【REWRITE】
匹配链接（正则表达式） https://yuekandian.yichengw.cn/api/v1/reward/coin?
对应重写目标   https://raw.fastgit.org/byxiaopeng/myscripts/main/ykd.js
食用方法：点击首页气泡即可获取
10 9 * * * ykd.js
############
青龙
export ykdheader='{"Host":"yuekandian.yichengw.cn".......}'
抓包head的头全部复制然后转成json格式填到上面,https://tooltt.com/header2json/
#############
/////////////////////////////////////////////////////////////////////////////
*/

const $ = new Env('悦看点');
let status;
let ykdheader= $.isNode() ? (process.env.ykdheader ? process.env.ykdheader : "") : ($.getdata('ykdheader') ? $.getdata('ykdheader') : "");
let ykdheaders= ''
status = (status = ($.getval("ykdstatus") || "1")) > 1 ? `${status}` : ""; // 账号扩展字符
let ykdhdArr = [],
    ykdcount = ''
var ykdhd = $.getdata('ykdhd');
let times = new Date().getTime();
let tz = ($.getval('tz') || '1');
let arr = [1, 2, 3, 4];
let sparr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let host=`https://yuekandian.yichengw.cn`
$.message = ''
!(async () => {
    if(!ykdheader){
        //qx
        if (typeof $request !== "undefined") {
            ykdck()
        } else {
            ykdhdArr.push($.getdata('ykdhd'))
            let ykdcount = ($.getval('ykdcount') || '2');
            for (let i = 2; i <= ykdcount; i++) {
                ykdhdArr.push($.getdata(`ykdhd${i}`))
            }
            console.log(
                `\n\n=1============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                    new Date().getTime() +
                    new Date().getTimezoneOffset() * 60 * 1000 +
                    8 * 60 * 60 * 1000
                ).toLocaleString()} ===============================================\n`
            );
            console.log(`=================== 共${ykdhdArr.length}个账号 ==================\n`)
            for (let i = 0; i < ykdhdArr.length; i++) {
                if (ykdhdArr[i]) {
                    ykdhd = ykdhdArr[i];
                    $.index = i + 1;
                    console.log(`\n【 悦看点 账号${$.index} 】`)
                    await profile() 
                }
            }
        }
    } else {
        //ql
         if (process.env.ykdheader && process.env.ykdheader.indexOf('@') > -1) {
            ykdhdArr = process.env.ykdheader.split('@');
            console.log(`您选择的是用"@"隔开\n`)
        } else {
            ykdheaders = [process.env.ykdheader]
        };
        Object.keys(ykdheaders).forEach((item) => {
            if (ykdheaders[item]) {
            ykdhdArr.push(ykdheaders[item])
            }
        })

        // ykdhd=ykdheader
        // ykdhdArr.push(ykdhd)
        // ykdhdArr.push(ykdheader1)
        console.log(
            `\n\n=============================================== 脚本执行 - 北京时间(UTC+8)：${new Date(
                new Date().getTime() +
                new Date().getTimezoneOffset() * 60 * 1000 +
                8 * 60 * 60 * 1000
            ).toLocaleString()} ===============================================\n`
        );
        console.log(`=================== 共${ykdhdArr.length}个账号 ==================\n`)
        for(let i = 0;i<ykdhdArr.length;i++){
            ykdhd = ykdhdArr[i]
            await profile() 
        }
        
    }
    //message()
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done(6))


function ykdck() {
    if ($request.url.indexOf("api/v1/reward/coin?") > -1) {

        const ykdhd = JSON.stringify($request.headers)
        if (ykdhd) $.setdata(ykdhd, `ykdhd${status}`)
        $.log(ykdhd)
        $.msg($.name, "", `悦看点${status}headers获取成功`)
    }
}



//个人信息
function profile(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/member/profile?debug=0&`,
            headers: JSON.parse(ykdhd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    $.log(`\n【欢迎吊毛用户】：${result.result.nickname}`)
                    $.log(`\n【当前账户金币】：${result.result.point}`)
                    $.log(`\n【提现券】：${result.result.ticket}`)
                    $.log(`\n【手机碎片】：${result.result.fragment}`)
                    await news()  //刷新闻
                   await $.wait(2000)
                    await daytixian() //提现
                    await $.wait(2000)
                    await allcoin(arr) //首页气泡
                    await $.wait(2000)
                    for (let p = 0; p < 10; p++) {
                        $.index = p + 1
                        $.log(`\n【开始第${p + 1}个看视频任务】`)
                        await video()
                        await $.wait(10000)
                    }
                    for (let t = 0; t < 10; t++) {
                        $.index = t + 1
                        $.log(`\n【开始第${t + 1}次抽奖】`)
                        await lottery()
                        await $.wait(20000)
                    }
                   await dones(4)//抽奖
                   await $.wait(2000)
                   await short()  //刷小视频
                   await dones(7)//抽奖
                   await $.wait(2000)
                   
                } else {
                    $.log(`\n您操作太快了~`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

function tixianxj(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/cash/exchange??`,
            headers: JSON.parse(ykdhd),
            body: `amount=0.3&gate=wechat&`
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    console.log(result.result.title)
                    console.log(result.result.message)
                } else {
                    console.log(`提现失败`)
                    console.log(result.message)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//提现
function daytixian(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/cash/exchange?`,
            headers: JSON.parse(ykdhd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.result.tixian_today == 0) {
                    console.log(`【准备开始提现】\n`)
                    await $.wait(1000)
                    await tixianxj()
                } else {
                    console.log(`【今日已提现】`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}


//看新闻准备
function news(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/reward/news/detail?`,
            headers: JSON.parse(ykdhd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    console.log(`【准备开始看资讯】\n`)
                    newstime = result.result.time * 1000
                    newstck = result.result.ticket
                    await startnews()
                    console.log(`等待60秒\n`)
                    await $.wait(60000)
                    await rewardnews(newstck)
                    await endnews()
                } else {
                    console.log(`【获取看资讯失败】`)

                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//阅读开始
function startnews(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/reward/news/interval?`,
            headers: JSON.parse(ykdhd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    console.log(`【累积阅读时间开始】\n`)
                } else {
                    console.log(`【累积阅读时间开始失败】`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//阅读结束
function endnews(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/reward/news/interval?end=1&`,
            headers: JSON.parse(ykdhd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    console.log(`【累积阅读时间结束】\n`)
                } else {
                    console.log(`【累积阅读时间结束失败】`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//看新闻15次
function rewardnews(newstck) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/reward/news?`,
            headers: JSON.parse(ykdhd),
            body: `ticket=${newstck}&`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    if (result.result['today_count'] >= 15) {
                        console.log(`【已刷资讯15次】`)
                    } else {
                        console.log(`【看资讯获得金币】：${result.result.reward}\n`)
                        sptime = result.result.time * 1000
                        sptck = result.result.ticket
                        await $.wait(sptime)
                        await rewardnews(sptck)
                    }
                } else {
                    console.log(`【看资讯失败】：${result.message}\n`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}
//获取小视频tck
function short(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/reward/video?short=1&`,
            headers: JSON.parse(ykdhd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    sptime = result.result.time * 1000
                    sptck = result.result.ticket
                    console.log(`【准备开始刷小视频】\n`)
                    await $.wait(sptime)
                    await spvideo(sptck)
                } else {
                    console.log(`【刷视频任务获取失败】：${result.message}\n`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//刷视频15次
function spvideo(sptck) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/reward/video?`,
            headers: JSON.parse(ykdhd),
            body: `ticket=${sptck}&short=1&`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    if (result.result['today_count'] >= 15) {
                        console.log(`【已刷视频15次】`)
                    } else {
                        console.log(`【刷视频获得金币】：${result.result.reward}\n`)
                        sptime = result.result.time * 1000
                        sptck = result.result.ticket
                        await $.wait(sptime)
                        await spvideo(sptck)
                    }
                } else {
                    console.log(`【刷视频失败】：${result.message}\n`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}
//首页金币 4次
async function allcoin(Array) {
    for (const i of Array) {
        await $.wait(5000)
        await coin(i)
    }
}
//首页金币
function coin(num) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/reward/coin?`,
            headers: JSON.parse(ykdhd),
            body: `id=${num}&`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    $.log(`\n领取成功金币：${result.result.coin}`)
                    await $.wait(2000)
                } else {
                    $.log(`\n您操作太快了~`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}
//视频金币 10次
async function allvideo(Array) {
    for (const i of Array) {
        await $.wait(5000)
        await video()
    }
}
//视频任务
function video(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/zhuan/video?`,
            headers: JSON.parse(ykdhd),
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    tick = result.result.ticket
                    $.log(`\n任务名称：${result.result.tip}`)
                    $.log(`\n获得金币：${result.result.coin}`)
                    $.log(`\n获得提现券：${result.result.coupon}`)
                    await $.wait(37000)
                    await ticket(tick)
                } else {
                    $.log(`\n您操作太快了~`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
function ticket(num) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/ad/log?ticket=${num}&type=5&`,
            headers: JSON.parse(ykdhd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    $.log(`\n观看广告成功：${result.result.status}`)
                    await $.wait(2000)
                    await coupon()
                } else {
                    $.log(`\n观看广告失败`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}
//任务倒计时
function coupon(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/zhuan/coupon?`,
            headers: JSON.parse(ykdhd),
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    time = result.result.items[1].time * 1000
                    $.log(`\n执行下个视频任务时间：${time}`)
                    await $.wait(time)
                } else {
                    $.log(`\n获取时间失败`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//获取抽奖参数
function lottery(timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/reward/lottery/index?`,
            headers: JSON.parse(ykdhd),
        }
        $.get(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    lotteryid = result.result.ticket
                    $.log(`\n开始抽奖`)
                    await $.wait(200)
                    await lotterycj(lotteryid)
                } else {
                    $.log(`\n没有获取到抽奖参数`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}
//开始抽奖
function lotterycj(num) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/reward/lottery/index?`,
            headers: JSON.parse(ykdhd),
            body: `ticket=${num}&`,
        }
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    $.log(`\n抽奖成功`)
                } else {
                    $.log(`\n抽奖失败`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, 0)
    })
}
//抽奖领取
function dones(id,timeout = 0) {
    return new Promise((resolve) => {
        let url = {
            url: `${host}/api/v1/zhuan/done?`,
            headers: JSON.parse(ykdhd),
            body: `id=${id}&`,
        }//4 =抽奖，7 = 看视频
        $.post(url, async (err, resp, data) => {
            try {
                result = JSON.parse(data)
                if (result.code == 0) {
                    $.log(`\n获得金币：${result.result.coin}`)
                } else {
                    $.log(`\n领取失败`)
                }
            } catch (e) {

            } finally {

                resolve()
            }
        }, timeout)
    })
}

//领现金看广告
//https://yuekandian.yichengw.cn/api/v1/reward/help/click?
//https://yuekandian.yichengw.cn/api/v1/ad/log?ticket=xxx&type=5&
//https://yuekandian.yichengw.cn/api/v1/reward/help/index?

//https://yuekandian.yichengw.cn/api/v1/reward/barrier/index?  no=1& 1-7
function message() {
    if (tz == 1) { $.msg($.name, "", $.message) }
}

function RT(X, Y) {
    do rt = Math.floor(Math.random() * Y);
    while (rt < X)
    return rt;
}
//Env.min.js  来源https://raw.fastgit.org/chavyleung/scripts/master/Env.min.js
function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),n={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(n,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:i,statusCode:r,headers:o,rawBody:h},s.decode(h,this.encoding))},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:h}=t;e(null,{status:s,statusCode:r,headers:o,rawBody:h},i.decode(h,this.encoding))},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r))),!this.isMuteLog){let t=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];t.push(e),s&&t.push(s),i&&t.push(i),console.log(t.join("\n")),this.logs=this.logs.concat(t)}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}