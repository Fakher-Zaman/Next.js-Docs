export interface CurrencyRate {
    symbol: string;
    rate: number;
}

export interface CurrencyConversion {
    from: string;
    to: string;
    amount: number;
    result: number;
}
