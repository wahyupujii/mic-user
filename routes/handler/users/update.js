const {Users} = require("../../../models")
const bcrypt = require("bcrypt");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        name: 'string|empty:false',
        email: 'email|empty:false',
        password: 'string|min:6',
        profession: 'string|optional',
        avatar: 'string|optional',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    // patokan utama user yang ingin di update
    const user = await Users.findByPk(req.params.id)
    if (!user) {
        return res.status(404).json({
            status: false,
            message: "user not found"
        })
    }

    // bagian cek apakah email yang baru saat mengupdate sudah ada di db atau belum
    const checkEmail = await Users.findOne({where: {email: req.body.email}})
    if (checkEmail && req.body.email !== user.email) {
        return res.status(409).json({
            status: false,
            message: "email already exist"
        })
    }

    // kalau email gaada di db / tetep gaada perubahan, 
    // lakukan update sesuai user byPK
    await user.update({
        name: req.body.name,
        email: req.body.email,
        password: await bcrypt.hash(req.body.password , 10),
        real_pass: req.body.password,
        profession: req.body.profession,
        avatar: req.body.avatar
    })

    return res.status(200).json({
        status: true,
        message: "user updated successfully",
        data: {
            id: user.id,
            name: user.name,
            email: user.email,
            profession: user.profession,
            avatar: user.avatar
        }
    })
}