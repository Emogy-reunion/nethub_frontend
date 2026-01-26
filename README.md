# Nethub Frontend

## Table of Contents
1. [Introduction](#introduction)
2. [Key Features](#key-features)
3. [Technologies Used](#technologies-used)
3. [Purpose](#purpose)
4. [Repository Structure](#repository-structure)
5. [Installation](#installation)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)
9. [Contact](#contact)

## Introduction
* Nethub Frontend is the client-side application for Nethub, a modern e-commerce platform for technology products.
* Built with React and Next.js using the App Router, it provides a fast, responsive, and user-friendly interface.
* The app supports role-based access, offering different dashboards for Guests/Users and Admins, and integrates seamlessly with the Nethub Backend to manage products, users, and orders.

## Key Features
* **Responsive design** for desktop and mobile
* **Category-driven navigation** for easy product browsing
* **Role-based dashboards:**
    - *Guest/User Dashboard:* Browse products, view details, and place orders via WhatsApp
    - *Admin Dashboard:* Manage products, categories, and orders
* App Router structure for modular page organization:
    - */app/guest/* → Guest/User pages
    - */app/admin/* → Admin pages
* Integration with backend API for dynamic content
* Optimized for performance, accessibility, and SEO
* Styled using CSS for a clean, modern UI

## Technologies Used

![Next.js](https://img.shields.io/badge/next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![CSS Modules](https://img.shields.io/badge/CSS_Modules-000000?style=for-the-badge&logo=css3&logoColor=white)
![Lucide Icons](https://img.shields.io/badge/Lucide_Icons-FF8C00?style=for-the-badge&logo=lucide&logoColor=white)
![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)

- **Framework:** Next.js 14+ (App Router)
- **Library:** React.js
- **Styling:** CSS Modules (Scoped styling)
- **Icons:** Lucide React
- **State Management:** React Hooks (`useState`, `useEffect`)
- **Data Fetching:** Fetch API with Dynamic Routing


## Purpose
* Provide a visually engaging and intuitive interface for both guests and admins
* Enable role-specific access, ensuring users only see features relevant to their role
* Facilitate seamless interaction with the backend for product and order management
* Support iterative development for future enhancements, including full checkout and member dashboards

## Repository Structure
```text
/nethub-frontend
├── package.json           # Project metadata and dependencies
├── next.config.js         # Next.js configuration
├── public/                # Static assets like images and icons
├── app/                   # App Router directory
│   ├── layout.js          # Global layout
│   ├── page.js            # Main entry page
│   ├── guest/             # Guest/User-specific pages
│   ├── admin/             # Admin-specific pages
│   ├── components/        # Reusable React components
│   └── styles/            # CSS and styling files
├── node_modules/          # Project dependencies
└── README.md              # This file
```

## Installation
1. **Clone the repository:**
    ```sh
        git clone https://github.com/Emogy-reunion/nethub_frontend.git

    ```

2. **Navigate to the project directory:88
    ```
        cd nethub_frontend
    ```

3. **Install dependencies:**
    ```
        npm install
    ```

## Usage
1. **Run the development server:**
    ```sh
        npm run dev
    ```

2. **Open your browser at:**
    ```sh
        http://localhost:3000
    ```

3. **Build for production:**
    ```
        npm run build
        npm start
    ```

## Contributing
* Contributions are welcome! To contribute:
1. Fork the repository
2. Clone your fork
3. Create a new branch
4. Make your changes and commit
5. Push your branch
6. Open a pull request and describe your changes

* Please follow the project's code style and write clear commit messages

## License
* This project is licensed under the MIT License.

## Contact
* Email:
        - markvictormugendi@gmail.com
