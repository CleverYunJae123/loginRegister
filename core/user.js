const pool = require('./pool');
const bcrypt = require('bcrypt');

function User() {};

User.prototype = {
   
    find : function(user = null, callback)
    {
      
        if(user) {
          
            var field = Number.isInteger(user) ? 'g_id' : 'gname';
        }
       
        let sql = `SELECT * FROM generalmem WHERE ${field} = ?`;


        pool.query(sql, user, function(err, result) {
            if(err) throw err

            if(result.length) {
                callback(result[0]);
            }else {
                callback(null);
            }
        });
    },

    
    create : function(body, callback) 
    {

        //var pwd = body.g_pw;
    
       // body.g_pw = bcrypt.hashSync(pwd,10);

        var bind = [];
        for(prop in body){
            bind.push(body[prop]);
        }
        let sql = `INSERT INTO generalmem(g_id, gname, gtel, g_pw) VALUES (?,?,?,?)`;
        pool.query(sql, bind, function(err, lastId) {
            if(err) throw err;
            callback(lastId);
        });
    },

    login : function(g_id, g_pw, callback)
    {
        this.find(g_id, function(user) {
            if(user) {
                if(compareSync(g_pw, user.g_pw)) {
                    callback(user);
                    return;
                }  
            }
            callback(null);
        });
        
    }

}

module.exports = User;