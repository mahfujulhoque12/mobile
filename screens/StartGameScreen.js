import { useState } from "react";
import { View,TextInput,StyleSheet,Alert,useWindowDimensions,KeyboardAvoidingView,ScrollView} from "react-native";
import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
function StartGameScreen ({onPickNumber}){
    const[enterNumber,setEnterNumber]=useState('');

    const {width,height}=useWindowDimensions();

    function numberInputHandaler(enterText){
        setEnterNumber(enterText)
    }
    function resteInputHandaler(){
        setEnterNumber('')
    }
    function confirmInputHandaler(){
        const chosenNumber=parseInt(enterNumber);

        if(isNaN(chosenNumber) || chosenNumber <=0 || chosenNumber > 99){
            Alert.alert('Invalid Number','Number has to a Number between 1 to 99',[{text:'Okay',style:'destructive',onPress:resteInputHandaler}]);

            return;
        }
        onPickNumber(chosenNumber)

    }
    const marginTopDis=height <380  ?30:100;
        return(
            <ScrollView style={styles.screen}> 
            <KeyboardAvoidingView  style={styles.screen} behavior="position"> 
            <View style={[styles.rootScreen,{marginTop:marginTopDis}]}> 
                <Title>Guess My Number</Title>
                <Card>
                <InstructionText style={styles.instructionText}>Enter a Number</InstructionText>
            <TextInput
             style={styles.numberInput}
              maxLength={2}
            keyboardType='number-pad'
            autoCapitalize="none"
            autoCorrect={false} 
            onChangeText={numberInputHandaler}
            value={enterNumber}           
            ></TextInput>

           <View style={styles.buttonsContainer}> 
            <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resteInputHandaler}>Reset</PrimaryButton>
            </View>

           <View style={styles.buttonContainer}>
           <PrimaryButton onPress={confirmInputHandaler}>Confirm</PrimaryButton>
           </View>
           </View>

             </Card>
             </View>
             </KeyboardAvoidingView>
             </ScrollView>
        )
}

export default StartGameScreen;

//const deviceHeight=Dimensions.get('window').height

const styles=StyleSheet.create({
    screen:{
        flex:1
    },
    rootScreen:{
        flex:1,
     //  marginTop:deviceHeight,
        alignItems:'center'
    },
    
 
    numberInput:{
        fontSize:32,
        height:50,
        width:50,
        borderColor:Colors.accent500,
        borderBottomWidth:2,
        color:Colors.accent500,
        marginVertical:8,
        fontWeight:'bold',
        textAlign:'center',
    },
    buttonsContainer:{
        flexDirection:'row'
    },
    buttonContainer:{
        flex:1,
    },
    instructionText:{
        marginBottom:12
    }
})