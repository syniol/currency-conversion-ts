import { CurrencyRepository } from './repository'
import { SupportedCurrencies } from './currency'
import { CurrencyEntity } from './entity'

describe('CurrencyRepository Specs', () => {
    let sut: CurrencyRepository

    describe('given is instantiated with default data source', () => {
        beforeAll(() => {
            sut = new CurrencyRepository()
        })

        it('should find and create Currency Object', () => {
            expect(
                sut.findByCode(SupportedCurrencies.USD),
            ).toBeInstanceOf(CurrencyEntity)
        })

        it('should throw an error', () => {
            expect(() => sut.findByCode('SYL')).toThrow(
                'unsupported currency',
            )
        })
    })

    describe('given is instantiated with alternative data source', () => {
        beforeAll(() => {
            sut = new CurrencyRepository([
                {
                    currencyCode: SupportedCurrencies.EUR,
                    exchangeRate: 0.87815,
                },
                {
                    currencyCode: SupportedCurrencies.GBP,
                    exchangeRate: 0.78569,
                },
            ])
        })

        it('should find and create Currency Object', () => {
            expect(
                sut.findByCode(SupportedCurrencies.EUR),
            ).toBeInstanceOf(CurrencyEntity)
        })
    })
})
