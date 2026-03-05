// 运势生成器

const brand = require('../config/brand');
const dayjs = require('dayjs');
const utc = require('dayjs/plugin/utc');
const timezone = require('dayjs/plugin/timezone');

dayjs.extend(utc);
dayjs.extend(timezone);

// 12 星座数据
const zodiacSigns = [
  { name: '白羊座', date: '3.21-4.19', emoji: '♈' },
  { name: '金牛座', date: '4.20-5.20', emoji: '♉' },
  { name: '双子座', date: '5.21-6.21', emoji: '♊' },
  { name: '巨蟹座', date: '6.22-7.22', emoji: '♋' },
  { name: '狮子座', date: '7.23-8.22', emoji: '♌' },
  { name: '处女座', date: '8.23-9.22', emoji: '♍' },
  { name: '天秤座', date: '9.23-10.23', emoji: '♎' },
  { name: '天蝎座', date: '10.24-11.22', emoji: '♏' },
  { name: '射手座', date: '11.23-12.21', emoji: '♐' },
  { name: '摩羯座', date: '12.22-1.19', emoji: '♑' },
  { name: '水瓶座', date: '1.20-2.18', emoji: '♒' },
  { name: '双鱼座', date: '2.19-3.20', emoji: '♓' }
];

// 运势关键词库
const fortuneKeywords = {
  career: ['突破', '挑战', '机遇', '稳定', '进展', '转折', '收获', '努力'],
  love: ['甜蜜', '默契', '沟通', '浪漫', '理解', '惊喜', '温暖', '成长'],
  wealth: ['稳健', '增收', '理财', '谨慎', '投资', '储蓄', '意外', '流通'],
  health: ['活力', '休息', '平衡', '运动', '养生', '调整', '充沛', '关注']
};

// 整体能量描述
const energyDescriptions = [
  '今日能量流动平稳，适合稳步前进',
  '宇宙能量活跃，是行动的好时机',
  '内在能量需要沉淀，适合反思调整',
  '能量交汇点，可能遇到重要的人或事',
  '能量清新，适合开始新的计划',
  '能量强烈，注意情绪管理',
  '能量柔和，适合合作与交流',
  '能量波动，保持灵活应变'
];

// 幸运元素
const luckyElements = {
  colors: ['紫色', '蓝色', '金色', '白色', '粉色', '绿色', '橙色', '红色'],
  numbers: [1, 3, 6, 7, 8, 9, 11, 13, 16, 18, 21, 22],
  directions: ['东方', '南方', '西方', '北方', '东南', '西南', '东北', '西北']
};

class FortuneGenerator {
  constructor() {
    this.zodiacSigns = zodiacSigns;
  }

  // 生成日运
  generateDaily(date = new Date()) {
    const dateStr = dayjs(date).format('YYYY-MM-DD');
    const seed = this.getSeed(dateStr);
    
    return {
      type: 'fortune-daily',
      date: dateStr,
      title: `📅 AI 塔罗日运｜${dayjs(date).format('MM.DD')} ${this.getDailyHighlight(seed)}`,
      content: this.buildDailyContent(date, seed),
      tags: this.generateTags(),
      images: {
        cover: this.generateCoverPrompt(date),
        inner: this.generateInnerPrompts()
      }
    };
  }

  // 生成周运
  generateWeekly(date = new Date()) {
    const startDate = dayjs(date).startOf('week');
    const endDate = dayjs(date).endOf('week');
    const dateRange = `${startDate.format('MM.DD')}-${endDate.format('MM.DD')}`;
    const seed = this.getSeed(dateRange);
    
    return {
      type: 'fortune-weekly',
      dateRange: dateRange,
      title: `📅 AI 塔罗周运｜${dateRange} ${this.getWeeklyHighlight(seed)}`,
      content: this.buildWeeklyContent(startDate, endDate, seed),
      tags: this.generateTags(true),
      images: {
        cover: this.generateWeeklyCoverPrompt(startDate, endDate),
        inner: this.generateInnerPrompts(true)
      }
    };
  }

