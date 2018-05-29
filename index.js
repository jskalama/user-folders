const { platform, homedir } = require('os');

const rules = [
    ['desktop', { linux: 'XDG_DESKTOP_DIR', win32: 'FOLDERID_Desktop' }],
    ['documents', { linux: 'XDG_DOCUMENTS_DIR', win32: 'FOLDERID_Document' }],
    ['download', { linux: 'XDG_DOWNLOAD_DIR', win32: 'FOLDERID_Downloads' }],
    ['music', { linux: 'XDG_MUSIC_DIR', win32: 'FOLDERID_Music' }],
    ['pictures', { linux: 'XDG_PICTURES_DIR', win32: 'FOLDERID_Pictures' }],
    ['share', { linux: 'XDG_PUBLICSHARE_DIR', win32: 'FOLDERID_Public' }],
    ['templates', { linux: 'XDG_TEMPLATES_DIR', win32: 'FOLDERID_Templates' }],
    ['videos', { linux: 'XDG_VIDEOS_DIR', win32: 'FOLDERID_Videos' }]
];

const { getUserShellFolders } = require('win-shell-folders');
const getXDGUserDirs = require('xdg-user-dir');

const foldToObject = (output, item) => {
    output[item.key] = item.value;
    return output;
};

const applyRules = (rules, pfm, values) =>
    rules
        .map(rule => {
            const foreignKey = rule[1][pfm];
            if (!foreignKey) {
                return null;
            }
            const value = values[foreignKey];
            if (!value) {
                return null;
            }
            return { key: rule[0], value: value };
        })
        .filter(it => it && it.value)
        .reduce(foldToObject, {});

const getUserFolders = () => {
    const pfm = platform();
    const home = homedir();

    const defaults = {
        desktop: home,
        documents: home,
        download: home,
        music: home,
        pictures: home,
        share: home,
        videos: home
    };

    let call;
    if (pfm === 'win32') {
        call = getUserShellFolders;
    } else if (pfm === 'linux') {
        call = getXDGUserDirs;
    } else {
        call = () => Promise.resolve({});
    }

    return call().then(result => {
        const normalized = applyRules(rules, pfm, result);
        return Object.assign({}, defaults, normalized);
    });
};

module.exports = getUserFolders;
