module.exports = (app) => {
    const login = require('../controllers/login.controller.js');
    const middleware = require('../../middleware');

    // Create a new uSER
    app.post('/signup', login.addUser);

    // // Retrieve all Notes
    app.get('/allusers', login.findAll);

    // Retrieve a single Note with noteId
    app.post('/login', login.findOne);

    app.get('/home/:username', middleware.checkToken, login.getUserData);

    // // Update a Note with noteId
    // app.put('/notes/:noteId', notes.update);

    // // Delete a Note with noteId
    // app.delete('/notes/:noteId', notes.delete);
}   