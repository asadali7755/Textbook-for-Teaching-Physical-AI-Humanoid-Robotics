# Research Summary: Docusaurus Textbook for Physical AI & Humanoid Robotics

## Decision: Docusaurus Version
- **What was chosen**: Docusaurus 3.x (latest stable version)
- **Rationale**: Provides modern features, active maintenance, strong Markdown support, and plugin ecosystem. Better performance and accessibility compared to older versions.
- **Alternatives considered**: 
  - Docusaurus 2.x: Still supported but older, missing newer features
  - GitBook: Less customizable and increasingly focused on their commercial platform
  - Hugo: More complex configuration for non-technical users
  - VuePress: Good alternative but smaller ecosystem than Docusaurus

## Decision: Deployment Strategy
- **What was chosen**: GitHub Pages with GitHub Actions
- **Rationale**: Cost-effective, integrates well with version control, supports custom domains, and provides reliable global CDN. Matches the "static site" requirement perfectly.
- **Alternatives considered**:
  - Netlify: Would work well but adds an external dependency
  - Vercel: Good for React projects but unnecessary for static content
  - Self-hosted: Adds operational complexity not needed for this project

## Decision: Content Organization
- **What was chosen**: Chapter-based directories with weekly breakdowns in separate section
- **Rationale**: Clear separation of content types, easy navigation, and aligns with educational structure. Supports the requirement for weekly breakdowns while maintaining a clear chapter structure.
- **Alternatives considered**:
  - Single flat structure: Would become unwieldy with many pages
  - Week-based organization: Would make it harder to find specific concepts by topic

## Decision: Math Expression Support
- **What was chosen**: MathJax integration via Docusaurus LaTeX plugin
- **Rationale**: Supports complex mathematical expressions needed for robotics content. Essential for academic textbook quality.
- **Alternatives considered**:
  - KaTeX: Faster but less feature-complete
  - Static images: Would hurt accessibility and maintenance

## Decision: Code Block Enhancements
- **What was chosen**: Docusaurus code block features with syntax highlighting and line numbers
- **Rationale**: Supports educational content with proper code examples and explanations. Essential for the "ROS 2 fundamentals" and other technical chapters.
- **Alternatives considered**:
  - External code embedding: Would complicate the static site requirement
  - Simple plaintext: Would not meet educational quality standards

## Decision: Accessibility Compliance
- **What was chosen**: Docusaurus default accessibility features + WCAG 2.1 AA enhancements
- **Rationale**: Required for educational content to ensure all students can access the material. Docusaurus has good baseline support but needs specific configuration.
- **Alternatives considered**:
  - Minimal accessibility: Would exclude students with disabilities
  - WCAG 2.2 AAA: Would be overkill and significantly increase complexity