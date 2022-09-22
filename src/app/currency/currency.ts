export enum SupportedCurrencies {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    CAD = 'CAD',
    INR = 'INR',
    MXN = 'MXN',
    AUD = 'AUD',
    CNY = 'CNY',
    MYR = 'MYR',
    COP = 'COP',
}

export function newSupportedCurrency(code?: unknown): SupportedCurrencies {
    if (!code) {
        throw new Error('invalid target currency input')
    }

    const filtered = Object.keys(SupportedCurrencies).filter(
        (val) => val === code,
    )

    if (filtered.length === 1) {
        return filtered[0] as SupportedCurrencies
    }

    throw new Error('invalid target currency input')
}

export interface Currency {
    get code(): string

    get exchangeRate(): number

    isBaseCurrency(): boolean
}
