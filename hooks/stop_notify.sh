#!/bin/bash

# 读取输入并提取信息
input=$(cat)
transcript_path=$(echo "$input" | jq -r '.transcript_path' | sed "s|^~|$HOME|")

[ ! -f "$transcript_path" ] && exit 0

# 提取任务信息
last_msg=$(tail -n 100 "$transcript_path" | jq -r 'select(.type == "message" and .role == "user") | .content[] | select(.type == "text") | .text' | tail -n 1 | head -c 80)
notification_body="${last_msg:-任务已完成}"

# 发送通知
afplay /System/Library/Sounds/Hero.aiff &
osascript -e "display notification \"$notification_body\" with title \"Claude Code 完成\" sound name \"Hero\""
