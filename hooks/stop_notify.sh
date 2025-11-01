#!/bin/bash

# 日志文件
LOG_FILE="$HOME/.claude/hooks/stop_notify.log"

# 记录启动
echo "=== $(date) ===" >> "$LOG_FILE"

# 读取 hook 输入
input=$(cat)
echo "Input: $input" >> "$LOG_FILE"

transcript_path=$(echo "$input" | jq -r '.transcript_path')
echo "Transcript path: $transcript_path" >> "$LOG_FILE"

# 展开波浪号
transcript_path="${transcript_path/#\~/$HOME}"
echo "Expanded path: $transcript_path" >> "$LOG_FILE"

if [ ! -f "$transcript_path" ]; then
    echo "Transcript file not found!" >> "$LOG_FILE"
    exit 0
fi

echo "Transcript file found" >> "$LOG_FILE"

# 提取最后几条消息，分析对话内容
last_user_msg=$(tail -n 50 "$transcript_path" | jq -r 'select(.type == "message" and .role == "user") | .content[] | select(.type == "text") | .text' | tail -n 1 | head -c 100)

# 提取 Claude 最后使用的工具
last_tools=$(tail -n 20 "$transcript_path" | jq -r 'select(.type == "message" and .role == "assistant") | .content[] | select(.type == "tool_use") | .name' | tail -n 5 | paste -sd "," -)

# 构建通知内容
if [ -n "$last_user_msg" ]; then
    # 截断并清理用户消息
    clean_msg=$(echo "$last_user_msg" | tr '\n' ' ' | sed 's/  */ /g')
    notification_body="任务: $clean_msg"
else
    notification_body="任务已完成"
fi

# 添加使用的工具信息（如果有）
if [ -n "$last_tools" ]; then
    notification_body="$notification_body
工具: $last_tools"
fi

# 发送通知（使用 Glass 提示音）
echo "Notification body: $notification_body" >> "$LOG_FILE"
osascript -e "display notification \"$notification_body\" with title \"Claude Code 完成\" sound name \"Glass\"" 2>> "$LOG_FILE"

notify_result=$?
echo "Notification result: $notify_result" >> "$LOG_FILE"
echo "" >> "$LOG_FILE"

exit 0
