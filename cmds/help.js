const chalk = require('chalk');

const menus = {
  main: `
    dropspot [command] <options>

    deploy ..... Deploy a project
    token ...... Generate new deployment token
    help ....... Show help menu for a command`,

  deploy: `
    dropspot deploy <options>

    --url, -u ..... URL for deployment server
    --token, -t ... Deployment token`,

  token: `
    dropspot token <options>

    --username ........ Registery username
    --password ........ Registery password
    --serveraddress ... Auth server for registery
    --imageUrl ........ Image URL
    --url, -u ......... URL for deployment server
    --token, -t ....... API token`
};

module.exports = args => {
  const subCmd = args._[0] === 'help' ? args._[1] : args._[0];

  console.log(chalk.yellow(menus[subCmd] || menus.main));
};
