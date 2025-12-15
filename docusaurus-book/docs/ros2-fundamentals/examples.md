---
id: ros2-examples
title: ROS 2 Examples and Best Practices
---

# ROS 2 Examples and Best Practices

This section provides practical examples of ROS 2 concepts and best practices for implementing them in humanoid robotics systems.

## Publisher and Subscriber Example

The following example demonstrates how to create a publisher that sends sensor data and a subscriber that processes it:

### Publisher Node

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import JointState
import random

class JointStatePublisher(Node):

    def __init__(self):
        super().__init__('joint_state_publisher')
        self.publisher_ = self.create_publisher(JointState, 'joint_states', 10)
        timer_period = 0.1  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        
    def timer_callback(self):
        msg = JointState()
        msg.name = ['hip_joint', 'knee_joint', 'ankle_joint']
        msg.position = [
            random.uniform(-1.0, 1.0),
            random.uniform(-1.5, 1.5), 
            random.uniform(-0.5, 0.5)
        ]
        msg.velocity = [0.0, 0.0, 0.0]  # For simplicity
        msg.effort = [0.0, 0.0, 0.0]    # For simplicity
        
        self.publisher_.publish(msg)
        self.get_logger().info(f'Published joint states: {msg.position}')

def main(args=None):
    rclpy.init(args=args)
    joint_state_publisher = JointStatePublisher()
    rclpy.spin(joint_state_publisher)
    joint_state_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Subscriber Node

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import JointState

class JointStateSubscriber(Node):

    def __init__(self):
        super().__init__('joint_state_subscriber')
        self.subscription = self.create_subscription(
            JointState,
            'joint_states',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'Received joint states: {msg.name} -> {msg.position}')
        # Process the joint state data here
        # For example, check if joints are within safe limits
        for i, pos in enumerate(msg.position):
            if abs(pos) > 2.0:  # Example safety check
                self.get_logger().warn(f'Joint {msg.name[i]} position {pos} exceeds safe limit!')

def main(args=None):
    rclpy.init(args=args)
    joint_state_subscriber = JointStateSubscriber()
    rclpy.spin(joint_state_subscriber)
    joint_state_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Service Example

Creating a service for querying robot state:

### Service Definition (in srv/GetPosition.srv)

```
# Request
string joint_name
---
# Response
float64 position
bool success
string message
```

### Service Server

```python
import rclpy
from rclpy.node import Node
from your_package.srv import GetPosition  # Custom service

class PositionService(Node):

    def __init__(self):
        super().__init__('position_service')
        self.srv = self.create_service(
            GetPosition, 
            'get_joint_position', 
            self.get_position_callback
        )
        # Simulated joint positions
        self.joint_positions = {
            'hip_joint': 0.5,
            'knee_joint': -0.3,
            'ankle_joint': 0.2
        }

    def get_position_callback(self, request, response):
        joint_name = request.joint_name
        if joint_name in self.joint_positions:
            response.position = self.joint_positions[joint_name]
            response.success = True
            response.message = f'Position for {joint_name} retrieved successfully'
        else:
            response.position = 0.0
            response.success = False
            response.message = f'Joint {joint_name} not found'
        
        self.get_logger().info(f'Service called for {joint_name}: {response.message}')
        return response

def main(args=None):
    rclpy.init(args=args)
    position_service = PositionService()
    rclpy.spin(position_service)
    position_service.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Action Example

An action for moving a humanoid robot's leg to a target position:

### Action Definition (in action/MoveLeg.action)

```
# Goal
float64 target_x
float64 target_y
float64 target_z
---
# Result
bool success
string message
---
# Feedback
float64 current_x
float64 current_y
float64 current_z
float64 progress
```

### Action Server

```python
import rclpy
from rclpy.action import ActionServer, CancelResponse, GoalResponse
from rclpy.node import Node
from your_package.action import MoveLeg  # Custom action

