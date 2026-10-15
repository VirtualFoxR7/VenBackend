const fs = require('fs');
const filename = process.argv[2];

fs.readFile(filename, "utf-8", (err, file) => {
    if (err) {
        return console.log(err);
    }
    const lines = file.split('\n').length - 1;
    console.log(lines);    
});
