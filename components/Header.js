import {Text, SafeAreaView, StyleSheet} from 'react-native';
const Header = () => {
    return (<SafeAreaView>
        <Text style={styles.texto}>Organizador de Gastos</Text>
    </SafeAreaView>);
}
const styles = StyleSheet.create({
    texto:{
        textAlign: 'center',
        fontSize: 28,
        color:'#FFF',
        textTransform: 'uppercase',
        fontWeight: 'bold',
        paddingTop: 15,
        marginHorizontal: 8
    }
})
export default Header;