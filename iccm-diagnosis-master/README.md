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
