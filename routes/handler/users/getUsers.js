const {Users} = require("../../../models")

module.exports = async (req, res) => {
    // const users = await Users.findAll({
    //     attributes: ['id', 'name', 'email', 'profession', 'role', 'avatar']
    // })

    // pengaturan atribut yang diambil/ditampilkan
    const sqlOption = {
        attributes: ['id', 'name', 'email', 'profession', 'role', 'avatar']
    }

    const userIds = req.query.user_ids || []
    // jika userIds > 1 => ['1' , '2'] -> dia akan berbentuk array
    // jika userIds tidak diisi, maka akan terisi array kosong

    if (userIds.length) { // jika userIds ada isinya
        sqlOption.where = {
            id: userIds
        }
    }

    // console.log(sqlOption)
    // kalo userIds diisi di req.query
    // {
    //     attributes: [ 'id', 'name', 'email', 'profession', 'role', 'avatar' ],
    //     where: { id: [ '5', '3' ] }  // jika diisi 2 query
    // }

    const users = await Users.findAll(sqlOption)

    return res.status(200).json({
        status: true,
        data: users
    })
}