
const jwt = require('jsonwebtoken');
const Job = require('../models/job');
const { exec } = require('child_process');
const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');


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

        const url = 'https://coditas.com/careers/openings/Technology+and+Engineering';
            // Launch a new browser session
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
    
            // Navigate to the page
            await page.goto(url, { waitUntil: 'networkidle2' });

            await page.waitForSelector('_jobListingCard_1u3ts_9'); // Change this to the actual selector for the job listings

    
            // Get the content of the page
            const content = await page.content();
            const $ = cheerio.load(content);

            console.log("content =--------   "+content);
            console.log("$  =--------   "+$ );
    
            // Close the browser
            await browser.close();
    
            // Initialize job listings array
            let jobListings = [];
    
            // Select and iterate over job cards
            $('.content ._jobListingCard_1u3ts_9').each((i, elem) => {
                jobListings.push({
                    title: $(elem).find('._jobTitle_1u3ts_45').text(),
                    description: $(elem).find('._jobDescription_1u3ts_68').text(),
                    details: $(elem).find('._jobDetails_1u3ts_102').text()
                });
            });
    

   

      
        console.log("job listing =--------   "+jobListings);

        res.json(jobListings);
        // exec(`${pythonPath} scrape_jobs.py`, (error, stdout, stderr) => {
        //     if (error) {
        //       console.error(`exec error: ${error}`);
        //       return res.status(500).json({ message: 'Error scraping jobs' });
        //     }
        //     console.log(`stdout: ${stdout}`);
        //     console.error(`stderr: ${stderr}`);
        //     res.status(200).json({ message: 'Jobs scraped successfully' });
        //   });
    } catch(err){
        console.log("err  ---   "+ err);
        res.status(500).json({
            "message" : "Error, Something went wrong",
        });
    }
}

module.exports = {  GetJobs ,  AddJob,  ScrapeJobs};