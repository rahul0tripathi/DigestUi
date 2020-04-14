var wildcard = {
    "headers": {

    },
    "body": {

    },
    "documentation": {
        'api': '',
        'explanation': 'This is a simple Api'
    }
}

function getEditorValue(id) {
    var decorator = $(`#editorview_${id}`).data('ace');
    return decorator.element[0].value
}
function getValue(id) {
    val = null
    $("input[type=text]").each(function () {
        if ($(this).attr('id') == id) {
            val = $(this).val()
        }
    });
    return val
}
$(document).on('change', 'input', (e) => {
    id = e.target.id.split('_')
    val = getValue(e.target.id)
    console.log(val)
    _apis.forEach(key => {
        if (key.id == id[1]) {
            var _r = key.route.split('/')
            _r.forEach((v, i) => {
                if (v == id[2]) {
                    if (v.slice(-1) === '?') {
                        val += '?'
                    }
                    _r[i] = val;
                }
            })
            _r = _r.join('/')
            key.route = _r
        }
    })
})

$(document).ready(() => {


    $('.api-list').on('click', '.api>.trigger_cont > .trigger_btn', (e) => {
        try{ var bullet = _apis.find(api => api.id === e.target.id)
        var custom = {
            'headers':{
                'custom':false
            }
        }
        body = false;
        if ($(`#editorview_${bullet.id}`).length) {
            
             custom = JSON.parse(getEditorValue(bullet.id))
           
                console.log("no custom Headers")
            var deafult_headers = JSON.parse(getDefaultConfig()).headers
            Object.keys(deafult_headers).forEach(key=>{
                custom.headers[key] = deafult_headers[key]
            })
            if(bullet.method == 'POST'){
                body = true;
            }
        }else{
            var deafult_headers = JSON.parse(getDefaultConfig()).headers
            Object.keys(deafult_headers).forEach(key=>{
                custom.headers[key] = deafult_headers[key]
            })
        }
        
        console.log(custom)
        axios.post('http://localhost:5432/api/fire', {
            target: _host,
            data: bullet,
            headers:custom == null ? null :custom.headers,
            body:body ? custom.body : null
        }).then(res => {
            createLog(res.data)
        })
    }catch(e){
        M.toast({html: `<span class="material-icons" style="color:#ff0051">
        error
        </span>  ${e}`,classes:'rounded'})
    }
    })
    $('.api-list').on('click', '.api>.trigger_cont > .edit', (e) => {
        var id = e.target.id.split('>')[1]
        if ($(`#editorview_${id}`).length) {
            $(`.holder_${id} > .row > .ace_editor`).toggle()
            $(`#editorview_${id}`).css('display', 'none')

        } else {
            console.log(id)
            $(`.holder_${id}`).append(`<div class ="row " style="margin-top:40px"><textarea id = 'editorview_${id}' class="editor"  rows="4" style="width: 100%; height:300px; overflow-x:scroll">${JSON.stringify(wildcard,null,"\t")}</textarea></div>`)
            $(`#editorview_${id}`).ace({
                theme: 'solarized_dark',
                lang: 'json'
            })
        }
    })
})