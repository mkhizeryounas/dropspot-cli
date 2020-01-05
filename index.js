const minimist = require('minimist');
const chalk = require('chalk');

module.exports = () => {
  console.log(chalk.yellow(`\n------------------------------------`));
  console.log(chalk.yellow.bold(`Dropspot CLI for continuous delivery`));
  console.log(chalk.yellow(`------------------------------------\n`));

  const args = minimist(process.argv.slice(2));
  let cmd = args._[0];

  if (args.help || args.h) {
    cmd = 'help';
  }

  if (args.u) {
    args['url'] = args.u;
  }
  if (args.t) {
    args['token'] = args.t;
  }

  switch (cmd) {
    case 'deploy':
      require('./cmds/deploy')(args);
      break;
    case 'token':
      require('./cmds/token')(args);
      break;
    case 'help':
      require('./cmds/help')(args);
      break;
    default:
      console.log(chalk.red(`"${cmd}" is not a valid command!`));
      break;
  }
};
