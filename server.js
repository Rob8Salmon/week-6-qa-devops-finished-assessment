const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();

const { bots, playerRecord } = require("./data");
const { shuffleArray } = require("./utils");

require("dotenv").config();

app.use(cors());
app.use(express.json());
// app.use(express.static('public'))

//////////////////////

var Rollbar = require("rollbar");
var rollbar = new Rollbar({
  accessToken: "1e802f3fd56541a4aa132e43d360e693",
  captureUncaught: true,
  captureUnhandledRejections: true,
});

// record a generic message and send it to Rollbar
rollbar.log("Hello world!");

//////////////////////

app.get("/", function (req, res) {
  try {
    rollbar.info("Someone hit the site");
    res.sendFile(
      path.join(__dirname, "../assessment-qa-devops/public/index.html")
    );
  } catch (error) {
    rollbar.critical("Webpage not loading");
  }
});

app.get("/styles", function (req, res) {
  //   rollbar.log("Testing")
  res.sendFile(
    path.join(__dirname, "../assessment-qa-devops/public/index.css")
  );
});

app.get("/js", function (req, res) {
  res.sendFile(path.join(__dirname, "../assessment-qa-devops/public/index.js"));
});

//////////////////////

app.get("/api/robots", (req, res) => {
  try {
    res.status(200).send(botsArr);
  } catch (error) {
    console.log("ERROR GETTING BOTS", error);
    res.sendStatus(400);
    rollbar.error("ERROR GETTING BOTS");
  }
});

app.get("/api/robots/five", (req, res) => {
  try {
    let shuffled = shuffleArray(bots);
    let choices = shuffled.slice(0, 5);
    let compDuo = shuffled.slice(6, 8);
    res.status(200).send({ choices, compDuo });
  } catch (error) {
    console.log("ERROR GETTING FIVE BOTS", error);
    res.sendStatus(400);
    rollbar.error("ERROR GETTING FIVE BOTS");
  }
});

app.post("/api/duel", (req, res) => {
  try {
    // getting the duos from the front end
    let { compDuo, playerDuo } = req.body;

    // adding up the computer player's total health and attack damage
    let compHealth = compDuo[0].health + compDuo[1].health;
    let compAttack =
      compDuo[0].attacks[0].damage +
      compDuo[0].attacks[1].damage +
      compDuo[1].attacks[0].damage +
      compDuo[1].attacks[1].damage;

    // adding up the player's total health and attack damage
    let playerHealth = playerDuo[0].health + playerDuo[1].health;
    let playerAttack =
      playerDuo[0].attacks[0].damage +
      playerDuo[0].attacks[1].damage +
      playerDuo[1].attacks[0].damage +
      playerDuo[1].attacks[1].damage;

    // calculating how much health is left after the attacks on each other
    let compHealthAfterAttack = compHealth - playerAttack;
    let playerHealthAfterAttack = playerHealth - compAttack;

    rollbar.info("Someone is dueling");

    // comparing the total health to determine a winner
    if (compHealthAfterAttack > playerHealthAfterAttack) {
      playerRecord.losses++;
      res.status(200).send("You lost!");
    } else {
      playerRecord.losses++;
      res.status(200).send("You won!");
    }
  } catch (error) {
    console.log("ERROR DUELING", error);
    res.sendStatus(400);
  }
});

app.get("/api/player", (req, res) => {
  try {
    res.status(200).send(playerRecord);
    rollbar.debug("Testing - players display worked");
  } catch (error) {
    console.log("ERROR GETTING PLAYER STATS", error);
    res.sendStatus(400);
  }
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
