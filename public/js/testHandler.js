

function gettestscript() {
    var decorator = $(`#test-editor`).data('ace');
    return decorator.element[0].value
}
$(document).ready(() => {
    $(`#test-editor`).val(`import http from "k6/http";
    import { check, sleep } from "k6";
    export let options = {
      vus: 0,
      duration: "1s"
    };
    export default function() {
      let res =  http.get(#digest.selected<:id=abcd>#);
      check(res, {
        "is status 200": r => r.status === 200
      });
     sleep(1)
    };
         `)
    $(`#test-editor`).ace({
        theme: 'solarized_dark',
        lang: 'javascript',
        height: '100%',
        'font-size': '15px'
    })
    $('#run_test').click(() => {
     try{   var toCheck;
        b = false
        for (i = 0; i < _apis.length; i++) {
            console.log(i)
            if ($(`#testOn_${_apis[i].id}`).prop('checked')) {
                toCheck = _apis[i];
                b = true;
            }
            if (b == true) {
                break;
            }
        }
        console.log(toCheck)
        var data = gettestscript()
        var splitted = data.split('#')
        for (i = 0; i < splitted.length; i++) {
            if ('digest' == splitted[i].split('.')[0]) {
                configs = []
                regex = new RegExp("\<(.*?)\>")
                splitted[i].split('&&').forEach(arg => {
                    
                    if(regex.exec(arg)!=null){
                        console.log('hello')
                    var val =regex.exec(arg)[1]
                    var temp = val.split('=')
                    configs.push({
                        data: temp[0],
                        val: temp[1]
                    })
                }
                })
                if(configs.length>0){var _r = toCheck.route.split('/')
                _r.forEach((e, k) => {
                    var a = configs.find(x => x.data == e)

                    if (a) {
                        _r[k] = a.val
                    }
                })
                toCheck.route = _r.join('/')}
                
                splitted[i] = _host + toCheck.route
            }

        }
        var res = splitted.join('"')
        var _testid = shortid()
        M.toast({html:`<span class="material-icons" style="color:#05dc5c">
        notification_important
        </span> Test ${_testid} has been deployed`,classes: 'rounded'})
        $('.test_logger').prepend(`<div class="row"><div class="metaData" style="color:#05dc5c">[${new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}]:[${ _host + toCheck.route}] Test ${_testid} has been deployed</div><br></div>`)
        axios.post('http://localhost:5432/api/runTest', {
            script: res,
            testId: _testid
        }).then(async rep => {
            var nex = ''
            for (i = 0; i < rep.data.length; i++) {
                if (rep.data[i] == '\n' || rep.data[i] == '\r') {
                    nex += '<br>&nbsp;'
                } else if (rep.data[i]==' ') {
                    nex += '&nbsp;'
                } else {
                    nex += rep.data[i]
                }
            }
            M.toast({html:`<span class="material-icons" style="color:#05dc5c">
        notification_important
        </span> Test ${_testid} has Completed`,classes: 'rounded'})
            $('.test_logger').prepend(`<div class="row"><div class="metaData" style="color:#05dc5c">[${new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}]:[${ _host + toCheck.route}] Test ${_testid} has completed with the following results</div><br>${nex}</div>`)
        }).catch(err=>{console.log(err)})
        //  console.log($(this).attr('id'))
        // console.log($(this).prop('checked'))



    }catch(e){
        M.toast({html: `<span class="material-icons" style="color:#ff0051">
        error
        </span>  ${e}`,classes:'rounded'})
    }
    })
    
})