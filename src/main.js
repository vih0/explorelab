import "./css/index.css"
import IMask from "imask"

const ccBgColor1 = document.querySelector(".cc-bg svg > g g:nth-child(1) path")

const ccBgColor2 = document.querySelector(".cc-bg svg > g g:nth-child(2) path")
const ccLogo = document.querySelector(".cc-logo span:nth-child(2) img")

function setCardType(type) {
  const colors = {
    visa: ["#2D57F2", "#436D99"],
    master: ["#C69347", "#DF6F29"],
    cirrus: ["#0E3098", "#35AEFF"],
    cielo: ["#051525", "#1B338D"],
    elo: ["#587AF9", "#C8A52A"],
    nu: ["#8A05BE", "#8A05BEA"],
    americanExpress: ["orange", "black"],
    default: ["black", "gray"],
  }
  ccBgColor1.setAttribute("fill", colors[type][0])
  ccBgColor2.setAttribute("fill", colors[type][1])
  ccLogo.setAttribute("src", `cc-${type}.svg`)
}
setCardType("default")
globalThis.setCardType = setCardType
//security
const element = document.querySelector("#security-code")
const maskCvc = {
  mask: "0000",
}
const securityCodeMask = IMask(element, maskCvc)

const dateExpiration = document.querySelector("#expiration-date")
const maskDate = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12,
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2),
    },
  },
}
const securityDateMask = IMask(dateExpiration, maskDate)

const numberCard = document.querySelector("#card-number")
const numberCardPattern = {
  mask: [
    {
      mask: "0000 0000 0000 0000",
      regex: /^4\d{0,15}/,
      cardtype: "visa",
    },

    {
      mask: "0000 0000 0000 0000",
      regex: /^6\d{0,15}/,
      cardType: "cirrus",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^2\d{0,15}/,
      cardType: "cielo",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^(6011|65\d{0,2}|64[4-9]\d?)\d{0,12}/,
      cardtype: "american express",
    },
    {
      mask: "0000 000000 00000",
      regex: /^3[47]\d{0,13}/,
      cardtype: "nu",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /^5\d{0,15}/,
      cardType: "elo",
    },
    {
      mask: "0000 0000 0000 0000",
      regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2}\d{0,12} )/,
      cardType: "master",
    },
    {
      mask: "0000 0000 0000 0000",
      cardType: "default",
    },
  ],
  dispatch: function (appended, dynamicMasked) {
    const number = (dynamicMasked.value + appended).replace(/\D/g, "")

    const foundMask = dynamicMasked.compiledMasks.find(function (item) {
      return number.match(item.regex)
    })

    return foundMask
  },
}
const cardNumberMask = IMask(numberCard, numberCardPattern)

const addCard = document.querySelector("#btn-add")

document
  .querySelector("form")
  .addEventListener("submit", (event) => event.preventDefault())
addCard.addEventListener("click", () => alert("cartão adicionado"))

const cardName = document.querySelector("#card-holder")
cardName.addEventListener("input", () => {
  const ccHolder = document.querySelector(".cc-holder .value")

  ccHolder.innerText = cardName.value
})
