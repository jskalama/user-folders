const getUserFolders = require('./index');

getUserFolders()
    .then(folders => {
        console.log(folders);
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });
