import { Currency, SupportedCurrencies } from './currency'

export class CurrencyEntity implements Currency {
    readonly #code: string
    readonly #rate: number

    public static get BaseCurrency(): SupportedCurrencies {
        return SupportedCurrencies.USD
    }

    public constructor(
        code: SupportedCurrencies,
        rate: number,
    ) {
        this.#code = code
        this.#rate = rate
    }

    public get code(): string {
        return this.#code
    }

    public get exchangeRate(): number {
        return this.#rate
    }

    public isBaseCurrency(): boolean {
        return CurrencyEntity.BaseCurrency === this.code
    }
}
