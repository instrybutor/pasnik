const spawn = require('cross-spawn');

export function executeSqlQuery(sqlQuery: string) {
  const ls = spawn('npm', ['run', 'typeorm', '--', 'query', sqlQuery], {
    cwd: process.cwd(),
    env: process.env,
  });

  ls.stdout.on('data', function (data) {
    console.log('stdout: ' + data.toString());
  });

  ls.stderr.on('data', function (data) {
    console.log('stderr: ' + data.toString());
  });

  ls.on('exit', function (code) {
    console.log('child process exited with code ' + code.toString());
  });
}
