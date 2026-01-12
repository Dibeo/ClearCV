# CV Generator Project
[![Deploy on GitHub Pages](https://github.com/Dibeo/ClearCV/actions/workflows/deploy.yml/badge.svg)](https://github.com/Dibeo/ClearCV/actions/workflows/deploy.yml) [![Run ESLint on Pull Requests](https://github.com/Dibeo/ClearCV/actions/workflows/eslint.yml/badge.svg)](https://github.com/Dibeo/ClearCV/actions/workflows/eslint.yml)

This repository contains a dynamic, multi-themed CV generation application built with React and Tailwind CSS. The project allows users to input their professional data once and toggle between various high-quality visual themes instantly.

## Core Features

* **Dynamic Data Binding**: Utilizes a centralized data structure (`CVData`) to populate all themes.

* **Multi-Theme Support**: Includes several distinct design languages such as Hipster, Modern, Standard, and AutoCV.

* **Contact & Social Integration**: Implements a dynamic icon mapping system for various platforms including LinkedIn, GitHub, and personal websites.

* **Print Optimization**: Styled specifically for A4 paper dimensions ( height) with print-break management.

## Technical Stack

* **Framework**: React
* **Styling**: Tailwind CSS
* **Icons**: Lucide React
* **Type Safety**: TypeScript (Domain-driven design with `CVData` types)

## Data Structure

The themes consume a standardized object containing the following sections:

* **Personal Info**: Full name, title, summary, photo, and dynamic contact/social arrays.

* **Experiences**: Role, company, dates, narrative description, and specific missions.

* **Education**: Degree, school, and graduation year.

* **Skills & Languages**: Technical expertise and proficiency levels.

* **Certifications**: Awards, grants, and professional certificates.

## Local Development

1. Clone the repository.
2. Install dependencies using your preferred package manager.
3. Start the development server.
4. Access the CV preview via the local host address.

To generate a PDF, use the browser's print functionality (Ctrl+P / Cmd+P) or select "Save as PDF". The themes are pre-configured to handle the A4 layout.

## Licence

Ce projet est sous **PolyForm Noncommercial License 1.0.0**  
https://polyformproject.org/licenses/noncommercial/1.0.0/  
(usage non-commercial autorisé, usage commercial interdit sans accord)
