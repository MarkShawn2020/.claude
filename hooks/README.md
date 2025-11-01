# Claude Code Stop Hook - 任务完成通知

当 Claude Code 完成任务时，自动推送 macOS 通知 + 声音提示。

## 配置代码

**`~/.claude/settings.json`**
```json
{
  "hooks": {
    "Stop": [
      {
        "hooks": [
          {
            "type": "command",
            "command": "~/.claude/hooks/stop_notify.sh"
          }
        ]
      }
    ]
  }
}
```

**`~/.claude/hooks/stop_notify.sh`**
```bash
#!/bin/bash

# 读取输入并提取信息
input=$(cat)
transcript_path=$(echo "$input" | jq -r '.transcript_path' | sed "s|^~|$HOME|")

# 提取任务信息
last_msg=$(tail -n 100 "$transcript_path" | jq -r 'select(.type == "message" and .role == "user") | .content[] | select(.type == "text") | .text' | tail -n 1 | head -c 80)
notification_body="${last_msg:-任务已完成}"

# 发送通知
afplay /System/Library/Sounds/Hero.aiff &
osascript -e "display notification \"$notification_body\" with title \"Claude Code 完成\" sound name \"Hero\""
```

```bash
chmod +x ~/.claude/hooks/stop_notify.sh
```

## 关键设置

**专注模式** ⚠️
- 系统设置 → 专注模式 → 取消勾选"将通知静音"

**自定义声音**
```bash
# 试听声音
afplay /System/Library/Sounds/Hero.aiff

# 可选：Purr, Tink, Pop, Glass, Ping, Submarine
```
