"use strict"
var __assign =
  (this && this.__assign) ||
  function () {
    __assign =
      Object.assign ||
      function (t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i]
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p]
        }
        return t
      }
    return __assign.apply(this, arguments)
  }
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod }
  }
Object.defineProperty(exports, "__esModule", { value: true })
var mithril_1 = __importDefault(require("mithril"))
var Logo = {
  view: function (_a) {
    var attrs = _a.attrs
    return mithril_1.default(
      "svg",
      __assign(
        {
          version: 1.1,
          width: 36,
          height: 36,
          viewBox: "0 0 36 36",
          preserveAspectRatio: "xMidYMid meet",
          xmlns: "http://www.w3.org/2000/svg",
          "xmlns:xlink": "http://www.w3.org/1999/xlink",
        },
        attrs
      ),
      mithril_1.default("title", {}, "logo"),
      mithril_1.default("path", {
        d:
          "M736 2120 c-214 -68 -333 -297 -267 -511 37 -116 119 -207 238 -261 70 -33 236 -33 306 0 123 56 209 154 242 276 20 75 13 73 118 31 92 -37 164 -84 253 -169 46 -43 84 -82 84 -86 0 -4 -25 -10 -55 -13 -172 -18 -307 -159 -322 -337 l-6 -70 -32 0 c-53 0 -183 -38 -261 -75 -78 -38 -245 -158 -303 -219 l-35 -36 -32 46 c-39 55 -52 89 -62 169 -6 55 -9 60 -32 60 -20 0 -26 -6 -28 -30 -2 -16 1 -55 8 -85 29 -134 126 -248 273 -320 69 -34 97 -42 178 -50 148 -15 259 9 366 79 81 53 110 86 93 106 -18 22 -26 19 -74 -20 -57 -46 -160 -93 -232 -106 -113 -18 -268 12 -357 72 -26 17 -47 34 -47 38 0 14 113 115 180 163 123 86 281 148 380 148 34 0 38 -3 60 -50 31 -66 98 -132 168 -167 71 -35 182 -43 261 -20 59 17 57 23 20 -76 -50 -134 -186 -301 -310 -380 -78 -50 -210 -102 -295 -117 -112 -20 -301 -9 -399 23 -123 40 -227 107 -325 206 -115 117 -174 220 -217 382 -26 98 -24 292 5 391 27 95 62 174 102 233 34 50 36 78 5 83 -15 2 -30 -13 -58 -57 -161 -251 -177 -575 -42 -846 91 -184 212 -306 390 -395 133 -66 236 -90 390 -90 235 0 430 78 599 239 118 114 183 219 232 376 20 67 37 100 65 132 162 179 110 457 -106 564 -35 17 -72 43 -81 58 -89 136 -278 275 -446 327 -41 13 -58 23 -58 35 0 39 -41 146 -76 196 -97 141 -292 206 -458 153z m267 -68 c65 -29 141 -104 174 -171 25 -49 28 -68 28 -151 0 -77 -4 -104 -22 -142 -30 -66 -105 -143 -172 -175 -49 -25 -68 -28 -151 -28 -83 0 -102 3 -151 28 -67 32 -142 109 -172 175 -31 67 -31 216 0 284 40 86 115 155 206 189 68 26 191 21 260 -9z m788 -737 c101 -36 165 -107 195 -214 32 -116 -10 -236 -109 -310 -65 -48 -104 -61 -182 -61 -120 0 -219 60 -270 164 -82 167 -3 359 172 422 51 18 141 17 194 -1z",
      }),
      mithril_1.default("path", {
        d: "M25,15.5H11a1,1,0,0,0,0,2H25a1,1,0,0,0,0-2Z",
        class: "clr-i-outline clr-i-outline-path-2",
      }),
      mithril_1.default("path", {
        d: "M21.75,20.5h-7.5a1,1,0,0,0,0,2h7.5a1,1,0,0,0,0-2Z",
        class: "clr-i-outline clr-i-outline-path-3",
      }),
      mithril_1.default("path", {
        d: "M11.28,12.5H24.72a1,1,0,0,0,0-2H11.28a1,1,0,0,0,0,2Z",
        class: "clr-i-outline clr-i-outline-path-4",
      }),
      mithril_1.default("rect", {
        x: 0,
        y: 0,
        width: 36,
        height: 36,
        "fill-opacity": 0,
      })
    )
  },
}
exports.default = Logo
