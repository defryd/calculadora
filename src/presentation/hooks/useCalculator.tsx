import { useEffect, useRef, useState } from "react";

enum Operator {
    add = '+', 
    subtract = '-', 
    multiply = '*', 
    divide = '/',
}

export const useCalculator = () => {

    const [formula, setFormula] = useState('')

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');
    
    const lastOperation = useRef<Operator>();

    useEffect(() => {
        if (lastOperation.current) {
            const firstFormulaPart = formula.split(' ').at(0);
            setFormula(`${firstFormulaPart} ${lastOperation.current} ${number}`);
        } else {
            setFormula(number);
        }

    }, [number]);

    useEffect(() => {
        const subResult = calculateSubResult();
        setPrevNumber(`${subResult}`);
    }, [formula])
    
    
    

    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
        lastOperation.current = undefined;
        setFormula('');
    }

    //Delete last number
    const deleteNumber = () => {
        let currentsign = '';
        let temporalNumber = number;

        if(number.includes('-')){
            currentsign = '-';
            temporalNumber = number.substring(1);
        }
        if(temporalNumber.length > 1){
            return setNumber(currentsign + temporalNumber.slice(0, -1));
        }
        setNumber('0');
    }
    

    const togleSign = () => {
        if( number.includes('-')){
            return setNumber(number.replace('-', ''));
        }
        setNumber('-' + number);
    }

    const buildNumber = (numberString: string) => {

        // Prevent double point
        if (number.includes('.') && numberString === '.') return;

        if (number.startsWith('0') || number.startsWith('-0')) {
            // decimal point
            if(numberString === '.'){
                return setNumber(number + numberString);
            }
            // si es otro cero y no hay punto
            else if(numberString === '0' && number.includes('.')){
                return setNumber(number + numberString);
            }
            // si es diferente de cero, no tiene punto y es primer digito
            else if(numberString !== '0' && !number.includes('.')){
                return setNumber(numberString);
            }
            //evitar 00000.00
            else if(numberString === '0' && !number.includes('.')){
                return;
            }
            return setNumber(number + numberString);
        }
        setNumber(number + numberString);
    }

    const setLastNumber = () => {
        calculateResult();
        
        if( number.endsWith('.')){
            setPrevNumber(number.slice(0,-1));
        }else {
            setPrevNumber(number);
        }
        setNumber('0');
    }

    const divideOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.divide;
    }

    const multiplyOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.multiply;
    }

    const addOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.add;
    }

    const subtractOperation = () => {
        setLastNumber();
        lastOperation.current = Operator.subtract;
    }
    
    const calculateResult = () => {
        const result = calculateSubResult();
        setFormula(`${result}`);

        lastOperation.current = undefined;
        setPrevNumber('0');
    }

    const calculateSubResult = (): number => {
        const [firtsValue, operation, secondValue] = formula.split(' ');

        const num1 = Number(firtsValue);
        const num2 = Number(secondValue);

        if(isNaN(num2)) return num1;

        switch( operation ){
            case Operator.add:
                return num1 + num2;
            case Operator.subtract:
                return num1 - num2;
            case Operator.multiply:
                return num1 * num2;
            case Operator.divide:
                return num1 / num2;
            default:
                throw new Error('Invalid operation');
        }
    }



    return {
        // properties
        formula,
        number,
        prevNumber,
        //methods
        buildNumber,
        clean,
        deleteNumber,
        togleSign,
        divideOperation,
        multiplyOperation,
        addOperation,
        subtractOperation,
        calculateResult,
    }
}
