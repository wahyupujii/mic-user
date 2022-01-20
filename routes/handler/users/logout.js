const {
    Users,
    RefreshTokens
} = require("../../../models")
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
    const schema = {
        user_id: 'number',
    }

    const validate = v.validate(req.body, schema);

    if (validate.length) {
        return res.status(400).json({
            status: false,
            message: validate
        })
    }

    const user = Users.findOne({ where: {id: req.body.user_id} })

    if (!user) {
        return res.status(404).json({
            status: false,
            message: "user not found"
        })
    }

    await RefreshTokens.destroy({ where: {user_id: req.body.user_id} })

    return res.status(200).json({
        status: true,
        message: "logout success"
    })
}