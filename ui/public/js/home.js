var _apis = []
var _host = null

$(document).ready(() => {
    $('.sidenav').sidenav();

    var default_headers = {
        'Authorization': 'Bearer  ',
        'Cache-Control': 'no-cache',
        'Digest-token': '<calculated>',
        'Host': '<calculated>',
        'User-Agent': 'DigestJsRuntime/7.24.0',
        'Accept': '*/*',
        'Accept-Encoding': 'gzip, deflate, br',
        'Connection': 'keep-alive'
    }
    $("#global_config_editor_id").val(JSON.stringify({
        headers: default_headers
    }, null, "\t"))
    $('#global_config_editor_id').ace({
        theme: 'solarized_dark',
        lang: 'json',
        height: '300px',
        width: 'auto'
    })

    const holders = {
        client_info: $('.client-info'),
        api_list: $('.api-list')
    }

    function buildTest(data) {
        var template = `
          <div class="card-panel row test-apis" style="font-size:15px;margin:10px">
          <div class='col s12 m2 method'>${data.method}</div>
          <div class='col s12 m6  route' style="overflow-x:scroll; ">${data.route}</div>
          <div class='col s12 m4'><div class="switch" >
          <label>
            Off
            <input id="testOn_${data.id}" type="checkbox" class="testOn" >
            <span class="lever"></span>
            On
          </label>
        </div></div>
          </div>`
        $('.test-api-list').append(template)

    }
    const api_tempelater = (method, route) => {
        if (method != 'GET' && method != 'POST' && method != 'DELETE' && method != 'PUT') {
            return ''
        }
        var _ = shortid();
        var data = {
            id: _,
            method: method,
            route: route
        }
        _apis.push(data)
        buildTest(data)
        var _r = route.split('/')
        _r.forEach((__, index) => {
            if (__[0] == ':') {
                _r[index] = `<input placeholder='${__}'  id="input_${_}_${__}" class="params" type="text" style="display:inline; width:60px; font-family: 'Open Sans', sans-serif; font-size:15px">`
            }
        })
        _r = _r.join('/')
        var html_temp = `
<div class="card-panel api-panel row api holder_${_}">
<div class='col s12 m3'>${method}</div>
<div class='col s12 m6 route'>${_r}</div>
<div class='col s12 m3 trigger_cont'>
<span class="material-icons trigger_btn" id="${_}">
play_arrow
</span><span class="material-icons edit" style="margin-left:10px" id="edit>${_}">create</span></div>


</div>


`
        return html_temp;
    }

    const digest = axios.create({
        baseURL: `http://127.0.0.1:5432/api`,
    });

    function display(client) {
        console.log(digest)
        digest.get('/eaters').then((res, err) => {
            console.log(err)
            Object.keys(res.data).forEach(key => {
                _host = `http://${res.data[key].host}:${res.data[key].port}`
                if (client) {
                    holders.client_info.prepend(`
           <p style='display:inline'> <span class='material-icons' style='color:#07c149; vertical-align:middle'>
            fiber_manual_record 
            </span>
    <a>${key}</a></p><p style='display:inline; margin-left:10px'>
    <span class="material-icons" style=' vertical-align:middle'>
    dns 
    </span><a>  http://${res.data[key].host}:${res.data[key].port}</a></p>
            `)
                }
                res.data[key].routes.forEach(route => {
                    holders.api_list.append(api_tempelater(route.method, route.route))

                })
            })

        }).catch(err => console.log(err))
    }
    display(true)
    $('#sync_apis').click(() => {
        M.toast({
            html: "Syncing Apis"
        })
        $('.api-list').html('')
        $('.test-api-list').html('')
        display(false)
    })
})