const{ ScrapeJobs, AddJob, GetJobs } = require('../controller/scrap_jobs_controller');
// const{ authenticateToken,  } = require('../middlewares/auth_middleware');
const express = require('express');
const router = express.Router();

router.get('/get_all_jobs',  GetJobs);

router.post('/add_job', AddJob);

router.post('/scrape_jobs', ScrapeJobs);


module.exports = router;