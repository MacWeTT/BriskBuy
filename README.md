# BriskBuy

## Buy Essentials at the Best Price!

![Tech Stack Used](https://github-readme-tech-stack.vercel.app/api/cards?title=Tech+Stack+Used&lineCount=2&theme=gotham&width=600&line1=nextdotjs%2CNEXT.js%2Cffffff%3Bredux%2CRedux+Toolkit%2C764ABC%3Btypescript%2CTypeScript%2C3178C6%3Bchakraui%2CChakra+UI%2C319795%3B&line2=django%2CDjango%2C27b780%3Bpython%2CPython%2C3776AB%3Bswagger%2CSwagger+UI%2C85EA2D%3B)

## What is BriskBuy?
BriskBuy is an electronic e-commerce website that customers use to purchase electronic goods at the best available prices in the market.

## How to Run This Project?
This project consists of two parts: the client and the server. The client is a NEXT.js application, while the server is a Django application. Both are interconnected using Django's Rest Framework.

### Steps to Run the Client (Frontend)
1. Navigate to the client directory in the terminal using `cd client`.
2. Install the required dependencies for the frontend by running the command `npm install`.
3. Configure environment variables by creating a `.env` file within the client folder. Set the following variables:
    - `NEXT_PUBLIC_API_URL='YOUR_API_URL'`. If hosting the backend locally, use `http://localhost:8000/api`.
    - `NEXT_PUBLIC_BACKEND_URL='YOUR_BACKEND_URL'`, which would be 'http://127.0.0.1:8000' for local hosting.
4. Start the frontend by running `npm run dev`. The application will be accessible at **http://localhost:3000**.

### Steps to Run the Server (Backend)
1. Initialize a virtual environment in the root directory using `virtualenv env`. This creates a virtual environment named **env**.
2. Activate the virtual environment with `./env/scripts/activate` (Windows) or `source env/bin/activate` (Unix/Linux).
3. Install required dependencies using `pip install -r requirements.txt`, which reads the file in the root directory.
4. Navigate to the server folder and create a `.env` file for environment variables. Set these variables:
    - `SECRET_KEY=YOUR_SECRET_KEY`. Generate a secret key if you don't have one.
    - `DEBUG=True`. Keep it as `True` unless running locally.
5. Initialize the database and tables by running `python manage.py migrate`.
6. Start the backend using `python manage.py runserver`. The server will run on **http://127.0.0.1:8000**.

## What Works?
- User authentication
- Adding to cart and wishlist
- Fetching product details
- Searching for a product

## What Is Pending?
- Async cart management
- Payment integration
- Checkout management
- Social authentication

These steps ensure that the necessary environments are configured for both frontend and backend, allowing you to run the BriskBuy application seamlessly.
