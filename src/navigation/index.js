import React from "react"
import AuthProvider from './AuthProvider'
import Routes from './routes'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ThemeProvider } from 'react-native-elements'
import UserProvider from './UserProvider'
import StripeProvider from './StripeProvider'

const Providers = () => {
    return (
        <SafeAreaProvider>
                <AuthProvider>
                    <UserProvider>
                            <Routes />
                    </UserProvider>
                </AuthProvider>
        </SafeAreaProvider>
    )
}

export default Providers