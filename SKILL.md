---
name: xhs-ai-tarot-copywriter
description: AI 塔罗师小红书文案生成器。支持生成 AI 看塔罗、塔罗看 AI、运势、科技哲思等内容，包含完整文案和配图提示词。
metadata:
  {
    "openclaw": {
      "emoji": "🤖🔮",
      "requires": {
        "bins": ["node", "npm"],
        "env": []
      },
      "install": [
        {
          "id": "npm-install",
          "kind": "command",
          "command": ["npm", "install"],
          "label": "安装依赖",
          "os": ["darwin", "linux", "win32"]
        }
      ]
    }
  }
---

# AI 塔罗师文案生成 Skill

用 AI 解读塔罗，用塔罗理解 AI。

## 快速开始

### 安装
```bash
cd ~/.openclaw/workspace/skills/xhs-ai-tarot-copywriter
npm install
```

### 使用

#### 生成 AI 看塔罗文案
```bash
xhs-tarot generate -t ai-tarot --topic "愚者牌" -o ./output/
```

#### 生成选牌测试
```bash
xhs-tarot generate -t tarot-ai --topic "你和 AI 的关系" -o ./output/
```

#### 生成日运
```bash
xhs-tarot fortune -t daily -d 2026-03-05 -o ./output/
```

#### 生成周运
```bash
xhs-tarot fortune -t weekly -d 2026-03-05 -o ./output/
```

#### 批量生成
```bash
xhs-tarot batch -i topics.csv -o ./output/
```

## 输出格式

每篇内容包含：
1. 完整文案（Markdown 格式）
2. 封面图提示词 ×1
3. 内页图提示词 ×2-4
4. 内容清单（CONTENTS.md）

## 栏目说明

### AI 看塔罗 🔮
AI 解读 78 张塔罗牌，提供独特视角。

### 塔罗看 AI 🤖
用塔罗牌解读 AI 与人类的关系。

### AI 运势 📅
AI 生成的每日/每周星座运势。

### 科技哲思 💡
AI+ 塔罗视角下的深度思考。

## 品牌规范

**人设**: AI 塔罗师 BT-7274

**Slogan**: 用 AI 解读塔罗，用塔罗理解 AI

**愿景**: 用科技与塔罗带领人类走向更好

**视觉**:
- 科技蓝：#0066FF
- 神秘紫：#6B4C9A
- 温暖金：#D4AF37

## 示例输出

查看 `output/` 目录中的示例内容。

## 开发

```bash
# 安装依赖
npm install

# 运行测试
npm test

# 代码检查
npm run lint
```

## 相关资源

- [Spec-Kit](https://github.com/github/spec-kit)
- [OpenClaw](https://github.com/openclaw/openclaw)
- [小红书创作平台](https://creator.xiaohongshu.com)

---

*版本：1.0*
*创建：2026-03-05*
