# iccm-diagnosis
A mobile app to assist & build on MSF's ICCM Diagnosis.
It implements the ICCM Diagnosis algorithm and features to assist with the diagnosis (e.g. with breath counting).

## Installation

### Prerequsits
* git
* node.js
* yarn or npm

clone the repo using wither
```
$ git clone https://github.com/RoryDH/iccm-diagnosis.git
$ git clone git@github.com:RoryDH/iccm-diagnosis.git
```

in the cloned repository install the packages by running either
```
$ yarn install
$ npm install
```

## Develop

download the [EXPO](https://expo.io/) app on your mobile device

run either
```
$ yarn start
$ npm start
$ expo start
```

Scann the QR-code with your mobile device and your ready to roll

## Deploy

you can deploy using expo 
```
$ expo build:android
$ expo build:ios
```
The ipa/apk files can then be retreived from [https://expo.io/builds]( https://expo.io/builds)

## Test

```
$ yarn test
```


##Contributing

- Create and checkout a branch `git checkout -b name/feature`
- Work on new features, commit your changes `git add ...`, `git commit -am "Added useful button"`, etc.
- Push your branch `git push` and create a pull request on GitHub
- Once merged on GitHub, `git checkout master` and `git pull`.

###Getting the latest master changes

If you've started working on your branch, but in the meantime someone adds new stuff to master and you want/need to get the newest master code on your branch:

1. Have no uncommitted changes. (commit or stash your current changes on your branch)

2. Change to master and get the latest commits
`git checkout master`
`git pull`

3. Switch back to your branch and rebase
`git checkout name/mybranch`
`git rebase master`

4. If you pushed your branch before a rebase, next time you push you'll need to run `git push -f` as the commits now will have new IDs.

When you create a branch off of master, it's based off the last commit on master at that time. Rebasing updates the base of your branch to be the latest commit on master so that your changes are now laid on top of the newest version (while still on your separate branch). Rebasing is preferable to running git merge. Regardless, both may result in merge conflicts which it will list in the terminal.


```
Before rebase (F and G were added to master after you started your feature)

          A---B---C name/feature
         /
    D---E---F---G master


After rebase (Your branch now starts at G, continue working with the latest and greatest!)

                  A'--B'--C' name/feature
                 /
    D---E---F---G master

```
