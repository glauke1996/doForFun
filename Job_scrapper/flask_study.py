from logging import debug
from flask import Flask,redirect,render_template,request
# from human import get_jobs as saramin_jobs
from indeed import get_jobs as indeed_jobs
from human import get_last_page

app=Flask("Job Search")

@app.route("/")
def home():
    return render_template("home.html")



@app.route("/report")
def report():
    word=request.args.get("word")
    results_num=get_last_page(word)*40
    if word:
        word=word.lower()
        # saramin=saramin_jobs(word)
        indeed=indeed_jobs(word)


    else:
        return redirect("/")
    return render_template("report.html",word=word,indeed_jobs=indeed,results_num=results_num)



app.run(host="0.0.0.0")