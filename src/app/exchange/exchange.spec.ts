import { exchange } from './exchange'
import { Money } from '../money'
import { CurrencyEntity, SupportedCurrencies } from '../currency'

describe('Exchange Specs', () => {
    let systemUnderTest = exchange

    const targetCurrencyMock: jest.Mock<CurrencyEntity> = jest.fn()
    const moneyMock: jest.Mock<Money> = jest.fn()

    describe('given currency is 1 GBP and converted to USD', () => {
        beforeAll(() => {
            targetCurrencyMock.mockImplementation(
                () =>
                    ({
                        code: SupportedCurrencies.USD,
                        exchangeRate: 1,
                        isBaseCurrency(): boolean {
                            return true
                        },
                    } as CurrencyEntity),
            )

            moneyMock.mockImplementation(
                () =>
                    ({
                        amount: 1,
                        currency: {
                            code: SupportedCurrencies.GBP,
                            exchangeRate: 0.78569,
                            isBaseCurrency(): boolean {
                                return false
                            },
                        },
                    } as Money),
            )
        })

        afterAll(() => {
            targetCurrencyMock.mockReset()
            moneyMock.mockReset()
        })

        it('should convert to expected amount', () => {
            expect(
                systemUnderTest(targetCurrencyMock(), moneyMock()).amount,
            ).toEqual(1.2727666127862134)
        })
    })

    describe('given currency is 1 USD and converted to EUR', () => {
        beforeAll(() => {
            targetCurrencyMock.mockImplementation(
                () =>
                    ({
                        code: SupportedCurrencies.EUR,
                        exchangeRate: 0.78569,
                        isBaseCurrency(): boolean {
                            return false
                        },
                    } as CurrencyEntity),
            )

            moneyMock.mockImplementation(
                () =>
                    ({
                        amount: 1,
                        currency: {
                            code: SupportedCurrencies.USD,
                            exchangeRate: 1,
                            isBaseCurrency(): boolean {
                                return true
                            },
                        },
                    } as Money),
            )
        })

        afterAll(() => {
            targetCurrencyMock.mockReset()
            moneyMock.mockReset()
        })

        it('should convert to expected amount', () => {
            expect(
                systemUnderTest(targetCurrencyMock(), moneyMock()).amount,
            ).toEqual(0.78569)
        })
    })

    describe('given currency is 1 GBP and converted to EUR', () => {
        beforeAll(() => {
            targetCurrencyMock.mockImplementation(
                () =>
                    ({
                        code: SupportedCurrencies.EUR,
                        exchangeRate: 0.89569,
                        isBaseCurrency(): boolean {
                            return false
                        },
                    } as CurrencyEntity),
            )

            moneyMock.mockImplementation(
                () =>
                    ({
                        amount: 1,
                        currency: {
                            code: SupportedCurrencies.GBP,
                            exchangeRate: 0.78569,
                            isBaseCurrency(): boolean {
                                return false
                            },
                        },
                    } as Money),
            )
        })

        afterAll(() => {
            targetCurrencyMock.mockReset()
            moneyMock.mockReset()
        })

        it('should convert to expected amount', () => {
            expect(
                systemUnderTest(targetCurrencyMock(), moneyMock()).amount,
            ).toEqual(1.1400043274064835)
        })
    })

    describe('given target currency is CAD from EUR, GBP', () => {
        const additionalMoneyMock: jest.Mock<Money> = jest.fn()

        beforeAll(() => {
            targetCurrencyMock.mockImplementation(
                () =>
                    ({
                        code: SupportedCurrencies.CAD,
                        exchangeRate: 1.31715,
                        isBaseCurrency(): boolean {
                            return false
                        },
                    } as CurrencyEntity),
            )

            moneyMock.mockImplementation(
                () =>
                    ({
                        amount: 13.12,
                        currency: {
                            code: SupportedCurrencies.EUR,
                            exchangeRate: 0.87815,
                            isBaseCurrency(): boolean {
                                return false
                            },
                        },
                    } as Money),
            )
            additionalMoneyMock.mockImplementation(
                () =>
                    ({
                        amount: 99,
                        currency: {
                            code: SupportedCurrencies.GBP,
                            exchangeRate: 0.78569,
                            isBaseCurrency(): boolean {
                                return false
                            },
                        },
                    } as Money),
            )
        })

        afterAll(() => {
            targetCurrencyMock.mockReset()
            moneyMock.mockReset()
            additionalMoneyMock.mockReset()
        })

        it('should convert to expected amount', () => {
            expect(
                systemUnderTest(
                    targetCurrencyMock(),
                    moneyMock(),
                    additionalMoneyMock(),
                ).amount,
            ).toEqual(185.64490932161115)
        })
    })
})
