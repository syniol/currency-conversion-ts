# Currency Exchange <sup>(Node.js/TypeScript)</sup>
CLI endpoint for Currency Exchange with given context in the user story.


## Requirements
 * Linux/Mac Operating System
 * Node.js 12+
 * Yarn/NPM


## Up and Running
It's very easy to run the endpoint for application. Please ensure you have
all dependencies installed using `yarn` or `npm install` before running 
the following command.

NPM Package Manager:
    
    npm start

Yarn Package Manager:

    yarn start


_You should see an output like this:_

```
    Starting Application Endpoint Demo

Euro to Dollars: 1.14
Dollars to British Pounds: 0.79
Euro to British Pounds: 0.89
Add 13.12 Euro to 99 British Pounds to CAD: 185.64
✨  Done in 2.11s.
```


### API Method
Created a publicly exported method `exchange` with target currency object, 
and collection of money items as a spread parameter.

```typescript
exchange(targetCurrency: Currency, ...currencies: Money[]): Money
```

This API is used inside Data Transfer Object for exchange via ExchangeDTO. This
should be used for implementation in any desired endpoint such as: HTTP(s) RESTful API,
WebSockets and, etc. please see example below:

```typescript
const exchangeService = new ExchangeDTO(currencyRepository?: CurrencyRepository)

exchangeService.exchange(targetCurrency: unknown, ...currencies: unknown[]): string
```

repository could be parsed in at the construct but if is not given it will assign
a default repository for Currency.

```typescript
enum SupportedCurrencies {
    USD = 'USD',
    EUR = 'EUR',
    GBP = 'GBP',
    ...
}

(code: SupportedCurrencies, rate: number): Currency
(value: number, currency: Currency): Money
```


### Architecture
Created using Rich Domain-Driven Design. Main entry point is `exchange.ts` where
`spec` file is created at first to mock parameter and create a design for bounded 
context. Currency is a next model that is defined as Entity and Repository to supply 
requested data for currency.

<p style="text-align: center;">
    <img src="https://raw.githubusercontent.com/syniol/currency-conversion-ts/main/docs/diagram.png" alt="Diagram of Architecture">
</p>

Money is the last object needed that also encapsulates Currency object.

> Money should have currency but currency is considered a ValueObject with no dependency 
and instantiated independently.


you can see the tree structure of application where currency packaged and exported to bounded
context with `index.ts`.

Example of user input:

```json
{
  "targetCurrencyCode": "GBP",
  "exchanges": [
    {
      "currencyCode": "USD",
      "amount": 1
    },
    {
      "currencyCode": "CAD",
      "amount": 1
    }
  ]
}
```

This could be later implemented through HTTP(s) REST, Form submission, and even WebSockets, RPC 
or any other communication protocol. You could also add additional changes to `input.json` at the 
root of `src` and start the application again. Please see example below:

```json
 [
    "27 Australian Dollar to British Pounds",
    {
        "targetCurrencyCode": "GBP",
        "exchanges": [{
            "currencyCode": "AUD",
            "amount": 27
        }]
    }
]
```

#### Credits
Copyright &copy; 2022 Syniol Limited. All rights reserved.
