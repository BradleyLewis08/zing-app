export const formCurrencyString = (centsAmount) => (
    `RM ${(centsAmount / 100).toFixed(2)}`
)
export const capitalize = text => text.charAt(0).toUpperCase() + text.slice(1); 


