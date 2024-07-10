# Accredian Backend Task

**This is the backend implementation for the MERN Stack Intern position assignment at Accredian. The service handles referral data, processes it, and sends referral emails.**

## About the Project

This backend is built with **Node.js** and **Express.js**, and it uses **Prisma ORM** for database management. The referral data is stored in a **Supabase PostgreSQL** database, and **Nodemailer** with Gmail is used to send emails to the referred persons.

You can find the frontend repository here: [Accredian Frontend Task](https://github.com/tanishqnirwan/Accredian-Frontend-task)

For more details about me, visit my [LinkedIn Profile](https://www.linkedin.com/in/tanishqnirwan/).

## Getting Started

To get the backend server up and running on your local machine, follow these steps:

1. **Clone the repository**:
    ```bash
    git clone https://github.com/tanishqnirwan/Accredian-Backend-task.git
    ```

2. **Navigate to the project folder**:
    ```bash
    cd Accredian-Backend-task
    ```

3. **Install dependencies**:
    ```bash
    npm install
    ```

4. **Set up environment variables**:
    -Refer `.env.sample`  to setup the .env file


5. **Run database migrations**:
    ```bash
    npx prisma migrate deploy
    ```

6. **Start the server**:
    - For development (auto-reloads on file changes):
      ```bash
      npx nodemon app
      ```
    - For production:
      ```bash
      node index.js
      ```

7. **Access the server**:
    - The backend API will be available at: [http://localhost:5000](http://localhost:5000)

## API Endpoints

- **POST /api/referral**: Submits referral data and sends an email to the referred person.

## Technologies Used

- **Node.js**: JavaScript runtime for building the server.
- **Express.js**: Web framework for Node.js.
- **Prisma ORM**: Database toolkit for managing PostgreSQL database.
- **Supabase**: PostgreSQL database hosting.
- **Nodemailer**: Module for sending emails using Gmail.

## Contributing

Feel free to open issues or submit pull requests for improvements.

## Contact

For questions or feedback, you can reach out to me on [LinkedIn](https://www.linkedin.com/in/tanishqnirwan/).

---

**Tanishq Nirwan**  
[LinkedIn Profile](https://www.linkedin.com/in/tanishqnirwan/)
