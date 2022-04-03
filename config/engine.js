const path = require('path')
const root = process.cwd()

module.exports = {
  network: 'testnet',
  default_weight: 100,
  default_blend: 'source-over',
  default_opacity: 1,
  preview: {
    width: 300,
    height: 300
  },
  image: {
    width: 2000,
    height: 2000
  },
  start_edition: 100,
  cid_version: 0,
  smoothing: true,
  shuffle_layers: true,
  paths: {
    root,
    config: path.resolve(root, 'config'),
    build: path.resolve(root, 'build'),
    layers: path.resolve(root, 'layers'),
    cache: path.resolve(root, '.artengine')
  },
  metadata_template: {
    name: 'Gratitude Gang - {SERIES} #{EDITION}',
    description: 'A collection of 2,222 unique Non-Fungible SUNFLOWERS living in the metaverse.',
    preview: 'https://ipfs.io/ipfs/{LORES_CID}',
    image: 'https://ipfs.io/ipfs/{HIRES_CID}',
    external_url: 'https://www.gratitudegang.io/ph/collection?id={EDITION}'
  },
  layers: [
    {
      config: "layers",
      series: "Common",
      limit: 6
    },
    {
      config: "layers/green",
      series: "Green",
      limit: 1
    },
    {
      config: "layers/orange",
      series: "Orange",
      limit: 1
    }
  ]
}