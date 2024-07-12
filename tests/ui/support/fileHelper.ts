import fs from 'fs';
import path from 'path';

const mkDirByPathSync = (targetDir: string, { isRelativeToScript = false } = {}) => {
  const { sep } = path; //obj destructuring
  const initDir = path.isAbsolute(targetDir) ? sep : '';
  const baseDir = isRelativeToScript ? __dirname : '.';

  return targetDir.split(sep).reduce((parentDir, childDir) => {
    const curDir = path.resolve(baseDir, parentDir, childDir);
    try {
      fs.mkdirSync(curDir);
    } catch (err: any) {
      if (err.code === 'EEXIST') {
        //current directory exists
        return curDir;
      }
      if (err.code === 'ENOENT') {
        throw new Error(`EACCES: permission denied, mkdir '${parentDir}'`);
      }
      const error = ['EACCESS', 'EPERM', 'EISDIR'].indexOf(err.code) > -1;
      if (!error || (error && curDir === path.resolve(targetDir))) {
        throw err; //throw if its just the last created dir;
      }
    }
    return curDir;
  }, initDir);
};

export { mkDirByPathSync };
