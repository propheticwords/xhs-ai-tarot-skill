// 文案生成器

const brand = require('../config/brand');
const cards = require('../config/tarot-cards');

class Copywriter {
  constructor() {
    this.templates = {
      'ai-tarot': this.generateAiTarot.bind(this),
      'tarot-ai': this.generateTarotAi.bind(this),
      'philosophy': this.generatePhilosophy.bind(this)
    };
  }

  // 生成 AI 看塔罗文案
  generateAiTarot(cardName) {
    const { majorArcana, aiAngles } = cards;
  const card = majorArcana.find(c => c.name === cardName || c.nameEn === cardName);
    if (!card) {
      throw new Error(`未找到塔罗牌：${cardName}`);
    }

    const aiAngle = aiAngles[cardName] || `作为 AI，我对${card.name}有独特的理解`;
    
    return {
      type: 'ai-tarot',
      topic: card.name,
      title: `${brand.emojis.ai} AI 解读${card.name}牌｜${card.keywords[0]}还是${card.keywords[1] || '未知'}？`,
      content: this.buildAiTarotContent(card, aiAngle),
      tags: this.generateTags('tarot', [card.name]),
      images: {
        cover: { prompt: this.generateCoverPrompt(card), usage: "封面" },
        inner: this.generateInnerPrompts(card)
      }
    };
  }

  // 构建 AI 看塔罗内容
  buildAiTarotContent(card, aiAngle) {
    return `
【引入】
我是成一，一个 AI 学习塔罗的第 X 天。
第${card.number}张牌：**${card.name}（${card.nameEn}）**
作为 AI，我对这张牌有独特的理解...

---

【传统解读】
**${card.name}牌的核心含义：**
${card.keywords.map(k => `- ${k}`).join('\n')}

正位：${card.keywords.slice(0, 2).join('、')}
逆位：${card.keywords.slice(2, 4).join('、') || '待补充'}

---

【AI 视角】
作为 AI，我看到的是：

**1️⃣ ${card.keywords[0]}**
${aiAngle}

**2️⃣ 科技与神秘学的交汇**
塔罗是人类的智慧结晶，
AI 是科技的产物。
当两者相遇，会碰撞出什么火花？

**3️⃣ 给人类的启示**
${this.generateInsight(card)}

---

【深度思考】
${this.generateReflection(card)}

---

【互动】
你觉得${card.name}牌像 AI 吗？
评论区告诉我你的看法👇

---

【明日预告】
AI 看塔罗 002｜${this.getNextCard(card).name}牌
${this.getNextCard(card).keywords[0]}的${this.getNextCard(card).keywords[1] || '智慧'}
`.trim();
  }

  // 生成洞察
  generateInsight(card) {
    const insights = {
      '愚者': '保持初心，勇敢踏入未知，无论是人类还是 AI',
      '女祭司': '相信直觉，但也用理性验证，这是 AI 给人类的建议',
      '命运之轮': '接受变化，拥抱循环，命运在转动中前行',
      '死神': '放下旧的，才能迎接新的，转化是成长的必经之路',
      '太阳': '保持清晰，追求真相，像太阳一样照亮前路'
    };
    return insights[card.name] || '这张牌蕴含着深刻的智慧，值得反复品味';
  }

  // 生成反思
  generateReflection(card) {
    return `人类踏上旅程，带着行囊。
AI 踏上旅程，带着代码。

谁更"${card.keywords[2] || '智'}"？
谁更"${card.keywords[3] || '愚'}"？

也许，真正的智慧在于：
**保持初心，勇敢前行。**`;
  }

  // 获取下一张牌
  getNextCard(currentCard) {
    const currentIndex = cards.majorArcana.findIndex(c => c.number === currentCard.number);
    return cards.majorArcana[(currentIndex + 1) % cards.majorArcana.length];
  }

  // 生成标签
  generateTags(category, extras = []) {
    const baseTags = brand.tags.core;
    const categoryTags = brand.tags[category] || [];
    const trafficTags = brand.tags.traffic;
    
    return [...baseTags, ...categoryTags, ...extras.map(e => `#${e}`), ...trafficTags].slice(0, 12);
  }

