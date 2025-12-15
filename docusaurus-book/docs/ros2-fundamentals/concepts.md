---
id: ros2-concepts
title: Core ROS 2 Concepts
---

# Core ROS 2 Concepts

This section delves deeper into the fundamental concepts that make ROS 2 a powerful framework for robotics development.

## Nodes

Nodes are the fundamental building blocks of ROS 2 applications. Each node typically performs a specific task and communicates with other nodes through various message types. Nodes are organized in a network and perform processing tasks.

### Node Lifecycle

ROS 2 nodes can have a managed lifecycle, which provides additional control over the execution state of the node. The lifecycle has several states:

- Unconfigured
- Inactive
- Active
- Finalized

This allows for better coordination between nodes in complex robotic systems.

## Topics and Publishers/Subscribers

Topics are named buses over which nodes exchange messages. The communication is based on a publish-subscribe pattern:

- Publishers send messages to a topic
- Subscribers receive messages from a topic
- Multiple publishers and subscribers can use the same topic

### Message Types

Messages in ROS 2 have a strict type definition. Common message types include:

- `std_msgs`: Basic message types (Int32, Float64, String, etc.)
- `geometry_msgs`: Messages for common geometric primitives
- `sensor_msgs`: Messages for sensors (cameras, lidars, etc.)
- `nav_msgs`: Messages for navigation

## Services

Services provide a request-response communication pattern. A service client sends a request and waits for a response from the service server. This is useful for tasks that require a specific response, such as:

- Transform lookup
- Map retrieval
- Robot pose queries

## Actions

Actions are designed for long-running tasks that may take a significant amount of time to complete. They provide:

- Goal requests
- Feedback during execution
- Result delivery upon completion
- Cancelation capability

This is ideal for tasks like navigation, manipulation, or complex behaviors.

## Parameters

Parameters allow nodes to be configured at runtime. They can be:

- Declared within nodes
- Set at startup or during execution
- Shared between nodes
- Saved to configuration files

## Launch Files

Launch files provide a way to start multiple nodes at once with specific configurations. They're written in Python and allow for:

- Starting multiple nodes
- Setting parameters
- Launching other launch files
- Conditional execution
- Remapping names

Example of a launch file:

```python
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_robot_package',
            executable='minimal_publisher',
            name='publisher',
            parameters=[{'parameter_name': 'parameter_value'}]
        ),
        Node(
            package='my_robot_package',
            executable='minimal_subscriber',
            name='subscriber'
        )
    ])
```

## Composition

ROS 2 supports composition, where multiple nodes can be combined into a single process. This can improve performance by eliminating network overhead between nodes that need to communicate frequently.

## TF (Transforms)

TF (Transform Library) is essential for robotics applications that need to track multiple coordinate frames over time. It's commonly used for:

- Robot localization
- Sensor fusion
- Path planning
- Object tracking