const ProgressBar = () => {
  return {
    view: ({
      attrs: {
        mdl: {
          state: {
            loadingProgress: { value, max },
          },
        },
      },
    }) =>
      m(
        ".progressBar",
        m("progress.progress", {
          max: max ? max() : null,
          value: value ? value() : null,
        })
      ),
  }
}

export default ProgressBar
