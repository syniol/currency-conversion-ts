import { Currency } from './currency'

export class Money {
    readonly #value: number
    readonly #currency: Currency

    public constructor(value: number, currency: Currency) {
        this.#value = value
        if (value < 0) {
            // Balance can be minus but money can not
            this.#value = 0
        }

        if (value > Number.MAX_SAFE_INTEGER) {
            throw new Error('unsupported value')
        }

        this.#currency = currency
    }

    public get currency(): Currency {
        return this.#currency
    }

    public get amount(): number {
        return this.#value
    }
}
