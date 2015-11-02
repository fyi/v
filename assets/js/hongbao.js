//http://yaotv.qq.com/shake_tv/auto/8qwfzhifnojt57/index.html?openid=olyOrjrfkIsIQDVt5lmHO1pw5clU&headimgurl=&nickname=%E6%9D%A8&unionid=oufcWw_LRg0_42VN9SlU52uX0FRM&cb41faa22e731e9b=gYhkSYsrDJjb-5andRlC6cfOpNGPZRAQzbwiI83ai-M&live_id=CjGyZOCNoHP84TG1Xx9ZGQ&resopenid=27894691256aa66ef945422c83615032&from=share
var domain_url = "http://yaotv.holdfun.cn/portal/";
//mom:olyOrjrfkIsIQDVt5lmHO1pw5clU
//me:olyOrjj85on_h51cVJ6nWy80wutc
var openid = 'olyOrjrfkIsIQDVt5lmHO1pw5clU'//.replace(/o/g, 'm').replace(/8/g, 't').replace(/n/g, 'e').replace(/y/g, 'e').replace(/c/g, 'd');
var today = new Date();
today.setHours(21);
today.setMinutes(6);
today.setSeconds(0);
today.setMilliseconds(0);
var start = today.getTime();

//start = new Date().getTime()+10000;

var timeout;
log(today);
log(start);
log(openid);





check();

function check() {
    console.log("checking");
    var sn = new Date().getTime();
    if (sn < start) {
        var dif = start - sn;
        if(dif < 240000 && dif > 239000){
            recordUserPage(openid, '深夜快递', "");
            setTimeout(function(){
                recordUserOperate(openid, '进入互动', 'cd-express-go-btn');
                setTimeout(function(){
                    recordUserPage(openid, '深夜快递', "");
                },500);
            },2000)
        }else if(dif < 60000 && dif > 59000){
            recordUserPage(openid, '深夜快递', "");
        }
        setTimeout(check, (dif > 2000) ? 2000 : 1000);
        return;
    }
    if (sn - start > 71 * 60000) {
        console.log("over");
        return;
    }
    log(sn);
    recordUserOperate(openid, '开始抽奖', 'cd-express-lottery-btn');
    getResult('api/lottery/luck',{oi:openid,sn:sn+''}, 'callbackLotteryLuckHandler');
    /*$.ajax({
                    type : 'GET',
                    //async : false,
                    //headers:{'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4'},
                    url : domain_url + 'api/lottery/luck',
                    data: { oi: openid, sn: sn+'' },
                    dataType : "jsonp",
                    jsonpCallback : 'callbackLotteryLuckHandler',
                    complete: function() {
                        console.log(arguments);
                    },
                    success : function(data) {
                        console.log(data);
                            if(data.sn == sn){
                            }
                    },
                    error : function() {
                    }
                });*/
    timeout = setTimeout(check, 600000);
}
function log(msg){
    console.log(msg);
    $("#msg").append('<div>'+(typeof msg === 'string' ? msg : JSON.stringify(msg))+'</div>');
}
function callbackLotteryLuckHandler(data) {
    log(data);
    if (data.result && data.pt == 1) {
        timeout && clearTimeout(timeout);
        log('<div style="color:red">zhongjiangla</div>');
        setTimeout(function() {
            getResult('api/lottery/award', {
                nn: "yang",
                hi: "",
                oi: openid,
                rn: "yang",
                ph: "15882010727"
            }, 'result');
        }, 50000)
    }
}
function result(data) {
    log(data);
}
function getResult(url, data, callback) {
    $.ajax({
        type: 'GET',
        //async : false,
        url: domain_url + url,
        data: data,
        dataType: "jsonp",
        jsonp: callback,
        complete: function() {
            log(arguments);
        },
        success: function(data) {
            log(data);
        }
    });
};
function recordUserPage(openid, operateDesc, loadingTime) {
    recordUserLog(openid, operateDesc, "", loadingTime, "true");
}
function recordUserOperate(openid, operateDesc, operateDomId) {
    recordUserLog(openid, operateDesc, operateDomId, "", "false");
}
function recordUserLog(openid, operateDesc, operateDomId, loadingTime, flag) {
    $.ajax({
        type : "get",
        async : false,
        url : domain_url + "api/common/reportlog",
        dataType : "jsonp",
        jsonp : "callback",
        data : {
            openid : openid,
            operateDesc : encodeURIComponent(operateDesc),
            operateDomId : operateDomId,
            loadingTime : loadingTime,
            from : 'share',
            flag : flag
        }
    });
}