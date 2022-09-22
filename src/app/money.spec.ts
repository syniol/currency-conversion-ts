import { Money } from './money'
import { CurrencyEntity } from './currency'

describe('Money Specs', () => {
    let systemUnderTest: Money

    const currencyMock: jest.Mock<CurrencyEntity> = jest.fn(
        () =>
            ({
                get code(): string {
                    return 'USD'
                },
                get exchangeRate(): number {
                    return 1
                },
                isBaseCurrency(): boolean {
                    return true
                },
            } as CurrencyEntity),
    )

    it('should throw an error during instantiation for max number', () => {
        expect(
            () =>
                new Money(
                    Number.MAX_SAFE_INTEGER + 1,
                    currencyMock(),
                ),
        ).toThrow('unsupported value')
    })

    describe('given instantiated with negative amount', () => {
        beforeAll(() => {
            systemUnderTest = new Money(-21, currencyMock())
        })

        it('should have a value as zero instead', () => {
            expect(systemUnderTest.amount).toEqual(0)
        })

        it('should have a value as retrievable currency', () => {
            expect(systemUnderTest.currency).toBeDefined()
            expect(systemUnderTest.currency.code).toEqual(
                'USD',
            )
            expect(
                systemUnderTest.currency.isBaseCurrency(),
            ).toBeTruthy()
            expect(
                systemUnderTest.currency.exchangeRate,
            ).toEqual(1)
        })
    })
})
