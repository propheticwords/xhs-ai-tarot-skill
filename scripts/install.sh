#!/bin/bash
# AI 塔罗师文案生成 Skill 安装脚本

set -e

echo "🤖🔮 安装 AI 塔罗师文案生成 Skill..."

# 检查 Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 需要安装 Node.js"
    echo "请访问 https://nodejs.org 下载安装"
    exit 1
fi

echo "✅ Node.js: $(node --version)"

# 检查 npm
if ! command -v npm &> /dev/null; then
    echo "❌ 需要安装 npm"
    exit 1
fi

echo "✅ npm: $(npm --version)"

# 安装依赖
echo "📦 安装依赖..."
npm install --production

echo "✅ 安装完成！"
echo ""
echo "使用方法:"
echo "  xhs-tarot generate -t ai-tarot --topic \"愚者牌\""
echo "  xhs-tarot fortune -t daily"
echo "  xhs-tarot --help"
