/**
 * Created by phong on 12/18/16.
 */

var users = require('../model/users'),
    bcrypt = require('bcryptjs'),
    salt = 8,
    config = require('../config/database');
    jwt = require('jsonwebtoken');


function  usersDBHandler(apiRoutes) {
    this.apiRoutes = apiRoutes ;
    this.apiRoutes.post('/signUp',function (req,res) {

        req.assert('email','email is required').notEmpty();
        req.assert('name','name is required').notEmpty();
        req.assert('password','password is required').notEmpty();
        var errors = req.validationErrors();

        if(errors){
            res.json({
                title : 'Sign up',
                message : errors,
                error : true
            });
        }
        else{

            var timeNow = new Date().getTime();
            var apiKey = jwt.sign(req.body.email + timeNow,config.secret);

            var newObject = new users({

                email : req.body.email,
                name : req.body.name,
                password : bcrypt.hashSync(req.body.password,salt),
                created_date : timeNow,
                updated_date : timeNow,
                api_key : apiKey

            });

            newObject.signUp(function (error,result,message) {

                if(error){
                    res.json({
                        message : message,
                        data:result,
                        error : false
                    });
                }
                else{
                    res.json({
                        message: message,
                        data: result,
                        error : true
                    });
                }

            });
        }
    });

    this.apiRoutes.post('/signIn',function (req,res) {

        req.assert('email','email is required').notEmpty();
        req.assert('password','password is required').notEmpty();
        var errors = req.validationErrors();

        if(errors){
            res.json({
                title : 'Sign in',
                message : errors,
                error : true
            });
        }
        else{

            var newObject = new users({

                email : req.body.email,
                password : bcrypt.compareSync(req.body.password,salt)

            });

            newObject.signIn(function (error,result,message) {

                if(error){
                    res.json({
                        message : message,
                        data:result,
                        error : false
                    });
                }
                else{
                    res.json({
                        message: message,
                        data: result,
                        error : true
                    });
                }
            });
        }
    })

}

module.exports = usersDBHandler;