// Hero data mapping with avatar URLs from Steam CDN
export type HeroData = {
  name: string
  localized_name: string
  primary_attr: string
  attack_type: string
  avatar: string
}

export const HEROES: Record<string, HeroData> = {
  "1": {
    name: "antimage",
    localized_name: "Anti-Mage",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/antimage.png",
  },
  "2": {
    name: "axe",
    localized_name: "Axe",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/axe.png",
  },
  "3": {
    name: "bane",
    localized_name: "Bane",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/bane.png",
  },
  "4": {
    name: "bloodseeker",
    localized_name: "Bloodseeker",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/bloodseeker.png",
  },
  "5": {
    name: "crystal_maiden",
    localized_name: "Crystal Maiden",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/crystal_maiden.png",
  },
  "6": {
    name: "drow_ranger",
    localized_name: "Drow Ranger",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/drow_ranger.png",
  },
  "7": {
    name: "earthshaker",
    localized_name: "Earthshaker",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/earthshaker.png",
  },
  "8": {
    name: "juggernaut",
    localized_name: "Juggernaut",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/juggernaut.png",
  },
  "9": {
    name: "mirana",
    localized_name: "Mirana",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/mirana.png",
  },
  "10": {
    name: "morphling",
    localized_name: "Morphling",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/morphling.png",
  },
  "11": {
    name: "nevermore",
    localized_name: "Shadow Fiend",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/nevermore.png",
  },
  "12": {
    name: "phantom_lancer",
    localized_name: "Phantom Lancer",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/phantom_lancer.png",
  },
  "13": {
    name: "puck",
    localized_name: "Puck",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/puck.png",
  },
  "14": {
    name: "pudge",
    localized_name: "Pudge",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/pudge.png",
  },
  "15": {
    name: "razor",
    localized_name: "Razor",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/razor.png",
  },
  "16": {
    name: "sand_king",
    localized_name: "Sand King",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/sand_king.png",
  },
  "17": {
    name: "storm_spirit",
    localized_name: "Storm Spirit",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/storm_spirit.png",
  },
  "18": {
    name: "sven",
    localized_name: "Sven",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/sven.png",
  },
  "19": {
    name: "tiny",
    localized_name: "Tiny",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/tiny.png",
  },
  "20": {
    name: "vengefulspirit",
    localized_name: "Vengeful Spirit",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/vengefulspirit.png",
  },
  "21": {
    name: "windrunner",
    localized_name: "Windranger",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/windrunner.png",
  },
  "22": {
    name: "zeus",
    localized_name: "Zeus",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/zeus.png",
  },
  "23": {
    name: "kunkka",
    localized_name: "Kunkka",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/kunkka.png",
  },
  "25": {
    name: "lina",
    localized_name: "Lina",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/lina.png",
  },
  "26": {
    name: "lion",
    localized_name: "Lion",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/lion.png",
  },
  "27": {
    name: "shadow_shaman",
    localized_name: "Shadow Shaman",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/shadow_shaman.png",
  },
  "28": {
    name: "slardar",
    localized_name: "Slardar",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/slardar.png",
  },
  "29": {
    name: "tidehunter",
    localized_name: "Tidehunter",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/tidehunter.png",
  },
  "30": {
    name: "witch_doctor",
    localized_name: "Witch Doctor",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/witch_doctor.png",
  },
  "31": {
    name: "lich",
    localized_name: "Lich",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/lich.png",
  },
  "32": {
    name: "riki",
    localized_name: "Riki",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/riki.png",
  },
  "33": {
    name: "enigma",
    localized_name: "Enigma",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/enigma.png",
  },
  "34": {
    name: "tinker",
    localized_name: "Tinker",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/tinker.png",
  },
  "35": {
    name: "sniper",
    localized_name: "Sniper",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/sniper.png",
  },
  "36": {
    name: "necrolyte",
    localized_name: "Necrophos",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/necrolyte.png",
  },
  "37": {
    name: "warlock",
    localized_name: "Warlock",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/warlock.png",
  },
  "38": {
    name: "beastmaster",
    localized_name: "Beastmaster",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/beastmaster.png",
  },
  "39": {
    name: "queenofpain",
    localized_name: "Queen of Pain",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/queenofpain.png",
  },
  "40": {
    name: "venomancer",
    localized_name: "Venomancer",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/venomancer.png",
  },
  "41": {
    name: "faceless_void",
    localized_name: "Faceless Void",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/faceless_void.png",
  },
  "42": {
    name: "wraith_king",
    localized_name: "Wraith King",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/wraith_king.png",
  },
  "43": {
    name: "death_prophet",
    localized_name: "Death Prophet",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/death_prophet.png",
  },
  "44": {
    name: "phantom_assassin",
    localized_name: "Phantom Assassin",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/phantom_assassin.png",
  },
  "45": {
    name: "pugna",
    localized_name: "Pugna",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/pugna.png",
  },
  "46": {
    name: "templar_assassin",
    localized_name: "Templar Assassin",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/templar_assassin.png",
  },
  "47": {
    name: "viper",
    localized_name: "Viper",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/viper.png",
  },
  "48": {
    name: "luna",
    localized_name: "Luna",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/luna.png",
  },
  "49": {
    name: "dragon_knight",
    localized_name: "Dragon Knight",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/dragon_knight.png",
  },
  "50": {
    name: "dazzle",
    localized_name: "Dazzle",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/dazzle.png",
  },
  "51": {
    name: "rattletrap",
    localized_name: "Clockwerk",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/rattletrap.png",
  },
  "52": {
    name: "leshrac",
    localized_name: "Leshrac",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/leshrac.png",
  },
  "53": {
    name: "furion",
    localized_name: "Nature's Prophet",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/furion.png",
  },
  "54": {
    name: "life_stealer",
    localized_name: "Lifestealer",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/life_stealer.png",
  },
  "55": {
    name: "dark_seer",
    localized_name: "Dark Seer",
    primary_attr: "int",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/dark_seer.png",
  },
  "56": {
    name: "clinkz",
    localized_name: "Clinkz",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/clinkz.png",
  },
  "57": {
    name: "omniknight",
    localized_name: "Omniknight",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/omniknight.png",
  },
  "58": {
    name: "enchantress",
    localized_name: "Enchantress",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/enchantress.png",
  },
  "59": {
    name: "huskar",
    localized_name: "Huskar",
    primary_attr: "str",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/huskar.png",
  },
  "60": {
    name: "night_stalker",
    localized_name: "Night Stalker",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/night_stalker.png",
  },
  "61": {
    name: "broodmother",
    localized_name: "Broodmother",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/broodmother.png",
  },
  "62": {
    name: "bounty_hunter",
    localized_name: "Bounty Hunter",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/bounty_hunter.png",
  },
  "63": {
    name: "weaver",
    localized_name: "Weaver",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/weaver.png",
  },
  "64": {
    name: "jakiro",
    localized_name: "Jakiro",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/jakiro.png",
  },
  "65": {
    name: "batrider",
    localized_name: "Batrider",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/batrider.png",
  },
  "66": {
    name: "chen",
    localized_name: "Chen",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/chen.png",
  },
  "67": {
    name: "spectre",
    localized_name: "Spectre",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/spectre.png",
  },
  "68": {
    name: "ancient_apparition",
    localized_name: "Ancient Apparition",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar:
      "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/ancient_apparition.png",
  },
  "69": {
    name: "doom_bringer",
    localized_name: "Doom",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/doom_bringer.png",
  },
  "70": {
    name: "ursa",
    localized_name: "Ursa",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/ursa.png",
  },
  "71": {
    name: "spirit_breaker",
    localized_name: "Spirit Breaker",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/spirit_breaker.png",
  },
  "72": {
    name: "gyrocopter",
    localized_name: "Gyrocopter",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/gyrocopter.png",
  },
  "73": {
    name: "alchemist",
    localized_name: "Alchemist",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/alchemist.png",
  },
  "74": {
    name: "invoker",
    localized_name: "Invoker",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/invoker.png",
  },
  "75": {
    name: "silencer",
    localized_name: "Silencer",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/silencer.png",
  },
  "76": {
    name: "obsidian_destroyer",
    localized_name: "Outworld Destroyer",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar:
      "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/obsidian_destroyer.png",
  },
  "77": {
    name: "lycan",
    localized_name: "Lycan",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/lycan.png",
  },
  "78": {
    name: "brewmaster",
    localized_name: "Brewmaster",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/brewmaster.png",
  },
  "79": {
    name: "shadow_demon",
    localized_name: "Shadow Demon",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/shadow_demon.png",
  },
  "80": {
    name: "lone_druid",
    localized_name: "Lone Druid",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/lone_druid.png",
  },
  "81": {
    name: "chaos_knight",
    localized_name: "Chaos Knight",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/chaos_knight.png",
  },
  "82": {
    name: "meepo",
    localized_name: "Meepo",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/meepo.png",
  },
  "83": {
    name: "treant",
    localized_name: "Treant Protector",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/treant.png",
  },
  "84": {
    name: "ogre_magi",
    localized_name: "Ogre Magi",
    primary_attr: "int",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/ogre_magi.png",
  },
  "85": {
    name: "undying",
    localized_name: "Undying",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/undying.png",
  },
  "86": {
    name: "rubick",
    localized_name: "Rubick",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/rubick.png",
  },
  "87": {
    name: "disruptor",
    localized_name: "Disruptor",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/disruptor.png",
  },
  "88": {
    name: "nyx_assassin",
    localized_name: "Nyx Assassin",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/nyx_assassin.png",
  },
  "89": {
    name: "naga_siren",
    localized_name: "Naga Siren",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/naga_siren.png",
  },
  "90": {
    name: "keeper_of_the_light",
    localized_name: "Keeper of the Light",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar:
      "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/keeper_of_the_light.png",
  },
  "91": {
    name: "wisp",
    localized_name: "Io",
    primary_attr: "str",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/wisp.png",
  },
  "92": {
    name: "visage",
    localized_name: "Visage",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/visage.png",
  },
  "93": {
    name: "slark",
    localized_name: "Slark",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/slark.png",
  },
  "94": {
    name: "medusa",
    localized_name: "Medusa",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/medusa.png",
  },
  "95": {
    name: "troll_warlord",
    localized_name: "Troll Warlord",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/troll_warlord.png",
  },
  "96": {
    name: "centaur",
    localized_name: "Centaur Warrunner",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/centaur.png",
  },
  "97": {
    name: "magnataur",
    localized_name: "Magnus",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/magnataur.png",
  },
  "98": {
    name: "shredder",
    localized_name: "Timbersaw",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/shredder.png",
  },
  "99": {
    name: "bristleback",
    localized_name: "Bristleback",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/bristleback.png",
  },
  "100": {
    name: "tusk",
    localized_name: "Tusk",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/tusk.png",
  },
  "101": {
    name: "skywrath_mage",
    localized_name: "Skywrath Mage",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/skywrath_mage.png",
  },
  "102": {
    name: "abaddon",
    localized_name: "Abaddon",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/abaddon.png",
  },
  "103": {
    name: "elder_titan",
    localized_name: "Elder Titan",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/elder_titan.png",
  },
  "104": {
    name: "legion_commander",
    localized_name: "Legion Commander",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/legion_commander.png",
  },
  "105": {
    name: "techies",
    localized_name: "Techies",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/techies.png",
  },
  "106": {
    name: "ember_spirit",
    localized_name: "Ember Spirit",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/ember_spirit.png",
  },
  "107": {
    name: "earth_spirit",
    localized_name: "Earth Spirit",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/earth_spirit.png",
  },
  "108": {
    name: "underlord",
    localized_name: "Underlord",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/underlord.png",
  },
  "109": {
    name: "terrorblade",
    localized_name: "Terrorblade",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/terrorblade.png",
  },
  "110": {
    name: "phoenix",
    localized_name: "Phoenix",
    primary_attr: "str",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/phoenix.png",
  },
  "111": {
    name: "oracle",
    localized_name: "Oracle",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/oracle.png",
  },
  "112": {
    name: "winter_wyvern",
    localized_name: "Winter Wyvern",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/winter_wyvern.png",
  },
  "113": {
    name: "arc_warden",
    localized_name: "Arc Warden",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/arc_warden.png",
  },
  "114": {
    name: "monkey_king",
    localized_name: "Monkey King",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/monkey_king.png",
  },
  "119": {
    name: "dark_willow",
    localized_name: "Dark Willow",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/dark_willow.png",
  },
  "120": {
    name: "pangolier",
    localized_name: "Pangolier",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/pangolier.png",
  },
  "121": {
    name: "grimstroke",
    localized_name: "Grimstroke",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/grimstroke.png",
  },
  "123": {
    name: "hoodwink",
    localized_name: "Hoodwink",
    primary_attr: "agi",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/hoodwink.png",
  },
  "126": {
    name: "void_spirit",
    localized_name: "Void Spirit",
    primary_attr: "int",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/void_spirit.png",
  },
  "128": {
    name: "snapfire",
    localized_name: "Snapfire",
    primary_attr: "str",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/snapfire.png",
  },
  "129": {
    name: "mars",
    localized_name: "Mars",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/mars.png",
  },
  "131": {
    name: "dawnbreaker",
    localized_name: "Dawnbreaker",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/dawnbreaker.png",
  },
  "135": {
    name: "marci",
    localized_name: "Marci",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/marci.png",
  },
  "136": {
    name: "primal_beast",
    localized_name: "Primal Beast",
    primary_attr: "str",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/primal_beast.png",
  },
  "137": {
    name: "muerta",
    localized_name: "Muerta",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/muerta.png",
  },
  "138": {
    name: "ringmaster",
    localized_name: "Ringmaster",
    primary_attr: "int",
    attack_type: "Ranged",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/ringmaster.png",
  },
  "145": {
    name: "kez",
    localized_name: "Kez",
    primary_attr: "agi",
    attack_type: "Melee",
    avatar: "https://cdn.steamstatic.com/apps/dota2/images/dota_react/heroes/kez.png",
  },
}

// Utility functions for working with heroes
export function getHeroName(heroId: string | number): string {
  const hero = HEROES[heroId.toString()]
  return hero ? hero.localized_name : `Hero ${heroId}`
}

export function getHeroAvatar(heroId: string | number): string {
  const hero = HEROES[heroId.toString()]
  return hero ? hero.avatar : ""
}

// Helper function to get hero attribute color
export function getHeroAttributeColor(heroId: string | number): string {
  const hero = HEROES[heroId.toString()]
  if (!hero) {
    return "text-gray-400"
  }

  switch (hero.primary_attr) {
    case "str":
      return "text-red-400"
    case "agi":
      return "text-green-400"
    case "int":
      return "text-blue-400"
    default:
      return "text-gray-400"
  }
}

// Helper function to get hero attribute icon
export function getHeroAttributeIcon(heroId: string | number): string {
  const hero = HEROES[heroId.toString()]
  if (!hero) {
    return "⚡"
  }

  switch (hero.primary_attr) {
    case "str":
      return "💪"
    case "agi":
      return "🏃"
    case "int":
      return "🧠"
    default:
      return "⚡"
  }
}
