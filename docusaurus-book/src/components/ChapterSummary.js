import React from 'react';
import clsx from 'clsx';
import styles from './ChapterSummary.module.css';

// Define the props type
const summaryItems = [
  {
    id: 'kp1',
    text: 'Physical AI combines perception, reasoning, and action in embodied systems',
  },
  {
    id: 'kp2', 
    text: 'Embodied Intelligence emphasizes the role of physical interaction in cognition',
  },
];

// Component for displaying chapter summaries
export default function ChapterSummary({items = summaryItems}) {
  return (
    <div className={clsx('margin-vert--md', styles.chapterSummaryContainer)}>
      <h3>Chapter Summary</h3>
      <ul className={styles.chapterSummaryList}>
        {items.map((item) => (
          <li key={item.id} className={styles.chapterSummaryItem}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}