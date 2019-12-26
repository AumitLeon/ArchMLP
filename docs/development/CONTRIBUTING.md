# Contributing to ArchMLP

👍🎉 First off, thanks for taking the time to contribute! 🎉👍

If you're looking for a place to start, check out our [open issues](https://github.com/AumitLeon/archMLP/issues) -- this is where open issues with the project will be posted. 

Looking to get your feet wet? Checkout issues tagged with [documentation](https://github.com/AumitLeon/archMLP/issues?utf8=%E2%9C%93&q=is%3Aopen+is%3Aissue+label%3Adocumentation+) or [good first issue](https://github.com/AumitLeon/archMLP/issues?q=is%3Aopen+is%3Aissue+label%3A%22good+first+issue%22) (these will often be easier tasks that won't require as much knowledge of the project). 

Follow the steps on the [Project Setup](project-setup.md) page to configure your environment for developing on ArchMLP. 

## Development

This project uses several opinionated libraries in the development process to help maintain consistent and clean code. We use [`prettier`](https://github.com/prettier/prettier) as our code formatter, [`commitlint`](https://github.com/conventional-changelog/commitlint) as our commit message linter, and [`semantic-release`](https://github.com/semantic-release/semantic-release) to manage the automation of our releases. We use `semantic-release` for this project because of the benefits gleaned from adhering to [semantic versioning](https://semver.org/). You will have access to all of these libraries after completing the setup steps.

For CI/CD pipelines and automation, this project uses [CircleCI](https://circleci.com/). We have automated tests and linting that runs on each build and before each deploy. 

### Workflow

Begin by making sure the master branch of your clone is up to date.

```bash
$ git checkout master
$ git pull
```

Next, create a feature branch where you will make your changes.

```bash
$ git checkout -b your-feature-branch
```

While making your changes, be sure to follow the [Angular Commit Message Conventions](https://github.com/angular/angular.js/blob/master/DEVELOPERS.md#-git-commit-guidelines). It's important to adhere to these guidelines because `semantic-release` will parse your commit messages to figure out how to properly bump the version when generating new releases. The `commitlint` library uses a githook to lint any commit message and will automatically fire an informative and actionable error if your message doesn't meet these conventions. The exact configuration we use is a variation of the Angular Commit Message standard, called [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/).

While working on `your-feature-branch`, be sure to preiodically fetch and merge the latest changes made to the upstream remote `master` branch. This ensures that your changes are up to date and will reduce the likelihood of merge conflicts and messy rebases later on.

```bash
$ git checkout master
$ git pull
$ git checkout your-feature-branch
$ git merge master
```

After your changes are ready, push up your feature branch to the Github remote.

```bash
$ git push -u origin your-feature-branch
```

Once your branch is pushed to the Github remote, open a pull request to merge `your-feature-branch` branch into `master`. Merging into `master` requires at least one approval, so feel free to add a reviewer from the list of contributors. 

Once your pull request is opened, CircleCI will automatically attempt to build your code using what is creatively dubbed the `build` workflow. Checkout out [`config.yml`](../../.circleci/config.yml) if you're curious about how this is all tied together. 

After your code passes all checks and receives approval from a reviewer, you can merge your development branch to `master`! After you finish the merge, be sure to delete your feature branch.

And viola, you're done! If you added a feature, fix, patch or breaking change, `semantic-release` will automatically generate a release and publish it to GIthub, complete with [release notes](https://github.com/AumitLeon/archMLP/releases) and an updated [changelog](https://github.com/AumitLeon/archMLP/blob/master/docs/CHANGELOG.md). 