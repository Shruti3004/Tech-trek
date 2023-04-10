# tech-trek  
**Note** : Do not merge ``2023-backend`` branch to main. It will cause merge conflicts that wont be easy to resolve. Also this is a temporary measure for the 2023 event. The main branch contains well written code that should not be interfered with. For future editions of Tech-Trek we will use the main branch as a template.     


## How to setup development environment (Linux)
1. Clone this repository `git clone https://github.com/prakhar9998/tech-trek`.
2. `cd tech-trek`.
3. Run `source secretkeys.sh`  
4. Run `python3 -m venv env`.
5. `source env/bin/activate` to activate the virtual environment.
6. Run `pip install -r requirements.txt` to install the dependencies.
7. Run migrations using `python manage.py migrate`.
8. `python manage.py runserver` and you're ready.

## Setting up frontend 
1. `npm install` to add all the packages of react
2. `npm start` to run the frontend server

## Launcing on Production using Docker
1. Create `.env` in root folder
2. Create `.env` in `client/` folder
3. Run `docker-compose up`.
