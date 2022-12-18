import { StyleSheet,ImageBackground,SafeAreaView} from 'react-native';
import StartGameScreen from './screens/StartGameScreen';
import { LinearGradient } from 'expo-linear-gradient';
import {useFonts} from 'expo-font';
import AppLoading from 'expo-app-loading';
import GameScreen from './screens/GameScreen';
import Colors from './constants/colors';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import GameOverScreen from './screens/GameOverScreen';


export default function App() {
  const [userNumber,setUserNumber]=useState();
  const[gameIsOver,setGameIsOver]=useState(true);
  const[guessRound,setGuessRound]=useState(0)

 const [fontLoaded] = useFonts({
    'open-sans':require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold':require('./assets/fonts/OpenSans-Regular.ttf')
  })

  if(!fontLoaded){
    return <AppLoading></AppLoading>
  }
   
  function pickedNumberHandaler(pickedNumber){
      setUserNumber(pickedNumber)
      setGameIsOver(false)
  }
  function gameOverHandaler(numberOfRounds){
    setGameIsOver(true)
    setGuessRound(numberOfRounds)
  }

  function startNewGameHandaler(){
      setUserNumber(null);
      setGuessRound(0);
  }

  let screen=<StartGameScreen onPickNumber={pickedNumberHandaler}></StartGameScreen>
  if(userNumber){
    screen=<GameScreen userNumber={userNumber} onGameOver={gameOverHandaler}></GameScreen>
  }
  if(gameIsOver && userNumber){
    screen=<GameOverScreen roundNumber={guessRound} userNumber={userNumber} onStartNewGame={startNewGameHandaler}></GameOverScreen>
  }



  return ( <> 
        <StatusBar style='light'/> 
    <LinearGradient style={styles.rootScreen} colors={[Colors.primary500,Colors.accent500]}>
        <ImageBackground style={styles.rootScreen} source={require('./assets/image/pic.jpg')} resizeMode='cover' imageStyle={styles.backgroundImage}>
            <SafeAreaView style={styles.rootScreen}>
            {screen}
            </SafeAreaView>
        </ImageBackground>
    </LinearGradient>
    </>
  );
}

const styles = StyleSheet.create({
      rootScreen:{
        flex:1,
      
      },
      backgroundImage:{
        opacity:0.15
      }
});
