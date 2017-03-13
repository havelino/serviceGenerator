var express = require('express');
var router = express.Router();
var sql = require("mssql");
  // config for your database
var config = {
      user: 'usrpld',
      password: 'desarrollo?pld$JAVA',
      server: '10.80.112.70',
      port:'1434',
      database: 'PLDGESTORGLOBAL'
  };

var spInfo=function(spname){

};

/* GET users listing. */
router.get('/info', function(req, res, next) {

  var spname=req.query.spname;
  // connect to your database
sql.connect(config, function (err) {

     if (err) console.log(err);
     // create Request object
     var request = new sql.Request();
     // Stored Procedure
     new sql.Request()
       .input('spname',sql.VarChar(50),spname)
       //.output('output_parameter', sql.VarChar(50))
       .execute('GG_getSpParams').then(function(recordsets) {
         console.log('GG_getSpParams ['+spname+']');
         console.log(recordsets);
         if(recordsets[0]!=null){
            res.json(recordsets[0]);
         }else{
           res.status(404).json('No existe el store procedure solicitado');
         }

     }).catch(function(err) {
         //console.log(err);
         res.status(500).send(err);
     // ... execute error checks
     });
  });
});

router.get('/', function(req, res, next) {
  res.send('response with a resouce');
});

module.exports = router;
