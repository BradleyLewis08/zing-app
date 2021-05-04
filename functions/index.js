const functions = require("firebase-functions");
const stripe = require("stripe")("sk_test_UiQ9SMPCCDY314AuQYBjmqSJ00NOuW0cau")

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

exports.createCustomer = functions.https.onRequest(async (req, res) => {
  try {
    const customer = await stripe.customers.create({
      name: req.body.name, 
      email: req.body.email
    })
    res.send(customer)
  }
  catch (error) {
    res.send(error)
  }
})

exports.createPaymentMethod = functions.https.onCall(async (data, context) => {
    console.log(data)
    try {  
      const paymentMethod = await stripe.paymentMethods.create({
        type: 'card',
        card: {
          number: data.cardNumber,
          exp_month: data.expireMonth,
          exp_year: data.expireYear,
          cvc: data.cvc,
        }
      })
      return {paymentMethod}
    }
    catch (error) {
      return {error}
    }
  })
    
