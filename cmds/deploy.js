const http = require('request-promise');
const ora = require('ora');
const Joi = require('@hapi/joi');
const chalk = require('chalk');

module.exports = async argv => {
  let spinner = ora('Please wait...');
  try {
    spinner = spinner.start();
    spinner.text = `Deploying image on ${argv.url}`;
    let remote = await http({
      uri: `${argv.url}/trigger-deployment`,
      method: 'POST',
      headers: {
        Authorization: `Bearer ${argv.token}`
      },
      json: true
    });
    spinner.text = `Successfully deployed image to ${argv.url}`;
    console.log('\n');
    console.log(chalk.green.bold('Container ID:'), chalk.green(remote.data.id));
    spinner.succeed();
  } catch (err) {
    spinner.fail();
    console.log(chalk.red(err.message || err));
    process.exit(1);
  }
};