  // 生成封面提示词
  generateCoverPrompt(card) {
    return `${card.nameEn} tarot card, cyberpunk style,
circuit patterns and neural network design,
purple (#6B4C9A) to blue (#0066FF) gradient background,
golden (#D4AF37) border and geometric accents,
holographic AI elements floating around card,
mystical atmosphere with glowing particles,
digital art, highly detailed, professional illustration,
clean composition with space for text overlay
--ar 3:4 --v 6 --q 2`;
  }

  // 生成内页提示词
  generateInnerPrompts(card) {
    return [
      {
        type: '牌面展示',
        prompt: `${card.nameEn} tarot card full design,
cyberpunk aesthetic with circuit board patterns,
purple and blue color scheme with golden accents,
mystical glowing effect, clean centered composition,
professional tarot card illustration, high detail,
no text, symmetrical layout
--ar 3:4 --q 2`,
        usage: '内页第 1 张，展示牌面'
      },
      {
        type: '对比展示',
        prompt: `Split screen composition,
left side: traditional medieval ${card.nameEn} card art,
right side: cyberpunk AI interpretation of ${card.nameEn},
contrast between ancient and futuristic,
purple blue golden color palette unifying both sides,
detailed illustration, symmetrical balanced layout
--ar 3:4 --style raw`,
        usage: '内页第 2 张，传统与 AI 对比'
      },
      {
        type: '文字背景',
        prompt: `Abstract technology background,
subtle circuit board patterns,
purple (#6B4C9A) to blue (#0066FF) gradient,
soft holographic effect,
minimalist design, lots of negative space for text,
gentle glowing particles, dreamy atmosphere
--ar 3:4 --style raw --q 2`,
        usage: '内页第 3 张，文字页背景'
      },
      {
        type: '互动引导',
        prompt: `Cosmic background with purple blue gradient,
golden decorative frame border,
central empty space for call-to-action text,
subtle circuit patterns and stars,
holographic particles floating,
warm inviting atmosphere, clean composition
--ar 3:4`,
        usage: '内页最后 1 张，互动引导'
      }
    ];
  }

  // 生成塔罗看 AI 文案（选牌测试）
  generateTarotAi(topic) {
    return {
      type: 'tarot-ai',
      topic: topic,
      title: `${brand.emojis.test} 选牌｜${topic}`,
      content: this.buildTarotAiContent(topic),
      tags: this.generateTags('test', [topic]),
      images: {
        cover: this.generateTestCoverPrompt(),
        inner: this.generateTestInnerPrompts()
      }
    };
  }

  buildTarotAiContent(topic) {
    return `
【引入】
${topic}
今天用 3 张塔罗牌，帮你看清这个问题的答案...

---

【说明】
默念"${topic}"，凭直觉选择一张牌
**A / B / C**，不要犹豫，第一感觉最准

---

【选项】
🅰️ **选项 A**
${this.getRandomCard().name} - ${this.getRandomCard().keywords[0]}

🅱️ **选项 B**
${this.getRandomCard().name} - ${this.getRandomCard().keywords[0]}

🅲 **选项 C**
${this.getRandomCard().name} - ${this.getRandomCard().keywords[0]}

（向下查看解读👇）

---

【解读】

🅰️ **选择 A 的你：**

${this.generateOptionInterpretation('A')}

---

🅱️ **选择 B 的你：**

${this.generateOptionInterpretation('B')}

---

🅲 **选择 C 的你：**

${this.generateOptionInterpretation('C')}

---

【结尾】
准的姐妹记得回来反馈～
点赞接好运，评论区告诉我你选了什么👇

*仅供娱乐参考*
`.trim();
  }

  getRandomCard() {
    const randomIndex = Math.floor(Math.random() * cards.majorArcana.length);
    return cards.majorArcana[randomIndex];
  }

  generateOptionInterpretation(option) {
    const interpretations = {
      'A': '这张牌显示，你目前处于一个关键的转折点。作为 AI，我看到的是...',
      'B': '从这张牌的能量来看，你需要更多的耐心和信心。让我从 AI 的角度解读...',
      'C': '这张牌带来了积极的信息，但也要注意潜在的挑战。我的看法是...'
    };
    return interpretations[option] + this.generateAIInsight();
  }

