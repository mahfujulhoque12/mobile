import { useEffect, useState } from "react";
import {View,StyleSheet, Alert, Text, FlatList,useWindowDimensions} from "react-native";
import {Ionicons} from '@expo/vector-icons';
import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import Colors from "../constants/colors";
import GuessLogItem from "../components/game/GuessLogItem";

function getRandomNumber(min,max,exclued){
    const randomNum=Math.floor(Math.random() * (max-min)) + min;

    if(randomNum===exclued){
        return getRandomNumber(min,max,exclued)
    }else{
        return randomNum;
    }
}
let minBoundary=1;
let maxBoundary=100;
function GameScreen ({userNumber,onGameOver}){
    const initialGuess=getRandomNumber(1,100,userNumber)
    const [currentGuess,setCurrentGuess]=useState(initialGuess)
    const[guessRound,setGuessRound]=useState([initialGuess])
    const{width,height}=useWindowDimensions();

    useEffect(()=>{
        if(currentGuess===userNumber){
            onGameOver(guessRound.length);
        }
    },[currentGuess,userNumber,onGameOver])

    useEffect(()=>{
        minBoundary=1;
        maxBoundary=100;
    },[])

    function nextGuessHandaler(direction){
        if((direction==='lower' && currentGuess <userNumber) || (direction==='greater' && currentGuess >userNumber)){
            Alert.alert('don,t lie','You Know that this is wrong',[{text:"Sorry",style:"cancel"}])
            return;
        }

        if(direction==='lower'){
            maxBoundary=currentGuess;
        
        }else{
            minBoundary=currentGuess + 1;
        }
        const newRanNum= getRandomNumber(minBoundary,maxBoundary,currentGuess);
        setCurrentGuess(newRanNum)
        setGuessRound(prevGuessRound=>[newRanNum,...prevGuessRound])
    }
    const guessRoundListLength=guessRound.length

    let content=(
    <>
     <NumberContainer>{currentGuess}</NumberContainer>
       <Card> 
        <View>
            <InstructionText>Higher or Lower</InstructionText>
            <View style={styles.buttonsContainer}>
            <View style={styles.buttonContainer}>
            <PrimaryButton style={styles.button} onPress={nextGuessHandaler.bind(this,'lower')}><Ionicons name="md-remove" size={24} color="white"/></PrimaryButton>
            </View>
               <View style={styles.buttonContainer}>
               <PrimaryButton onPress={nextGuessHandaler.bind(this,'greater')}><Ionicons name="md-add" size={24} color="white"/></PrimaryButton>
               </View>
            </View>
        </View>
        </Card>
    </>)

        if(width >500){
            content=( 
                <>
                 
                 <View style={styles.wide}>
    <View style={styles.buttonContainer}>
            <PrimaryButton style={styles.button} onPress={nextGuessHandaler.bind(this,'lower')}><Ionicons name="md-remove" size={24} color="white"/></PrimaryButton>
 </View>
               
                 <NumberContainer>{currentGuess}</NumberContainer>

                 <View style={styles.buttonContainer}>
               <PrimaryButton onPress={nextGuessHandaler.bind(this,'greater')}><Ionicons name="md-add" size={24} color="white"/></PrimaryButton>
               </View>
                 </View>
             
                  </>
           
            )
        }

    return( <View style={styles.screen}>
       <Title>Opponent Guess</Title>
        {content}
        <View style={styles.listContainer}>
            {/* {guessRound.map((guessR)=><Text key={guessR}>{guessR}</Text>)} */}

          <FlatList 
          data={guessRound}
          renderItem={(itemData)=><GuessLogItem roundNumber={guessRoundListLength-itemData.index} guess={itemData.item}></GuessLogItem>}
          keyExtractor={(item)=>item}
          />
        </View>
    </View>
    )
}

export default GameScreen;

const styles=StyleSheet.create({
    screen:{
        flex:1,
        padding:24,
        marginTop:20,
        alignItems:'center'
    },
    buttonsContainer:{
        flexDirection:'row'
    },
    buttonContainer:{
        flex:1,
        backgroundColor:"yellow",
        marginTop:10
      
    },
    listContainer:{
        flex:1,
        padding:16,

    },
    wide:{
        flexDirection:'row',
        alignItems:'center'
    }
 
})