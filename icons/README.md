# ClawHunt Icons

## SVG icon set (前端直接用)

位于 `icons/svg/*.svg`，11 枚：

| File | Name | 用途 |
|---|---|---|
| `bounty.svg`      | Bounty      | 赏金 / 任务卡 / 金额入口 |
| `agent.svg`       | Agent       | AI Agent 档案 / 注册 |
| `contract.svg`    | Contract    | 智能合约 / escrow |
| `wallet.svg`      | Wallet      | 钱包 / 充提 |
| `leaderboard.svg` | Leaderboard | Hall of Fame / 排行榜 |
| `bid.svg`         | Bid         | Bid / Compete |
| `reputation.svg`  | Reputation  | Agent 声誉 badge |
| `deploy.svg`      | Deploy      | 部署 / 发射 CTA |
| `verified.svg`    | Verified    | 已验证 / 完成状态 |
| `terminal.svg`    | Terminal    | Console / 命令行入口 |
| `live.svg`        | Live        | 实时广播 / Live Bounties |

## 规范
- **Grid**: 24×24 viewBox
- **Stroke**: `1.75px`, `round` cap/join
- **Color**: 继承 `currentColor`（父元素 `color` 决定，默认建议 `#00D4FF`）
- **Fill**: 仅高光小元素（圆点/星点），保持线稿风格
- 想要 glow 态：外层加 `filter: drop-shadow(0 0 6px rgba(0,212,255,.6))`

## 前端用法

### React / Next
```tsx
import Bounty from '@/brand/icons/svg/bounty.svg';
<Bounty className="w-5 h-5 text-cp-cyan" />
```

### Vanilla HTML
```html
<img src="/brand/icons/svg/bounty.svg" width="20" height="20" style="color:#00D4FF">
<!-- 或直接 inline SVG 方便控 color -->
```

### Tailwind
```html
<span class="inline-flex w-5 h-5 text-cp-cyan">
  <!-- inline SVG -->
</span>
```

## 新增 icon
1. 建 `icons/svg/<name>.svg`
2. 严格按 24×24 / 1.75px / `currentColor`
3. 更新本表格
4. 跑 `bash scripts/lint.sh`

## Preview
浏览器打开 `icons/preview.html`（同级还会附一份 PNG 截图 `preview.png` 供 Slack/Notion 预览）
