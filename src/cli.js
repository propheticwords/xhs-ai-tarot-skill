#!/usr/bin/env node

const { program } = require('commander');
const chalk = require('chalk');
const path = require('path');
const fs = require('fs');
const Copywriter = require('./generators/copywriter');
const FortuneGenerator = require('./generators/fortune');
const brand = require('./config/brand');

const packageJson = require('../package.json');

// 主程序
program
  .name('xhs-tarot')
  .description(`${brand.emojis.ai}${brand.emojis.tarot} AI 塔罗师小红书文案生成器`)
  .version(packageJson.version);

// generate 命令
program
  .command('generate')
  .description('生成单篇文案')
  .requiredOption('-t, --type <type>', '栏目类型 (ai-tarot|tarot-ai|philosophy)')
  .requiredOption('--topic <topic>', '主题/牌名')
  .option('-o, --output <dir>', '输出目录', './output')
  .action((options) => {
    console.log(chalk.blue(`${brand.emojis.ai}${brand.emojis.tarot} 开始生成文案...`));
    console.log(chalk.gray(`类型：${options.type}`));
    console.log(chalk.gray(`主题：${options.topic}`));
    
    try {
      const copywriter = new Copywriter();
      let result;
      
      switch (options.type) {
        case 'ai-tarot':
          result = copywriter.generateAiTarot(options.topic);
          break;
        case 'tarot-ai':
          result = copywriter.generateTarotAi(options.topic);
          break;
        case 'philosophy':
          result = copywriter.generatePhilosophy(options.topic);
          break;
        default:
          throw new Error(`不支持的类型：${options.type}`);
      }
      
      saveContent(result, options.output);
      
    } catch (error) {
      console.error(chalk.red(`❌ 错误：${error.message}`));
      process.exit(1);
    }
  });

// fortune 命令
program
  .command('fortune')
  .description('生成运势文案')
  .option('-t, --type <type>', '运势类型 (daily|weekly)', 'daily')
  .option('-d, --date <date>', '日期', new Date().toISOString().split('T')[0])
  .option('-o, --output <dir>', '输出目录', './output')
  .action((options) => {
    console.log(chalk.blue(`${brand.emojis.fortune} 开始生成运势...`));
    console.log(chalk.gray(`类型：${options.type}`));
    console.log(chalk.gray(`日期：${options.date}`));
    
    try {
      const fortuneGen = new FortuneGenerator();
      let result;
      
      if (options.type === 'weekly') {
        result = fortuneGen.generateWeekly(new Date(options.date));
      } else {
        result = fortuneGen.generateDaily(new Date(options.date));
      }
      
      saveContent(result, options.output);
      
    } catch (error) {
      console.error(chalk.red(`❌ 错误：${error.message}`));
      process.exit(1);
    }
  });

// batch 命令
program
  .command('batch')
  .description('批量生成文案')
  .requiredOption('-i, --input <file>', '输入文件（CSV/JSON）')
  .option('-o, --output <dir>', '输出目录', './output')
  .action((options) => {
    console.log(chalk.blue(`${brand.emojis.ai} 开始批量生成...`));
    console.log(chalk.gray(`输入：${options.input}`));
    console.log(chalk.gray(`输出：${options.output}`));
    
    // TODO: 实现批量生成
    console.log(chalk.yellow('⚠️  批量生成功能开发中...'));
  });

// 保存内容到文件
function saveContent(content, outputDir) {
  const output = path.resolve(outputDir);
  if (!fs.existsSync(output)) {
    fs.mkdirSync(output, { recursive: true });
  }
  
  const safeTopic = content.topic || content.date || Date.now();
  const timestamp = Date.now();
  const filename = `${timestamp}-${safeTopic}.md`;
  const filepath = path.join(output, filename);
  
  const markdown = generateMarkdown(content);
  fs.writeFileSync(filepath, markdown);
  
  console.log(chalk.green(`✅ 生成成功！`));
  console.log(chalk.gray(`文件：${filepath}`));
  console.log(chalk.gray(`标题：${content.title}`));
  console.log(chalk.gray(`标签：${content.tags.length}个`));
  console.log(chalk.gray(`配图提示词：封面×1 + 内页×${content.images.inner.length}`));
}

// 生成 Markdown
function generateMarkdown(content) {
  return `---
type: ${content.type}
topic: ${content.topic || content.date}
createdAt: ${new Date().toISOString()}
---

# ${content.title}

${content.content}

---

## 🎨 配图提示词

### 封面图
\`\`\`
${content.images.cover.prompt || content.images.cover}
\`\`\`
**用途**: ${content.images.cover.usage || '封面'}

${content.images.inner.map((img, i) => `### 内页 ${i + 1}
\`\`\`
${img.prompt}
\`\`\`
**用途**: ${img.usage}
`).join('\n')}

---

## 📝 元数据

- **栏目**: ${getColumnName(content.type)}
- **标签**: ${content.tags.join(', ')}
- **字数**: ${content.content.length} 字
- **生成时间**: ${new Date().toLocaleString('zh-CN')}

---

*由 AI 塔罗师文案生成器生成 | ${brand.slogan}*
`.trim();
}

function getColumnName(type) {
  const names = {
    'ai-tarot': 'AI 看塔罗 🔮',
    'tarot-ai': '塔罗看 AI 🤖',
    'philosophy': '科技哲思 💡',
    'fortune': 'AI 运势 📅',
    'fortune-daily': 'AI 日运 📅',
    'fortune-weekly': 'AI 周运 📅'
  };
  return names[type] || type;
}

program.parse();
