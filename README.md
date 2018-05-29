![https://ci.appveyor.com/api/projects/status/github/jskalama/user-folders
](https://ci.appveyor.com/api/projects/status/github/jskalama/user-folders)

[![CircleCI](https://circleci.com/gh/jskalama/user-folders.svg?style=svg)](https://circleci.com/gh/jskalama/user-folders)

#user-folders

Get a list of known shell folders for Linux and Windows.

This package does not use any native binaries. In windows, `winreg` module is used, which actually utilizes `REG` command. In Linux, `user-dirs.dirs` config is read and parsed.

Usage example:

```javascript
const getUserFolders = require('user-folders');

getUserFolders().then(folders => {
    console.log(folders);
});
```

Output will look like:

```
{ desktop: '/home/mk/Рабочий стол',
  documents: '/home/mk/Документы',
  download: '/home/mk/Загрузки',
  music: '/home/mk/Музыка',
  pictures: '/home/mk/Изображения',
  share: '/home/mk/Общедоступные',
  videos: '/home/mk/Видео',
  templates: '/home/mk/Шаблоны' }
```
