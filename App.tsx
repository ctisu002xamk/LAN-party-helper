import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BottomNavigation } from 'react-native-paper';
import { useState } from 'react';
import Randomizer from './components/Randomizer';
import Safkis from './components/Safkis';

const App : React.FC = () : React.ReactElement => {

  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const renderContent = () => {
    switch (selectedIndex) {
      case 0:
        return <Randomizer />;
      case 1:
        return <Safkis />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaProvider>
      
      <BottomNavigation
        activeColor='white'
        inactiveColor='gray'
        navigationState={{ index:  selectedIndex, 
                          routes:  [{ key: 'Randomizer', 
                                      title: 'RANDOMIZER', 
                                      focusedIcon: 'shuffle', 
                                      unfocusedIcon: 'shuffle' 
                                    }, 
                                    { key: 'Safkis', 
                                      title: 'SAFKIS', 
                                      focusedIcon: 'food', 
                                      unfocusedIcon: 'food'  
                                    }] 
                          }}
        onIndexChange={(index) => setSelectedIndex(index)}
        renderScene={renderContent}
        barStyle={{ backgroundColor: '#101010' }}
        theme={{colors: { secondaryContainer: '#42f59b' }}}
      />

      <StatusBar style="light" />
      
    </SafeAreaProvider>
  );
}

export default App;