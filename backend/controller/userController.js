const userModel = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
require('dotenv').config();

const getUser = async (req, res) => {
    try{
        const users = await userModel.findAll();
        res.status(200).json({msg: users});
    }catch(err) {
        console.log("Error: " + err);
        res.status(500).json({msg: "Error to show users: "});
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      const extension = path.extname(file.originalname);
      cb(null, file.fieldname + '-' + uniqueSuffix + extension);
    }
  });
  
  const upload = multer({ storage: storage });

const addUser = async (req, res) =>{
    try{
        const {email, password, image} = req.body;
        if(email === "" || password === "") {
            return res.status(500).json({msg: "Please fill in all fileds"});
        }
        const userExists = await userModel.findOne({
            where: {
                email: email
            } 
        })
        if(userExists) {
            return res.status(409).json({msg: "Usuário já cadastrado"});
        }else{
            const hashedPassword = await bcrypt.hash(password, 10);
            upload.single('image')(req, res, async function (err) {
            if (err) {
                console.error('Error uploading image:', err);
                return res.status(500).json({ msg: 'Error uploading image' });
            }
    
            const image = req.file ? req.file.filename : null;
            await userModel.create({email, password: hashedPassword, image});
            return res.status(201).json({msg: "User created with suceess"});
        });
    }
    }catch(err) {
        console.log("Error: " + err);
        console.log("Stack Trace: ", err.stack);
        return res.status(500).json({msg: "Error to send the datas"});
    }
}

const loginUser = async (req, res) => {
    try{
        const {email, password, image} = req.body;
        if(email === "" || password === "") {
            return res.status(500).json({msg: "Please fill in all fields"});
        }

        const user = await userModel.findOne({
            where: {
                email: email,
            }
        })

        if(!user) {
            return res.status(401).json({msg: "Invalid email or password"});
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if(!isPasswordValid) {
            return res.status(401).json({msg: "Not authorized"});
        }

        const token = jwt.sign({userId: user.id, email: user.email, image: user.image}, process.env.JWT_KEY, {
            expiresIn: '3h'
        })
        res.json({msg: "Welcome " + user.email, user: user, token: token});
    }catch(err) {
        console.log("Error: " + err);
        res.status(500).json({msg: "Error while attempting to log in"});
    }
}

const deleteUser = async (req, res) => {
    const idUser = req.params.id;
    try {
        const user = await userModel.findByPk(idUser);
        if(!user) {
            return res.status(404).json({msg: "There's no user with this id"});
        }
        await user.destroy();
        return res.status(200).json({msg: "User deleted with success"});
    }catch(err) {
        console.log("Error: " + err);
        return res.status(500).json({msg: "An error ocurred"});
    }
}

module.exports = {getUser, addUser, loginUser, deleteUser};


