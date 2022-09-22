import data from './data.json'
import { CurrencyEntity } from './entity'
import { Currency, SupportedCurrencies } from './currency'

export interface CurrencyDataSource {
    currencyCode: SupportedCurrencies
    exchangeRate: number
}

export class CurrencyRepository {
    readonly #dbSource: CurrencyDataSource[]

    public readonly baseCurrency = new CurrencyEntity(
        CurrencyEntity.BaseCurrency,
        1,
    )

    public constructor(datasource?: CurrencyDataSource[]) {
        this.#dbSource = data as CurrencyDataSource[]

        if (datasource) {
            this.#dbSource = datasource
        }
    }

    public findByCode(code: string): Currency {
        if (code === CurrencyEntity.BaseCurrency) {
            return this.baseCurrency
        }

        const targetCurrency: Record<string, any>[] = this.#dbSource.filter(
            (item: Record<string, any>) => item.currencyCode === code,
        )

        if (targetCurrency.length === 0) {
            throw new Error('unsupported currency')
        }

        return new CurrencyEntity(
            targetCurrency[0].currencyCode,
            targetCurrency[0].exchangeRate,
        )
    }
}
