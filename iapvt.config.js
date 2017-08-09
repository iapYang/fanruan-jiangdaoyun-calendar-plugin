const path = require('path');

module.exports = {
    template: path.resolve(__dirname, './dev/index.html'),
    bundle: {
        path: path.resolve('./dev/script/calendar/index.js'),
        name: 'calendar',
    },
};
