# from indeed import get_jobs as get_indeed_jobs
from human import get_jobs as get_human_jobs
from save import save_to_file


saramin_jobs=get_human_jobs("java")
# indeed_jobs=get_indeed_jobs()
jobs=saramin_jobs
# save_to_file(jobs)

