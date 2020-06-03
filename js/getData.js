// const fetch = require ("fetch");

export function getData(url) {
    // Get the data
    return fetch(url).then(
        function (response) {
            // Create an array to hold the positions
            let positions = [];
            // get the text sent back
            return response.text().then((data) => {
                data = data.replace(/\s/, '');
                // Run through the rows
                data.split(/\n/).forEach(row => {
                    // 
                    let [hint, result, level] = row.split(",");
                    hint = parseFloat(hint);
                    result = parseFloat(result);
                    positions.push({hint, result, level});
                })
                return positions;
            });
            
        }).catch((err) => {
            console.error(err);
    })
}