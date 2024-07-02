import { useRef, useState } from "react";

enum Operator {
    add, 
    subtract, 
    multiply, 
    divide,
}

export const useCalculator = () => {

    const [number, setNumber] = useState('0');
    const [prevNumber, setPrevNumber] = useState('0');
    
    const lastOperation = useRef<Operator>();

    const clean = () => {
        setNumber('0');
        setPrevNumber('0');
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
        const num1 = Number(number);
        const num2 = Number(prevNumber);

        switch( lastOperation.current ){
            case Operator.add:
                setNumber(`${num1 + num2}`);
                break;
            case Operator.subtract:
                setNumber(`${num2 - num1}`);
                break;
            case Operator.multiply:
                setNumber(`${num1 * num2}`);
                break;
            case Operator.divide:
                setNumber(`${num2 / num1}`);
                break;

            default:
                throw new Error('Invalid operation');
        }
        setPrevNumber('0');
    }



    return {
        // properties
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
