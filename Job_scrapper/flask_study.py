from flask import Flask,redirect,render_template,request
from human import get_jobs

app=Flask("Job Search")

@app.route("/")
def home():
    return render_template("home.html")

@app.route("/report")
def report():
    word=request.args.get("word")
    if word:
        word=word.lower()
        get_jobs(word)
    else:
        return redirect("/")
    return render_template("report.html",word=word)


app.run(host="0.0.0.0")