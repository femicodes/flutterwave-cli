#!/usr/bin/env node

const program = require('commander');
const chalk = require('chalk');
const inquirer = require('inquirer');
const payment = require('./cardRequest');

const reciever = () => {
  inquirer.prompt([
    { type: 'input', name: 'name', message: 'Whats your name:' },
    { type: 'input', name: 'email', message: 'Whats your email?:' },
    { type: 'input', name: 'cardNo', message: 'Enter your card number:' },
    { type: 'input', name: 'cvv', message: 'Enter your cvv:' },
    { type: 'input', name: 'expiryMonth', message: 'Enter your card\'s expiry month:' },
    { type: 'input', name: 'expiryYear', message: 'Enter your card\'s expiry year:' },
    { type: 'input', name: 'cardPin', message: 'Enter your card pin:' },
  ]).then(answers => {
    // console.log(`Hello ${answers.name}`);
    payment(answers.name, answers.email, answers.cardNo, answers.cvv, answers.expiryMonth, answers.expiryYear, answers.cardPin);
  }).catch(() => {
    console.log('shit');
  })
};

program
  .version('1.0')
  .description(chalk.black.bgYellow('Flutterwave cli'))
  .action(reciever);

program.parse(process.argv);