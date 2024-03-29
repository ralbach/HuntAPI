const fs = require('fs');
const filePath = require("path");
const parseItemsFromTxt = (path) => {
    //returns csv txt file as string.
    const parseFile = (path) => {
        try {
            //resolve path received from config
            const buffer = fs.readFileSync(filePath.resolve(__dirname, path), 'utf-8');
            return buffer;
        }
        catch (err) {
            console.error(err);
            return err;
        }
    };
    //takes in a parsed txt file and returns an object with fields based on headers.
    const formatTxt = (data) => {
        const headers = {};
        const returnBody = [];
        const contentArray = data.toString().split('\n');
        const headersArray = contentArray[0].split(',');
        //Create our field headers object
        for (let i = 0; i < headersArray.length; i++) {
            headers[i] = headersArray[i].trim();
        }
        //iterate across the items from txt file
        for (let i = 1; i < contentArray.length; i++) {
            const items = contentArray[i].split(',');
            const temp = {};
            // assign items from txt file to their header field.
            for (let j = 0; j < items.length; j++) {
                temp[headers[j]] = items[j].trim();
            }
            returnBody.push(temp);
        }
        //return array of objects of items for database insertion.
        return returnBody;
    };
    const parsedFile = parseFile(path);
    const formatted = formatTxt(parsedFile);
    return formatted;
};
module.exports = { parseItemsFromTxt };
//# sourceMappingURL=parseItemsFromTxt.js.map