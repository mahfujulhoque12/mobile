import { Text,StyleSheet } from "react-native";
function InstructionText({children,style}){
    return    <Text style={[style,styles.intructionText]}>{children}</Text>
}

export default InstructionText;

const styles=StyleSheet.create({
    intructionText:{
        color:'white',
        fontSize:19
    },
})