This project is a miniature of implementation of the Movie recommendation System using content-based filtering method

In this project we can look into the pre-defined movie dataset which is hard-coded but we can also include a dataset in the code by using a dataset and including the PapaParse extention.
Given below is the link to find the data set of movies:

https://grouplens.org/datasets/movielens/100k/

Download the ml-100k.zip file from the above link and extract the zip file in the directory same as the project path rename the u.item file to movies.csv this file consist of 100k movies and their ratings. To include this dataset we need to replace the predefined dataset by using a command in script.js file:

Papa.parse('movies.csv')

This command will import the movies.csv file in the code and now we can run the project

To run this project as it is:
Step-1: Download the entire folder
Step-2: Open the folder using a IDE
Step-3: Modify the code according to your preference if necessary 
Step-4: Run index.html 