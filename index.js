// this is a demostration of how a blocking call (i.e. a CPU-intensive api call) 
// in one api blocks the execution of other apis as well

import express from "express";
import os from "os";

export const app = express();

// nominal CPU usage, hence non-blocking call
app.get("/", (req, res) => {
    res.status(200).send(`Process with pid ${process.pid} called`);
});

// CPU-intensive task, hence blocking call
app.get("/blocking", (req, res) => {
    // let counter = 0;
    for (let i=0; i< 20_000_000_000; i++){
        // counter++;
        Math.random();
    }
    // res.status(200).send(`Counter = ${counter}`);
    res.status(200).send("Blocking api call completed.");
});

app.get("/host", (req, res) => {
    res.status(200).send(`Hostname: ${os.hostname()}`);
});