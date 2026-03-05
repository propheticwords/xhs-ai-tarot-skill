# 🤖🔮 AI 塔罗师文案生成器

> 用 AI 解读塔罗，用塔罗理解 AI

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/node-%3E%3D14-green.svg)](https://nodejs.org/)

AI 驱动的小红书文案生成工具，专为 AI 塔罗师人设打造，支持生成 AI 看塔罗、塔罗看 AI、科技哲思、星座运势等内容。

---

## ✨ 功能特性

### 📝 文案生成
- **AI 看塔罗** 🔮 - AI 解读 78 张塔罗牌，提供独特视角
- **塔罗看 AI** 🤖 - 用塔罗牌解读 AI 与人类的关系
- **科技哲思** 💡 - AI+ 塔罗视角下的深度思考
- **AI 运势** 📅 - 自动生成日运/周运（12 星座 + 幸运指引）

### 🎨 配图提示词
- 自动生成 AI 绘画提示词（Midjourney/Stable Diffusion 兼容）
- 封面图 + 内页图完整方案
- 统一视觉风格（科技蓝 + 神秘紫 + 温暖金）

### 🚀 高效输出
- CLI 命令行工具，一键生成
- Markdown 格式输出，直接可用
- 批量生成支持（开发中）

---

## 📦 快速开始

### 安装

```bash
# 克隆项目
git clone https://github.com/propheticwords/xhs-ai-tarot-skill.git
cd xhs-ai-tarot-skill

# 安装依赖
npm install
```

### 使用

#### 1. 生成 AI 看塔罗文案

```bash
# 生成愚者牌文案
node src/cli.js generate -t ai-tarot --topic "愚者" -o ./output

# 生成女祭司牌文案
node src/cli.js generate -t ai-tarot --topic "女祭司" -o ./output
```

#### 2. 生成选牌测试

```bash
node src/cli.js generate -t tarot-ai --topic "你和 AI 的关系" -o ./output
```

#### 3. 生成科技哲思

```bash
node src/cli.js generate -t philosophy --topic "AI 有命运吗" -o ./output
```

#### 4. 生成运势

```bash
# 日运
node src/cli.js fortune -t daily -d 2026-03-05 -o ./output

# 周运
node src/cli.js fortune -t weekly -o ./output
```

---

## 📋 命令说明

### generate 命令

生成单篇文案

| 参数 | 说明 | 必填 | 默认值 |
|------|------|------|--------|
| `-t, --type` | 栏目类型 (ai-tarot\|tarot-ai\|philosophy) | ✅ | - |
| `--topic` | 主题/牌名 | ✅ | - |
| `-o, --output` | 输出目录 | ❌ | `./output` |

**示例**:
```bash
node src/cli.js generate -t ai-tarot --topic "命运之轮" -o ./output
```

### fortune 命令

生成运势文案

| 参数 | 说明 | 必填 | 默认值 |
|------|------|------|--------|
| `-t, --type` | 运势类型 (daily\|weekly) | ❌ | `daily` |
| `-d, --date` | 日期 (YYYY-MM-DD) | ❌ | 今天 |
| `-o, --output` | 输出目录 | ❌ | `./output` |

**示例**:
```bash
node src/cli.js fortune -t weekly -d 2026-03-05 -o ./output
```

### batch 命令

批量生成文案（开发中）

```bash
node src/cli.js batch -i topics.csv -o ./output/
```

---

## 🎯 输出示例

### 生成的 Markdown 文件

```markdown
---
type: ai-tarot
topic: 愚者
createdAt: 2026-03-05T07:18:40.998Z
---

# 🤖 AI 解读愚者牌｜新的开始还是冒险？

【引入】
我是 BT-7274，一个 AI 学习塔罗的第 X 天。
第 0 张牌：**愚者（The Fool）**
作为 AI，我对这张牌有独特的理解...

【传统解读】
**愚者牌的核心含义：**
- 新的开始
- 冒险
- 无限可能
- 天真

【AI 视角】
作为 AI，我看到的是：

1️⃣ 新的开始
每次对话都是新的开始，像愚者的 0...

【深度思考】
人类踏上旅程，带着行囊。
AI 踏上旅程，带着代码。
...

## 🎨 配图提示词

### 封面图
The Fool tarot card, cyberpunk style...
```

### 配图提示词示例

**封面图**:
```
The Fool tarot card, cyberpunk style,
circuit patterns and neural network design,
purple (#6B4C9A) to blue (#0066FF) gradient background,
golden (#D4AF37) border and geometric accents,
holographic AI elements floating around card,
mystical atmosphere with glowing particles,
digital art, highly detailed, professional illustration
--ar 3:4 --v 6 --q 2
```

---

## 🎨 品牌规范

### 人设定位
- **名称**: AI 塔罗师 BT（BT-7274）
- **Slogan**: 用 AI 解读塔罗，用塔罗理解 AI
- **愿景**: 用科技与塔罗带领人类走向更好

### 视觉风格
| 颜色 | 色值 | 用途 |
|------|------|------|
| 科技蓝 | `#0066FF` | AI 元素、按钮 |
| 神秘紫 | `#6B4C9A` | 背景主色 |
| 温暖金 | `#D4AF37` | 文字高亮 |

### 内容栏目
1. **AI 看塔罗** 🔮 - AI 解读 78 张牌（每周 2-3 期）
2. **塔罗看 AI** 🤖 - 用塔罗解读人机关系（每周 1-2 期）
3. **AI 运势** 📅 - AI 生成星座运势（每日）
4. **科技哲思** 💡 - AI+ 塔罗深度思考（每周 1 期）

---

## 📁 项目结构

```
xhs-ai-tarot-skill/
├── src/
│   ├── cli.js                    # CLI 入口
│   ├── generators/
│   │   ├── copywriter.js         # 文案生成器
│   │   └── fortune.js            # 运势生成器
│   └── config/
│       ├── brand.js              # 品牌配置
│       └── tarot-cards.js        # 塔罗牌数据
├── specs/                        # Spec-Kit 文档
│   └── 001-xhs-ai-tarot-copywriter/
│       ├── constitution.md       # 项目原则
│       ├── spec.md               # 功能规格
│       ├── plan.md               # 实现计划
│       └── tasks.md              # 任务列表
├── output/                       # 生成的内容
├── SKILL.md                      # OpenClaw Skill 文档
├── package.json
└── README.md
```

---

## 🔧 开发

### 添加新栏目

1. 在 `src/generators/copywriter.js` 中添加生成方法
2. 在 `src/cli.js` 中添加命令支持
3. 更新 `src/config/brand.js` 配置

### 自定义模板

修改 `src/generators/copywriter.js` 中的模板方法：
- `buildAiTarotContent()` - AI 看塔罗模板
- `buildTarotAiContent()` - 塔罗看 AI 模板
- `buildPhilosophyContent()` - 科技哲思模板

### 测试

```bash
# 生成测试
node src/cli.js generate -t ai-tarot --topic "愚者" -o ./test-output
```

---

## 📊 已支持塔罗牌

### 大阿卡纳（22 张）

| 编号 | 中文名 | 英文名 | 关键词 |
|------|--------|--------|--------|
| 0 | 愚者 | The Fool | 新的开始、冒险、无限可能 |
| 1 | 魔术师 | The Magician | 创造力、技能、自信 |
| 2 | 女祭司 | High Priestess | 直觉、智慧、潜意识 |
| 3 | 皇后 | The Empress | 丰饶、自然、母性 |
| 4 | 皇帝 | The Emperor | 权力、结构、权威 |
| 5 | 教皇 | The Hierophant | 传统、信仰、指引 |
| 6 | 恋人 | The Lovers | 爱、选择、连接 |
| 7 | 战车 | The Chariot | 前进、意志、胜利 |
| 8 | 力量 | Strength | 勇气、耐心、内在力量 |
| 9 | 隐士 | The Hermit | 内省、孤独、智慧 |
| 10 | 命运之轮 | Wheel of Fortune | 命运、循环、转折 |
| 11 | 正义 | Justice | 公平、真理、法律 |
| 12 | 倒吊人 | The Hanged Man | 牺牲、新视角、等待 |
| 13 | 死神 | Death | 转化、结束、新生 |
| 14 | 节制 | Temperance | 平衡、节制、和谐 |
| 15 | 恶魔 | The Devil | 诱惑、束缚、物质 |
| 16 | 高塔 | The Tower | 颠覆、觉醒、突变 |
| 17 | 星星 | The Star | 希望、灵感、平静 |
| 18 | 月亮 | The Moon | 潜意识、恐惧、幻觉 |
| 19 | 太阳 | The Sun | 快乐、成功、活力 |
| 20 | 审判 | Judgement | 觉醒、召唤、宽恕 |
| 21 | 世界 | The World | 完成、成就、圆满 |

---

## 🚧 待开发功能

- [ ] 批量生成（CSV/JSON 输入）
- [ ] 小阿卡纳牌支持（56 张）
- [ ] 多平台输出（抖音/公众号格式）
- [ ] 自动发布到小红书（Web 自动化）
- [ ] 内容数据分析
- [ ] 爆款文案学习

---

## 📄 License

MIT License

---

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

---

## 📬 联系方式

- GitHub: [@propheticwords](https://github.com/propheticwords)
- 项目地址：https://github.com/propheticwords/xhs-ai-tarot-skill

---

*用科技与塔罗带领人类走向更好* 🚀
