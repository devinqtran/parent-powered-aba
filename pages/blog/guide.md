# Blog Creation Guide for Parent Powered ABA

## 📝 Quick Start Guide

This guide will help you create and publish new blog posts for the Parent Powered ABA website, even if you're not familiar with HTML or coding.

---

## 🚀 Creating a New Blog Post - Step by Step

### Step 1: Copy the Template

1. Navigate to the `pages/blog/` folder
2. Find the file named `blog-post-template.html`
3. **Right-click** on this file and select **"Copy"**
4. **Right-click** in the same folder and select **"Paste"**
5. Rename the new file with a descriptive name (see naming guidelines below)

### Step 2: File Naming Guidelines

Use lowercase letters, hyphens instead of spaces, and make it descriptive:

**Good Examples:**

- `understanding-autism-meltdowns.html`
- `aba-strategies-for-bedtime.html`
- `building-social-skills-at-home.html`

**Avoid:**

- `My New Blog Post.html` (spaces and capitals)
- `post1.html` (not descriptive)
- `BLOG POST.HTML` (all capitals)

---

## ✏️ Editing Your Blog Post

### Step 3: Open Your File

1. Right-click on your new blog post file
2. Select **"Open with"** → **"Notepad"** (Windows) or **"TextEdit"** (Mac)
3. You'll see the HTML code - don't worry, we'll only change specific parts!

### Step 4: Update the SEO Information (Top of File)

Look for this section near the top and update it with your article information:

```html
<!-- Update these lines with your article info -->
<title>YOUR POST TITLE HERE - Parent Powered ABA</title>
<meta name="description" content="BRIEF DESCRIPTION OF YOUR ARTICLE HERE" />
<meta name="keywords" content="keyword1, keyword2, keyword3" />

<!-- Update these social media sections too -->
<meta property="og:title" content="YOUR POST TITLE HERE" />
<meta property="og:description" content="BRIEF DESCRIPTION HERE" />
```

**Example:**

```html
<title>5 Tips for Managing Autism Meltdowns - Parent Powered ABA</title>
<meta
  name="description"
  content="Learn practical strategies to help prevent and manage meltdowns in children with autism using ABA principles."
/>
<meta
  name="keywords"
  content="autism meltdowns, ABA strategies, behavior management, parenting tips"
/>
```

### Step 5: Update the Blog Header

Find this section and update it:

```html
<div class="blog-meta">
  <span class="blog-category-tag">CATEGORY HERE</span>
  <span class="blog-date">CURRENT DATE</span>
</div>
<h1>YOUR BLOG POST TITLE</h1>
<p class="blog-excerpt">Your brief article summary here</p>
```

**Categories to Choose From:**

- ABA Strategies
- Parenting Tips
- Communication
- Behavior Management
- Success Stories

### Step 6: Add Your Main Content

Look for the section that starts with `<article class="blog-content">` and replace the sample content with your article.

---

## 📝 Writing Your Content

### Using Headings

```html
<h2>Main Section Title</h2>
<h3>Subsection Title</h3>
```

### Writing Paragraphs

```html
<p>Your paragraph text goes here. Keep paragraphs focused on one main idea.</p>
```

### Creating Lists

**Bulleted Lists:**

```html
<ul>
  <li>First point</li>
  <li>Second point</li>
  <li>Third point</li>
</ul>
```

**Numbered Lists:**

```html
<ol>
  <li>Step one</li>
  <li>Step two</li>
  <li>Step three</li>
</ol>
```

### Adding Special Boxes

**Tip Box (Green):**

```html
<div class="tip-box">
  <h4>Pro Tip:</h4>
  <p>Your helpful tip goes here.</p>
</div>
```

**Highlight Box (Gray):**

```html
<div class="highlight-box">
  <h4>Important Note:</h4>
  <p>Your important information goes here.</p>
</div>
```

---

## 🖼️ Adding Images

### Step 7: Prepare Your Images

1. Save your images in the `assets/images/` folder
2. Use descriptive names like `blog-autism-bedtime-routine.jpg`
3. Recommended size: 800px wide or larger

### Step 8: Add Images to Your Post

Replace the sample image with yours:

