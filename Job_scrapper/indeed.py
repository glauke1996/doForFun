import requests
from bs4 import BeautifulSoup

LIMIT=10
URL=f"https://kr.indeed.com/jobs?q=python&l=%EC%9D%B8%EC%B2%9C+%EC%86%A1%EB%8F%84%EB%8F%99&limit={LIMIT}"

def get_last_page():

  result=requests.get(URL)

  soup=BeautifulSoup(result.text,"html.parser")
  pagination=soup.find("div",{"class":"pagination"})

  links=pagination.findAll('a')
  pages=[]
  for link in links[:-1]:
    # pages.append(link.find('span').string) 
    pages.append((int)(link.string))
  max_pages=pages[-1]
  return max_pages


def extract_jobs(container):
    title=container.find("h2",{"class":"title"}).find("a")["title"]
    company=container.find("span",{"class":"company"})
    company_anchor=company.find('a')
    if company_anchor is not None:
      company=company.find('a').string
    else:
      company=company.string
      
    company=company.strip()
    location=container.find("div",{"class" : "recJobLoc"})["data-rc-loc"]
    job_id=container["data-jk"]
    link=f"https://kr.indeed.com/python%EC%A7%81-%EC%B7%A8%EC%97%85-%EC%9D%B8%EC%B2%9C-%EC%86%A1%EB%8F%84%EB%8F%99-%EC%A7%80%EC%97%AD?vjk={job_id}  "
    return {'title ' : title, 'company' : company, 'location' : location, 'link':link}

def extract_indeed_jobs(last_page):
  jobs=[];
  for page in range(last_page):
    print(f"scrapping the indeed page : {page}")
    result=requests.get(f"{URL}&start={page*LIMIT}")
    soup=BeautifulSoup(result.text,"html.parser")

    containers=soup.findAll("div",{"class":"jobsearch-SerpJobCard"}) #list
    for container in containers:
      job=extract_jobs(container)
      jobs.append(job)
  return jobs  

def get_jobs():
  
  last_page=get_last_page()
  jobs=extract_indeed_jobs(last_page)
  return jobs



  