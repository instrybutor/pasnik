import { existsSync } from 'fs';
import * as FtpDeploy from 'ftp-deploy';
import * as minimist from 'minimist';
import { join } from 'path';

const ftpDeploy = new FtpDeploy();

const argv = minimist(process.argv.slice(2));
const root = join(__dirname, '../..');
const outDir = join(root, 'dist/apps', argv.appName);
const remoteRoot = argv.remoteRoot ?? './public_nodejs/';

if (!existsSync(outDir)) {
  throw new Error(`${outDir} does not exist`);
}

const config = {
  username: process.env.FTP_USER,
  password: process.env.FTP_PASS,
  host: process.env.FTP_HOST,
  port: 21,
  localRoot: outDir,
  remoteRoot: remoteRoot,
  include: ['*'],
};

ftpDeploy.deploy(config, function (err) {
  if (err) {
    console.error(`Deploy error ${err}`);
  } else {
    console.log(`\n🚀 New version of ${argv.appName} is running!\n`);
  }
});
