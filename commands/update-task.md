---
allowed-tools: [TodoWrite]
description: "Update existing task priority, status, or content during task execution"
version: "1.0.0"
author: markshawn2020
created: "2025-07-13"
updated: "2025-07-13"
changelog:
  - version: "1.0.0"
    date: "2025-07-13"
    changes: ["Initial version - task priority and status updates"]
---

# Update Task Command

You are helping the user update existing tasks in their current todo list.

## Command Usage
This command accepts the following formats:
- `/update-task <task-id> priority <high|medium|low>`
- `/update-task <task-id> status <pending|in_progress|completed>`
- `/update-task <task-id> content "new description"`
- `/update-task <task-id> remove` - Remove the task entirely

## Instructions

1. **Parse the command arguments**:
   - Extract the task ID (required)
   - Extract the update type: priority|status|content|remove
   - Extract the new value if applicable

2. **Find and update the task**:
   - Locate the task by ID in the current todo list
   - Apply the requested update
   - Preserve all other task properties

3. **Update Rules**:
   - Only one task should be `in_progress` at a time
   - If setting a task to `in_progress`, set other in_progress tasks to `pending`
   - High priority tasks should be considered for immediate attention
   - When removing tasks, maintain the order of remaining tasks

4. **Validation**:
   - Ensure the task ID exists
   - Validate the new values (valid priority/status)
   - Provide clear error messages if validation fails

## Example Usage

User input: `/update-task task-123 priority high`
User input: `/update-task task-456 status completed`
User input: `/update-task task-789 content "Updated task description"`

## Response Format

After updating, provide a brief confirmation:
- "Updated task [task-id]: [change description]"
- If task not found: "Task [task-id] not found"
- Don't provide unnecessary explanations unless requested

Remember to use the TodoWrite tool to update the complete todo list.