# Data Model: Docusaurus Textbook for Physical AI & Humanoid Robotics

## Textbook Chapter
- **Fields**:
  - id: string (unique identifier for the chapter)
  - title: string (chapter title)
  - slug: string (URL-friendly identifier)
  - content: Markdown text (main chapter content)
  - learningObjectives: array of strings (what students should understand)
  - summary: string (chapter summary)
  - module: string (module the chapter belongs to)
  - week: integer (week number in the course sequence)
  - prerequisites: array of chapter IDs (chapters that should be read first)
  - relatedTopics: array of strings (other topics related to this chapter)
  - authors: array of strings (content contributors)
  - createdAt: date
  - updatedAt: date
  - status: enum (draft, review, published)

- **Validation Rules**:
  - title is required and must be 3-100 characters
  - content is required
  - learningObjectives must contain at least one objective
  - summary is required and must be less than 500 words
  - module is required from predefined list
  - week is required and must be 1-16 (typical semester length)

## Learning Objective
- **Fields**:
  - id: string (unique identifier)
  - chapterId: string (reference to parent chapter)
  - text: string (the learning objective statement)
  - type: enum (knowledge, comprehension, application, analysis, synthesis, evaluation)
  - difficultyLevel: enum (beginner, intermediate, advanced)
  - isActive: boolean

- **Validation Rules**:
  - text is required and must be 10-200 characters
  - chapterId must reference an existing chapter
  - type is required
  - difficultyLevel is required

## Chapter Summary
- **Fields**:
  - id: string (unique identifier)
  - chapterId: string (reference to parent chapter)
  - content: Markdown text (summary content)
  - keyPoints: array of strings (main takeaways from the chapter)
  - nextSteps: array of strings (where to go next after this chapter)

- **Validation Rules**:
  - chapterId must reference an existing chapter
  - content is required
  - keyPoints must contain 3-10 items

## Module Content
- **Fields**:
  - id: string (unique identifier)
  - name: string (module name)
  - description: string (module description)
  - chapters: array of chapter IDs (chapters in this module)
  - prerequisites: array of module IDs (modules that should be completed first)
  - duration: integer (estimated completion time in hours)

- **Validation Rules**:
  - name is required and must be unique
  - description is required and less than 500 characters
  - chapters must reference existing chapters

## Weekly Breakdown
- **Fields**:
  - id: string (unique identifier)
  - weekNumber: integer (which week in the course)
  - title: string (title for the week)
  - topics: array of strings (topics to cover this week)
  - chapters: array of chapter IDs (chapters to read this week)
  - assignments: array of strings (practice exercises or assignments)
  - estimatedHours: integer (time needed for the week)
  - objectives: array of learning objective IDs (objectives for the week)

- **Validation Rules**:
  - weekNumber is required and must be unique for the course
  - title is required
  - topics must contain at least one topic
  - chapters must reference existing chapters

## Relationships
- Chapter contains many Learning Objectives
- Chapter has one Chapter Summary
- Module contains many Chapters
- Weekly Breakdown references multiple Chapters
- Weekly Breakdown references multiple Learning Objectives