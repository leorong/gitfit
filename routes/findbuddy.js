'use strict'

var findbuddy = require('../controllers/findbuddy_controller');

module.exports = function(app, passport) {
    app.get('/findbuddy', findbuddy.view);
};
