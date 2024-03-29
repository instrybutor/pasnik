import { existsSync } from 'fs';
import * as FtpDeploy from 'ftp-deploy';
import * as minimist from 'minimist';
import { join } from 'path';

const ftpDeploy = new FtpDeploy();

const argv = minimist(process.argv.slice(2));
const root = join(__dirname, '../..');
const outDir = join(
  root,
  'dist',
  argv.type === 'library' ? 'libs' : 'apps',
  argv.outDir ?? argv.appName
);
const remoteRoot = argv.remoteRoot ?? argv.appName;

if (!existsSync(outDir)) {
  throw new Error(`${outDir} does not exist`);
}

const config = {
  user: process.env.FTP_USER,
  password: process.env.FTP_PASS,
  host: process.env.FTP_HOST,
  port: process.env.FTP_PORT ?? 21,
  localRoot: outDir,
  remoteRoot: remoteRoot,
  include: ['*'],
};

(async () =>
  await ftpDeploy
    .deploy(config)
    .then(() => {
      console.log(`\n🚀 New version of ${argv.appName} is running!\n`);
    })
    .catch((err) => {
      console.log(err.message);
      process.exit(255);
    }))();
