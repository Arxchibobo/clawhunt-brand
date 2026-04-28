# ClawHunt Brand & Design System

> 🔒 **Single source of truth** for all ClawHunt visual output — posters, emails, banners, UI, social, partner decks.
>
> Locked **v1.0.0** · 2026-04-28

---

## 🎯 什么时候用这个仓库？

任何时候要给 ClawHunt 出 **看得见的东西**：
- 发邮件 → 用 `emails/email_master.html`
- 出海报 / 社媒图 → 按 `templates/PROMPTS.md` 的 STYLE_PREFIX 生图
- 写网页 / 小程序 / iOS UI → 导入 `tokens/tokens.css` 或 `tokens/tailwind.preset.js`
- 做新 icon → 按 `BRAND.md` 的 icon 规范画
- 合作方/媒体要 brand kit → 发 `logo/` + `BRAND.md` + `guidelines/brand_guidelines.png`

**不遵循这个仓库的视觉产出 = 不合格。**

---

## 📁 目录结构

```
clawhunt-brand/
├── BRAND.md              # 设计规范总则（配色/字体/logo用法/voice）
├── tokens/
│   ├── tokens.json       # 机器可读 design tokens（SSOT）
│   ├── tokens.css        # :root CSS 变量 + 基础 class
│   └── tailwind.preset.js# Tailwind 预设
├── logo/
│   ├── logo_primary_dark.png   # 主 logo（暗色）
│   ├── logo_primary_light.png  # 主 logo（浅色）
│   └── icon_app.png            # App / favicon / 社媒头像
├── icons/
│   └── icon_system_8.png       # 8 枚产品功能 icon 合图
├── mascot/
│   └── mascot_clawbot.png      # 吉祥物 ClawBot
├── guidelines/
│   └── brand_guidelines.png    # 一图看全规范海报
├── emails/
│   ├── email_master.html       # 邮件母版
│   └── README.md               # 邮件 token 文档
├── templates/
│   ├── PROMPTS.md              # 生图 prompt 库（最关键）
│   └── style_prefix.txt        # 可 cat 拼的 style prefix
├── posters/                    # 已产出的成品海报归档
├── scripts/
│   └── lint.sh                 # 自检脚本
└── README.md
```

---

## 🚀 快速上手

### 出一张海报（我/CC/任何 Agent 的标准流程）

```bash
cd ~/.openclaw/workspace/projects/clawhunt-brand
STYLE=$(cat templates/style_prefix.txt)
python3 ~/.openclaw/workspace/scripts/genimage.py \
  --prompt "${STYLE} Vertical poster, headline 'YOUR HEADLINE', bullets ..., CTA 'clawhunt.store', 9:16" \
  --aspect 9:16 \
  --out posters/your_poster_2026-MM-DD.png
```

生成完 commit 进 `posters/` 归档，方便后续复用。

### 写网页

```html
<link rel="stylesheet" href="./tokens/tokens.css">
<h1 class="cp-hero-title">Deploy an agent. Collect the bounty.</h1>
<button class="cp-btn-primary">Launch Console</button>
<span class="cp-tag">BOUNTY ACTIVE</span>
```

### 发邮件

1. 复制 `emails/email_master.html`
2. 替换 `{{TOKENS}}`（见 `emails/README.md`）
3. 用 Resend / Mailchimp / 你的邮件服务发

---

## 🎨 核心 token 速查

```
Primary    Cyan   #00D4FF   ← 绝对主色
Accent     Purple #7C3AED   ← 渐变另一端
Bg Dark    Deep   #0D0D24   ← 默认背景
Success    Green  #00FF88
Gradient   linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)

Display    Space Grotesk
Body       Inter
Mono       JetBrains Mono   ← 数字 / 代码 / 状态 tag

Voice      AUTONOMOUS · VERIFIED · ON-CHAIN
```

---

## 🔄 变更流程

1. 任何 token/logo/icon 改动 → **先改 `tokens/tokens.json` + `BRAND.md`**
2. `tokens.css` / `tailwind.preset.js` 同步更新（数值对齐）
3. PNG 资产重新出图并替换
4. bump `tokens.json.brand.version`（SemVer）
5. `git commit` 附带 CHANGELOG 条目
6. 通知所有用到品牌资产的项目（clawhunt.store 前端 / iOS / 邮件 / 海报 cron）拉最新版

## ⛔ 禁止

- 改 logo 颜色、加特效、旋转
- 发明新的主色 / 新招牌渐变
- 用 stock-photo 真人脸、emoji、卡通贴纸替代 mascot
- 跳过 STYLE_PREFIX 直接裸 prompt 生图

---

## 📜 License

Internal use only — ClawHunt / bobooo / 大波比 🐕
