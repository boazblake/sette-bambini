import { range, traverse } from "ramda"
import { log } from "Utils"

const getImg = ({ width, height }) => [
  `https://loremflickr.com/${width}/${height}`,
]

export const Data = (size) => (amount) => {
  let arr = [...Array(amount).keys()]
  let res = arr.traverse((_) => getImg(size), Array.of)
  console.log(res)
  return res[0]
  // return []
}
