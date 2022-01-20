const {Users} = require("../../../models")
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional'
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    const user = await Users.findOne({where: {email: req.body.email}})

    if (user) {
        return res.status(409).json({
            status: false,
            message: "email already exist"
        })
    }

    const createUser = await Users.create({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password, 10),
        real_pass: req.body.password,
        profession: req.body.profession,
        role: 'student'
    })

    if (createUser) {
        return res.status(200).json({
            status: true,
            message: "user created successfully",
            data: createUser.id
        })
    } else {
        return res.status(400).json({
            status: false,
            message: "failed created user",
        })
    }
}