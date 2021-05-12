import { useEffect, useState } from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

// https://exchangeratesapi.io/

function App() {

    const [currencyOptions, setCurrencyOptions] = useState([]);
    const [fromCurrency, setFromCurrency] = useState();
    const [toCurrency, setToCurrency] = useState();
    const [exchangeRate, setExchangeRate] = useState(1);
    const [amount, setAmount] = useState(1);
    const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);

    let toAmount, fromAmount;
    if (amountInFromCurrency) {
        fromAmount = amount;
        toAmount = amount * exchangeRate;
    } else {
        toAmount = amount;
        fromAmount = amount / exchangeRate;
    }

    useEffect(() => {
        fetch(`http://api.exchangeratesapi.io/v1/latest?access_key=${process.env.REACT_APP_EXCHANGERATESAPI_KEY}`)
            .then(res => res.json())
            .then(data => {
                const firstCurrency = Object.keys(data.rates)[0];
                setCurrencyOptions([...Object.keys(data.rates)]);
                setFromCurrency(data.base);
                setToCurrency(firstCurrency);
                setExchangeRate(data.rates[firstCurrency]);
            });
    }, []);

    useEffect(() => {
        if (fromCurrency == null || toCurrency == null) return;
        fetch(`http://api.exchangeratesapi.io/v1/latest?base=${fromCurrency}&symbols=${toCurrency}&access_key=${process.env.REACT_APP_EXCHANGERATESAPI_KEY}`)
            .then(res => res.json())
            .then(data => {
                setExchangeRate(data.rates[toCurrency]);
        });
    }, [fromCurrency, toCurrency])

    function handleFromAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(true);
    }

    function handleToAmountChange(e) {
        setAmount(e.target.value);
        setAmountInFromCurrency(false);
    }

    return (
        <>
            <h1>Convert</h1>
            <CurrencyRow 
                currencyOptions={ currencyOptions } 
                selectedCurrency={ fromCurrency } 
                amount={ fromAmount }
                onChangeAmount={ handleFromAmountChange }
                onChangeCurrency={e => setFromCurrency(e.target.value)}
            />
            <div className="equals">=</div>
            <CurrencyRow 
                currencyOptions={ currencyOptions } 
                selectedCurrency={ toCurrency } 
                amount={ toAmount }
                onChangeAmount={ handleToAmountChange }
                onChangeCurrency={e => setToCurrency(e.target.value)}
            />
        </>
    );
}

export default App;
