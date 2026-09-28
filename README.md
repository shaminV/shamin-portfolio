# Shamin Vihanga — Personal Portfolio Website

A responsive static portfolio website built from the information in Shamin Vihanga's CV.

## Files

- `index.html` — main website
- `style.css` — visual design and responsive layout
- `script.js` — animations, mobile menu, theme switcher, active navigation, copy-email feature
- `assets/profile.png` — profile photo from the CV
- `assets/Shamin_Vihanga_CV.pdf` — downloadable CV
- `assets/favicon.svg` — site icon

## Add LinkedIn and GitHub

Open `script.js` and replace the empty values at the top:

```js
const profileLinks = {
  linkedin: "https://www.linkedin.com/in/YOUR-PROFILE",
  github: "https://github.com/YOUR-USERNAME"
};
```

The buttons become active automatically after a URL is added.

## Preview locally

Double-click `index.html`, or serve the folder using any local static server.

## Publish with GitHub Pages

1. Create a new GitHub repository.
2. Upload all files in this folder to the repository root.
3. Open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and `/ (root)`, then save.

## Publish with Netlify

Drag this entire folder into Netlify's manual deploy area. No build command is required.

## Publish with Cloudflare Pages

Create a Pages project from the repository and use no build command. Set the output directory to the repository root.

## Privacy check before publishing

The website currently includes the contact address and referee phone numbers because they are present in the supplied CV. Review those details before making the site public if you do not want them visible online.
