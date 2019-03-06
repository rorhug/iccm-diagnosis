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
    fever: 'fever',
    cough: 'cough',
    diarrhoea: 'diarrhoea',
    dangersigns: 'dangersigns',
    patient_details: 'patient_details',
}

export { Colors, Layout, Sections };