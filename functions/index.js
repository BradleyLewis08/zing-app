const functions = require("firebase-functions");
const admin = require("firebase-admin")
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY)

admin.initializeApp()

const db = admin.firestore()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.createCustomer = functions.firestore.document('users/{userId}').onCreate(async (snap, context) => {
  const newUserData = snap.data()
  try {
    const customer = await stripe.customers.create({
      name: `${newUserData.firstName} ${newUserData.lastName}`,
      email: `${newUserData.email}`,
      metadata:{
        username: `${newUserData.username}`
      },
      
    })
    return snap.ref.set({
      stripeCustomerId: customer.id 
    }, {merge: true})
  } catch(error) {
  }
})

exports.getPaymentMethods = functions.https.onCall(async (data, context) => {
  try {
    const user = await db.collection('users').doc(data.userId).get()
    const customerId = user.data().stripeCustomerId
    const paymentMethodsFromStripe = await stripe.paymentMethods.list({ 
      customer: customerId,
      type: 'card'
    })
    return {paymentMethodsFromStripe}
  } catch (error) {
    console.log(error)
    return {error}
  }
})
exports.saveNewCard = functions.https.onCall(async (data, context) => {
  try {
    const user = await db.collection('users').doc(data.userId).get()
    const customerId = user.data().stripeCustomerId
    return stripe.paymentMethods.create({
      type: "card",
      card: {
        number: data.card.cardNumber,
        exp_month: data.card.expiryMonth,
        exp_year: data.card.expiryYear,
        cvc: data.card.cvc
      }
    }).then(async (paymentMethod) => {
      try {
        const result = await stripe.paymentMethods.attach(paymentMethod.id,
        {customer: customerId })
        return {result}
        } catch (error) {
          return {error}
        }
    })
  } catch (error) {
    return {error}
  }
})

exports.createPaymentMethod = functions.https.onCall(async (data, context) => {
    try {  
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          token: data.token
        }
      })
      return {paymentMethod}
    }
    catch (error) {
      return {error}
    }
  })
    
