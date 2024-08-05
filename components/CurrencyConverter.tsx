"use client";

import React from 'react';
import useCurrencyConverter from '@/hooks/useCurrencyConverter';
import { Button, Input, Select, SelectItem } from '@nextui-org/react';

const CurrencyConverter: React.FC = () => {
    const {
        currencyRates,
        conversion,
        averageRate,
        rateVariance,
        convertCurrency,
        handleInputChange,
    } = useCurrencyConverter();

    return (
        <div className="w-full">
            <h1 className="text-2xl font-bold mb-4 text-center">Currency Converter</h1>
            <div className='w-full grid grid-cols-2 gap-4 items-center justify-center'>
                <Input
                    variant='bordered'
                    label="Amount"
                    type="number"
                    value={conversion.amount.toString()}
                    onChange={(e) => handleInputChange('amount', e.target.value)}
                    className='w-full col-span-2'
                />
                <Select
                    variant='bordered'
                    label="From"
                    value={conversion.from}
                    onChange={(e) => handleInputChange('from', e.target.value)}
                    className='w-full col-span-1'
                >
                    {currencyRates.map((rate) => (
                        <SelectItem key={rate.symbol} value={rate.symbol}>
                            {rate.symbol}
                        </SelectItem>
                    ))}
                </Select>
                <Select
                    variant='bordered'
                    label="To"
                    value={conversion.to}
                    onChange={(e) => handleInputChange('to', e.target.value)}
                    className='w-full col-span-1'
                >
                    {currencyRates.map((rate) => (
                        <SelectItem key={rate.symbol} value={rate.symbol}>
                            {rate.symbol}
                        </SelectItem>
                    ))}
                </Select>
                <Button
                    variant='solid'
                    color='primary'
                    onClick={convertCurrency}
                    className='w-64 mx-auto text-white col-span-2'
                >
                    Convert
                </Button>
            </div>

            <div className="my-4">
                <p className="text-lg">
                    <strong>Converted Amount:</strong> {conversion.result.toFixed(4)}
                </p>
            </div>

            <div className="border-t-2">
                <h2 className="text-lg font-bold my-2">Exchange Rate Statistics</h2>
                <p className="text-sm">
                    <strong>Average Rate:</strong> {averageRate}
                </p>
                <p className="text-sm">
                    <strong>Rate Variance:</strong> {rateVariance}
                </p>
            </div>
        </div>
    );
};

export default CurrencyConverter;
