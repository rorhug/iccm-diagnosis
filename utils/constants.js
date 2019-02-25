import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const tintColor = '#2f95dc';

const Colors = {
  tintColor,
  tabIconDefault: '#ccc',
  tabIconSelected: tintColor,
  tabBar: '#fefefe',
  errorBackground: 'red',
  errorText: '#fff',
  warningBackground: '#EAEB5E',
  warningText: '#666804',
  noticeBackground: tintColor,
  noticeText: '#fff',
};

const Layout = {
  window: {
    width,
    height,
  },
  isSmallDevice: width < 375,
};

const Sections = {
    next: 'nextSection',
    fever: 'fever',
    cough: 'cough',
    diarrhoea: 'diarrhoea',
}

export { Colors, Layout, Sections };