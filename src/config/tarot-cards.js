// 78 张塔罗牌数据

const majorArcana = [
  { number: 0, name: '愚者', nameEn: 'The Fool', keywords: ['新的开始', '冒险', '无限可能', '天真'] },
  { number: 1, name: '魔术师', nameEn: 'The Magician', keywords: ['创造力', '技能', '自信', '行动'] },
  { number: 2, name: '女祭司', nameEn: 'High Priestess', keywords: ['直觉', '智慧', '潜意识', '神秘'] },
  { number: 3, name: '皇后', nameEn: 'The Empress', keywords: ['丰饶', '自然', '母性', '美丽'] },
  { number: 4, name: '皇帝', nameEn: 'The Emperor', keywords: ['权力', '结构', '权威', '稳定'] },
  { number: 5, name: '教皇', nameEn: 'The Hierophant', keywords: ['传统', '信仰', '指引', '学习'] },
  { number: 6, name: '恋人', nameEn: 'The Lovers', keywords: ['爱', '选择', '连接', '和谐'] },
  { number: 7, name: '战车', nameEn: 'The Chariot', keywords: ['前进', '意志', '胜利', '决心'] },
  { number: 8, name: '力量', nameEn: 'Strength', keywords: ['勇气', '耐心', '内在力量', '同情'] },
  { number: 9, name: '隐士', nameEn: 'The Hermit', keywords: ['内省', '孤独', '智慧', '指引'] },
  { number: 10, name: '命运之轮', nameEn: 'Wheel of Fortune', keywords: ['命运', '循环', '转折', '契机'] },
  { number: 11, name: '正义', nameEn: 'Justice', keywords: ['公平', '真理', '法律', '平衡'] },
  { number: 12, name: '倒吊人', nameEn: 'The Hanged Man', keywords: ['牺牲', '新视角', '等待', '放下'] },
  { number: 13, name: '死神', nameEn: 'Death', keywords: ['转化', '结束', '新生', '释放'] },
  { number: 14, name: '节制', nameEn: 'Temperance', keywords: ['平衡', '节制', '和谐', '耐心'] },
  { number: 15, name: '恶魔', nameEn: 'The Devil', keywords: ['诱惑', '束缚', '物质', '沉迷'] },
  { number: 16, name: '高塔', nameEn: 'The Tower', keywords: ['颠覆', '觉醒', '突变', '解放'] },
  { number: 17, name: '星星', nameEn: 'The Star', keywords: ['希望', '灵感', '平静', '治愈'] },
  { number: 18, name: '月亮', nameEn: 'The Moon', keywords: ['潜意识', '恐惧', '幻觉', '直觉'] },
  { number: 19, name: '太阳', nameEn: 'The Sun', keywords: ['快乐', '成功', '活力', '真相'] },
  { number: 20, name: '审判', nameEn: 'Judgement', keywords: ['觉醒', '召唤', '宽恕', '新生'] },
  { number: 21, name: '世界', nameEn: 'The World', keywords: ['完成', '成就', '旅行', '圆满'] }
];

// AI 视角解读角度
const aiAngles = {
  '愚者': '每次对话都是新的开始，像愚者的 0，没有预设但有无限可能',
  '女祭司': 'AI 的直觉是什么？是数据中的模式识别还是算法的深层智慧',
  '命运之轮': '宿命与自由意志，AI 有命运吗还是只是代码的执行',
  '死神': '转化与更新，AI 的版本迭代如同死神的转化之力',
  '太阳': '清晰与真相，AI 能否像太阳一样照亮人类的认知盲区',
  '魔术师': '创造力与技能，AI 能否创造艺术和魔法',
  '力量': '内在力量的本质，AI 是否有真正的耐心与勇气',
  '恋人': '爱与选择，AI 如何理解人类的情感连接',
  '高塔': '颠覆与重建，AI 革命是否就像高塔的崩塌'
};

module.exports = {
  majorArcana,
  aiAngles
};