```html
<div class="blog-featured-image">
  <img
    src="../../assets/images/YOUR-IMAGE-NAME.jpg"
    alt="Description of your image"
  />
</div>
```

**Important:** Always include a descriptive `alt` attribute for accessibility!

---

## 👤 Author Information

### Step 9: Update Author Bio

Find the author bio section and update it:

```html
<div class="author-bio">
  <img
    src="../../assets/images/YOUR-AUTHOR-PHOTO.jpg"
    alt="Your Name"
    class="author-avatar"
  />
  <div class="author-info">
    <h4>Your Name, Credentials</h4>
    <p>Brief bio about yourself and your expertise.</p>
  </div>
</div>
```

---

## 🏷️ Tags and Categories

### Step 10: Update Tags

Find the tags section and update with relevant keywords:

```html
<div class="blog-tags">
  <a href="#" class="blog-tag">Your Tag 1</a>
  <a href="#" class="blog-tag">Your Tag 2</a>
  <a href="#" class="blog-tag">Your Tag 3</a>
</div>
```

**Good Tags Examples:**

- ABA Techniques
- Sensory Processing
- Social Skills
- Daily Routines
- Parent Support

---

## 🔗 Adding Your Post to the Main Blog Page

### Step 11: Update the Blog Index

1. Open `blog.html` (in the pages folder)
2. Find the blog grid section
3. Copy one of the existing blog card sections
4. Update it with your new post information:

```html
<article class="blog-card" data-category="your-category">
  <div class="blog-card-image">
    <img src="../assets/images/your-image.jpg" alt="Your image description" />
  </div>
  <div class="blog-card-content">
    <div class="blog-card-meta">
      <span class="blog-card-category">Your Category</span>
      <span>Your Date</span>
    </div>
    <h3 class="blog-card-title">Your Post Title</h3>
    <p class="blog-card-excerpt">Brief description of your post.</p>
    <a href="blog/your-post-filename.html" class="blog-card-read-more"
      >Read More</a
    >
  </div>
</article>
```

---

## ✅ Before You Publish - Quality Checklist

### Content Review:

- [ ] Title is clear and descriptive
- [ ] Article is well-structured with headings
- [ ] Content is helpful and relevant to parents
- [ ] Grammar and spelling are correct
- [ ] All links work properly

### Technical Review:

- [ ] SEO title and description are updated
- [ ] Date and category are correct
- [ ] Author bio is updated
- [ ] Images have descriptive alt text
- [ ] File is saved with correct name
- [ ] Post is added to main blog page

### SEO Optimization:

- [ ] Title includes relevant keywords
- [ ] Meta description is compelling (under 160 characters)
- [ ] Article has good internal structure
- [ ] Images are optimized for web
- [ ] Tags are relevant and specific

---

## 🆘 Troubleshooting Common Issues

### Problem: "My page looks broken"

**Solution:** Check that all image paths start with `../../` and your HTML tags are properly closed.

### Problem: "Images don't show up"

**Solution:** Make sure images are in the `assets/images/` folder and the path is correct.

### Problem: "Links don't work"

**Solution:** Double-check file names and paths. Make sure there are no spaces in filenames.

### Problem: "Changes don't appear online"

**Solution:** Make sure you've saved your files and uploaded them to the web server.

---

## 📞 Need Help?

If you get stuck or have questions:

1. **Double-check this guide** - most issues are covered here
2. **Save your work** before making changes
3. **Test your page** by opening the HTML file in a web browser
4. **Reach out** to your technical collaborator if needed

---

## 💡 Content Ideas for Future Posts

### Popular ABA Topics:

- Daily routine strategies
- Communication building
- Sensory activities
- Social skills development
- Behavior management
- Parent self-care
- Success stories
- Product reviews
- Seasonal activities
- School collaboration

### SEO-Friendly Post Ideas:

- "How to..." guides
- Step-by-step tutorials
- Problem-solving articles
- Resource roundups
- Personal stories
- Expert interviews

---

**Remember:** You don't need to be a coding expert to create great blog content! Focus on writing helpful, valuable content for parents, and use this guide to handle the technical parts. Your expertise and insights are what make the blog valuable! 🌟
