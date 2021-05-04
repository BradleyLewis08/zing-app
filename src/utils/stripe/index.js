const stripe = require('stripe')('sk_test_UiQ9SMPCCDY314AuQYBjmqSJ00NOuW0cau')


export const createCardToken = async (cardDetails) => {
    try{
        const token = await stripe.tokens.create({
            card: {
                number: cardDetails.cardNumber,
                exp_month: cardDetails.expiryMonth,
                exp_year: cardDetails.expiryYear,
                cvc: cardDetails.cvc
            }
        })
        return token
    } catch (error) {
        console.log(error)
    }
}