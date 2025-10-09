# Release Process

Releases in this repo are mostly automated using [release-it](https://github.com/release-it/release-it).

## Preparation

Tasks before releasing are:

- correctly labeling **all** pull requests that have been merged since the last release
- updating pull request titles so they make sense to our users

When reviewing merged PR's the labels to be used are:

- bug - Used when the PR is fixing an issue in the latest `master` branch.
- dependencies - Used when the PR updates a dependency file.
- documentation - Used when the PR adds or updates documentation.
- enhancement - Used when the PR adds a new feature or enhancement.
- security - Used when the PR addresses a security vulnerability

## Release

Once the prep work is completed, the actual release is straight forward: 
- you just need to merge the open PR into `master`
- `npm run release` 
- `npm publish` 
