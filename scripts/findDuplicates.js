const suggested = require("../suggest.json")

const fs = require("fs")
;(() => {
  for (const item of suggested) {
    const words = []
    const obj = []
    for (const word of item.words) {
      if (words.includes(word.word)) {
        console.log(word.word)
        continue
      }
      words.push(word.word)
      obj.push(word)
    }
    item.words = obj
  }
})()

fs.writeFileSync("suggest.json", JSON.stringify(suggested, null, 2))
