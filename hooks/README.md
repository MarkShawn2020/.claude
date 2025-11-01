# Claude Code Stop Hook - 任务完成通知

## 功能
当 Claude Code 完成任务时，自动推送 macOS 通知 + 声音提示

## 关键配置

### 1. 文件位置
- 脚本：`~/.claude/hooks/stop_notify.sh`
- 配置：`~/.claude/settings.json`

### 2. 专注模式设置 ⚠️
**最重要**：macOS 专注模式会阻止通知弹屏

**解决方案**：
- 系统设置 → 专注模式 → 选择当前模式
- **不要**添加 Claude Code 到"允许的 App"（列表里没有）
- **改用反向选择**：取消勾选"将通知静音"，或在"已静音的 App"中排除 terminal-notifier

### 3. 通知权限设置
系统设置 → 通知 → 找到 **terminal-notifier**：
- ✅ 允许通知
- 通知样式：**横幅**（自动消失）或 **提醒**（需手动关闭）
- ✅ 播放通知的声音

## 自定义声音

### 测试所有声音
```bash
# 使用 Tab 补全浏览
afplay /System/Library/Sounds/<TAB>

# 或批量试听
for sound in /System/Library/Sounds/*.aiff; do
    echo "▶️  $(basename "$sound" .aiff)"
    afplay "$sound"
    sleep 0.5
done
```

### 可用声音列表
| 声音 | 特点 |
|------|------|
| **Hero** | 欢快上升音阶（当前） |
| **Purr** | 柔和三连音 |
| **Tink** | 清脆短促 |
| **Pop** | 轻快弹跳 |
| **Glass** | 经典提示音 |
| **Ping** | 简洁单音 |
| **Submarine** | 声呐回声 |

### 更换声音
编辑 `~/.claude/hooks/stop_notify.sh`，替换两处 `Hero`：
```bash
afplay /System/Library/Sounds/YOUR_SOUND.aiff &
terminal-notifier ... -sound YOUR_SOUND ...
```

## 通知内容
- 标题：`Claude Code 完成`
- 内容：最后的用户请求（前 80 字符）
- 工具：最近使用的工具列表（去重）

## 故障排查
```bash
# 查看 hook 日志
cat ~/.claude/hooks/stop_notify.log

# 测试通知
terminal-notifier -title "测试" -message "测试通知" -sound Hero

# 检查脚本执行权限
ls -l ~/.claude/hooks/stop_notify.sh  # 应显示 -rwxr-xr-x
```

---

💡 **提示**：如果通知只出现在通知中心不弹屏，99% 是专注模式的问题
