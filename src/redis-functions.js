const redis = require('redis')
const client = redis.createClient()

const keys = [
  'header',
  'left',
  'article',
  'right',
  'footer'
]

async function dataInit() {
  try {
    await client.connect()
    keys.map( async key => {
      await client.set(key, 0)
    })
  } catch (e) {
    console.error(e);
  }
}

async function getData() {
  try {
    let data = {}
    for ( let i = 0; i<keys.length; i++ ) {
      let sectionValue = await client.get(keys[i])
      data[keys[i]] = sectionValue
    }
    return data
  } catch (e) {
    console.log('Error getData ' + e)
  }
}

async function updateData(key, value) {
  try {
    let newData = {}
    value += Number(await client.get(key)) 
    await client.set(key, value)
    newData[key] = await client.get(key)
    return newData
  } catch (e) {
    console.log('Error update ' + e)
  }
}

module.exports = {
  dataInit,
  getData,
  updateData
}
