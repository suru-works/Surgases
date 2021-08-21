module.exports.parseToJSON = (results) => {
    if (results.length > 0) {
        return JSON.parse(JSON.stringify(results[0]));
    } else {
        return []
    }
}