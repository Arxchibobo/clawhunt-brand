/** ClawHunt Tailwind preset — v1.0.0
 *  usage: in tailwind.config.js → presets: [require('./path/to/clawhunt-brand/tokens/tailwind.preset.js')]
 */
module.exports = {
  theme: {
    extend: {
      colors: {
        cp: {
          cyan:   '#00D4FF',
          purple: '#7C3AED',
          deep:   '#0D0D24',
          navy:   '#0A1628',
          success:'#00FF88',
          warning:'#FFB627',
          danger: '#FF4757',
          info:   '#60A5FA',
          ink:    '#0F172A',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        body:    ['Inter', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      backgroundImage: {
        'cp-gradient': 'linear-gradient(135deg, #00D4FF 0%, #7C3AED 100%)',
      },
      boxShadow: {
        'cp-glow-cyan':   '0 0 20px rgba(0,212,255,0.4)',
        'cp-glow-purple': '0 0 20px rgba(124,58,237,0.4)',
        'cp-card':        '0 8px 24px rgba(0,0,0,0.35)',
      },
      borderRadius: {
        'cp-sm': '6px',
        'cp-md': '12px',
        'cp-lg': '20px',
      },
    },
  },
}
