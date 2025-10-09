#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const ROOT = process.cwd();
const BLOG_DIR = path.join(ROOT, 'data', 'blog');
const OUTPUT = path.join(ROOT, 'app', 'tag-data.json');

function ensureDir(p) {
  if (!fs.existsSync(p)) {
    fs.mkdirSync(p, { recursive: true });
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  return entries.flatMap((e) => {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) return walk(full);
    return e.isFile() && /\.(md|mdx)$/i.test(e.name) ? [full] : [];
  });
}

function main() {
  if (!fs.existsSync(BLOG_DIR)) {
    console.error(`Missing blog dir: ${BLOG_DIR}`);
    process.exit(1);
  }

  const files = walk(BLOG_DIR);
  const tagsMap = new Map();

  for (const file of files) {
    const src = fs.readFileSync(file, 'utf8');
    const { data } = matter(src);
    const tags = Array.isArray(data?.tags) ? data.tags.filter(Boolean) : [];
    if (tags.length === 0) continue;

    const slug = path
      .relative(BLOG_DIR, file)
      .replace(/\\/g, '/')
      .replace(/\.(md|mdx)$/i, '');

    const title = typeof data.title === 'string' ? data.title : slug;

    for (const tag of tags) {
      const key = String(tag);
      const rec = tagsMap.get(key) || { count: 0, posts: [] };
      rec.count += 1;
      rec.posts.push({ slug, title });
      tagsMap.set(key, rec);
    }
  }

  const sortedEntries = Array.from(tagsMap.entries()).sort(([a], [b]) =>
    a.localeCompare(b, 'en')
  );

  // 输出为 { tag: count } 扁平结构，匹配 /app/tag-data.json
  const flat = Object.fromEntries(
    sortedEntries.map(([tag, rec]) => [tag, rec.count])
  );

  ensureDir(path.dirname(OUTPUT));
  fs.writeFileSync(OUTPUT, JSON.stringify(flat, null, 2), 'utf8');
  console.log(
    `Wrote ${OUTPUT} with ${Object.keys(flat).length} tags from ${files.length} posts`
  );
}

main();
