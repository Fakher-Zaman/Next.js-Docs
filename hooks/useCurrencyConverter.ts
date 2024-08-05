"use client";

import { useState, useEffect, useMemo, useCallback } from 'react';
import { CurrencyRate, CurrencyConversion } from '@/types';
import { fetchCurrencyRates } from '@/utils/currencyAPI';

const useCurrencyConverter = () => {
    const [currencyRates, setCurrencyRates] = useState<CurrencyRate[]>([]);
    const [conversion, setConversion] = useState<CurrencyConversion>({
        from: 'USD',
        to: 'EUR',
        amount: 0,
        result: 0,
    });

    // Fetch currency rates when the component mounts
    useEffect(() => {
        const loadCurrencyRates = async () => {
            const rates = await fetchCurrencyRates();
            setCurrencyRates(rates);
        };

        loadCurrencyRates();
    }, []);

    // Automatically update exchange rates every 10 seconds
    useEffect(() => {
        const interval = setInterval(async () => {
            const updatedRates = await fetchCurrencyRates();
            setCurrencyRates(updatedRates);
        }, 10000);

        return () => clearInterval(interval);
    }, []);

    // Convert currency amount
    const convertCurrency = useCallback(() => {
        const fromRate = currencyRates.find((rate) => rate.symbol === conversion.from)?.rate || 1;
        const toRate = currencyRates.find((rate) => rate.symbol === conversion.to)?.rate || 1;
        const result = (conversion.amount * toRate) / fromRate;
        setConversion((prev) => ({ ...prev, result }));
    }, [conversion.amount, conversion.from, conversion.to, currencyRates]);

    // Calculate average exchange rate
    const averageRate = useMemo(() => {
        if (currencyRates.length === 0) return 0;
        const total = currencyRates.reduce((acc, rate) => acc + rate.rate, 0);
        return parseFloat((total / currencyRates.length).toFixed(4));
    }, [currencyRates]);

    // Calculate exchange rate variance
    const rateVariance = useMemo(() => {
        if (currencyRates.length < 2) return 0;
        const mean = averageRate;
        const squaredDiffs = currencyRates.map((rate) => Math.pow(rate.rate - mean, 2));
        const avgSquareDiff = squaredDiffs.reduce((acc, diff) => acc + diff, 0) / currencyRates.length;
        return parseFloat(avgSquareDiff.toFixed(4));
    }, [currencyRates, averageRate]);

    // Handle input change
    const handleInputChange = useCallback(
        (field: 'amount' | 'from' | 'to', value: string | number) => {
            setConversion((prev) => ({
                ...prev,
                [field]: field === 'amount' ? Number(value) : value,
            }));
        },
        []
    );

    return {
        currencyRates,
        conversion,
        averageRate,
        rateVariance,
        convertCurrency,
        handleInputChange,
    };
};

export default useCurrencyConverter;
