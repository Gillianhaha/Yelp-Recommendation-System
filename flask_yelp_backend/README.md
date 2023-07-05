# Getting Started with Yelp Restaurant Recommender

This project is Team 1 BugFree's final project for INFO 5002. 

In this project, our goal is to give restaurant recommendations based on user input.

We first use Yelp Open Dataset(https://www.yelp.com/dataset) as our data frame and did the data processing, data cleaning, data explanation and feature selection.

Then, we built a hybrid recommendation system combined Used-based Collaborative Filtering System and Item-based  Collaborative Filtering System. We calculate cosine distance to evaluate similarity between item pairs.

Finally, We build a full-stack web application using reactjs as the frontend framework and flask as backend framework. Besides, we also use google map API for recommendation results visualization.

Library used in this project:

* Flask
* pandas
* scikit-learn

## Start the project

To start the project, make sure you have python3.8+ installed on you laptop and then execute the following commend
1. Run `pip install flask, pandas, scikit-learn`
2. Run `python3 server.py`



