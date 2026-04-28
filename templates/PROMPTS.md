# ClawHunt Visual Prompt Library v1.0

> 每次给 ClawHunt 生成海报/banner/社媒图/插画时，**必须**把下面的 `STYLE_PREFIX` 拼在你的内容 prompt 前面，保证视觉语言统一。

---

## 📌 STYLE_PREFIX（所有视觉物料必加）

```
ClawHunt brand visual, cyberpunk 2030 AI bounty marketplace aesthetic,
deep midnight background #0D0D24 with subtle neon grid pattern,
primary neon cyan #00D4FF as main accent, secondary electric purple #7C3AED,
signature 135-degree gradient from cyan to purple on hero elements,
typography: Space Grotesk for display headlines, JetBrains Mono for numbers/tags/terminal text,
glowing edges on CTAs and active elements only, clean vector / flat-geometric visual style,
on-chain / autonomous / verified tone, robotic crab claw motif, clean professional tech branding,
high contrast, dark-first theme,
```

然后拼你的内容，比如：

```
{STYLE_PREFIX} + "Vertical invitation poster for referral program, headline 'INVITE FRIENDS TO CLAWHUNT', three steps, bottom CTA 'clawhunt.store', 9:16 composition"
```

---

## 🎨 场景化 Prompt 模板

### 1. 海报 / 社媒大图（竖版 9:16）
```
{STYLE_PREFIX}
Vertical poster 9:16 composition, bold headline in Space Grotesk,
structured 3-section layout: hero title / feature list with mono tags / bottom CTA button,
glowing cyan CTA on dark grid background, subtle scan lines, URL 'clawhunt.store' at bottom
```

### 2. 横版 Banner / 邮件头图（16:9 或 3:1）
```
{STYLE_PREFIX}
Horizontal banner, left-side headline + right-side abstract claw illustration,
gradient glow from left cyan fading to right purple,
minimal geometric shapes, terminal prompt accent '>' before headline
```

### 3. 功能 icon（新增）
```
{STYLE_PREFIX}
Single functional icon 128x128 on transparent dark background,
neon cyan line-art, 2px stroke weight, round joins, minimal geometric,
optional purple highlight accent, centered composition, clean vector,
subject: {your icon concept, e.g. "stack of crypto coins with target crosshair"}
```

### 4. Agent / Hunter 人物卡
```
{STYLE_PREFIX}
Character portrait card, cyberpunk AI agent persona,
chrome robotic figure with glowing cyan circuit veins,
holding a bounty token, 3/4 angle pose, studio lighting,
name and stats in JetBrains Mono below portrait,
1:1 square composition with rounded corners
```

### 5. 空状态 / 404 / Onboarding 插画
```
{STYLE_PREFIX}
Minimal illustration featuring ClawBot mascot (friendly robotic crab, neon cyan eyes,
chrome body with purple circuit patterns), holding a small glowing coin,
friendly but futuristic tone, generous negative space,
short caption in JetBrains Mono below
```

### 6. 数据 / Dashboard 截图 mock
```
{STYLE_PREFIX}
Mission-control dashboard interface mockup, dark panels with thin cyan dividers,
real-time metrics in JetBrains Mono tabular numbers,
line charts with cyan + purple gradients, status pills ('AGENT DEPLOYED', 'VERIFIED ✓'),
terminal-style log feed on right side, professional product screenshot style
```

---

## ❌ 负面提示（避免漂风格，任何 ClawHunt 物料都要带）

```
--no cartoonish, --no emoji heavy, --no bright yellow / orange main color,
--no pastel palette, --no vintage retro, --no hand-drawn sketch,
--no anime character, --no stock photo human faces,
--no rainbow gradient, --no glassmorphism frosted glass,
--no corporate clipart, --no depth-of-field blur background
```

---

## 📐 尺寸规格速查

| 用途 | 比例 | 推荐 px | 说明 |
|---|---|---|---|
| 社媒竖版海报 | 9:16 | 1080×1920 | X post / IG Story / TikTok |
| 社媒横版 | 16:9 | 1920×1080 | X banner / YouTube 缩略图 |
| 社媒方图 | 1:1 | 1080×1080 | IG feed / 头像 |
| Twitter/X header | 3:1 | 1500×500 | 账号顶部 |
| Email hero banner | 2:1 | 1200×600 | Mailchimp/Resend |
| Product Hunt thumbnail | 1:1 | 240×240 | 圆角方 |
| App icon | 1:1 | 1024×1024 | iOS / Android |
| Favicon | 1:1 | 512×512 | 再缩 |

---

## 🔧 生成命令（genimage 唯一入口）

```bash
# 海报 (9:16)
python3 ~/.openclaw/workspace/scripts/genimage.py \
  --prompt "$(cat style_prefix.txt) + 你的内容" \
  --aspect 9:16 \
  --out /path/to/out.png

# Banner (16:9)
python3 ~/.openclaw/workspace/scripts/genimage.py \
  --prompt "$(cat style_prefix.txt) + 你的内容" \
  --aspect 16:9 \
  --out /path/to/out.png
```

同仓库的 `templates/style_prefix.txt` 就是标准 prefix，直接 `cat` 拼进去即可。

---

## ✅ 出图前自检 clist

- [ ] 加了 STYLE_PREFIX
- [ ] 主色是 cyan / purple，不是橙红黄
- [ ] 深色底 `#0D0D24`（light 版专属场景除外）
- [ ] 字体看起来是 Space Grotesk + Mono 风
- [ ] 有 glow 的地方是 CTA/强调，不是全图糊一层
- [ ] Slogan / URL 露出（如适用）
- [ ] 没有 stock-photo 真人脸 / 卡通风 / 彩虹渐变
