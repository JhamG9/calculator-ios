import { useRef, useState } from "react";

enum Operadores {
    SUMAR, RESTAR, MULTIPLICAR, DIVIDIR
}


export const useCalculator = () => {

    const [numeroAnterior, setNumeroAnterior] = useState('0');
    const [numero, setNumero] = useState('0');

    const ultimaOperacion = useRef<Operadores>()

    const limpiar = () => {
        setNumeroAnterior('0');
        setNumero('0')
    }

    const positivoNegativo = () => {
        if (numero.includes('-')) {
            setNumero(numero.replace('-', ''));
        } else {
            setNumero(numero.replace('', '-'));
        }
    }

    const btnDelete = () => {
        let negativo = '';
        let numeroTemp = numero;
        if (numero.includes('-')) {
            negativo = '-';
            numeroTemp = numero.substring(1);
        }

        if (numeroTemp.length > 1) {
            setNumero(negativo + numeroTemp.slice(0, -1));;
        } else {
            setNumero('0')
        }
    }

    const cambiarNumPorAnterior = () => {
        if (numero.endsWith('.')) {
            setNumeroAnterior(numero.slice(0, -1));
        } else {
            setNumeroAnterior(numero);

        }

        setNumero('0');
    }

    const armarNumero = (numeroTexto: string) => {
        // Validar No aceptar doble punto
        if (numero.includes('.') && numeroTexto === '.') return;


        if (numero.startsWith('0') || numero.startsWith('-0')) {
            // Punto decimal
            if (numeroTexto === '.') {
                setNumero(numero + numeroTexto);

                // Evaluar si es otro cero, y hay otro punto
            } else if (numeroTexto === '0' && numero.includes('.')) {
                setNumero(numero + numeroTexto);

                // Evaluar si es diferente de 0 y no tiene un punto
            } else if (numeroTexto !== '0' && !numero.includes('.')) {
                setNumero(numeroTexto);

                // Evitar 0000.000
            } else if (numeroTexto === '0' && !numero.includes('.')) {
                setNumero(numero);
            } else {
                setNumero(numero + numeroTexto);
            }

        } else {
            setNumero(numero + numeroTexto);
        }
    }

    const btnDividir = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.DIVIDIR;
    }

    const btnMultiplicar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.MULTIPLICAR;
    }

    const btnRestar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.RESTAR;
    }

    const btnSumar = () => {
        cambiarNumPorAnterior();
        ultimaOperacion.current = Operadores.SUMAR;
    }

    const calcular = () => {
        const num1 = Number(numero);
        const num2 = Number(numeroAnterior);

        switch (ultimaOperacion.current) {
            case Operadores.SUMAR:
                setNumero(`${num1 + num2}`);
                break;

            case Operadores.RESTAR:
                setNumero(`${num2 - num1}`);
                break;

            case Operadores.MULTIPLICAR:
                setNumero(`${num1 * num2}`);
                break;

            case Operadores.DIVIDIR:
                setNumero(`${num2 / num1}`);
                break;
        }
        setNumeroAnterior('0');
    }

    return {
        numeroAnterior,
        numero,
        limpiar,
        positivoNegativo, btnDelete,
        armarNumero, btnDividir, btnMultiplicar,
        btnRestar,
        btnSumar,
        calcular
    }
}

