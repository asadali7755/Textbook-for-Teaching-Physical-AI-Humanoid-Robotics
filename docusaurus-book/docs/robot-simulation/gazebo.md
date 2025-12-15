---
id: gazebo
title: Robot Simulation with Gazebo
---

# Robot Simulation with Gazebo

This chapter covers the use of Gazebo, a powerful robotics simulator that provides accurate physics simulation, high-quality graphics, and convenient programmatic interfaces.

import LearningObjectives from '@site/src/components/LearningObjectives';
import ChapterSummary from '@site/src/components/ChapterSummary';

<LearningObjectives 
  items={[
    {id: 'obj1', text: 'Understand the architecture and capabilities of Gazebo simulator'},
    {id: 'obj2', text: 'Create simulation environments for humanoid robotics'},
    {id: 'obj3', text: 'Implement physics-based testing of robotic algorithms'}
  ]}
/>

## Introduction to Gazebo

Gazebo is a 3D simulation environment for robotics that provides realistic physics simulation, high-quality graphics, and convenient programmatic interfaces. It's widely used in robotics research and development for testing algorithms before deployment on real robots.

### Key Features

- **Physics Engine**: Accurate simulation of rigid body dynamics using ODE, Bullet, or Simbody
- **Sensors**: Support for various sensor types including cameras, lidars, IMUs, and force/torque sensors
- **Robot Models**: Support for URDF and SDF robot descriptions
- **Environments**: Extensive library of pre-built environments and objects
- **Plugins**: Extensible architecture through plugins for custom functionality
- **ROS Integration**: Native support for ROS/ROS2 communication

## Gazebo Architecture

Gazebo consists of several main components:

1. **Server (gzserver)**: Runs the physics simulation and handles model dynamics
2. **Client (gzclient)**: Provides the graphical user interface for visualization
3. **Plugins**: Extend functionality with custom code
4. **Models**: Robot and world definitions in SDF format

### SDF Format

Simulation Description Format (SDF) is an XML-based format used by Gazebo to describe environments, robots, and objects:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="default">
    <!-- A global light source -->
    <include>
      <uri>model://sun</uri>
    </include>
    
    <!-- A ground plane -->
    <include>
      <uri>model://ground_plane</uri>
    </include>
    
    <!-- Your robot model -->
    <model name="my_robot">
      <pose>0 0 0.5 0 0 0</pose>
      <link name="chassis">
        <collision name="collision">
          <geometry>
            <box><size>1.0 0.5 0.25</size></box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box><size>1.0 0.5 0.25</size></box>
          </geometry>
        </visual>
      </link>
    </model>
  </world>
</sdf>
```

## Setting Up a Simulation Environment

### Installation and Basic Setup

Gazebo can be installed standalone or as part of the ROS ecosystem. For ROS 2 users, it's typically installed as part of the `desktop` variant:

```bash
sudo apt install ros-<ros2-distro>-gazebo-ros-pkgs
```

### Creating a Simple World

A basic Gazebo world contains:
- Physics properties
- Light sources
- Models (robots, objects, ground plane)
- Plugins

## Integrating with ROS 2

Gazebo integrates seamlessly with ROS 2 through the `gazebo_ros_pkgs` package, which provides:

- Bridge between Gazebo and ROS 2 topics
- Spawn and delete models via ROS 2 services
- TF publishing for robot frames
- Sensor data publishing

### Example: Publishing Joint States

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import JointState
from std_msgs.msg import Header
import math

class JointStatePublisher(Node):
    def __init__(self):
        super().__init__('joint_state_publisher')
        self.publisher_ = self.create_publisher(JointState, 'joint_states', 10)
        timer_period = 0.1  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.joint_names = ['hip_joint', 'knee_joint', 'ankle_joint']
        self.joint_pos = [0.0, 0.0, 0.0]
        self.t = 0.0

    def timer_callback(self):
        msg = JointState()
        msg.header = Header()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.name = self.joint_names
        msg.position = self.joint_pos
        
        # Simulate some movement
        self.joint_pos[0] = 0.5 * math.sin(self.t)
        self.joint_pos[1] = 0.3 * math.cos(self.t)
        self.joint_pos[2] = 0.2 * math.sin(2 * self.t)
        self.t += 0.1
        
        self.publisher_.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    jsp = JointStatePublisher()
    rclpy.spin(jsp)
    jsp.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Physics Simulation

Gazebo provides realistic physics simulation using various physics engines:

### Physics Engine Configuration

```xml
<physics type="ode">
  <max_step_size>0.001</max_step_size>
  <real_time_factor>1.0</real_time_factor>
  <real_time_update_rate>1000.0</real_time_update_rate>
  <gravity>0 0 -9.8</gravity>
</physics>
```

### Collision Detection and Contact Modeling

Gazebo handles collision detection and contact dynamics, which are crucial for humanoid robots that interact with environments through multiple contact points.

## Sensor Simulation

Gazebo provides simulation of various sensor types:

### Camera Sensors

```xml
<sensor name="camera" type="camera">
  <always_on>1</always_on>
  <update_rate>30.0</update_rate>
  <camera name="head">
    <horizontal_fov>1.396263</horizontal_fov>
    <image>
      <width>800</width>
      <height>600</height>
      <format>R8G8B8</format>
    </image>
    <clip>
      <near>0.1</near>
      <far>100</far>
    </clip>
  </camera>
  <plugin name="camera_controller" filename="libgazebo_ros_camera.so">
    <frame_name>camera_frame</frame_name>
  </plugin>
