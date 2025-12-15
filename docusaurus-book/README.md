# Physical AI & Humanoid Robotics Textbook

This repository contains a comprehensive textbook on Physical AI and Humanoid Robotics, built with Docusaurus for optimal educational experience.

## About This Textbook

This textbook covers:
- Introduction to Physical AI and Embodied Intelligence
- ROS 2 fundamentals
- Robot simulation using Gazebo and Unity
- NVIDIA Isaac platform
- Vision-Language-Action (VLA) systems
- Conversational Robotics

## Table of Contents

1. [Introduction](./docs/intro.md)
2. [ROS 2 Fundamentals](./docs/ros2-fundamentals/index.md)
   - [Core Concepts](./docs/ros2-fundamentals/concepts.md)
   - [Examples](./docs/ros2-fundamentals/examples.md)
3. [Robot Simulation](./docs/robot-simulation/gazebo.md)
   - [Gazebo](./docs/robot-simulation/gazebo.md)
   - [Unity](./docs/robot-simulation/unity.md)
4. [NVIDIA Isaac Platform](./docs/nvidia-isaac/index.md)
5. [Vision-Language-Action (VLA) Systems](./docs/vla-systems/index.md)
6. [Conversational Robotics](./docs/conversational-robotics/index.md)
7. [Weekly Breakdowns](./docs/weekly-breakdowns/)

## Development Setup

```bash
# Clone the repository
git clone https://github.com/your-username/docusaurus-textbook-physical-ai-humanoid-robotics.git
cd docusaurus-textbook-physical-ai-humanoid-robotics

# Install dependencies
npm install

# Start the development server
npm start
```

This will start a local development server and open the textbook in your browser at `http://localhost:3000`.

## Contributing

We welcome contributions to improve this textbook! Here's how you can contribute:

### Adding Content

1. Fork the repository
2. Create a new branch for your changes
3. Add or modify content in the `docs/` directory
4. Ensure each new page has proper frontmatter and follows content guidelines
5. Update the `sidebars.js` file to include your new content in navigation
6. Test changes with `npm start`
7. Submit a pull request

### Content Guidelines

- Each chapter should start with learning objectives
- Use clear headings and subheadings (H1 for chapter title, H2 for sections, etc.)
- Include diagrams and images in the `static` directory
- End each chapter with a summary section
- Link related concepts across chapters when appropriate
- Follow the academic rigor and conceptual clarity principles from the project constitution

### Technical Guidelines

- Use Markdown for content creation
- Follow the Docusaurus Markdown syntax for special features
- Include appropriate frontmatter in each document
- Use relative links for internal navigation
- Ensure content is accessible (WCAG 2.1 AA compliance)

## Building for Production

```bash
npm run build
```

This command generates static content in the `build` directory which can be served using any static hosting service.

## Deployment

The site is configured for deployment to GitHub Pages using GitHub Actions. The deployment branch is set to `gh-pages`.

### GitHub Actions Workflow

The following GitHub Actions workflow is configured for deployment:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]
  workflow_dispatch:

jobs:
  deploy:
    name: Deploy to GitHub Pages
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
          cache: npm
      - name: Install dependencies
        run: npm install
      - name: Build website
        run: npm run build
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
          publish_branch: gh-pages
```

## Technology Stack

- **Framework**: [Docusaurus 3.x](https://docusaurus.io/)
- **Language**: Markdown, HTML, CSS, JavaScript (Node.js LTS)
- **Deployment**: GitHub Pages with GitHub Actions
- **Math Support**: MathJax integration via Docusaurus LaTeX plugin
- **Code Blocks**: Docusaurus code block features with syntax highlighting
- **Accessibility**: Docusaurus default accessibility features + WCAG 2.1 AA enhancements

## Content Organization

The textbook content is organized in the `docs/` directory with subdirectories for each major chapter:

```
docs/
├── intro.md                    # Introduction chapter
├── ros2-fundamentals/
│   ├── index.md                # ROS 2 fundamentals main page
│   ├── concepts.md             # Core concepts
│   └── examples.md             # Examples and best practices
├── robot-simulation/
│   ├── gazebo.md               # Gazebo simulation
│   └── unity.md                # Unity simulation
├── nvidia-isaac/
│   └── index.md                # NVIDIA Isaac platform
├── vla-systems/
│   └── index.md                # VLA systems
├── conversational-robotics/
│   └── index.md                # Conversational robotics
└── weekly-breakdowns/
    ├── week-1.md               # Week 1 content breakdown
    ├── week-2.md               # Week 2 content breakdown
    └── ...                     # Additional weekly breakdowns
```

## Academic Standards

This textbook maintains scholarly integrity by:
- Including properly formatted citations where appropriate
- Providing clear learning objectives at the beginning of each chapter
- Ending each chapter with a comprehensive summary
- Maintaining consistent terminology throughout the text
- Including examples that reinforce theoretical concepts with practical implementations

## Support

If you have questions about contributing or using this textbook, please open an issue in the GitHub repository.

## License

This textbook is licensed under the [Creative Commons Attribution 4.0 International License](https://creativecommons.org/licenses/by/4.0/), which means you are free to share and adapt the material for any purpose, provided you give appropriate credit.