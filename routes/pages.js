const express = require('express');
const User = require('../core/user');
const router = express.Router();

const user = new User();

router.get('/', (req, res, next) => {
    let user = req.session.user;
    if(user) {
        res.redirect('/home');
        return;
    }
    res.render('index', {title:"CAFE TEST"});
})

router.get('/home', (req, res, next) => {
    let user = req.session.user;

    if(user) {
        res.render('home', {opp:req.session.opp, name:user.gname});
        return;
    }
    res.redirect('/');
});


router.post('/login', (req, res, next) => {

    user.login(req.body.g_id, req.body.g_pw, function(result) {

        res.redirect('/home');
    }
        /* 로그인 다시 해야함
        if(result) {
            // Store the user data in a session.
            req.session.user = result;
            req.session.opp = 1;
            // redirect the user to the home page.
            res.redirect('/home');
        }else {
            // if the login function returns null send this error message back to the user.
            res.send('Username/Password incorrect!');
        }
    })
*/
 ) });


router.post('/register', (req, res, next) => {
    
    let userInput = {
        g_id : req.body.g_id,
        gname : req.body.gname,
        gtel : req.body.gtel,
        g_pw : req.body.g_pw 
    };
    
    user.create(userInput, function(lastId) {
        res.redirect('/home');
        
        /*if(lastId) {
            // Get the user data by it's id. and store it in a session.
            user.find(lastId, function(result) {
                req.session.user = result;
                req.session.opp = 0;
                res.redirect('/home');
            });

        }else {
            console.log('Error creating a new user ...');
        }
        */
    });

});

e
router.get('/loggout', (req, res, next) => {
    if(req.session.user) {
        req.session.destroy(function() {
            res.redirect('/');
        });
    }
});

module.exports = router;