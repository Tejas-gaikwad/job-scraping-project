
from pymongo import MongoClient
import requests
from bs4 import BeautifulSoup



def scrape_jobs(url):


    response = requests.get(url)
    if response.status_code == 200:

        html_content = response.content

        if html_content:
            soup = BeautifulSoup(html_content, 'html.parser')
            
            # Find job listings
            job_listings = soup.find_all('div', class_='job-listing-item')
            
            for job in job_listings:
                job_title = job.find('h3', class_='job-title').text.strip()
                job_location = job.find('span', class_='job-location').text.strip()
                job_description = job.find('div', class_='job-description').text.strip()
                
                print(f"Title: {job_title}")
                print(f"Location: {job_location}")
                print(f"Description: {job_description}")
                print("-" * 20)


        # soup = BeautifulSoup(response.content, 'html.parser')
        # job_listings = soup.find_all('a', class_='job-listing')  # Adjust this based on your actual HTML structure

        # net_developer_jobs = []
        # for job in job_listings:
        #     job_title = job.find('h2', class_='job-title').text.strip()
        #     if 'net developer' in job_title.lower():
        #         job_link = job['href']
        #         job_location = job.find('span', class_='job-location').text.strip()
        #         job_company = job.find('span', class_='job-company').text.strip()

        #         net_developer_jobs.append({
        #             'title': job_title,
        #             'link': job_link,
        #             'location': job_location,
        #             'company': job_company
        #         })

        # return net_developer_jobs
    else:
        print(f"Failed to retrieve page: {url}")
        return None


url = 'https://coditas.com/careers/openings/Technology+and+Engineering'
# net_developer_jobs = 
scrape_jobs(url)
client = MongoClient('mongodb+srv://tejasg4646:Tejas0504@cluster0.f1boujn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')


# if net_developer_jobs:
#     for job in net_developer_jobs:
#         print(job)
# else:
#     print("No jobs found or failed to fetch data.")
