const fs = require('fs')
const path = require('path')
const { paths, network, start_edition } = require('../config/engine')
const layers = require('../config/layers.json')
const datalist = require(path.join(paths.build, network, 'metadata.json'))

const layerIndex = {}
//initialize occurrances
layers[network].forEach(layer => {
  layerIndex[layer.name] = layer.order
  for (const attribute in layer.attributes) {
    layer.attributes[attribute].occurrence = 0
  }
})

// fill up rarity chart with occurrences from metadata
datalist.forEach(metadata => {
  metadata.attributes.forEach(attribute => {
    const index = layerIndex[attribute.trait_type]
    layers[network][index - 1].attributes[attribute.value].occurrence++
  })
})

//calculate chances
layers[network].forEach(layer => {
  for (const attribute in layer.attributes) {
    const occurrence = layer.attributes[attribute].occurrence
    layer.attributes[attribute].chance = Math.floor((occurrence / datalist.length) * 10000) / 10000
  }
})

function makeTable(head, body) {
  const tableTemplate = `<table border="1" cellpadding="5" cellspacing="0">
    <thead>
      {HEAD}
    </thead>
    <tbody>
      {BODY}
    </tbody>
  </table>`
    
  body = body.map(row => `<tr>${row.join('')}</tr>`)
  
  return tableTemplate
    .replace('{HEAD}', `<tr>${head.join('')}</tr>`)
    .replace('{BODY}', body.join("\n    "))
}

function makeRarityTable(layer) {
  const head = [
    '<th align="left" nowrap>Trait</th>', 
    '<th align="right" nowrap>Occurrence</th>', 
    '<th align="right" nowrap>Chance</th>'
  ]
  const body = []

  for (const attribute in layer.attributes) {
    if (!layer.attributes[attribute].visible) continue
    const occurrence = layer.attributes[attribute].occurrence
    const chance = layer.attributes[attribute].chance
    body.push([ attribute, occurrence, (chance * 100).toFixed(2)])
  }

  body.sort((a, b) => a[1] - b[1])
  return makeTable(head, body.map(row => [
    `<td width="220" nowrap>${row[0]}</td>`, 
    `<td nowrap align="right">${row[1]}</td>`, 
    `<td nowrap align="right">${row[2]}%</td>`
  ]))
}

const outputBuffer = []
outputBuffer.push('<div style="display:flex">')
outputBuffer.push('<div style="margin-right: 20px">')

layers[network].forEach(layer => {
  if (!layer.visible) return
  outputBuffer.push(`<h3>Feature: ${layer.name}</h3>`)
  outputBuffer.push(makeRarityTable(layer))
})

function makeNFTTable() {
  const head = [
    '<th align="right">Rarity</th>', 
    '<th align="right">Index</th>', 
    '<th>Image</th>',
    '<th align="right">Score</th>'
  ]

  layers[network].forEach(layer => {
    if (!layer.visible) return
    head.push(`<th>${layer.name}</th>`)
  })

  const body = []

  datalist.forEach((metadata, i) => {
    const row = { id: i + start_edition , traits: [], rating: 0 }
    metadata.attributes.forEach(attribute => {
      const index = layerIndex[attribute.trait_type]
      const chance = layers[network][index - 1].attributes[attribute.value].chance
      const occurrence = layers[network][index - 1].attributes[attribute.value].occurrence
      row.rating += occurrence
      row.traits.push({
        name: attribute.value,
        occurrence: occurrence,
        rarity: (chance * 100).toFixed(2)
      })
    })
    body.push(row)
  })

  body.sort((a, b) => a.rating - b.rating)

  return makeTable(head, body.map((row, i) => {
    return [
      `<td align="right">${i + 1}</td>`, 
      `<td align="right">${row.id}</td>`, 
      `<td><img width="100" src="./image/${row.id}.png" /></td>`, 
      `<td align="right">${row.rating}</td>`, 
      ...row.traits.map(trait => `<td nowrap>${trait.name}<br /><small><em>${trait.rarity}%</em></small></td>`)
    ]
  }))
}

outputBuffer.push('</div><div>')
outputBuffer.push(`<h3>NFTs</h3>`)
outputBuffer.push(makeNFTTable())
outputBuffer.push('</div>')

fs.writeFileSync(
  path.join(paths.build, network, 'rarity.html'), 
  outputBuffer.join("\n")
)

