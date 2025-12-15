import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './HomepageFeatures.module.css';

const FeatureList = [
  {
    title: 'Physical AI Fundamentals',
    description: (
      <>
        Learn about the core principles of Physical AI that combine perception, 
        reasoning, and action in embodied systems.
      </>
    ),
  },
  {
    title: 'Humanoid Robotics',
    description: (
      <>
        Explore how robots can interact with the physical world through 
        advanced sensing, planning, and control algorithms.
      </>
    ),
  },
  {
    title: 'Practical Applications',
    description: (
      <>
        Discover real-world applications of Physical AI in humanoid robotics, 
        from research platforms to commercial applications.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}