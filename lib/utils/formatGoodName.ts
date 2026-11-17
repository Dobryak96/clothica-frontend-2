export const formatGoodName = (name: string): string =>
  `${name.replace(/['’ʼ]/g, '').replace(/\s+/g, ' ').trim()} Clothica`;
