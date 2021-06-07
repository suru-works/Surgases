module.exports.parseToJSON = (results) => {
    if (results.length > 0) {
        return JSON.parse(JSON.stringify(results));
    } else {
        return []
    }
}