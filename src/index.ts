import { ExchangeDTO, ExchangeUserInput } from './app'

import inputData from './input.json'

function main(): void {
    console.log('\n\tStarting Application Endpoint Demo\n')

    const demoData = new Map<string, ExchangeUserInput>(inputData as any)
    const exchangeService = new ExchangeDTO()

    for (const demo of demoData) {
        console.log(
            `${demo[0]}:`,
            exchangeService.exchange(
                demo[1].targetCurrencyCode,
                ...demo[1].exchanges,
            ),
        )
    }

    process.exit(0)
}

;(() => {
    main()
})()