class MoveLegActionServer(Node):

    def __init__(self):
        super().__init__('move_leg_action_server')
        self._action_server = ActionServer(
            self,
            MoveLeg,
            'move_leg',
            execute_callback=self.execute_callback,
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback)

    def goal_callback(self, goal_request):
        # Accept or reject a goal
        self.get_logger().info('Received goal request')
        return GoalResponse.ACCEPT

    def cancel_callback(self, goal_handle):
        # Accept or reject a cancel request
        self.get_logger().info('Received cancel request')
        return CancelResponse.ACCEPT

    async def execute_callback(self, goal_handle):
        self.get_logger().info('Executing goal...')
        
        # Simulate leg movement
        feedback_msg = MoveLeg.Feedback()
        result = MoveLeg.Result()
        
        # Simulate gradual movement
        current_x, current_y, current_z = 0.0, 0.0, 0.0  # Starting position
        target_x = goal_handle.request.target_x
        target_y = goal_handle.request.target_y
        target_z = goal_handle.request.target_z
        
        steps = 10  # Simulate movement in steps
        for i in range(steps):
            # Simulate movement toward target
            current_x += (target_x - current_x) / (steps - i)
            current_y += (target_y - current_y) / (steps - i)
            current_z += (target_z - current_z) / (steps - i)
            
            # Publish feedback
            feedback_msg.current_x = current_x
            feedback_msg.current_y = current_y
            feedback_msg.current_z = current_z
            feedback_msg.progress = float(i + 1) / steps
            
            goal_handle.publish_feedback(feedback_msg)
            self.get_logger().info(f'Feedback: Progress = {feedback_msg.progress:.2f}')
            
            # Sleep to simulate real movement time
            await rclpy.sleep(0.1)
        
        # Check if goal was canceled
        if goal_handle.is_cancel_requested:
            goal_handle.canceled()
            self.get_logger().info('Goal canceled')
            result.success = False
            result.message = 'Goal was canceled'
            return result
        
        # Complete the action
        goal_handle.succeed()
        result.success = True
        result.message = f'Moved leg to ({target_x:.2f}, {target_y:.2f}, {target_z:.2f})'
        
        self.get_logger().info(f'Result: {result.message}')
        return result

def main(args=None):
    rclpy.init(args=args)
    move_leg_action_server = MoveLegActionServer()
    rclpy.spin(move_leg_action_server)
    move_leg_action_server.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Best Practices

### 1. Proper Error Handling

```python
def timer_callback(self):
    try:
        # Your processing code here
        result = self.process_sensors()
        self.publish_result(result)
    except Exception as e:
        self.get_logger().error(f'Error in timer_callback: {e}')
        # Implement fallback behavior
        self.fallback_action()
```

### 2. Parameter Validation

```python
def __init__(self):
    super().__init__('safe_node')
    
    # Declare parameters with defaults
    self.declare_parameter('max_velocity', 1.0)
    self.declare_parameter('safety_margin', 0.1)
    
    # Validate parameters at runtime
    max_vel = self.get_parameter('max_velocity').value
    if max_vel <= 0:
        self.get_logger().error('Max velocity must be positive')
        self.destroy_node()
        return
```

### 3. Resource Management

```python
def destroy_node(self):
    # Clean up resources before destroying node
    if hasattr(self, 'camera_handle'):
        self.camera_handle.release()
    if hasattr(self, 'network_connection'):
        self.network_connection.close()
    super().destroy_node()
```

### 4. Using Composition for Performance

Instead of running nodes in separate processes, you can compose them in a single process:

```python
from rclpy.node import Node
from rclpy import create_subcontext

# Composed node containing multiple functionalities
class ComposedNode(Node):
    def __init__(self):
        super().__init__('composed_node')
        
        # Multiple publishers in one node
        self.joint_pub = self.create_publisher(JointState, 'joint_states', 10)
        self.imu_pub = self.create_publisher(Imu, 'imu_data', 10)
        
        # Multiple subscribers in one node
        self.cmd_vel_sub = self.create_subscription(Twist, 'cmd_vel', self.cmd_vel_callback, 10)
        self.laser_sub = self.create_subscription(LaserScan, 'scan', self.scan_callback, 10)
```

These examples demonstrate practical implementations of ROS 2 concepts that are particularly relevant for humanoid robotics applications. The modular design allows for flexible and maintainable robot software architecture.