</sensor>
```

### IMU Sensors

IMU simulation is crucial for humanoid robots to maintain balance:

```xml
<sensor name="imu_sensor" type="imu">
  <always_on>true</always_on>
  <update_rate>100</update_rate>
  <imu>
    <angular_velocity>
      <x>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>2e-4</stddev>
        </noise>
      </x>
      <y>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>2e-4</stddev>
        </noise>
      </y>
      <z>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>2e-4</stddev>
        </noise>
      </z>
    </angular_velocity>
    <linear_acceleration>
      <x>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>1.7e-2</stddev>
        </noise>
      </x>
      <y>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>1.7e-2</stddev>
        </noise>
      </y>
      <z>
        <noise type="gaussian">
          <mean>0.0</mean>
          <stddev>1.7e-2</stddev>
        </noise>
      </z>
    </linear_acceleration>
  </imu>
</sensor>
```

## Gazebo Plugins

Plugins extend Gazebo's functionality:

### Creating a Custom Controller Plugin

```cpp
#include <gazebo/gazebo.hh>
#include <gazebo/physics/physics.hh>
#include <gazebo/common/common.hh>
#include <stdio.h>

namespace gazebo
{
  class JointControlPlugin : public ModelPlugin
  {
    public: void Load(physics::ModelPtr _parent, sdf::ElementPtr /*_sdf*/)
    {
      // Store the model pointer for convenience
      this->model = _parent;

      // Get the first joint (you can iterate through all joints)
      this->joint = this->model->GetJoint("hip_joint");
      
      // Listen to the update event. This event is broadcast every
      // simulation iteration.
      this->updateConnection = event::Events::ConnectWorldUpdateBegin(
          std::bind(&JointControlPlugin::OnUpdate, this));
    }

    // Called by the world update start event
    public: void OnUpdate()
    {
      // Apply a small amount of force to the joint
      this->joint->SetForce(0, 1.0);
    }

    // Pointer to the model
    private: physics::ModelPtr model;

    // Pointer to the joint
    private: physics::JointPtr joint;

    // Event connection
    private: event::ConnectionPtr updateConnection;
  };

  // Register this plugin with the simulator
  GZ_REGISTER_MODEL_PLUGIN(JointControlPlugin)
}
```

## Simulating Humanoid Robots

Humanoid robots present unique challenges in simulation:

### Multi-Contact Dynamics

Humanoid robots often have multiple contact points with the environment (feet during walking, hands during manipulation, etc.). Gazebo handles these contacts with high fidelity:

- Contact force calculations
- Friction modeling
- Stability during multi-point contacts

### Balance and Walking Controllers

Simulation allows testing of balance and walking controllers before hardware deployment:

```python
import rclpy
from rclpy.node import Node
from builtin_interfaces.msg import Duration
from trajectory_msgs.msg import JointTrajectory, JointTrajectoryPoint
from sensor_msgs.msg import Imu
import numpy as np

class WalkingController(Node):
    def __init__(self):
        super().__init__('walking_controller')
        self.trajectory_publisher = self.create_publisher(
            JointTrajectory, 
            '/joint_trajectory', 
            10
        )
        self.imu_subscriber = self.create_subscription(
            Imu,
            '/imu/data',
            self.imu_callback,
            10
        )
        
        # Walking parameters
        self.step_height = 0.05  # meters
        self.step_length = 0.3   # meters
        self.step_duration = 1.0 # seconds
        self.t = 0.0
        
        # Timer for walking pattern
        self.timer = self.create_timer(0.1, self.step_callback)

    def imu_callback(self, msg):
        # Process IMU data for balance control
        orientation = msg.orientation
        angular_velocity = msg.angular_velocity
        linear_acceleration = msg.linear_acceleration
        # Implement balance control logic

    def step_callback(self):
        # Generate walking trajectory
        trajectory_msg = JointTrajectory()
        trajectory_msg.joint_names = [
            'left_hip', 'left_knee', 'left_ankle',
            'right_hip', 'right_knee', 'right_ankle'
        ]
        
        point = JointTrajectoryPoint()
        
        # Simplified walking pattern
        left_hip_pos = self.step_length/2 * np.sin(self.t)
        right_hip_pos = self.step_length/2 * np.sin(self.t + np.pi)
        
        point.positions = [
            left_hip_pos, 0.0, 0.0,
            right_hip_pos, 0.0, 0.0
        ]
        
        point.time_from_start = Duration(sec=int(self.step_duration), nanosec=0)
        trajectory_msg.points.append(point)
        
        self.trajectory_publisher.publish(trajectory_msg)
        self.t += 0.1

def main(args=None):
    rclpy.init(args=args)
    controller = WalkingController()
    rclpy.spin(controller)
    controller.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

<ChapterSummary 
  items={[
    {id: 'kp1', text: 'Gazebo provides realistic physics simulation for robotics development'},
    {id: 'kp2', text: 'SDF format describes simulation environments and robot models'},
    {id: 'kp3', text: 'Integration with ROS 2 enables comprehensive robot simulation'},
    {id: 'kp4', text: 'Sensor simulation allows testing of perception algorithms in virtual environments'}
  ]}
/>

## Next Steps

In the next chapter, we'll explore simulation using Unity, which offers different capabilities and use cases for humanoid robotics simulation.