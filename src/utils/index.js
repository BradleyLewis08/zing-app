export const formCurrencyString = (centsAmount) => (
    `RM ${(centsAmount / 100).toFixed(2)}`
)