
var mongoose = require('mongoose'),
    Schema = mongoose.Schema ,
    collection = 'users';

var usersSchema = new Schema({

    email:{
        type: String,
        unique : true,
        required : true
    },
    password:{
        type: String,
        unique:  true,
        required : true
    },
    api_key:{
        type: String,
        unique : true,
        required : true
    },
    name:{
        type:String,
        required: true
    },
    created_date:{
        type: Number,
        required : true
    },
    updated_date:{
        type: Number,
        required: true
    }

});

usersSchema.methods.signUp = function (cb) {

    this.save(function (err,result) {

        if(err){
            cb(false,result,'Sign up failed');
        }
        else{
            cb(true,result,'Sign up successful');
        }
    });
};

usersSchema.methods.singIn = function () {

    this.model(models).find().exec(function (err,result) {

    });

};

module.exports = mongoose.model(collection,usersSchema);

