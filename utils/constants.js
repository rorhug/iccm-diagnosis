import { Dimensions } from 'react-native';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const tintColor = '#2f95dc';

const Images = {
  ageLess5year : require('../assets/images/age-info-less5y.png'),
  ageOver5year : require('../assets/images/age-info-over5y.png')
};

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

const Age = {
  less2m : '< 2 months',
  less1y : '< 1 year',
  over1y : '> 1 year',
  oneto5 : '1-5 year',
  over5  : '> 5 year'
}

const QuestionText = {
  age: {
    less2m : { text: Age.less2m },
    less1y : {
      text: Age.less1y,
      info: 'cannot walk',
    },
    oneto5 : {
      text: Age.oneto5,
      info: '1) can walk\n2)cannot touch the opposite ear with fingers while passing over the head - IMG??',
      img: Images.ageLess5year
    },
    over5  : {
      text: Age.over5,
      info: 'can touch the ear as shown in image',
      img: Images.ageOver5year
    },
  }
}

const RrComponents = {
    counterchoice: 'counterchoice',
    tutorial: 'tutorial',
    tapcounter: 'tapcounter',
    recorder: 'recorder',
    tapcounter1: 'tapcounter1'
}

export { Colors, Layout, Sections, QuestionText, RrComponents, Age, Images };
