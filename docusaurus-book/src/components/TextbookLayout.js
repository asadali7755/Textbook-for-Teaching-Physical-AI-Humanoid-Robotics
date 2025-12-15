import React from 'react';
import clsx from 'clsx';
import styles from './TextbookLayout.module.css';

// Base layout component for textbook chapters with consistent styling
const TextbookLayout = ({ children, title, description, learningObjectives, summary }) => {
  return (
    <div className={styles.textbookLayout}>
      {/* Learning Objectives Section */}
      {learningObjectives && learningObjectives.length > 0 && (
        <section className={styles.learningObjectives}>
          <h2>Learning Objectives</h2>
          <ul>
            {learningObjectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Main Content */}
      <main className={styles.mainContent}>
        {children}
      </main>

      {/* Chapter Summary */}
      {summary && (
        <section className={styles.chapterSummary}>
          <h2>Summary</h2>
          <p>{summary}</p>
        </section>
      )}
    </div>
  );
};

export default TextbookLayout;