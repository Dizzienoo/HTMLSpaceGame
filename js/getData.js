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
                    let originalHint = parseFloat(hint)
                    hint = (parseFloat(hint) + 0.5) * 100;
                    let originalResult = parseFloat(result)
                    result = (parseFloat(result) + 0.5) * 100;
                    positions.push({hint, originalHint, result, originalResult, level});
                })
                console.log(positions);
                return positions;
            });
            
        }).catch((err) => {
            console.error(err);
    })
}