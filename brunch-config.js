// See http://brunch.io for documentation.
exports.files = {
  javascripts: {
    joinTo: {
      "vendor.js": /^(?!app)/, // Files that are not in `app` dir.
      "app.js": /^app/,
    },
  },
  stylesheets: {
    joinTo: {
      "app.css": [
        (path) => path.includes(".sass"),
        (path) => path.includes(".scss"),
        (path) => path.includes(".css"),
      ],
    },
  },
}

exports.plugins = {
  eslint: {
    pattern: /^app\/.*\.js?$/,
    warnOnly: true,
  },
  postcss: {
    processors: [require("autoprefixer")(["last 8 versions"])],
  },
  sass: {
    precision: 8,
    mode: "native",
    sourceMapEmbed: true,
    includePaths: [
      // "node_modules/frow.scss"
    ],
  },
  imagemin: {
    plugins: {
      "imagemin-gifsicle": true,
      "imagemin-jpegtran": true,
      "imagemin-optipng": true,
      "imagemin-svgo": true,
      "imagemin-webp": true,
    },
    pattern: /\.(gif|jpg|jpeg|jpe|jif|jfif|jfi|png|svg|svgz|webp)$/,
  },
  copycat: {
    fonts: ["app/assets/fonts"],
    // images: ["app/assets/images"],
    verbose: true, //shows each file that is copied to the destination directory
    onlyChanged: true, //only copy a file if it's modified time has changed (only effective when using brunch watch)
  },
  workbox: {
    globDirectory: "docs/",
    globPatterns: ["**/*.*"],
    swDest: "sw.js",
  },
  // swPrecache: {
  //   swFileName: "service-worker.js",
  //   options: {
  //     autorequire: ["app/assets/index.html"],
  //     staticFileGlobs: [
  //       "docs/app.css",
  //       "docs/app.js",
  //       "docs/vendor.js",
  //       "docs/index.html",
  //     ],
  //     stripPrefix: "docs/",
  //   },
  // },
  "@babel": { presets: ["env"] },
  terser: {
    mangle: false,
    compress: {
      global_defs: {
        DEBUG: false,
      },
    },
  },
  sharp: {
    src: "app/assets/images",
    dest: "docs/images",
    imageExt: ["jpg", "png", "svg"],
    tasks: [
      [
        { resize: [1200] },
        { ignoreAspectRatio: true },
        { toFormat: "webp" },
        { withoutEnlargement: true },
        { quality: 95 },
        { withoutAdaptiveFiltering: true },
        { optimiseScans: true },
        // { rename: "{base}-1200.{ext}" },
      ],
    ],
  },
}

exports.paths = {
  public: "docs",
  watched: [
    "app/Utils",
    "app/Components",
    "app/Styles",
    "app/Layouts",
    "app/Pages",
    "app/Models",
    "app",
  ],
}

exports.npm = {
  enabled: true,
  compilers: ["babel-brunch"],
  globals: { m: "mithril", Stream: "mithril-stream" },
}

exports.server = {
  run: true,
}
