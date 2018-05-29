const assert = require('assert');
const path = require('path');
const { homedir } = require('os');
const getUserFolders = require('./index');

getUserFolders()
    .then(folders => {
        console.log(folders);
        assert.equal(folders.desktop, path.join(homedir(), 'Desktop'));
        assert.equal(folders.download, path.join(homedir(), 'Downloads'));
    })
    .catch(err => {
        console.error(err.stack);
        process.exit(1);
    });
