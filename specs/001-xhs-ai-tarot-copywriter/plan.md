# Technical Implementation Plan - AI 塔罗文案生成器

## 技术栈

- **运行时**: Node.js 20+
- **语言**: JavaScript (ES6+)
- **CLI**: Commander.js
- **模板引擎**: Handlebars / EJS
- **AI 集成**: Claude API / 本地 LLM
- **测试**: Jest

---

## 架构设计

### 模块划分

```
src/
├── cli.js              # 命令行入口
├── generators/
│   ├── copywriter.js   # 文案生成器
│   ├── prompts.js      # 提示词生成器
│   └── fortune.js      # 运势生成器
├── templates/
│   ├── ai-tarot.hbs    # AI 看塔罗模板
│   ├── tarot-ai.hbs    # 塔罗看 AI 模板
│   ├── fortune.hbs     # 运势模板
│   └── philosophy.hbs  # 哲思模板
├── prompts/
│   ├── cover.hbs       # 封面提示词模板
│   ├── inner.hbs       # 内页提示词模板
│   └── test.hbs        # 测试提示词模板
├── utils/
│   ├── formatter.js    # 格式化工具
│   └── validator.js    # 内容验证
└── config/
    ├── brands.js       # 品牌配置
    └── tags.js         # 标签库
```

---

## 实现阶段

### Phase 1: 基础框架
**目标**: 搭建项目结构和 CLI

**任务**:
1. 初始化 Node.js 项目
2. 安装依赖（commander, handlebars 等）
3. 创建 CLI 入口
4. 配置 ESLint + Prettier

**交付物**:
- package.json
- src/cli.js
- 基础目录结构

---

### Phase 2: 文案生成器
**目标**: 实现核心文案生成功能

**任务**:
1. 创建 4 个栏目模板
2. 实现文案生成逻辑
3. 集成 AI API（可选）
4. 添加内容验证

**交付物**:
- src/generators/copywriter.js
- templates/*.hbs
- 测试用例

---

### Phase 3: 提示词生成器
**目标**: 实现配图提示词生成

**任务**:
1. 创建提示词模板库
2. 实现提示词生成逻辑
3. 支持风格/配色配置
4. 添加用途说明

**交付物**:
- src/generators/prompts.js
- prompts/*.hbs
- 配置选项

---

### Phase 4: 运势生成器
**目标**: 实现自动化运势生成

**任务**:
1. 创建运势模板
2. 实现 12 星座循环生成
3. 添加日期处理
4. 支持日运/周运切换

**交付物**:
- src/generators/fortune.js
- 运势模板
- 日期工具

---

### Phase 5: 导出与集成
**目标**: 完善输出和集成

**任务**:
1. 实现 Markdown 导出
2. 实现 JSON 导出
3. 添加内容清单生成
4. 集成到 OpenClaw skill

**交付物**:
- 导出功能
- OpenClaw skill 配置
- 完整文档

---

### Phase 6: 测试与优化
**目标**: 质量保证和优化

**任务**:
1. 编写单元测试
2. 集成测试
3. 性能优化
4. 文档完善

**交付物**:
- 测试报告
- 性能基准
- README.md

---

## 数据结构

### 文案对象
```javascript
{
  type: 'ai-tarot',  // 栏目类型
  topic: '愚者牌',    // 主题
  title: '🤖 AI 解读愚者牌｜新的开始还是无知的冒险？',
  content: '...',     // 正文
  tags: ['#塔罗牌', '#AI', ...],
  callToAction: '你觉得 AI 像愚者牌吗？评论区告诉我...',
  images: {
    cover: { prompt: '...', usage: '封面' },
    inner: [
      { prompt: '...', usage: '牌面展示' },
      { prompt: '...', usage: '对比展示' },
      ...
    ]
  },
  metadata: {
    createdAt: '2026-03-05',
    version: '1.0',
    wordCount: 580
  }
}
```

### 配置对象
```javascript
{
  brand: {
    name: 'AI 塔罗师 BT',
    slogan: '用 AI 解读塔罗，用塔罗理解 AI',
    colors: {
      purple: '#6B4C9A',
      blue: '#0066FF',
      gold: '#D4AF37'
    }
  },
  templates: {
    'ai-tarot': 'templates/ai-tarot.hbs',
    // ...
  },
  tags: {
    core: ['#塔罗牌', '#AI', '#AI 塔罗'],
    fortune: ['#星座运势', '#塔罗运势'],
    // ...
  }
}
```

---

## API 设计

### CLI 命令

```bash
# 生成单篇文案
xhs-tarot generate --type ai-tarot --topic "愚者牌" --output ./output/

# 生成选牌测试
xhs-tarot generate --type test --topic "你和 AI 的关系" --options 4

# 生成运势
xhs-tarot fortune --type daily --date 2026-03-05 --output ./output/

# 批量生成
xhs-tarot batch --input topics.csv --output ./output/

# 查看帮助
xhs-tarot --help
```

### Node.js API

```javascript
const { Copywriter, PromptGenerator } = require('xhs-ai-tarot');

// 生成文案
const copywriter = new Copywriter();
const article = await copywriter.generate({
  type: 'ai-tarot',
  topic: '愚者牌'
});

// 生成提示词
const promptGen = new PromptGenerator();
const images = await promptGen.generate({
  topic: '愚者牌',
  types: ['cover', 'inner']
});

// 导出
await article.save('./output/001-fool.md');
```

---

## 测试策略

### 单元测试
- 每个生成器函数
- 模板渲染
- 格式化工具
- 验证函数

### 集成测试
- 完整生成流程
- CLI 命令
- 文件导出

### 质量检查
- 文案通顺度（人工审核）
- 提示词可用性（AI 绘画测试）
- 格式规范性（自动化检查）

---

## 风险与缓解

| 风险 | 影响 | 缓解措施 |
|------|------|----------|
| AI 生成内容质量不稳定 | 高 | 人工审核流程 + 质量检查 |
| 提示词不被 AI 绘画理解 | 中 | 测试优化 + 模板迭代 |
| 内容违规风险 | 高 | 敏感词过滤 + 合规检查 |
| 性能问题 | 低 | 批量生成优化 + 缓存 |

---

## 成功标准

### 功能完整
- [ ] 4 个栏目模板可用
- [ ] 文案生成质量达标
- [ ] 提示词可被 AI 绘画理解
- [ ] CLI 命令正常工作

### 质量达标
- [ ] 生成文案无需大改即可发布
- [ ] 提示词生成图片符合预期
- [ ] 无违规内容
- [ ] 文档完整清晰

### 用户体验
- [ ] CLI 命令简单易用
- [ ] 生成速度快（<5 秒/篇）
- [ ] 输出格式规范
- [ ] 错误提示清晰

---

*版本：1.0*
*创建日期：2026-03-05*
