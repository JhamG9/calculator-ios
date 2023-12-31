import React, { useRef, useState } from 'react'
import { Text, View } from 'react-native'
import { styles } from '../theme/app.theme'
import { BotonCalc } from '../components/BotonCalc'
import { useCalculator } from '../hooks/useCalculator'

export const CalculatorScreen = () => {
    const {numeroAnterior,
        numero,
        limpiar,
        positivoNegativo, btnDelete,
        armarNumero, btnDividir, btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular } = useCalculator();

    return (
        <View style={styles.calculadoraContainer}>
            {
                (numeroAnterior !== '0') && <Text style={styles.resultadoPequeno}>{numeroAnterior}</Text>
            }

            <Text style={styles.resultado}
                numberOfLines={1}
                adjustsFontSizeToFit>{numero}</Text>

            {/* Fila de Botones */}
            <View style={styles.fila}>
                <BotonCalc texto='C' color="#9B9B9B" action={limpiar} />
                <BotonCalc texto='+/-' color="#9B9B9B" action={positivoNegativo} />
                <BotonCalc texto='del' color="#9B9B9B" action={btnDelete} />
                <BotonCalc texto='/' color="#FF9427" action={btnDividir} />
            </View>

            {/* Fila de Botones */}
            <View style={styles.fila}>
                <BotonCalc texto='7' action={armarNumero} />
                <BotonCalc texto='8' action={armarNumero} />
                <BotonCalc texto='9' action={armarNumero} />
                <BotonCalc texto='X' color="#FF9427" action={btnMultiplicar} />
            </View>


            {/* Fila de Botones */}
            <View style={styles.fila}>
                <BotonCalc texto='4' action={armarNumero} />
                <BotonCalc texto='5' action={armarNumero} />
                <BotonCalc texto='6' action={armarNumero} />
                <BotonCalc texto='-' color="#FF9427" action={btnRestar} />
            </View>

            <View style={styles.fila}>
                <BotonCalc texto='1' action={armarNumero} />
                <BotonCalc texto='2' action={armarNumero} />
                <BotonCalc texto='3' action={armarNumero} />
                <BotonCalc texto='+' color="#FF9427" action={btnSumar} />
            </View>


            {/* Fila de Botones */}
            <View style={styles.fila}>
                <BotonCalc texto='0' ancho action={armarNumero} />
                <BotonCalc texto='.' action={armarNumero} />
                <BotonCalc texto='=' color="#FF9427" action={calcular} />
            </View>
        </View>
    )
}