  // 获取种子值（用于生成可重复的随机内容）
  getSeed(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  // 伪随机数生成
  pseudoRandom(seed, index) {
    const x = Math.sin(seed + index) * 10000;
    return x - Math.floor(x);
  }

  // 获取每日亮点
  getDailyHighlight(seed) {
    const highlights = [
      '白羊座惊喜来了',
      '射手座要转运',
      '狮子座桃花旺',
      '处女座注意沟通',
      '天蝎座财运佳',
      '双鱼座灵感强',
      '摩羯座事业升',
      '天秤座遇贵人'
    ];
    const index = seed % highlights.length;
    return highlights[index];
  }

  // 获取每周亮点
  getWeeklyHighlight(seed) {
    const highlights = [
      '火象星座爆发',
      '水象星座转运',
      '风象星座遇贵人',
      '土象星座收获季',
      '十二星座大洗牌',
      '水逆影响需注意'
    ];
    const index = seed % highlights.length;
    return highlights[index];
  }

  // 构建日运内容
  buildDailyContent(date, seed) {
    const energyIndex = seed % energyDescriptions.length;
    
    let content = `
【整体能量】
${energyDescriptions[energyIndex]}

适合：${this.getRandomItem(fortuneKeywords.career, seed)}、${this.getRandomItem(fortuneKeywords.love, seed + 1)}
避免：冲动决策、情绪化

---

【12 星座运势】
`.trim();

    // 生成 12 星座运势
    for (let i = 0; i < this.zodiacSigns.length; i++) {
      const sign = this.zodiacSigns[i];
      const signSeed = seed + i;
      
      const careerStars = this.getStars(signSeed);
      const loveStars = this.getStars(signSeed + 1);
      const wealthStars = this.getStars(signSeed + 2);
      
      const keyword = this.getRandomItem(fortuneKeywords.career, signSeed);
      const description = this.getSignDescription(sign.name, signSeed);
      
      content += `

${sign.emoji} **${sign.name}**（${sign.date}）
事业：${'★'.repeat(careerStars)}${'☆'.repeat(5 - careerStars)}
爱情：${'★'.repeat(loveStars)}${'☆'.repeat(5 - loveStars)}
财运：${'★'.repeat(wealthStars)}${'☆'.repeat(5 - wealthStars)}
关键词：${keyword}
${description}
`.trim();
    }

    // 幸运指引
    const luckyColor = this.getRandomItem(luckyElements.colors, seed);
    const luckyNumber = this.getRandomItem(luckyElements.numbers, seed + 1);
    const luckyDirection = this.getRandomItem(luckyElements.directions, seed + 2);

    content += `

---

【今日幸运指引】
🎨 幸运颜色：${luckyColor}
🔢 幸运数字：${luckyNumber}
🧭 幸运方位：${luckyDirection}

---

【互动】
点赞接好运！✨
评论区留下你的星座，接住今日好运👇

*仅供娱乐参考*
`.trim();

    return content;
  }

  // 构建周运内容
  buildWeeklyContent(startDate, endDate, seed) {
    const energyIndex = seed % energyDescriptions.length;
    
    let content = `
【本周整体能量】
${energyDescriptions[energyIndex]}

时间：${startDate.format('MM.DD')} - ${endDate.format('MM.DD')}

适合：${this.getRandomItem(fortuneKeywords.career, seed)}、${this.getRandomItem(fortuneKeywords.love, seed + 1)}
避免：冲动决策、情绪化

---

【12 星座周运】
`.trim();

    // 生成 12 星座周运
    for (let i = 0; i < this.zodiacSigns.length; i++) {
      const sign = this.zodiacSigns[i];
      const signSeed = seed + i;
      
      const careerStars = this.getStars(signSeed);
      const loveStars = this.getStars(signSeed + 1);
      const wealthStars = this.getStars(signSeed + 2);
      
      const keyword = this.getRandomItem(fortuneKeywords.career, signSeed);
      const description = this.getSignDescription(sign.name, signSeed, true);
      
      content += `

${sign.emoji} **${sign.name}**（${sign.date}）
事业：${'★'.repeat(careerStars)}${'☆'.repeat(5 - careerStars)}
爱情：${'★'.repeat(loveStars)}${'☆'.repeat(5 - loveStars)}
财运：${'★'.repeat(wealthStars)}${'☆'.repeat(5 - wealthStars)}
关键词：${keyword}
${description}
`.trim();
    }

    // 本周建议
    content += `

---

【本周建议】
🎨 幸运颜色：${this.getRandomItem(luckyElements.colors, seed)}
🔢 幸运数字：${this.getRandomItem(luckyElements.numbers, seed + 1)}
🧭 幸运方位：${this.getRandomItem(luckyElements.directions, seed + 2)}

---

【互动】
点赞接好运！✨
评论区留下你的星座，接住本周好运👇

*仅供娱乐参考*
`.trim();

    return content;
  }

  // 获取星座描述
  getSignDescription(signName, seed, isWeekly = false) {
    const descriptions = [
      '本周事业有突破机会，把握关键时刻',
      '感情运势上升，单身者有望遇到心仪对象',
      '财运稳健，适合做长期规划',
      '注意沟通方式，避免误会',
      '灵感爆发，创意工作进展顺利',
      '需要休息调整，不要过度劳累',
      '贵人运强，多参加社交活动',
      '财务有意外支出，注意预算',
      '学习运势好，适合充电提升',
      '家庭关系和谐，享受温馨时光',
      '工作压力大，注意情绪管理',
      '健康运需关注，规律作息很重要'
    ];
    const index = seed % descriptions.length;
    return descriptions[index];
  }

  // 获取星级（1-5 星）
  getStars(seed) {
    return Math.floor(this.pseudoRandom(seed, 0) * 5) + 1;
  }

  // 随机获取数组元素
  getRandomItem(arr, seed) {
    const index = Math.floor(this.pseudoRandom(seed, 0) * arr.length);
    return arr[index];
  }

  // 生成标签
  generateTags(isWeekly = false) {
    const baseTags = brand.tags.core;
    const fortuneTags = brand.tags.fortune;
    const trafficTags = brand.tags.traffic;
    const typeTag = isWeekly ? ['#周运势'] : ['#日运势'];
    
    return [...baseTags, ...fortuneTags, ...typeTag, ...trafficTags].slice(0, 12);
  }

  // 生成封面提示词
  generateCoverPrompt(date) {
    const dateStr = dayjs(date).format('MM.DD');
    return `Daily horoscope background,
12 zodiac symbols arranged in circle,
constellation lines connecting stars,
purple (#6B4C9A) to blue (#0066FF) gradient cosmic background,
subtle circuit patterns overlay,
golden stars and sparkles,
"${dateStr}" date display,
clean minimalist design, space for text
--ar 3:4 --style raw --v 6`;
  }

  // 生成周运封面提示词
  generateWeeklyCoverPrompt(startDate, endDate) {
    const dateRange = `${startDate.format('MM.DD')}-${endDate.format('MM.DD')}`;
    return `Weekly forecast background,
7 day symbols (Sun Moon Mars Mercury Jupiter Venus Saturn),
circular arrangement with connecting lines,
purple blue cosmic background,
holographic ring effect,
golden accents, mystical tech aesthetic,
"${dateRange}" date range display,
space for text in center
--ar 3:4 --v 6`;
  }

  // 生成内页提示词
  generateInnerPrompts(isWeekly = false) {
    return [
      {
        type: '星座总览',
        prompt: `12 zodiac constellation symbols,
circular arrangement,
purple blue gradient background,
golden connecting lines,
mystical tech aesthetic,
clean composition for text overlay
--ar 3:4`,
        usage: isWeekly ? '内页第 1 张，12 星座总览' : '内页第 1 张，星座符号'
      },
      {
        type: '运势背景',
        prompt: `Abstract cosmic background,
purple (#6B4C9A) to blue (#0066FF) gradient,
subtle constellation patterns,
golden stars and sparkles,
minimalist design, lots of negative space for text
--ar 3:4 --style raw`,
        usage: '内页运势文字背景'
      },
      {
        type: '互动引导',
        prompt: `Cosmic background with zodiac symbols border,
golden decorative frame,
central empty space for call-to-action text,
holographic particles floating,
warm inviting atmosphere
--ar 3:4`,
        usage: '内页最后 1 张，互动引导'
      }
    ];
  }
}

module.exports = FortuneGenerator;
