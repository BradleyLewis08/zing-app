import {firebase} from '../firebase/config'
firebase.functions().useEmulator("localhost", 5001)
export const createPaymentMethodFunction = firebase.functions().httpsCallable('createPaymentMethod')