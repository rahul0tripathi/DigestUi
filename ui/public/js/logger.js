const createLog = (data) => {
    var _ = shortid()
    $('.logger').prepend(`
  <div class= "row " style="padding:20px;">
  <div style="color:white;font-size:14px;"><a class="logger_tag">[digest.js]:[${new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(:[\d]{2})(.*)/, "$1$3")}]:[${data.config.url}]</a>
<pre id = "${_}" style='display:inline'></pre>
  </div></div>
    `)
    $(`#${_}`).text(JSON.stringify(data, undefined, 2))
}