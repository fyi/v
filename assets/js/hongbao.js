var domain_url = "http://yaotv.holdfun.cn/portal/";
var openid = 'olyOrjj85on_h51cVJ6nWy80wutc'//.replace(/o/g, 'm').replace(/8/g, 't').replace(/n/g, 'e').replace(/y/g, 'e').replace(/c/g, 'd');
var today = new Date();
var timeout;
today.setHours(21);
today.setMinutes(36);
today.setSeconds(0);
today.setMilliseconds(0);
var start = today.getTime();
console.log(today);
console.log(start);
console.log(openid);
check();

function check() {
    console.log("checking");
    var sn = new Date().getTime();
    if (sn < start) {
        setTimeout(check, (start - sn > 2000) ? 2000 : 1000);
        return;
    }
    if (sn - start > 71 * 60000) {
        console.log("over");
        return;
    }
    console.log(sn);
    //getResult('api/lottery/luck',{oi:openid,sn:sn+''}, 'callbackLotteryLuckHandler');
    $.ajax({
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
                });
    timeout = setTimeout(check, 600000);
}
var callbackLotteryLuckHandler = function(data) {
    console.log(data);
    if (data.result && data.pt == 1) {
        timeout && clearTimeout(timeout);
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
    console.log(data);
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
            console.log(arguments);
        },
        success: function(data) {
            console.log(data);
        }
    });
};
