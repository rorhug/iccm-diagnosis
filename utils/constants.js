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

const QuestionText = {
  age: {
    less2m : { text: '< 2 months', info: ''},
    less1y : { 
      text: '< 1 year',
      info: 'cannot walk',
    },
    oneto5 : {
      text: '1-5 year',
      info: '1) can walk\n2)cannot touch the opposite ear with fingers while passing over the head - IMG??',
    },
    over5  : {
      text: '> 5 year',
      info: 'can touch the ear as shown in image',
    },
  }
}

const RrComponents = {
    counterchoice: 'counterchoice',
    tutorial: 'tutorial',
    tapcounter: 'tapcounter'
}

export { Colors, Layout, Sections, QuestionText, RrComponents };
