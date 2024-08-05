import { CurrencyRate } from "@/types";

const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'AUD'];

export const fetchCurrencyRates = async (): Promise<CurrencyRate[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const rates = currencies.map((symbol) => ({
                symbol,
                rate: parseFloat((1 + Math.random() * 0.5).toFixed(4)),
            }));
            resolve(rates);
        }, 1000);
    });
};
