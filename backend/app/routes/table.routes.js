module.exports = (app) => {
    const table = require('../controllers/table.controller');

    //CREATE A TABLE
    app.post('/addTable', table.create);

    //FIND A TABLE
    app.post('/findTable', table.find);

}