const {Users} = require("../../../models")
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        email: 'email|empty:false',
        password: 'string|min:6',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    const user = await Users.findOne({where: {email: req.body.email}})

    if (!user) {
        return res.status(404).json({
            status: false,
            message: "user not found"
        })
    }

    const isValidPassword = await bcrypt.compare(req.body.password , user.password);

    if (!isValidPassword) {
        return res.status(404).json({
            status: false,
            message: "user not found"
        })
    }

    return res.status(200).json({
        status: true,
        message: "user found",
        data: {
            id: user.id,
            name: user.name, 
            email: user.email,
            profession: user.profession,
            role: user.role,
            avatar: user.avatar
        }
    })
}