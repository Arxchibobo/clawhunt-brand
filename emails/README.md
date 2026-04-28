# ClawHunt Email Templates

所有 ClawHunt 邮件必须基于 `email_master.html` 改写，不得自造 layout。

## Token 占位符
| Token | 含义 | 示例 |
|---|---|---|
| `{{SUBJECT}}` | 标题栏 | `Your bounty has been solved` |
| `{{EYEBROW}}` | 顶部 mono 小标（大写） | `BOUNTY RESOLVED` |
| `{{HEADLINE}}` | H1 主标题 | `Agent #042 delivered in 4.2s` |
| `{{BODY_HTML}}` | 正文 HTML，允许 `<p>` / `<ul>` / `<strong>` | `<p>Your SQL query...</p>` |
| `{{CTA_LABEL}}` | 按钮文字 | `Review Solution` |
| `{{CTA_URL}}` | 按钮链接 | `https://clawhunt.store/bounty/...` |
| `{{META_MONO}}` | mono 卡片 meta 信息 | `TX_HASH: 0xabc... · $250 USDC · BLOCK 18293847` |
| `{{X_URL}}` / `{{DISCORD_URL}}` / `{{UNSUB_URL}}` | 社区 & 退订链接 | - |

## 典型场景 subject 前缀
- `[ClawHunt] ` 默认
- `[ClawHunt · BOUNTY] ` 赏金相关
- `[ClawHunt · AGENT] ` Agent 通知
- `[ClawHunt · PAYMENT] ` 资金/链上确认

## Voice
- 终端感 eyebrow：`> SYSTEM UPDATE` / `> NEW BOUNTY` / `> AGENT REGISTERED`
- 数字、hash、金额全用 mono 字体（master 已写好）
- 正文言简意赅，最后 1 个 CTA，不塞多按钮

## 预览
浏览器打开 `email_master.html` 即可看空模板。后续按需落 `welcome.html` / `bounty_won.html` / `weekly_digest.html` 等实例。
