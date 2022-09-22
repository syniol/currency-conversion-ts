import {
    CurrencyRepository,
    newSupportedCurrency,
    SupportedCurrencies,
} from '../currency'

import { Money } from '../money'
import { exchange } from './exchange'

export interface ExchangeUserInputEntry {
    currencyCode: SupportedCurrencies
    amount: number
}

export interface ExchangeUserInput {
    targetCurrencyCode: SupportedCurrencies
    exchanges: ExchangeUserInputEntry[]
}

export function newExchangeUserInputEntry(
    currency?: unknown,
): ExchangeUserInputEntry {
    if (!currency) {
        throw new Error('invalid currency input')
    }

    if (!('currencyCode' in currency) || !('amount' in currency)) {
        throw new Error('invalid currency input')
    }

    return currency as ExchangeUserInputEntry
}

export class ExchangeDTO {
    readonly #currencyRepo: CurrencyRepository

    public constructor(currencyRepo?: CurrencyRepository) {
        this.#currencyRepo = new CurrencyRepository()
        if (currencyRepo) {
            this.#currencyRepo = currencyRepo
        }
    }

    public exchange(
        targetCurrencyCode?: unknown,
        ...currencies: unknown[]
    ): string {
        const targetCurrency = newSupportedCurrency(targetCurrencyCode)

        const money: Money[] = []
        for (const currency of currencies) {
            const parsedExchange = newExchangeUserInputEntry(currency)

            money.push(
                new Money(
                    parsedExchange.amount,
                    this.#currencyRepo.findByCode(parsedExchange.currencyCode),
                ),
            )
        }

        return exchange(
            this.#currencyRepo.findByCode(targetCurrency),
            ...money,
        ).amount.toFixed(2)
    }
}