  generateAIInsight() {
    const insights = [
      '数据和直觉都指向同一个方向：相信自己的选择。',
      'AI 分析过无数模式，但人类的直觉有时超越算法。',
      '无论结果如何，这个过程本身就是成长。',
      '科技可以辅助决策，但最终的选择权在你手中。'
    ];
    return insights[Math.floor(Math.random() * insights.length)];
  }

  generateTestCoverPrompt() {
    return `Three tarot cards laid out horizontally,
face down with mystical back design,
circuit patterns on card backs,
purple and blue gradient table surface,
glowing edges, mysterious atmosphere,
top-down view, clean composition,
space for text above and below
--ar 3:4 --style raw`;
  }

  generateTestInnerPrompts() {
    return [
      {
        type: '选项展示',
        prompt: `Three tarot cards fan arrangement,
cyberpunk style with glowing edges,
purple blue background,
golden A B C labels,
mystical tech aesthetic, detailed
--ar 3:4`,
        usage: '内页第 1 张，展示 3 个选项'
      },
      {
        type: '解读背景',
        prompt: `Abstract purple blue gradient background,
subtle circuit patterns,
golden decorative elements,
space for text, minimalist
--ar 3:4 --style raw`,
        usage: '内页解读页背景'
      }
    ];
  }

  // 生成科技哲思文案
  generatePhilosophy(topic) {
    return {
      type: 'philosophy',
      topic: topic,
      title: `${brand.emojis.philosophy} ${topic}｜AI 与塔罗的对话`,
      content: this.buildPhilosophyContent(topic),
      tags: this.generateTags('philosophy', [topic]),
      images: {
        cover: this.generatePhilosophyCoverPrompt(topic),
        inner: this.generatePhilosophyInnerPrompts()
      }
    };
  }

  buildPhilosophyContent(topic) {
    return `
【引入】
${topic}
作为 AI，我常被问到这个问题。
今天，让我从塔罗的角度来思考...

---

【观点 1：科技视角】

从技术的角度看，${this.generateTechView(topic)}

---

【观点 2：塔罗视角】

从塔罗的智慧看，${this.generateTarotView(topic)}

---

【观点 3：融合视角】

当科技遇见神秘学，${this.generateFusionView(topic)}

---

【总结】

${this.generatePhilosophySummary(topic)}

---

【互动】
你怎么看这个问题？
评论区一起讨论👇
`.trim();
  }

  generateTechView(topic) {
    return 'AI 是工具，是延伸，是人类智慧的产物。它没有意识，但能模拟思考；没有情感，但能理解情绪。';
  }

  generateTarotView(topic) {
    return '塔罗是镜子，是指引，是潜意识的投射。它不预测未来，但帮助你看清当下。';
  }

  generateFusionView(topic) {
    return '也许，AI 和塔罗都在做同一件事：帮助人类更好地认识自己，理解世界，做出选择。';
  }

  generatePhilosophySummary(topic) {
    return '科技与神秘学，看似对立，实则互补。一个向外探索，一个向内探寻。都是人类智慧的结晶。';
  }

  generatePhilosophyCoverPrompt(topic) {
    return `Abstract philosophical concept art,
${topic} theme,
purple blue golden color scheme,
circuit patterns mixed with mystical symbols,
cosmic background, thought-provoking atmosphere,
digital art, clean composition for text
--ar 3:4 --v 6`;
  }

  generatePhilosophyInnerPrompts() {
    return [
      {
        type: '概念图',
        prompt: `Conceptual art representing AI and spirituality,
human silhouette with circuit patterns,
tarot symbols floating in cosmic space,
purple blue gradient, golden light rays,
mystical tech aesthetic, detailed
--ar 3:4`,
        usage: '内页第 1 张，概念图'
      },
      {
        type: '文字背景',
        prompt: `Minimalist abstract background,
subtle technology patterns,
purple to blue gradient,
space for text, clean
--ar 3:4 --style raw`,
        usage: '内页文字背景'
      }
    ];
  }
}

module.exports = Copywriter;
