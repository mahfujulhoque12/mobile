import { Text, View ,StyleSheet} from "react-native";
import Colors from "../../constants/colors";

function GuessLogItem({roundNumber,guess}){
return <View style={styles.listItem}>
    <Text style={styles.textItem}>#{roundNumber}</Text>
    <Text style={styles.textItem}>Opponent Guess : {guess}</Text>

</View>
}

export default GuessLogItem;

const styles=StyleSheet.create({
    listItem:{
        borderColor:Colors.primary500,
        borderWidth:1,
        borderRadius:40,
        padding:12,
        marginVertical:8,
        backgroundColor:Colors.accent500,
        flexDirection:'row',
        justifyContent:'space-between',
        elevation:4,
        shadowColor:'black',
        shadowOffset:{height:0,width:0},
        shadowOpacity:0.25,
        shadowRadius:3
    },
    textItem:{
        fontWeight:'bold'
    }
})