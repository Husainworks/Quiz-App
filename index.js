#!/usr//bin/env node

import chalk from "chalk";
import inquirer from "inquirer";
import gradient from "gradient-string";
import chalkAnimation from "chalk-animation";
import figlet from "figlet";
import { createSpinner } from "nanospinner";

// Variable for player
let playerName;

// A Function for a Timeout of 2 seconds to show the animated text
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));

// A Function which loads when we start the App
async function welcome() {
  const rainbowTitle = chalkAnimation.rainbow("Who Wants to be a Millionare?");

  await sleep();
  rainbowTitle.stop();

  console.log(`${chalk.bgBlue("HOW TO PLAY")}
    I am a process on your computer.
    If you get all the questions wrong I will be ${chalk.red("killed")}
    So get all the questions right...

  `);
}

// A function which takes the User's Name for Input or takes the name Player by default
async function askName() {
  const answers = await inquirer.prompt({
    name: "player_name",
    type: "input",
    message: "What is your name?",
    default() {
      return "Player";
    },
  });
  playerName = answers.player_name;
  console.log(`Welcome ${playerName}\n\n`);
}

// First Question
async function question1() {
  const answers = await inquirer.prompt({
    name: "Question_1",
    type: "list",
    message:
      "1. What will be the output of the following code snippet?\nconst obj1 = {first: 20, second: 30, first: 50};\nconsole.log(obj1);\n",
    choices: [
      "{first: 20, second: 30, first: 40}",
      "{first: 50, second: 30, first: 20}",
      "{first: 20, second: 30, first: 50}",
      "Syntax Error",
    ],
  });

  return handleAnswer(
    answers.Question_1 === "{first: 20, second: 30, first: 50}"
  );
}

// Second Question
async function question2() {
  const answers = await inquirer.prompt({
    name: "Question_2",
    type: "list",
    message:
      "2. What will be the output of the following code snippet?\nprint(typeof(NaN));\n",
    choices: ["Object", "Number", "String", "None of the Above"],
  });

  return handleAnswer(answers.Question_2 === "Number");
}

// Question 3
async function question3() {
  const answers = await inquirer.prompt({
    name: "Question_3",
    type: "list",
    message:
      "3. What will be the output of the following code snippet?\nvar a = true + true + true * 3;\nconsole.log(a)\n",
    choices: ["3", "0", "5", "Error"],
  });

  return handleAnswer(answers.Question_3 === "5");
}

// Question 4
async function question4() {
  const answers = await inquirer.prompt({
    name: "Question_4",
    type: "list",
    message:
      "4. Which function is used to convert a JSON object into a string in Javascript?\n",
    choices: ["stringify()", "parse()", "convert()", "Cannot be Converted"],
  });

  return handleAnswer(answers.Question_4 === "stringify()");
}

// Question 5
async function question5() {
  const answers = await inquirer.prompt({
    name: "Question_5",
    type: "list",
    message: "5. What does … operator do in JS?\n",
    choices: [
      "No such operator exists",
      "It is used to describe a datatype of undefined size",
      "It is used to spread iterables to individual elements",
      "None of the above",
    ],
  });

  return handleAnswer(
    answers.Question_5 ===
      "It is used to spread iterables to individual elements"
  );
}

async function handleAnswer(isCorrect) {
  const spinner = createSpinner("Checking answer...").start();
  await sleep();
  if (isCorrect) {
    spinner.success({
      text: `Nice Work ${playerName}. That is the Right Answer\n\n`,
    });
  } else {
    spinner.error({
      text: `Game Over!! You lose ${playerName}\n\n`,
    });
    process.exit(1);
  }
}

function winner() {
  console.clear();
  const msg = `Congratulations ${playerName} !\n $ 1, 0 0 0, 0 0 0 `;

  figlet(msg, (err, data) => {
    console.log(gradient.pastel.multiline(data));
  });
}

await welcome();
await askName();
await question1();
await question2();
await question3();
await question4();
await question5();
winner();
