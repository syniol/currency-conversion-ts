import { ExchangeDTO } from './exchange.dto'

describe('Exchange Data Transfer Object Specs', () => {
    const systemUnderTest = ExchangeDTO

    it('should throw an error for invalid target currency code', () => {
        expect(() =>
            new systemUnderTest().exchange('ABC', {
                currencyCode: 'EUR',
                amount: 1,
            }),
        ).toThrow('invalid target currency input')
    })

    it('should throw an error for unsupported currency code', () => {
        expect(() =>
            new systemUnderTest().exchange('USD', {
                currencyCode: 'ABC',
                amount: 1,
            }),
        ).toThrow('unsupported currency')
    })

    it('should throw an error when currency is missing currencyCode key', () => {
        expect(() =>
            new systemUnderTest().exchange('USD', {
                amount: 1,
            }),
        ).toThrow('invalid currency input')
    })

    it('should throw an error when currency is missing amount key', () => {
        expect(() =>
            new systemUnderTest().exchange('USD', {
                currencyCode: 'EUR',
            }),
        ).toThrow('invalid currency input')
    })

    it('should convert 1 EUR to USD', () => {
        expect(
            new systemUnderTest().exchange('USD', {
                currencyCode: 'EUR',
                amount: 1,
            }),
        ).toEqual('1.14')
    })

    it('should convert 13.12 Euro in addition to 99 British Pounds to CAD', () => {
        expect(
            new systemUnderTest().exchange(
                'CAD',
                { currencyCode: 'EUR', amount: 13.12 },
                { currencyCode: 'GBP', amount: 99 },
            ),
        ).toEqual('185.64')
    })
})
