
const jwt = require('jsonwebtoken');
const Job = require('../models/job');
const { exec } = require('child_process');


const GetJobs = async (req, res) => {
    try{
        const jobs = await Job.find();
        res.json(jobs);
        } catch(err){
            console.log("err  ---   "+ err);
            res.status(500).json({
                "message" : "Error, Something went wrong",
            });
        }
}

const AddJob = async (req, res) => {
    try{
        const { title, link } = req.body;
        const job = new Job({
            title: title,
            link: link
        });
        const newJob = await job.save();
        res.status(201).json(newJob);
    } catch(err){
        console.log("err  ---   "+ err);
        res.status(500).json({
            "message" : "Error, Something went wrong",
        });
    }
}

const pythonPath = 'C:\\Users\\tejas\\AppData\\Local\\Programs\\Python\\Python312\\python.exe';

const ScrapeJobs = async (req, res) => {


    console.log("Scrapping jobs started....");
    try{
        exec(`${pythonPath} scrape_jobs.py`, (error, stdout, stderr) => {
            if (error) {
              console.error(`exec error: ${error}`);
              return res.status(500).json({ message: 'Error scraping jobs' });
            }
            console.log(`stdout: ${stdout}`);
            console.error(`stderr: ${stderr}`);
            res.status(200).json({ message: 'Jobs scraped successfully' });
          });
    } catch(err){
        console.log("err  ---   "+ err);
        res.status(500).json({
            "message" : "Error, Something went wrong",
        });
    }
}

module.exports = {  GetJobs ,  AddJob,  ScrapeJobs};