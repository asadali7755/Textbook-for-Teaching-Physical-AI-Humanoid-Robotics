import React from 'react';
import clsx from 'clsx';
import styles from './LearningObjectives.module.css';

// Define the props type
const objectiveItems = [
  {
    id: 'obj1',
    text: 'Understand the fundamental concepts of Physical AI',
  },
  {
    id: 'obj2', 
    text: 'Explain the principles of Embodied Intelligence',
  },
];

// Component for displaying learning objectives
export default function LearningObjectives({items = objectiveItems}) {
  return (
    <div className={clsx('margin-vert--md', styles.learningObjectivesContainer)}>
      <h3>Learning Objectives</h3>
      <ul className={styles.learningObjectivesList}>
        {items.map((item) => (
          <li key={item.id} className={styles.learningObjectiveItem}>
            {item.text}
          </li>
        ))}
      </ul>
    </div>
  );
}