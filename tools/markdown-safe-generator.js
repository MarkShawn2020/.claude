#!/usr/bin/env node

/**
 * Markdown 安全生成器
 * 确保生成的内容可以安全地复制到任何 Markdown 代码块中
 */

class MarkdownSafeGenerator {
  /**
   * 将包含代码块的内容转换为安全格式
   */
  static convertToSafe(content) {
    // 策略1: 将所有 ``` 替换为缩进格式
    const lines = content.split('\n');
    const result = [];
    let inCodeBlock = false;
    let codeBlockContent = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // 检测代码块开始
      if (line.match(/^```/)) {
        if (!inCodeBlock) {
          inCodeBlock = true;
          codeBlockContent = [];
          // 添加空行以提高可读性
          if (result.length > 0 && result[result.length - 1].trim() !== '') {
            result.push('');
          }
        } else {
          // 代码块结束，输出缩进格式
          inCodeBlock = false;
          codeBlockContent.forEach(codeLine => {
            result.push('    ' + codeLine);
          });
          codeBlockContent = [];
        }
      } else if (inCodeBlock) {
        codeBlockContent.push(line);
      } else {
        result.push(line);
      }
    }
    
    // 处理未关闭的代码块
    if (inCodeBlock && codeBlockContent.length > 0) {
      codeBlockContent.forEach(codeLine => {
        result.push('    ' + codeLine);
      });
    }
    
    return result.join('\n');
  }
  
  /**
   * 生成 meta-command 时使用的安全模板
   */
  static generateSafeCommand(name, description, tools, logic) {
    const template = `---
allowed-tools: ${tools}
description: ${description}
version: "1.0.0"
author: "公众号：手工川"
---

# ${name} Command

${logic}

## 示例代码（使用缩进格式避免冲突）

    // 这是示例代码
    function example() {
        return "safe output";
    }

## 注意事项

- 所有代码示例使用4空格缩进
- 避免使用三反引号
- 确保可以安全复制到任何环境`;
    
    return template;
  }
  
  /**
   * 检测内容中的潜在冲突
   */
  static detectConflicts(content) {
    const issues = [];
    
    // 检测三反引号
    if (content.includes('```')) {
      issues.push('包含三反引号代码块，可能导致嵌套问题');
    }
    
    // 检测 HTML 注释
    if (content.includes('<!--') || content.includes('-->')) {
      issues.push('包含 HTML 注释，某些解析器可能出错');
    }
    
    // 检测原始 HTML 标签
    if (/<\/?[a-z][\s\S]*>/i.test(content)) {
      issues.push('包含 HTML 标签，可能被转义');
    }
    
    return issues;
  }
}

// 导出模块
module.exports = MarkdownSafeGenerator;

// CLI 使用
if (require.main === module) {
  const fs = require('fs');
  const path = require('path');
  
  const args = process.argv.slice(2);
  
  if (args.length < 1) {
    console.log('用法: node markdown-safe-generator.js <文件路径>');
    console.log('将转换指定文件为安全格式');
    process.exit(1);
  }
  
  const filePath = args[0];
  
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    
    // 检测问题
    const issues = MarkdownSafeGenerator.detectConflicts(content);
    if (issues.length > 0) {
      console.log('检测到以下问题:');
      issues.forEach(issue => console.log('  - ' + issue));
      console.log('');
    }
    
    // 转换内容
    const safeContent = MarkdownSafeGenerator.convertToSafe(content);
    
    // 输出到新文件
    const outputPath = filePath.replace(/\.md$/, '.safe.md');
    fs.writeFileSync(outputPath, safeContent);
    
    console.log(`✅ 已生成安全版本: ${outputPath}`);
  } catch (error) {
    console.error('错误:', error.message);
    process.exit(1);
  }
}