import {firebase} from '../../firebase/config'
firebase.functions().useEmulator("localhost", 5001)
const db = firebase.firestore()
if (location.hostname === "localhost") {
    db.useEmulator("localhost", 8080)
}
export const createPaymentMethodFunction = firebase.functions().httpsCallable('createPaymentMethod')
export const createCard = firebase.functions().httpsCallable('createCardToken')
export const saveNewCard = firebase.functions().httpsCallable('saveNewCard')
export const getPaymentMethods = firebase.functions().httpsCallable('getPaymentMethods')
