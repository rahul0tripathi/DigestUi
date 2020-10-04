var axios = require('axios')
var array = []
var modules = {}
var res_config = {_client:null,_digest_port:null}
function print (path, layer) {
    if (layer.route) {
      layer.route.stack.forEach(print.bind(null, path.concat(split(layer.route.path))))
    } else if (layer.name === 'router' && layer.handle.stack) {
      layer.handle.stack.forEach(print.bind(null, path.concat(split(layer.regexp))))
    } else if (layer.method) {
      array.push({method:layer.method.toUpperCase(),route: '/'+path.concat(split(layer.regexp)).filter(Boolean).join('/')})
    }
  }
  
  function split (thing) {
    if (typeof thing === 'string') {
      return thing.split('/')
    } else if (thing.fast_slash) {
      return ''
    } else {
      var match = thing.toString()
        .replace('\\/?', '')
        .replace('(?=\\/|$)', '$')
        .match(/^\/\^((?:\\[.*+?^${}()|[\]\\\/]|[^.*+?^${}()|[\]\\\/])*)\$\//)
      return match
        ? match[1].replace(/\\(.)/g, '$1').split('/')
        : 'ERR PARSING :'+thing.toString()
    }
  }
async function register(config){
    await  app._router.stack.forEach(print.bind(null, []))
  await  axios.post(`http://localhost:${config.digest_port}/register`,{host:config.client.host,port:config.client.port,routes:array}).then(res=>{
        res_config._client = res.data
        res_config._digest_port = config.digest_port
    }).catch(err=>console.log(err))
}
module.exports.gell = ()=>{console.log("hello",res_config)}
module.exports.init = async (config,app)=>{
     await register(config,app)
     return res_config
    }