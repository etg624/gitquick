const inquirer = require('inquirer');
const chalk = require('chalk');

const prompt = inquirer.createPromptModule();
module.exports = {
  askRemoteRepoLink: () => {
    return prompt({
      name: 'enterRemoteRepo',
      type: 'input',
      message: chalk.magenta('enter your remote repo')
    });
  },
  commitMessagePrompt: commitMessage => {
    return prompt({
      name: 'commit-message',
      type: 'input',
      default: commitMessage
        ? chalk`press enter to submit: {yellow ${commitMessage}}`
        : chalk`{magenta {bold enter your commit message: {yellow no need for quotes}}}`
    });
  }
};
