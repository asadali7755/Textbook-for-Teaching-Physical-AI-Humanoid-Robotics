// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
  textbook: [
    'intro',
    {
      type: 'category',
      label: 'ROS 2 Fundamentals',
      items: ['ros2-fundamentals/ros2-intro', 'ros2-fundamentals/ros2-concepts', 'ros2-fundamentals/ros2-examples'],
    },
    {
      type: 'category',
      label: 'Robot Simulation',
      items: ['robot-simulation/gazebo', 'robot-simulation/unity'],
    },
    {
      type: 'category',
      label: 'NVIDIA Isaac Platform',
      items: ['nvidia-isaac/nvidia-isaac-intro'],
    },
    {
      type: 'category',
      label: 'Vision-Language-Action (VLA) Systems',
      items: ['vla-systems/vla-systems-intro'],
    },
    {
      type: 'category',
      label: 'Conversational Robotics',
      items: ['conversational-robotics/conversational-robotics-intro'],
    },
    {
      type: 'category',
      label: 'Weekly Breakdowns',
      items: ['weekly-breakdowns/week-1', 'weekly-breakdowns/week-2', 'weekly-breakdowns/week-3', 'weekly-breakdowns/week-4', 'weekly-breakdowns/week-5', 'weekly-breakdowns/week-6'],
    },
  ],
};

module.exports = sidebars;