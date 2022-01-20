const {RefreshTokens} = require("../../../models")

module.exports = async (req, res) => {
    const token = await RefreshTokens.findOne({
        where: {
            token: req.query.refresh_token
        },
        attributes: ['id', 'token', 'user_id']
    })

    if (!token) {
        return res.status(404).json({
            status: false,
            message: "invalid token"
        })
    }

    return res.status(200).json({
        status: true,
        token
    })
}