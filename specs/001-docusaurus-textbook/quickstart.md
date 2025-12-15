# Quickstart Guide: Docusaurus Textbook for Physical AI & Humanoid Robotics

## Prerequisites

- Node.js (version 18 or higher)
- npm or yarn package manager
- Git for version control
- A GitHub account for deployment

## Setting up the Development Environment

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd <repository-name>
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm start
   # or
   yarn start
   ```
   This command starts a local development server and opens a browser window with the textbook. Most changes are reflected live without restarting the server.

## Project Structure

The textbook content is organized as follows:

```
docusaurus-book/
├── blog/                # Blog posts (if needed)
├── docs/                # Textbook content organized by chapters
│   ├── intro.md         # Introduction chapter
│   ├── ros2-fundamentals/
│   │   ├── index.md     # ROS 2 chapter intro
│   │   ├── concepts.md  # Core concepts
│   │   └── examples.md  # Code examples
│   ├── robot-simulation/
│   │   ├── index.md
│   │   ├── gazebo.md
│   │   └── unity.md
│   ├── nvidia-isaac/
│   │   └── index.md
│   ├── vla-systems/
│   │   └── index.md
│   ├── conversational-robotics/
│   │   └── index.md
│   └── weekly-breakdowns/
│       ├── week-1.md    # Weekly content breakdowns
│       ├── week-2.md
│       └── week-n.md
├── src/
│   ├── components/      # Custom React components
│   ├── css/             # Custom styles
│   └── pages/           # Additional pages if needed
├── static/              # Static assets (images, PDFs, etc.)
├── docusaurus.config.js # Docusaurus configuration
├── sidebars.js          # Navigation sidebar configuration
├── package.json         # Project dependencies
└── README.md            # Project overview
```

## Adding New Content

1. **Create a new chapter file** in the appropriate directory under `docs/`
   ```markdown
   ---
   id: new-topic
   title: Title of New Topic
   sidebar_label: New Topic
   ---

   # Title of New Topic

   Learning objectives:
   - Objective 1
   - Objective 2

   [Your content here]

   ## Summary

   Key points of the chapter.
   ```

2. **Update the sidebar configuration** in `sidebars.js` to add the new chapter to navigation:

   ```javascript
   module.exports = {
     textbook: [
       'intro',
       {
         type: 'category',
         label: 'Chapter Name',
         items: ['chapter-page1', 'chapter-page2'],
       },
       // Add your new chapter reference here
     ],
   };
   ```

3. **Add learning objectives** at the beginning of each chapter:
   - Clear statements of what students should understand after reading
   - Typically 2-5 specific, measurable objectives

4. **Include a summary** at the end of each chapter:
   - Key takeaways from the chapter
   - Links to related topics in other chapters
   - Where to go next in the course

## Writing Mathematical Expressions

Use LaTeX syntax for mathematical expressions:

```markdown
This equation shows the state transition: $x_{t+1} = f(x_t, u_t)$

For block equations:
$$
\frac{dx}{dt} = f(x, u)
$$
```

## Adding Code Examples

Use fenced code blocks with syntax highlighting:

```markdown
  ```python
  def state_transition(state, control):
      """Calculate the next state based on current state and control input."""
      return f(state, control)
  ```
```

## Building for Production

To build the static site for deployment:

```bash
npm run build
# or
yarn build
```

This command generates static content into the `build` directory and can be served using any static hosting service.

## Deployment to GitHub Pages

1. **Configure the deployment settings** in `docusaurus.config.js`:

   ```javascript
   deploymentBranch: 'gh-pages',
   ```

2. **Deploy using the following command**:
   ```bash
   GIT_USER=<Your GitHub username> npm run deploy
   ```

This command builds your site and pushes the generated static files to the `gh-pages` branch, which GitHub Pages serves automatically.

## Development Workflow

1. Create a new branch for your changes
2. Add or modify content in the `docs` directory
3. Ensure each new page has proper frontmatter and follows content guidelines
4. Test changes with `npm start`
5. Commit and push changes
6. Create a pull request for review
7. After approval, merge and deploy

## Content Guidelines

- Each chapter should start with learning objectives
- Use clear headings and subheadings (H1 for chapter title, H2 for sections, etc.)
- Include diagrams and images in the `static` directory
- End each chapter with a summary section
- Link related concepts across chapters when appropriate
- Follow the academic rigor and conceptual clarity principles from the project constitution