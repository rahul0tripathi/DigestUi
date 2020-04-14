var exec = require('child_process').exec;
var path = require('path')

const  runTest = async (id,callback)=>{
    var result = '';
 await  exec(`./runtest.sh ${id}`,{
        cwd:path.join(__dirname,'../../scripts/static')
    },
        function (error, stdout, stderr) {
            if (error !== null) {
             callback(error)
            }else{
         callback(stdout)
            }
            
        });
       
        
}


module.exports = runTest