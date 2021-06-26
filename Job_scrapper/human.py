from bs4 import BeautifulSoup
import requests


# def strip():

def get_last_page(word):
  URL=f"https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword={word}&loc_mcd=101000&company_cd=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C9%2C10&panel_type=&search_optional_item=y&search_done=y&panel_count=y&recruitPage=1&recruitSort=relation&recruitPageCount=40&inner_com_type=&quick_apply=&except_read=  "
  #seoul
 

  result=requests.get(URL)
  soup=BeautifulSoup(result.text,"html.parser")
  max_page=1
  header=soup.find("div",{"class":"header"})
  total=header.find("span",{"class":"cnt_result"})
  total=(total.string.strip('총건'))
  total=(int)(total.replace(",",""))
  if total>40:
    max_page=(total//40)+1 
  return max_page

def extract_jobs(container,word):
  title=container.find('a')["title"]
  company=container.find('div',{"class":"area_corp"})
  company=company.find('a')["title"].strip()
  div_location=container.find("div",{"class":"job_condition"})
  anchors_location=div_location.findAll('a')
  location=""
  for l in anchors_location:
    location+=l.string
    location+=" "
  job_id=container["value"]
  

  link=f"https://www.saramin.co.kr/zf_user/jobs/relay/view?isMypage=no&rec_idx={job_id}&recommend_ids=eJxtz8sRBCEIBNBo9g403%2FMGYv5ZLDrWjFO13p4gtEoAW%2Fqwsk98tUlB9lAqVE6K10Ep5EkNP8mvt7O8icpwYFIXK6oSw0lWc3eaz8m%2BKWYPAbU6YgDCr70C%2FsOh64Ksj9%2BrONw89uwOwmTZqZ2vaicjvTdTx1w%2F1h%2FQkUQh&view_type=search&searchword={word}&searchType=search&gz=1&paid_fl=n#seq=0  "

  

  return {"title" : title, "company" : company, "location" : location, "link" : link}



  

  
def extract_human_jobs(last_page,word):
  jobs=[]
  for page in range(last_page):
    print(f"scrapping the saramin page :{page+1}")
    result=requests.get(f"https://www.saramin.co.kr/zf_user/search/recruit?searchType=search&searchword={word}&loc_mcd=101000&company_cd=0%2C1%2C2%2C3%2C4%2C5%2C6%2C7%2C9%2C10&panel_type=&search_optional_item=y&search_done=y&panel_count=y&recruitPage={page+1}&recruitSort=relation&recruitPageCount=40&inner_com_type=&quick_apply=&except_read=  ")
    #search of python seoul
    
    soup=BeautifulSoup(result.text,'html.parser')
    containers=soup.findAll("div",{"class":"item_recruit"})
    for container in containers:
      info=extract_jobs(container,word)
      jobs.append(info)

  return jobs  

def get_jobs(word):
  # last_page=get_last_page(word)
  jobs=extract_human_jobs(3,word)
  return jobs





