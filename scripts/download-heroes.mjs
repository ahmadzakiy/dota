#!/usr/bin/env node
/**
 * Download all Dota 2 hero images from Steam CDN to public/heroes/
 *
 * Usage: node scripts/download-heroes.mjs
 */

import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { fileURLToPath } from "node:url"

const currentDir = dirname(fileURLToPath(import.meta.url))
const ROOT = join(currentDir, "..")
const HEROES_FILE = join(ROOT, "lib", "heroes.ts")
const OUTPUT_DIR = join(ROOT, "public", "heroes")
const CDN_BASE = "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes"

const BATCH_SIZE = 10

// Parse hero names from heroes.ts
function getHeroNames() {
  const content = readFileSync(HEROES_FILE, "utf-8")
  const names = []
  const regex = /name:\s*"npc_dota_hero_(\w+)"/g

  for (const match of content.matchAll(regex)) {
    names.push(match[1])
  }

  return names
}

async function downloadImage(name) {
  const url = `${CDN_BASE}/${name}.png`
  const outPath = join(OUTPUT_DIR, `${name}.png`)

  if (existsSync(outPath)) {
    return { name, status: "skipped" }
  }

  try {
    const res = await fetch(url)
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
    const buffer = Buffer.from(await res.arrayBuffer())
    writeFileSync(outPath, buffer)
    return { name, status: "ok" }
  } catch (err) {
    return { name, status: "error", error: err.message }
  }
}

async function main() {
  const heroNames = getHeroNames()
  console.log(`Found ${heroNames.length} heroes. Downloading images to ${OUTPUT_DIR}...\n`)

  mkdirSync(OUTPUT_DIR, { recursive: true })

  let ok = 0
  let skipped = 0
  let errors = 0

  for (let i = 0; i < heroNames.length; i += BATCH_SIZE) {
    const batch = heroNames.slice(i, i + BATCH_SIZE)
    const results = await Promise.all(batch.map(downloadImage))

    for (const r of results) {
      if (r.status === "ok") {
        ok++
        console.log(`  ✓ ${r.name}.png`)
      } else if (r.status === "skipped") {
        skipped++
        console.log(`  – ${r.name}.png (already exists)`)
      } else {
        errors++
        console.log(`  ✗ ${r.name}.png — ${r.error}`)
      }
    }
  }

  console.log(`\nDone! ${ok} downloaded, ${skipped} skipped, ${errors} failed.`)
  if (errors > 0) {
    process.exit(1)
  }
}

main()
