
'use strict';

exports.ok = function(values, res) {
    var data = {
        'status': 200,
        'values': values
    };

    if (res) {
        res.json(data); // Ensure 'res' is defined and refers to Express response object
        res.end();
    } else {
        console.error("Response object is undefined.");
    }
};
