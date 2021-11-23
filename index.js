import fetch from "node-fetch";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
// const express = require("express");
const app = express();
const port = 3000;
// var bodyParser = require("body-parser");
// var cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

// parse application/json
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/submit", async (req, res) => {
  var payload = req.body;
  const API_URL = "https://dev-api.bpcreates.com",
    API_ENDPOINT = "/api/geico/submitMicrositeLead";
  console.log("agency", payload.auth.agency);
  payload.auth.agency = "2f043085598907cdd984bb99d957875bfe541ce5";
  payload.auth.apiKey = "e08d90052856ce71cb2ac82c0c2ad3ae6b2b8b11";
  //send request
  fetch(API_URL + API_ENDPOINT, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log(response);
      res.json({ success: true, data: response });
    });
});
app.post("/getImagesForEvent", async (req, res) => {
  var payload = req.body;
  const API_URL = "https://dev-api.bpcreates.com";
  payload.auth.agency = "2f043085598907cdd984bb99d957875bfe541ce5";
  payload.auth.apiKey = "e08d90052856ce71cb2ac82c0c2ad3ae6b2b8b11";

  let GETIMAGES_API_ENDPOINT = "/api/geico/getImagesForEvent";
  //send request
  fetch(API_URL + GETIMAGES_API_ENDPOINT, {
    method: "post",
    headers: {
      Accept: "application/json, text/plain, */*",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  })
    .then((response) => response.json())
    .then((response) => {
      console.log("ressssss", response);
      res.json(response);
    });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
