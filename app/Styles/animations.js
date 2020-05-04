export const SlideInLeft = ({ dom }) => {
  dom.style.opacity = 0
  dom.classList.toggle("slideInLeft")
  dom.style.opacity = 1
}

export const SlideOutRight = (v) => {
  v.dom.classList.remove("slideInLeft")
  console.log("anime end", v)
  new Promise(function (resolve) {
    v.dom.classList.add("slideOutLeft")
    v.dom.addEventListener("animationend", resolve)
  })
}

export const SlideChildrenInRight = ({ dom }) => {
  let children = [...dom.children]

  return children.map((child, idx) => {
    child.style.opacity = 0
    setTimeout(() => {
      child.classList.toggle("slideInLeft")
      child.style.opacity = 1
    }, (idx + 1) * 10)
  })
}

export const StretchInLeft = (idx) => ({ dom }) => {
  dom.style.opacity = 0
  return setTimeout(() => {
    dom.classList.toggle("stretchRight")
    dom.style.opacity = 1
  }, idx * 100 + 20)
}

export const SlideChildrenInDown = (idx) => ({ dom }) => {
  dom.style.opacity = 0
  setTimeout(() => {
    dom.classList.toggle("slideDown")
    dom.style.opacity = 1
  }, (idx + 1) * 200)
}

export const animate = (dir) => ({ dom }) => {
  dom.style.opacity = 0
  setTimeout(() => {
    dom.classList.toggle(dir)
    dom.style.opacity = 1
  }, 200)
}

export const RemoveChildrenOut = ({ dom }) =>
  new Promise(() => {
    ;[...dom.children].reverse().map((child, idx) => {
      return setTimeout(() => {
        child.style.display = "none"
      }, idx * 100)
    })
  })
