var express = require('express')
var app = express();
var axios = require('axios')
var fs = require('fs')
const uuidv4 = () => {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16 | 0,
            v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

var config = require('./config/digest.json')
const dotenv = require('dotenv');
var bodyParser = require('body-parser')
var jsonParser = bodyParser.json()
var path = require('path')
dotenv.config();
ENV = process.env
var client_apps = {
}
app.use(jsonParser)
var node_pty = require('./src/controller/testHandler')
app.post('/register',async (req, res) => {
    var found =false;
    Object.keys(client_apps).forEach(key=>{
        if(client_apps[key]['host'] == req.body.host && client_apps[key]['port'] == req.body.port){
            found = true;
            client_apps[key]['routes'] = req.body.routes
            res.send(key)
        }
    })
    if(!found){var _uuid = uuidv4();
        client_apps[_uuid] = {
            host: req.body.host,
            port: req.body.port,
            routes: req.body.routes
        }}
    res.send(_uuid)
})
app.use('/static', express.static('./public'))
app.use('/dist', express.static('./dist'))
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/views/home.html'))
})
app.get('/api/eaters', (req, res) => {
    res.send(client_apps)
})
app.post('/api/fire', async (req, res) => {
    var  req_config = req.body
            await axios({
                method:req_config.data.method.toLowerCase(),
                url: req_config.target + req_config.data.route,
                headers:req_config.headers,
                data:req_config.body
            }).then(result => {

                res.send({
                    status: result.status,
                    data: result.data,
                    statusText: result.statusText,
                    headers: result.headers,
                    config: result.config
                })
            }).catch(err =>{
                res.send(err)
            })
            
})
app.post('/api/runTest',(req,res)=>{
    var script = req.body.script;
    var testId = req.body.testId;
    fs.writeFileSync(path.join(__dirname,`./scripts/${testId}.js`),script,'utf8')
    node_pty(testId,(d)=>{
        res.send(d)
    })
})
// app.post('/routes',(req,res)=>{
//     console.log(req.body._client)
//     if(client_apps[req.body._client]){
//         client_apps[req.body._client].routes = req.body.routes;
//         res.send('okay')
//     }
// })

app.listen(config[ENV.env].port, () => {
    console.log(`🚀 Digest started on port: ${config[ENV.env].port}`)
})
// console.log(ENV)