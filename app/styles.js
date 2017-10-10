import { COLORS } from './contants';

export default {
  container: {
    flex: 1,
    backgroundColor: '#FBFBFB'
  },
  shadow: {
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowRadius: 4,
    shadowOpacity: 0.15
  },
  content: {
    margin: 16
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  date: {
    fontSize: 20,
    color: '#FFF'
  },
  dark: {
    alignItems: 'center',
    padding: 16
  },
  darkTitle: {
    fontSize: 20,
    color: '#000',
    marginBottom: 8
  },
  darkMessage: {
    fontSize: 16,
    color: '#000',
    textAlign: 'center',
    marginBottom: 16
  },
  darkButton: {
    backgroundColor: '#f21e60',
    borderRadius: 8,
    paddingHorizontal: 32,
    paddingVertical: 8
  },
  darkButtonText: {
    fontSize: 16,
    color: '#FFF'
  },
  blue: {
    paddingTop: 16,
    backgroundColor: '#FFF'
  },
  blueTitle: {
    fontSize: 26,
    color: COLORS.blue,
    marginHorizontal: 16
  },
  blueDescription: {
    color: '#BBB',
    marginBottom: 8,
    marginHorizontal: 16
  },
  white: {
    backgroundColor: '#F1F1F1',
    borderRadius: 8,
    padding: 8,
    width: 200,
    marginLeft: 16,
    justifyContent: 'space-between'
  },
  whiteTitle: {
    color: COLORS.blue,
    marginBottom: 8
  },
  whiteDescription: {
    color: '#8a8a8a'
  },
  seeMore: {
    margin: 16,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  seeMoreText: {
    color: COLORS.blue
  },
  form: {
    margin: 16
  },
  formLabel: {
    fontSize: 14,
    color: '#000'
  },
  formInput: {
    height: 40,
    color: '#000',
    marginBottom: 16,
    borderBottomWidth: 2,
    borderBottomColor: '#f21e60'
  },
  formButon: {
    alignSelf: 'flex-end'
  },
  courseList: {
    marginHorizontal: 16,
    marginBottom: 16,
    paddingLeft: 8,
    borderLeftWidth: 5,
    borderLeftColor: '#F21E60'
  },
  courseListTime: {
    fontSize: 12,
    color: '#BBB',
    marginBottom: 8
  },
  courseListTitle: {
    fontSize: 16,
    color: '#000',
    marginBottom: 8
  },
  courseListPlace: {
    fontSize: 14,
    color: '#646464'
  },
  page: {
    marginTop: 16
  },
  pageTitle: {
    margin: 16,
    fontSize: 18,
    color: COLORS.blue
  }
};
