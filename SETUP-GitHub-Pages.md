# RDU flights by Vinny – GitHub Pages + Cloudflare Worker Setup

This version works from anywhere (phone, computer, home screen) with **no local server**.

You only need to do this once.

---

## Step 1 – Create the free Cloudflare Worker (the proxy)

1. Go to [https://dash.cloudflare.com](https://dash.cloudflare.com) and sign up / log in (free account is fine).
2. In the left sidebar click **Workers & Pages**.
3. Click **Create** → **Create Worker**.
4. Give it a name (example: `rdu-flights-proxy`) and click **Deploy**.
5. After it deploys, click **Edit code**.
6. Delete everything in the editor and paste the entire contents of `cloudflare-worker.js`.
7. Click **Deploy**.
8. Copy the Worker URL that appears (it looks like):
   ```
   https://rdu-flights-proxy.yourname.workers.dev
   ```
   Keep this URL – you will need it in Step 2.

---

## Step 2 – Put your Worker URL into the HTML file

1. Open `RDU-flights-by-Vinny.html` in any text editor.
2. Near the top of the `<script>` section find this line:
   ```js
   const PROXY_URL = 'https://YOUR-WORKER-NAME.YOUR-SUBDOMAIN.workers.dev';
   ```
3. Replace it with your real Worker URL, for example:
   ```js
   const PROXY_URL = 'https://rdu-flights-proxy.yourname.workers.dev';
   ```
4. Save the file.

---

## Step 3 – Host the page on GitHub Pages (free)

1. Go to [https://github.com](https://github.com) and sign in (or create a free account).
2. Click the **+** → **New repository**.
3. Name it something like `rdu-flights` (public is fine).
4. Click **Create repository**.
5. On the new repo page click **uploading an existing file**.
6. Upload your edited `RDU-flights-by-Vinny.html`.
   - Optional but recommended: rename it to `index.html` while uploading (then the URL will be cleaner).
7. Click **Commit changes**.
8. Go to the repo **Settings** → **Pages** (left sidebar).
9. Under **Source** choose **Deploy from a branch**.
10. Select branch `main` (or `master`) and folder `/ (root)`, then click **Save**.
11. Wait 1–2 minutes. GitHub will show you the live URL, something like:
    ```
    https://yourusername.github.io/rdu-flights/
    ```
    or
    ```
    https://yourusername.github.io/rdu-flights/RDU-flights-by-Vinny.html
    ```

---

## Step 4 – Use it & Add to Home Screen

1. Open the GitHub Pages URL on your phone.
2. You should see live RDU flights.
3. In Chrome/Safari:
   - **Android**: Menu → **Install app** or **Add to Home screen**
   - **iPhone**: Share button → **Add to Home Screen**

Done! The app will now work from anywhere and can live on your home screen.

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| “Proxy not configured yet” | You still have the placeholder URL. Edit the HTML and paste your real Worker URL. |
| “Could not load flight data” | Double-check the Worker URL is correct and that you clicked **Deploy** in Cloudflare. |
| GitHub Pages shows 404 | Wait a couple of minutes, or make sure the file is named `index.html` or you are using the full path. |
| Want to update later | Just edit the HTML on GitHub (or re-upload) and the live site updates automatically. |

---

Files in this package:
- `RDU-flights-by-Vinny.html` – the app (edit the PROXY_URL)
- `cloudflare-worker.js` – paste this into your Cloudflare Worker
- `SETUP-GitHub-Pages.md` – these instructions
