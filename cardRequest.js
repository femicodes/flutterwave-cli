const Ravepay = require('ravepay');
const chalk = require('chalk');
const merchant = new Ravepay('FLWPUBK-afcc864ae68f45558241ff2788be9c8c-X', 'FLWSECK-6803a0c3ae1966f97b71801eaa79fe0b-X', false);

const payment = async (firstName, email, cardNo, cvv, expiryMonth, expiryYear, cardPin) => {
  try {
    const chargedUser = await merchant.Card.charge({
      cardno: cardNo,
      cvv: cvv,
      expirymonth: expiryMonth,
      expiryyear: expiryYear,
      amount: 40,
      IP: '71.15.138.132',
      pin: cardPin,
      suggested_auth: 'pin',
      email: email,
      txRef: 'MC-' + Date.now()
    });

    const verifyCharge = (await merchant.Card.validate({
      transaction_reference: chargedUser.body.data.flwRef,
      otp: 12345
    })).body;
    if (verifyCharge.status === 'error') {
      console.log(chalk.black.bgRed(`An error occured! ${verifyCharge.message}`));
    } else {
      console.log('Payment Successful!');
    }

  } catch (error) {
    console.log('An error occured! Check your credentials and try again.');
  }
}


module.exports = payment;