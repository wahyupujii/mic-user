const {Users} = require("../../../models")

module.exports = async (req, res) => {
    const user = await Users.findByPk(req.params.id, {
        attributes: ['id', 'name', 'email', 'profession', 'role', 'avatar']
    })
    
    if (user) {
        return res.status(200).json({
            status: true,
            data: user
        })
    }

    return res.status(404).json({
        status: false,
        message: "user not found"
    })
}