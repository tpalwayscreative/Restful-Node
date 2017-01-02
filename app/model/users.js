
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

usersSchema.methods.signIn = function (cb) {

    this.model(collection).find({email : this.email}).exec(function (err,result) {
        if(err){
            cb(true,null)
        }
        else{
            if(result.length>0){
                cb(false,result[0]);
            }
            else{
                cb(true,null);
            }
        }
    });
};

module.exports = mongoose.model(collection,usersSchema);

