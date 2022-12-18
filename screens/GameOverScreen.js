import { Image,View,StyleSheet, Text,useWindowDimensions,ScrollView} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

function GameOverScreen({roundNumber,userNumber,onStartNewGame}){

    const{height,width}=useWindowDimensions();

    let imageSize=300;

    if(width<380){
        imageSize=150
    }
    if(height <400){
        imageSize=80;
    }

    const imageStyle={
        width:imageSize,
        height:imageSize,
        borderRadius:imageSize / 2
    }

    return(<ScrollView style={styles.screen}> 
    
    <View  style={styles.rootContainer}>
        <Title>GAME OVER !!</Title>
        <View style={[styles.imageContainer,imageStyle]}>
        <Image style={styles.image} source={require('../assets/image/success.png')}></Image>
        </View>
        <Text style={styles.summaryText}>Your phone need to
         <Text style={styles.highLight}>{roundNumber}</Text> round to guess the number
          <Text style={styles.highLight}>{userNumber}</Text></Text>

          <PrimaryButton onPress={onStartNewGame}>Start New Game</PrimaryButton>
    </View>
    </ScrollView>)

}
export default GameOverScreen;

//const deviceWidth=Dimensions.get('window').width

const styles=StyleSheet.create({
    imageContainer:{
        // width:deviceWidth<380 ?150:300, 
        // height:deviceWidth<380 ?150:300,
        // borderRadius:deviceWidth<380 ?75:150,
        borderWidth:3,
        borderColor:Colors.accent500,
        overflow:'hidden',
        margin:36
    },
    image:{
        height:'100%',
        width:'100%'
    },
   rootContainer:{
    flex:1,
    justifyContent:'center',
    alignItems:'center',
    padding:24,

   },
   summaryText:{
   fontSize:22,
   textAlign:'center',
   marginBottom:24,
   },
   highLight:{
    fontSize:28,
    color:Colors.primary500,
    fontWeight:'bold'
   },
   screen:{
    flex:1,
   }
})