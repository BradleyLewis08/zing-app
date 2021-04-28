import React, {createContext, useState} from "react"
import stripe from 'tipsi-stripe'
export const StripeContext = createContext()

const StripeProvider = ({children}) => {
    stripe.setOptions({
        publishableKey: "pk_test_iuRP76gOvAKecoDW94ZcVQNw00UW51q2CS"
    })
    return (
        <StripeContext.Provider value={{
            stripe
        }}>
            {children}
        </StripeContext.Provider>
    )
}

export default StripeProvider