
'use strict';

exports.ok = function(values, res) {
    var data = {
        'status': 200,
        'values': values
    };

    if (res) {
        res.json(data); 
        res.end();
    } else {
        console.error("Response object is undefined.");
    }
};

//response untuk nested matakuliah
exports.oknested = function(values, res) {
    // Check if values is an array
    if (!Array.isArray(values)) {
        console.error("Expected an array of values, got:", typeof values);
        if (res && typeof res.status !== 'function') {
            console.error("Response object is defined but does not have a status function.");
        } else if (res) {
            res.status(500).json({ error: "Internal server error" });
        } else {
            console.error("Response object is undefined.");
        }
        return;
    }

    // Initialize an empty object to accumulate grouped data
    const hasil = values.reduce((accumulator, item) => {
        // Determine the grouping key (assuming `nama` is the key)
        const key = item.nama;
        
        // Check if the key already exists in the accumulator
        if (accumulator[key]) {
            // If `matakuliah` already exists and is an array, push the new value
            if (Array.isArray(accumulator[key].matakuliah)) {
                accumulator[key].matakuliah.push(item.matakuliah);
            } else {
                // If `matakuliah` is not an array (happens if there's only one entry),
                // convert it into an array with the existing value and the new one
                accumulator[key].matakuliah = [accumulator[key].matakuliah, item.matakuliah];
            }
        } else {
            // If the key does not exist, initialize it with the current item
            accumulator[key] = item;
        }

        return accumulator;
    }, {});

    // Prepare the response data
    var data = {
        'status': 200,
        'values': hasil
    };

    // Send the response if `res` object is defined and has a `json` function
    if (res && typeof res.json === 'function') {
        res.json(data); 
        res.end();
    } else if (res) {
        console.error("Response object is defined but does not have a json function.");
    } else {
        console.error("Response object is undefined.");
    }
};


