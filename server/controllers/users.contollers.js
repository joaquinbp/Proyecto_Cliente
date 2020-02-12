const User = require('../models/user');
const bcrypt = require('bcrypt-nodejs');
const jwtService = require('../services/jwt.services');

const userCtrl = {};

userCtrl.saveUser = (req,res) => {
    const user = new User();
    var params = req.body;

    user.name = params.name;
    user.surname = params.surname;
    user.email = params.email;
    user.rol = 'ROLE_ADMIN';
    user.image = 'null';

    if(params.password){
        //Crypt and save data
        bcrypt.hash(params.password, null, null, (err, hash) =>{
            user.password = hash;
            if(user.name != null && user.surname != null & user.email != null){
                //Save user
                user.save()
                    .then( user => {
                        res.status(200).send({user: user});
                    })
                    .catch( error => {
                        res.status(500).send({error: err});
                    })

            } else{
                res.status(200).send({message:'Fill out form.'});
            }
        })
    } else{
        res.status(200).send({message:'Enter the pass.'});
    }
}

userCtrl.loginUser  =(req,res) => { 
    var params = req.body;
    var email = params.email;
    var password = params.password;

    User.findOne({email: email.toLowerCase()}, (err, user) => {
        if(err) {
            res.status(500).send({message: 'Server error'});
        } else {
            if (!user){
                res.status(404).send({message: 'User not found'})
            } else{
                bcrypt.compare(password, user.password, (err, check) =>{
                    if(check){
                        if(params.gethash){
                            //Here return token crypt
                            res.status(200).send({token: jwtService.createToken(user)});
                        } else {
                            res.status(200).send({user});
                        }
                    } else {
                        res.status(404).send({message: 'User no login'});
                    }
                });
            }
        }
    });
}

userCtrl.getUsers = async (req, res) => {
    try{
        const users = await User.find();
    res.json(users);
    }catch(error){
        res.json({status: 'Get users failed'});
    } 
};

userCtrl.createUser = async (req, res) =>{
    try{
        const user = new User(req.body);
        await user.save();
        res.json({
            status: 'User save'
        });
    } catch(error){
        res.json({status: 'Create user failed'});
    }
       
};

userCtrl.getUser = async (req, res) =>{
    try{
        const user = await User.findById(req.params.id);
        res.json(user);
    }catch(error){
        res.json({status: 'Get user failed'});
    }    
};

userCtrl.editUser = async (req, res) =>{
    try{
        const {id} = req.params;
        const user = {
            user: req.body.user,
            password: req.body.password,
            name : req.body.name,
            surname : req.body.surname,
            email : req.body.email,
            birthday : req.body.birthday,
            address : req.body.address,
            photo : req.body.photo,
            admin : req.body.admin,
    
        }
    
        await User.findByIdAndUpdate(id,{$set:user},{new:true});
        res.json({status:'User update'});
    } catch(error){
        res.json({status: 'Update user failed'});
    }

};

userCtrl.deleteUser = async (req, res) =>{
    try{
        await User.findByIdAndDelete(req.params.id);
        res.json({status:'User delete'});
    }catch(error){
        res.json({status: 'Delete user failed'});
    }    
};

module.exports = userCtrl;