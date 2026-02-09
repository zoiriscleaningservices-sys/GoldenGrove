# Cleaning Services in Midland, TX - SEO Setup Guide

## 📋 Files Included

This repository includes the following SEO and configuration files:

1. **sitemap.xml** - Complete sitemap of all 25 pages
2. **robots.txt** - Search engine crawler instructions
3. **.htaccess** - Apache server configuration for SEO optimization

## 🚀 Setup Instructions

### Step 1: Update Domain Name

Before deploying, you **MUST** update the domain name in these files:

#### In `sitemap.xml`:
Replace all instances of `https://www.yourdomain.com/` with your actual domain.

**Find and Replace:**
- Find: `https://www.yourdomain.com/`
- Replace with: `https://www.goldengrovecleaning.com/` (e.g., `https://www.midlandcleaningservices.com/`)

#### In `robots.txt`:
Update the Sitemap URL on line 7:
```
Sitemap: https://www.goldengrovecleaning.com/sitemap.xml
```

### Step 2: Choose WWW vs Non-WWW

In `.htaccess`, uncomment ONE of these options (lines 14-20):

**Option A - Force WWW:**
```apache
RewriteCond %{HTTP_HOST} !^www\. [NC]
RewriteRule ^(.*)$ https://www.%{HTTP_HOST}/$1 [R=301,L]
```

**Option B - Force Non-WWW:**
```apache
RewriteCond %{HTTP_HOST} ^www\.(.*)$ [NC]
RewriteRule ^(.*)$ https://%1/$1 [R=301,L]
```

### Step 3: Enable HTTPS Redirect

Once you have an SSL certificate installed, uncomment lines 9-10 in `.htaccess`:
```apache
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

### Step 4: Upload to GitHub

1. Initialize git repository (if not already done):
```bash
git init
git add .
git commit -m "Add SEO files: sitemap.xml, robots.txt, .htaccess"
```

2. Create a new repository on GitHub

3. Push to GitHub:
```bash
git remote add origin https://github.com/yourusername/your-repo-name.git
git branch -M main
git push -u origin main
```

### Step 5: Deploy to Web Server

Upload these files to your web server's root directory:
- `sitemap.xml`
- `robots.txt`
- `.htaccess` (only works on Apache servers)

### Step 6: Submit Sitemap to Search Engines

#### Google Search Console:
1. Go to [Google Search Console](https://search.google.com/search-console)
2. Add your property (website)
3. Navigate to "Sitemaps" in the left menu
4. Enter `sitemap.xml` and click "Submit"

#### Bing Webmaster Tools:
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters)
2. Add your site
3. Navigate to "Sitemaps"
4. Submit `https://www.goldengrovecleaning.com/sitemap.xml`

## 📊 Sitemap Priority Structure

- **Priority 1.0** - Homepage (index.html)
- **Priority 0.9** - Main service pages & major city locations
- **Priority 0.8** - Secondary city locations
- **Priority 0.7** - Nearby areas & information pages
- **Priority 0.6** - Neighborhood pages & gallery

## 🔍 Testing Your Setup

### Test Sitemap:
Visit: `https://www.goldengrovecleaning.com/sitemap.xml`

### Test Robots.txt:
Visit: `https://www.goldengrovecleaning.com/robots.txt`

### Validate Sitemap:
Use [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)

### Test .htaccess:
- Check if HTTPS redirect works
- Test clean URLs (e.g., `/about-midland-tx` instead of `/about-midland-tx.html`)
- Verify compression with [GTmetrix](https://gtmetrix.com/)

## 📝 Additional SEO Recommendations

### 1. Create a 404 Error Page
Create `404.html` and uncomment line 60 in `.htaccess`

### 2. Add Structured Data (Schema.org)
Add LocalBusiness schema to your pages for better local SEO

### 3. Monitor Performance
- Set up Google Analytics
- Use Google Search Console regularly
- Monitor page speed with PageSpeed Insights

### 4. Update Sitemap Regularly
When you add new pages, update `sitemap.xml` with:
- New URL
- Current date in `<lastmod>`
- Appropriate priority and changefreq

## 🛠️ Troubleshooting

### .htaccess not working?
- Ensure your server runs Apache
- Check if `mod_rewrite` is enabled
- Contact your hosting provider

### Sitemap not showing in Google?
- Wait 24-48 hours after submission
- Check for XML syntax errors
- Verify robots.txt isn't blocking crawlers

### Clean URLs not working?
- Verify `.htaccess` is in the root directory
- Check Apache configuration allows `.htaccess` overrides
- Ensure `mod_rewrite` module is enabled

## 📞 Support

For questions or issues, please open an issue on GitHub.

---

**Last Updated:** February 9, 2026
