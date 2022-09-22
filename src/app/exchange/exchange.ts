import { Currency } from '../currency'
import { Money } from '../money'

function convertSingle(from: Money, to: Currency): number {
    if (to.isBaseCurrency()) {
        return from.amount / from.currency.exchangeRate
    }

    if (!to.isBaseCurrency()) {
        return (from.amount / from.currency.exchangeRate) * to.exchangeRate
    }

    return from.amount * to.exchangeRate
}

export function exchange(
    targetCurrency: Currency,
    ...currencies: Money[]
): Money {
    const addUp: number[] = []
    for (const currency of currencies) {
        addUp.push(convertSingle(currency, targetCurrency))
    }

    return new Money(
        addUp.reduce((x: number, y: number) => x + y),
        targetCurrency,
    )
}
