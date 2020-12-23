import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Map from './src/screens/Map';

const navigator = createStackNavigator(
  {
    Map
  },
  {
    initialRouteName: 'Map',
    defaultNavigationOptions: {
      title: 'Space Station Location'
    }
  }
  )

  export default createAppContainer(navigator)