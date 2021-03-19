/*
xiaojun
jacken159
Aa123456
*/
/*
var mysql = require('mysql');
var connection = mysql.createConnection({
   host: 'db4free.net',
   user: 'jacken159',
   password: 'Aa123456',
   database: 'xiaojun'

});
let t = ''
connection.connect(function (err) {
   if (err) {
      console.error('error connecting: ' + err.stack);
      return;
   }
   t = `connected as id ' + connection.threadId`
   //console.log('connected as id ' + connection.threadId);
});
*/
var mysql = require('mysql');
var con = mysql.createConnection({
   host: 'db4free.net',
   user: 'jacken159',
   password: 'Aa123456',
   database: 'xiaojun'

});


module.exports = {
   select1(b) {
      return new Promise(resp => {
         if (b.length > 0) {
            //console.log(b)
            var url_string = "http://www.example.com?" + b; //window.location.href
            var url = new URL(url_string);
            let fp = url.searchParams.get("fp"),
               ss = url.searchParams.get("ss"),
               table = url.searchParams.get("table"),
               type = url.searchParams.get("type"),
               from = url.searchParams.get("from"),
               row = url.searchParams.get("row"),
               col = url.searchParams.get("col"),
               del_len = url.searchParams.get("del_len"),
               url_data = b.substring(
                  b.indexOf("&d") + 3,//+6
                  b.indexOf("data_len") - 2
               ) + "}";
            //console.log(b.substring(b.indexOf("&d") + 3, b.indexOf("data_len") - 2) + "}");
            //console.log(JSON.parse(url_data))
            let cs = JSON.parse(url_data);
            let t = '';
            if (cs.f == null) {
               r('nothing require');
            }
            else {
               con.connect(function (err) {
                  /*
                  //create table
                  con.query("CREATE DATABASE xiaojun", function (err, result) {
                     if (err) throw err;
                     console.log("Database created");

                     r(con.threadId)
                     //console.log('connected as id ' + connection.threadId);
                    
                  });

                  var sql = "CREATE TABLE mf (id int NOT NULL UNIQUE AUTO_INCREMENT, mc VARCHAR(255) primary key, data LONGTEXT)";
                  con.query(sql, function (err, result) {
                     if (err) {
                        console.error('error connecting: ' + err.stack);
                        return;
                     };
                     console.log("Table created");
                    
                  });
                  //create table end
                  */
                 /*
                  var sql = "CREATE TABLE autosave (id int NOT NULL UNIQUE AUTO_INCREMENT,fp varchar(255),date varchar(255), mc VARCHAR(255) , data LONGTEXT)";
                  con.query(sql, function (err, result) {
                     if (err) {
                        console.error('error connecting: ' + err.stack);
                        return;
                     };
                     console.log("Table created");
                    
                  });
                  */
                  if (cs.f == 'recover') {
                     t = `select * from mf where mc='${cs.t}' `;
                     con.query(t, function (err, res) {
                        if (err) {
                           console.error('error connecting: ' + err.stack); return;
                        }

                        if (Object.keys(res).length > 0) {
                           t = `update mf set data='${JSON.stringify(cs.d)}' where mc='${cs.t}'`;
                        } else {
                           t = `insert into mf (mc,data) values('${cs.t}','${JSON.stringify(cs.d)}')`;
                        }
                     })
                     con.query(t, function (err, res) {
                        if (err) {
                           console.error('error connecting: ' + err.stack); return;
                        }
                        resp('data saved');
                     });
                  } else if (cs.f == 'autosave') {
                     
                     t = `insert into autosave (fp,mc,date,data) values('${cs.fp}','mf_data',curdate(),'${JSON.stringify(cs.d)}')`;
                     con.query(t, function (err, res) {
                        if (err) {
                           console.error('error connecting: ' + err.stack); return;
                        }
                        resp('autosaved');
                     });
                     
                   
                  }
                  /*
                  else if (cs.f == 'save_j') {
                     t = `INSERT INTO mf (mc, data) VALUES ('${cs.t}', '${cs.d}')`;
                     con.query(t, function (err, res) {
                        if (err) {
                           console.error('error connecting: ' + err.stack); return;
                        }
                        console.log(res.insertId);
                        r(res.insertId)
                       
                     });
                  }
                  */

               });

            }

         }


      })


   }
}