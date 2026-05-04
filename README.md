# Joke Box 😄

A minimal React app that fetches and displays random jokes by category using the [FreeAPI](https://freeapi.app) public jokes endpoint.

## Features

- Search jokes by category (e.g. `science`, `food`)
- Debounced search — fetches 1000 ms after you stop typing
- Displays category tags on each joke card
- Loading, error, and empty-state handling

## Tech Stack

- **React 19** with Vite
- **FreeAPI** — `https://api.freeapi.app/api/v1/public/randomjokes`

## Getting Started

```random-jokes-viewer/README.md#L1-1
# install
pnpm install

# run dev server
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## API

Jokes are fetched from the FreeAPI public endpoint. No API key required.

```random-jokes-viewer/README.md#L1-1
GET https://api.freeapi.app/api/v1/public/randomjokes?query=<category>
```
