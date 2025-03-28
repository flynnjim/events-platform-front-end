# EventRight

## Hosted on Netlify

### [**Live App**](https://event-right.netlify.app/)

## Table of Contents

- [Introduction](#introduction)
- [Project Overview](#project-overview)
- [Key Features](#key-features)
- [Technologies Used](#technologies-used)
- [Installation and Setup](#installation-and-setup)
  - [Requirements](#requirements)
  - [Steps to Install Locally](#steps-to-install-locally)
- [Build for Production](#build-for-production)
- [Environment Variables](#environment-variables)
- [API Integration](#api-integration)
- [Deployment](#deployment)
- [Redeployment](#redeployment)
- [Setting Up Environment Variables in Netlify](#setting-up-environment-variables-in-netlify)

## Introduction

EventRight is an events platform that empowers users to view events, register their attendance, and add events to their Google Calendar. Staff members can log in securely to create and edit events. This frontend application consumes my [backend](https://github.com/flynnjim/events-platform-be) Events Platform API to deliver live event data and enable seamless user interaction.

## Project Overview

The EventRight frontend is built using **React** with **TypeScript** and powered by **Vite** for fast builds and efficient local development. Custom CSS is used for styling to maintain a clean and responsive design. The project leverages several additional libraries to enhance functionality, including Axios for API requests, Cloudinary for image handling, and Leaflet for interactive maps.

## Key Features

- **View Events:** Browse a curated list of upcoming events.
- **Attend Events:** Register your attendance and see who else is attending.
- **Google Calendar Integration:** Add events directly to your Google Calendar.
- **Category Sorting:** Filter events by category for a personalized experience.
- **User & Staff Authentication:** Secure login for both regular users and staff.
- **Event Management:** Staff can create and edit event details directly from the frontend.

## Technologies Used

- **React** – For building the user interface.
- **Vite** – For rapid development and optimized builds.
- **TypeScript** – For improved code quality and maintainability.
- **Axios** – For making API requests.
- **CSS** – For custom styling and responsive design.
- **React Router** – For client-side routing.
- **@cloudinary/react & @cloudinary/url-gen** – For image handling and Cloudinary integration.
- **Leaflet & react-leaflet** – For interactive maps.
- **react-icons** – For using iconography throughout the app.
- **Geocoder API** - Used to convert addresses into geographic coordinates (latitude and longitude).

## Installation and Setup

### Requirements

- **Node.js** (version 16+)
- **npm** (version 7+)

### Steps to Install Locally

1. **Clone the Repository**
   ```bash
   git clone https://github.com/flynnjim/events-platform-front-end
   cd events-platform-front-end
   ```
2. **Install Dependencies**
   ```bash
   npm install
   ```
3. **Run the Development Server**
   ```bash
   npm run dev
   ```
4. **Open in Your Browser**
   Navigate to [http://localhost:5173](http://localhost:5173).

## Build for Production

To create an optimized production build, run:

```bash
npm run build
```

You can preview the production build locally with:

```bash
npm run preview
```

## Environment Variables

To connect the frontend with the backend API and the geocoder service, create a `.env` file in the root of your project with the following variables:

```bash
VITE_BACKEND_API_URL=https://events-platform-be-wtam.onrender.com/api
VITE_GEOCODER_API_KEY=your-own-geocoder-api-key
```

## API Integration

This frontend application interacts with the backend Events Platform API, which includes endpoints for:

- **GET /api**  
  Returns a JSON representation of all available endpoints.
- **GET /api/users**  
  Retrieves an array of all users.
- **GET /api/users/:user_id**  
  Retrieves details for a single user.
- **POST /api/users/login**  
  Authenticates a user and returns their data.
- **GET /api/events**  
  Retrieves an array of all events.
- **GET /api/events/:event_id**  
  Retrieves details for a single event.
- **GET /api/users/registered/:event_id**  
  Retrieves all registered users for a specific event.
- **GET /api/staff**  
  Retrieves an array of all staff members.
- **POST /api/staff/login**  
  Authenticates a staff member and returns their data.
- **GET /api/staff/:staff_id**  
  Retrieves details for a single staff member.
- **POST /api/events/:created_by**  
  Adds a new event and returns the event object.
- **PATCH /api/events**  
  Updates an existing event and returns the updated object.
- **POST /api/registration**  
  Registers a user for an event and returns the registration details.
- **PATCH /api/registration**  
  Updates a user's event registration and returns the updated details.

## Deployment

The EventRight frontend is deployed on **Netlify**. To deploy your app:

1. **Build the Production Version**
   ```bash
   npm run build
   ```
2. **Install Netlify CLI (Optional)**
   ```bash
   npm install netlify-cli -g
   ```
3. **Deploy to a Draft URL**
   ```bash
   netlify deploy
   ```
4. **Deploy to Production**
   ```bash
   netlify deploy --prod
   ```

## Redeployment

For redeployment after code updates, follow these steps:

1. **Create an Updated Build**
   ```bash
   npm run build
   ```
2. **Deploy to a Draft URL**
   Select the `dist` folder as the publish directory:
   ```bash
   netlify deploy
   ```
3. **Deploy to Production**
   Again, select the `dist` folder as the publish directory:
   ```bash
   netlify deploy --prod
   ```

## Setting Up Environment Variables in Netlify

To ensure the frontend connects to the backend API in production, set up the following environment variables in Netlify:

1. **Log In to Netlify**
2. **Go to Site Settings**
   - From your Netlify dashboard, click on the name of your hosted site.
3. **Access Environment Variables**
   - Navigate to **Site settings** in the left-hand menu.
   - Click on **Environment Variables**.
4. **Add Environment Variables**
   - Add `VITE_BACKEND_API_URL` with the value:
     ```bash
     https://events-platform-be-wtam.onrender.com/api
     ```
   - Add `VITE_GEOCODER_API_KEY` with your geocoder API key.
5. **Save and Redeploy**
   - After saving, redeploy your site from the Deploys tab or via the Netlify CLI.
