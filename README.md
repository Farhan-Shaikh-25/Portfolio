# Mohammed Farhan Shaikh — Portfolio

A minimal, dark editorial portfolio built with React. Single-file component, no external UI libraries.

## Live

```https://portfolio-farhan-25.vercel.app/```

## Stack

- React (functional components + hooks)
- Google Fonts — DM Serif Display & DM Mono
- Vanilla CSS via injected `<style>` tag

## Updating Content

All content lives at the top of `App.jsx` — no need to touch component code.

```js
const SKILLS = { ... };   // add/remove skill categories
const PROJECTS = [ ... ]; // add/remove projects
```

## Structure

```
src/
└── App.jsx   # entire portfolio — data, styles, and components
```

Four sections: **About · Skills · Projects · Contact**
