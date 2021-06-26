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
    # title=container.find("h2",{"class":"title"}).find("a")["title"]
    container_table=container.find("table",{"class":"jobCard_mainContent"})
    title_h2=container_table.find("h2",{"class":"jobTitle"})
    title_allSpan=title_h2.find_all("span")
    if len(title_allSpan)>=2:
      title=title_allSpan[1]
    else:
      title=title_allSpan[0]
    # print(len(title_allSpan))
    company_div=container_table.find("div",{"class":"heading6"}).find("pre")
    company=company_div.find("span").text
    
    # company_anchor=company.find('a')
    # if company_anchor is not None:
    #   company=company.find('a').string
    # else:
    #   company=company.string
      
    # company=company.strip()
    # location=container.find("div",{"class" : "recJobLoc"})["data-rc-loc"]
    # job_id=container["data-jk"]
    # link=f"https://kr.indeed.com/{word}%EC%A7%81-%EC%B7%A8%EC%97%85-%EC%9D%B8%EC%B2%9C-%EC%86%A1%EB%8F%84%EB%8F%99-%EC%A7%80%EC%97%AD?vjk={job_id}  "
    # return {'title ' : title, 'company' : company, 'location' : location, 'link':link}

def extract_indeed_jobs(last_page,word):
  jobs=[];
  for page in range(last_page):
    print(f"scrapping the indeed page : {page+1}")
    result=requests.get(f"https://kr.indeed.com/jobs?q={word}&l=%EC%9D%B8%EC%B2%9C+%EC%86%A1%EB%8F%84%EB%8F%99&limit={LIMIT}&start={page*LIMIT}")
    soup=BeautifulSoup(result.text,"html.parser")

    # containers=soup.findAll("div",{"class":"jobsearch-SerpJobCard"}) #list
    containers=soup.find_all("a",{"class":"tapItem"})
    for container in containers:
      print(container)
      extract_jobs(container)
      # jobs.append(job)
  # return jobs  

def get_jobs(word):
  
  # last_page=get_last_page()
  jobs=extract_indeed_jobs(1,word)
  return jobs



  