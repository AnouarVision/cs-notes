<div align="center">
  <img src="mascotte.png" alt="CS notes mascot" width="130">
</div>

<h1 align="center">CS notes</h1>

## Overview
This repository contains notes and code from the **Computer Science (L‑31)** program at the University of Florence (Unifi).

The material is organized as a personal technical reference and evolves over time as part of an ongoing study.

The content is accessible through a simple web interface, both on desktop and mobile devices.

---

## Live Version

The project is available online via **Netlify**:
[https://cs-notes.netlify.app/](https://cs-notes-uni.netlify.app/)

---

## Contributing

This project is primarily a personal technical reference.

For a detailed guide on how to work on the project, see [contributions.md](contributions.md).

Contributions, suggestions and corrections are welcome through:
- issues
- pull requests
- discussions

Any contribution should aim to keep the repository clear, minimal and focused on technical accuracy.

### Git workflow

It is recommended to avoid committing directly to `main` and instead create a dedicated branch for each change.

Example workflow:

```bash
git checkout main
git pull --ff-only
git checkout -b feature/my-change
# make edits
# test locally
git add .
git commit -m "Add my change"
git push -u origin feature/my-change
```

This keeps the main branch stable and makes it easier to review and merge each change cleanly.

---

##  License

This repository is licensed under the terms described in the `LICENSE.txt` file.
