#!/usr/bin/env node
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = dirname(dirname(fileURLToPath(import.meta.url)));
const args = new Map();
for (let i = 2; i < process.argv.length; i += 1) {
  const arg = process.argv[i];
  if (arg.startsWith('--')) {
    const key = arg.slice(2);
    const next = process.argv[i + 1];
    if (next && !next.startsWith('--')) {
      args.set(key, next);
      i += 1;
    } else {
      args.set(key, 'true');
    }
  }
}

const tokenPath = args.get('tokens') ?? join(root, 'tokens', 'tokens.json');
const jsonOut = args.get('json') ?? join(root, 'reports', 'contrast-report.json');
const mdOut = args.get('md') ?? join(root, 'reports', 'contrast-report.md');
const tokens = JSON.parse(readFileSync(tokenPath, 'utf-8'));

const pairs = [
  role('dark.body', 'color.neutral_light.white.hex', 'color.primary.deep_space.hex', 'AA normal'),
  role('dark.secondary', 'color.neutral_light.slate_20.hex', 'color.primary.mid_navy.hex', 'AA normal'),
  role('dark.brand-cyan', 'color.primary.cyan.hex', 'color.primary.deep_space.hex', 'AA normal'),
  role('dark.success', 'color.functional.success.hex', 'color.primary.deep_space.hex', 'AA normal'),
  role('dark.warning', 'color.functional.warning.hex', 'color.primary.deep_space.hex', 'AA normal'),
  role('dark.danger', 'color.functional.danger.hex', 'color.primary.deep_space.hex', 'AA normal'),
  role('dark.info', 'color.functional.info.hex', 'color.primary.deep_space.hex', 'AA normal'),
  role('light.body', 'color.neutral_light.ink.hex', 'color.neutral_light.white.hex', 'AA normal'),
  role('light.secondary', 'color.neutral_light.slate_60.hex', 'color.neutral_light.white.hex', 'AA normal'),
  role('button.primary-text', 'color.neutral_light.white.hex', 'color.primary.purple.hex', 'AA normal'),
];

const results = pairs.map(pair => {
  const foreground = getToken(tokens, pair.foregroundPath);
  const background = getToken(tokens, pair.backgroundPath);
  const ratio = contrastRatio(foreground, background);
  const threshold = pair.standard === 'AA large' ? 3 : 4.5;
  return {
    role: pair.name,
    foreground,
    background,
    ratio: Number(ratio.toFixed(2)),
    threshold,
    standard: pair.standard,
    status: ratio >= threshold ? 'pass' : 'fail',
  };
});

const report = {
  source: 'ClawHunt brand tokens',
  token_file: tokenPath.endsWith('tokens.json') ? 'tokens/tokens.json' : 'fixture',
  generated_by: 'scripts/validate-contrast.mjs',
  checked_pairs: results.length,
  failures: results.filter(result => result.status === 'fail').length,
  results,
};

writeReport(jsonOut, JSON.stringify(report, null, 2) + '\n');
writeReport(mdOut, formatMarkdown(report));

console.log(`Contrast validator: ${report.checked_pairs} pairs checked, ${report.failures} failures`);
console.log(`JSON report: ${publicPath(jsonOut)}`);
console.log(`Markdown report: ${publicPath(mdOut)}`);

if (report.failures > 0) {
  process.exitCode = 1;
}

function role(name, foregroundPath, backgroundPath, standard) {
  return { name, foregroundPath, backgroundPath, standard };
}

function getToken(source, path) {
  const value = path.split('.').reduce((current, key) => current?.[key], source);
  if (typeof value !== 'string' || !/^#[0-9a-fA-F]{6}$/.test(value)) {
    throw new Error(`Missing hex token: ${path}`);
  }
  return value.toUpperCase();
}

function contrastRatio(foreground, background) {
  const fg = relativeLuminance(hexToRgb(foreground));
  const bg = relativeLuminance(hexToRgb(background));
  const lighter = Math.max(fg, bg);
  const darker = Math.min(fg, bg);
  return (lighter + 0.05) / (darker + 0.05);
}

function hexToRgb(hex) {
  const raw = hex.replace('#', '');
  return {
    r: Number.parseInt(raw.slice(0, 2), 16),
    g: Number.parseInt(raw.slice(2, 4), 16),
    b: Number.parseInt(raw.slice(4, 6), 16),
  };
}

function relativeLuminance({ r, g, b }) {
  return [r, g, b]
    .map(channel => {
      const srgb = channel / 255;
      return srgb <= 0.03928 ? srgb / 12.92 : ((srgb + 0.055) / 1.055) ** 2.4;
    })
    .reduce((sum, value, index) => sum + value * [0.2126, 0.7152, 0.0722][index], 0);
}

function writeReport(path, content) {
  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, content);
}

function formatMarkdown(report) {
  const lines = [
    '# ClawHunt Brand Contrast Report',
    '',
    `- Source: ${report.token_file}`,
    `- Checked pairs: ${report.checked_pairs}`,
    `- Failures: ${report.failures}`,
    '',
    '| Role | Foreground | Background | Ratio | Threshold | Status |',
    '|---|---:|---:|---:|---:|---|',
  ];
  for (const result of report.results) {
    lines.push(`| ${result.role} | ${result.foreground} | ${result.background} | ${result.ratio} | ${result.threshold} | ${result.status.toUpperCase()} |`);
  }
  lines.push('');
  return lines.join('\n');
}

function publicPath(path) {
  return path.replace(root, '.').replaceAll('\\', '/');
}
