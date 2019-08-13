const minimist = require('minimist');
const inquirer = require('./lib/inquirer');
const files = require('./lib/fileHandler');
const git = require('simple-git/promise')(files.getCurrentDirectory());
const ora = require('ora');
const chalk = require('chalk');

function initializeRemoteRepo(git) {
  return inquirer
    .askRemoteRepoLink()
    .then(answer =>
      git.init().then(() => {
        git.addRemote('origin', answer.enterRemoteRepo);
        console.log('adding to remote repo');
      })
    )
    .catch(err => console.log(err));
}

function addCommitPush(git, commitMessage, pushArr) {
  return inquirer.commitMessagePrompt(commitMessage).then(answer => {
    ora().start(chalk`{cyan pushing your commit to your remote repo}`);
    git.add('.');
    git.commit(commitMessage ? commitMessage : answer['commit-message']);

    git.push(pushArr);
    return git.listRemote(['--get-url']).then(repo =>
      ora().stopAndPersist({
        text: chalk`{green 
👍   pushed to ${repo} }`
      })
    );
  });
}

module.exports = () => {
  const args = minimist(process.argv.slice(2));
  const commitMessage = args._[0];

  if (!files.directoryExists('.git')) {
    return initializeRemoteRepo(git).then(() => {
      addCommitPush(git, 'first commit from gitquick', [
        '--set-upstream',
        'origin',
        'master'
      ]).then(() => {
        ora().clear();
        process.exit();
      });
    });
  }
  return addCommitPush(git, commitMessage).then(() => {
    ora().clear();
    process.exit();
  });
};
