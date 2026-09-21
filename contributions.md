# Contributing to CS Notes

This repository is a personal study project for Computer Science notes and educational content, built as a React + Vite web application. The goal is to keep the project organized, easy to navigate and focused on technical accuracy.

This document explains how to work on the project locally, how the structure is organized and what conventions to follow when adding content or changing behavior.

## 1. Project overview

The app is a content-driven website that presents topics, sections and notes for the Computer Science program.

The main areas are:

- `src/`: application code and UI components
- `src/data/`: content metadata, topic definitions and table-of-contents data
- `src/pages/`: route-level pages such as Home, Topic, About, and Exercises
- `src/sections/`: educational sections and topic-specific components
- `src/i18n/`: internationalization files
- `public/`: static assets and redirects

The site is built with:

- React
- Vite
- Sass modules for styling
- React Router for navigation
- i18next for translations

## 2. Local setup

Clone the repository and install dependencies:

```bash
npm install
```

Start the development environment:

```bash
npm run dev
```

This launches the Vite dev server, typically on a local port such as `5173`.

Useful commands:

```bash
npm run build
npm run preview
npm run lint
```

- `npm run build` creates a production build
- `npm run preview` serves the production build locally
- `npm run lint` checks code quality and ESLint rules

## 3. Repository structure

A practical model of the project is:

- `src/data/` stores the content model
- `src/sections/` contains the rendered educational content
- `src/pages/` decides which page or route is shown
- `src/components/` contains reusable interface elements and navigation components

### Data-driven content

Most of the project content is data-driven. Topic definitions and section metadata are usually stored in files such as:

- `src/data/topics.js`
- `src/data/topicContent.js`
- `src/data/tocSections.js`
- `src/data/topicIcons.js`

If you want to add or edit learning content, start there before building new UI components.

### Section components

The actual teaching content is often implemented as components under `src/sections/`. These represent subject areas such as foundations, algorithms or more specific topics.

When adding new content:

1. Determine the correct section folder
2. Create or update the component for the topic
3. Ensure the component is imported and connected in the relevant route/data structure

## 4. Creating a new topic or section

A typical workflow is:

1. Add or update the topic metadata in `src/data/`
2. Create or modify a section component in `src/sections/`
3. Add the component to the relevant page or topic map
4. Update translations if the UI text is displayed to users
5. Run the project locally to verify the layout and content render correctly

### Example

If you add a new topic:

- update the topic list or metadata file
- add its icon/label/description if required
- ensure the topic is included in the navigation or section map
- verify the route is correctly wired to the proper page component

## 5. Styling conventions

The project uses Sass and component-scoped CSS modules.

When styling:

- keep styles aligned with the existing visual language
- prefer small, local, reusable changes over broad rewrites
- maintain consistency with the established structure and naming conventions
- check the related component before introducing new patterns

The stylesheet system is organized in folders such as:

- `src/assets/styles/`
- component-level `.module.scss` files
- app-wide theme variables and typography

## 6. Internationalization

The application supports multiple languages through the files in `src/i18n/`.

When adding strings:

- update the relevant language JSON files
- keep keys consistent across languages
- prefer short, clear, technical wording
- verify that the same text does not break layout or localization logic

If a new UI label or content block is introduced, it should usually be added to both supported language files unless the text is intentionally language-specific.

## 7. Writing content and educational material

This project is meant to be a technical reference, so content should be:

- accurate and precise
- concise but complete enough to be useful
- structured logically by topic or concept
- written in a clear educational style

Good contribution practices:

- prefer clarity over verbosity
- respect the academic level of the repository
- keep examples simple and understandable
- avoid adding unrelated material or personal notes that do not fit the scope

## 8. Pull requests and contribution flow

Contributions are welcome through issues, pull requests or discussions.

A solid contribution usually includes:

- a clear description of the change
- the reason behind it
- any relevant examples or screenshots when UI changes are involved
- validation by running the project locally

Before submitting:

```bash
npm run build
npm run lint
```

This helps catch syntax issues, failing imports and style problems early.

## 9. Working guidelines

Please keep the following in mind:

- do not add unnecessary dependencies unless clearly justified
- keep code readable and aligned with the existing project style
- favor smaller, focused changes over broad refactors
- maintain coherence between data, routes and UI components
- if you change behavior, verify the affected view in the browser

## 10. Recommended workflow

A simple and effective workflow is:

```bash
npm install
npm run dev
```

Then:

1. identify the content or UI area to modify
2. inspect the related data and component files
3. make small, targeted edits
4. run the relevant validation commands
5. review the page in the browser
6. open a pull request with a concise explanation

## 11. Final note

This project is intentionally lightweight and focused. The best contributions are the ones that help the material remain accurate, easy to navigate and useful for study.

If you are unsure where to start, begin by inspecting the data files and the topic sections most closely related to your change.
