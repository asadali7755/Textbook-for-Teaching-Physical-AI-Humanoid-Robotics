---
id: ros2-intro
title: ROS 2 Fundamentals
sidebar_label: ROS 2 Fundamentals
---

# ROS 2 Fundamentals

This chapter introduces the Robot Operating System (ROS 2), the middleware framework that enables communication and coordination between different robotic components.

import LearningObjectives from '@site/src/components/LearningObjectives';
import ChapterSummary from '@site/src/components/ChapterSummary';

<LearningObjectives 
  items={[
    {id: 'obj1', text: 'Understand the architecture and components of ROS 2'},
    {id: 'obj2', text: 'Explain the difference between ROS 1 and ROS 2'},
    {id: 'obj3', text: 'Implement basic ROS 2 concepts such as nodes, topics, and services'}
  ]}
/>

## Introduction to ROS 2

The Robot Operating System 2 (ROS 2) is not an operating system but rather a flexible framework for writing robotic software. It provides services designed for a heterogeneous computer cluster such as hardware abstraction, device drivers, libraries, visualizers, message-passing, package management, and more.

ROS 2 addresses some of the limitations of the original ROS framework, particularly around security, real-time support, and deployment in production environments.

### Key Improvements in ROS 2

- **Security**: First-class support for authentication, authorization, and encryption
- **Real-time support**: Better support for real-time systems and performance-critical applications
- **Multi-platform support**: Better cross-platform compatibility (Linux, Windows, macOS, and real-time systems)
- **Quality of Service (QoS)**: Configurable message delivery guarantees for different types of communications
- **DDS-based middleware**: Data Distribution Service (DDS) provides a standardized middleware for real-time systems

## ROS 2 Architecture

ROS 2 uses a distributed system architecture based on the DDS (Data Distribution Service) standard. This enables:

- Peer-to-peer communication between nodes
- Built-in discovery mechanisms
- Configurable quality of service settings
- Language-agnostic interfaces

### Core Concepts

1. **Nodes**: Processes that perform computation. Nodes are organized in a network to perform processing.
2. **Topics**: Named buses over which nodes exchange messages.
3. **Messages**: ROS data types used when publishing to or subscribing to a Topic.
4. **Services**: A traditional remote procedure call mechanism.
5. **Actions**: A client/server pattern for long-running tasks with feedback.

## Creating a Simple ROS 2 Node

Let's start with a basic ROS 2 node implementation. This example shows a node that publishes messages to a topic:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):

    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = 'Hello World: %d' % self.i
        self.publisher_.publish(msg)
        self.get_logger().info('Publishing: "%s"' % msg.data)
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

This example demonstrates the basic structure of a ROS 2 publisher node, including:
- Node initialization
- Publisher creation
- Timer for periodic publishing
- Message creation and publishing

## Working with Packages

ROS 2 organizes code into packages, which contain nodes, libraries, and other resources. A package typically includes:

- Source code files
- CMakeLists.txt (for C++) or setup.py (for Python)
- package.xml manifest file
- Launch files to start multiple nodes at once

### Creating a Package

A typical package structure looks like:

```
my_robot_package/
├── CMakeLists.txt
├── package.xml
├── src/
│   └── my_node.cpp
├── include/
│   └── my_robot_package/
│       └── my_header.h
├── launch/
│   └── my_launch_file.launch.py
└── test/
    └── test_my_node.cpp
```

## Quality of Service (QoS) Settings

One of the key features in ROS 2 is the Quality of Service abstraction, which allows you to configure the delivery guarantees for your messages. Common QoS settings include:

- **Reliability**: Best effort or reliable delivery
- **Durability**: Volatile or transient local
- **History**: Keep last N messages or keep all messages
- **Lifespan**: How long messages are considered valid

## Best Practices for ROS 2 Development

1. **Use parameter files**: Parameterize node behavior for easier reconfiguration
2. **Implement graceful shutdown**: Ensure proper cleanup when nodes terminate
3. **Follow naming conventions**: Use consistent naming for topics, services, and parameters
4. **Error handling**: Implement proper error handling and logging
5. **Testing**: Write tests for your ROS 2 components

## Integration with Physical AI

ROS 2 serves as the foundation for implementing Physical AI systems by providing:

- Communication between perception, planning, and control nodes
- Hardware abstraction for sensors and actuators
- Tools for simulation and testing
- Standardized message types for common robot data

<ChapterSummary 
  items={[
    {id: 'kp1', text: 'ROS 2 provides a distributed framework for robot software development'},
    {id: 'kp2', text: 'Key improvements over ROS 1 include security, real-time support, and QoS settings'},
    {id: 'kp3', text: 'Core concepts include nodes, topics, services, and actions'},
    {id: 'kp4', text: 'ROS 2 enables modular robot software architecture'}
  ]}
/>

## Next Steps

In the following sections, we'll explore practical implementations of ROS 2 concepts with examples relevant to humanoid robotics and physical AI systems.