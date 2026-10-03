const assetPathPrefix = "/assets";

export const images = {
  world: `${assetPathPrefix}/e74d9.svg`,
  heroSection: `${assetPathPrefix}/c8f23.png`,
  group61: `${assetPathPrefix}/727fa.png`,
  object: `${assetPathPrefix}/e38ba.png`,
  att: `${assetPathPrefix}/1a426.png`,
  atlassian: `${assetPathPrefix}/523c2.png`,
  forbes: `${assetPathPrefix}/d564e.png`,
  disney: `${assetPathPrefix}/f3659.png`,
  amd: `${assetPathPrefix}/dba3d.png`,
  ebay: `${assetPathPrefix}/a1597.png`,
  facebook: `${assetPathPrefix}/3baf9.png`,
  rectangle35: `${assetPathPrefix}/3d005.png`,
  image11: `${assetPathPrefix}/62d24.png`,
  avatar: `${assetPathPrefix}/fb09c.png`,
  avatar1: `${assetPathPrefix}/da69f.png`,
  avatar2: `${assetPathPrefix}/04309.png`,
  avatar3: `${assetPathPrefix}/58f83.png`,
  subtract: `${assetPathPrefix}/1722f.png`,
  image12: `${assetPathPrefix}/8b4c4.png`,
  group101: `${assetPathPrefix}/de7a1.png`,
  rectangle45: `${assetPathPrefix}/d088b.png`,
  group14: `${assetPathPrefix}/a6086.svg`,
  group1: `${assetPathPrefix}/08f43.svg`,
  group2: `${assetPathPrefix}/ceca0.svg`,
  starFilled: `${assetPathPrefix}/25b14.svg`,
  group15: `${assetPathPrefix}/1770c.svg`,
  group16: `${assetPathPrefix}/83acc.svg`,
  group3: `${assetPathPrefix}/f9cec.svg`,
  group4: `${assetPathPrefix}/8763f.svg`,
  group9: `${assetPathPrefix}/26eb5.svg`,
  icon: `${assetPathPrefix}/image12.png`,
  icon1: `${assetPathPrefix}/84f75.svg`,
  icon2: `${assetPathPrefix}/4b190.svg`,
  linkedin: `${assetPathPrefix}/b184c.svg`,
} as const;

export const navLinks = [
  { label: "services", href: "/services" },
  { label: "about us", href: "/about" },
  { label: "Our Projects", href: "/work" },
  { label: "Testimonials", href: "/testimonials" },
] as const;

export const brandLogos = [
  { src: images.att, name: "AT&T" },
  { src: images.atlassian, name: "Atlassian" },
  { src: images.forbes, name: "Forbes" },
  { src: images.disney, name: "Disney" },
  { src: images.amd, name: "AMD" },
  { src: images.ebay, name: "Ebay" },
  { src: images.facebook, name: "Facebook" },
  { src: images.att, name: "AT&T" },
] as const;

export const socialLinks = [
  { name: "Facebook" },
  { name: "Instagram" },
  { name: "LinkedIn" },
  { name: "WhatsApp" },
] as const;
