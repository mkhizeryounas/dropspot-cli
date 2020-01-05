const http = require('request-promise');
const ora = require('ora');
const Joi = require('@hapi/joi');
const chalk = require('chalk');

const schema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
  serveraddress: Joi.string().required(),
  imageUrl: Joi.string().required(),
  port: Joi.number().required(),
  token: Joi.string().required(),
  url: Joi.string().required()
}).unknown(true);

module.exports = async argv => {
  let spinner = ora('Please wait...');
  try {
    spinner = spinner.start();
    await schema.validateAsync(argv);
    spinner.text = `Getting a fresh token from ${argv.url}`;
    let remote = await http({
      uri: `${argv.url}/generate-deployment-key`,
      method: 'POST',
      headers: {
        'x-api-key': `Bearer ${argv.token}`
      },
      body: {
        username: argv.username,
        password: argv.password,
        serveraddress: argv.serveraddress,
        imageUrl: argv.imageUrl,
        port: `${argv.port}`
      },
      json: true
    });
    spinner.text = `Successfully generated a new deployment token`;
    console.log('\n');
    console.log(
      chalk.green.bold('Deployment Token:'),
      chalk.green(remote.data.token),
      '\n'
    );
    spinner.succeed();
  } catch (err) {
    spinner.fail();
    console.log(chalk.red(err.message || err));
  }
};
