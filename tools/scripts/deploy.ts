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
  username: argv.user,
  password: argv.pass,
  host: argv.host,
  port: argv.port ?? 21,
  localRoot: outDir,
  remoteRoot: remoteRoot,
  include: ['*'],
  sftp: true
};

ftpDeploy.deploy(config, function (err) {
  if (err) {
    throw new Error(`Deploy error ${err.message}`);
  } else {
    console.log(`\n🚀 New version of ${argv.appName} is running!\n`);
  }
});
