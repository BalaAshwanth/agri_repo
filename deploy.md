# Deployment Guide - Farm Assistant

## 🚀 Deploy to GitHub Pages (Recommended)

### Step 1: Create GitHub Repository

1. Go to [GitHub.com](https://github.com) and sign in
2. Click "New repository"
3. Name it: `farm-assistant` or `agri-chatbot`
4. Make it **Public** (required for free GitHub Pages)
5. Don't initialize with README (we already have files)

### Step 2: Upload Your Files

1. Download/clone your repository
2. Copy all your files to the repository folder:
   - `index.html`
   - `schemes.html`
   - `demo.html`
   - `styles.css`
   - `script.js`
   - `package.json`
   - `README.md`

### Step 3: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click "Settings" tab
3. Scroll down to "Pages" section
4. Under "Source", select "Deploy from a branch"
5. Select "main" branch and "/ (root)" folder
6. Click "Save"

### Step 4: Access Your Live Site

- Your site will be available at: `https://yourusername.github.io/farm-assistant`
- It may take 5-10 minutes to deploy initially

## 🌐 Alternative: Netlify (Even Easier)

### Option 1: Drag & Drop

1. Go to [netlify.com](https://netlify.com)
2. Sign up for free account
3. Drag your project folder to the deploy area
4. Get instant live URL

### Option 2: GitHub Integration

1. Connect your GitHub repository to Netlify
2. Automatic deployments on every push
3. Custom domain support

## 🔧 Pre-Deployment Checklist

- [ ] Test all pages locally
- [ ] Check all links work
- [ ] Verify mobile responsiveness
- [ ] Test chatbot functionality
- [ ] Ensure API key is working

## 📱 Custom Domain (Optional)

### For GitHub Pages:

1. Add `CNAME` file with your domain
2. Configure DNS settings with your domain provider
3. Update GitHub Pages settings

### For Netlify:

1. Go to Domain settings
2. Add custom domain
3. Follow DNS configuration steps

## 🚨 Important Notes

1. **API Key Security**: Your API key is currently hardcoded. For production:

   - Consider using environment variables
   - Or implement server-side API calls
   - Monitor usage to avoid exceeding limits

2. **HTTPS**: Both GitHub Pages and Netlify provide free HTTPS

3. **Performance**: Both platforms offer excellent performance with global CDN

## 🎯 Recommended: GitHub Pages

**Why GitHub Pages is perfect for your app:**

- ✅ Completely free
- ✅ Perfect for static sites
- ✅ Easy to maintain
- ✅ Professional URLs
- ✅ Version control
- ✅ Easy updates

**Your live URL will be:**
`https://yourusername.github.io/farm-assistant`

## 📞 Need Help?

If you need help with deployment, I can:

1. Help you set up the GitHub repository
2. Guide you through the deployment process
3. Help optimize your app for production
4. Assist with custom domain setup

Just let me know what you'd like to do!
