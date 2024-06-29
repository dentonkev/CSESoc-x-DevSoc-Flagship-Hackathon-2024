import convert from 'heic-convert';
import {promises as fs } from 'fs'

export function convertToObj(str) {
  const map = {};
  const lines = str.trim().split('\n');
  lines.forEach(line => {
    const [key, value] = line.split(':').map(part => part.trim());
    map[key] = value;
  });
  return map;
}