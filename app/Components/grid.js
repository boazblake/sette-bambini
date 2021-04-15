const Grid = () => {
  return {
    // oncreate: ({ dom }) =>
    // FlexMasonry.init(".grid", {
    //   /*
    //    * If `responsive` is `true`, `breakpointCols` will be used to determine
    //    * how many columns a grid should have at a given responsive breakpoint.
    //    */
    //   responsive: true,
    //   /*
    //    * A list of how many columns should be shown at different responsive
    //    * breakpoints, defined by media queries.
    //    */
    //   breakpointCols: {
    //     "min-width: 1500px": 6,
    //     "min-width: 1200px": 5,
    //     "min-width: 992px": 4,
    //     "min-width: 768px": 3,
    //     "min-width: 576px": 2,
    //   },
    //   /*
    //    * If `responsive` is `false`, this number of columns will always be shown,
    //    * no matter the width of the screen.
    //    */
    //   numCols: 4,
    // }),
    view: ({ children }) => m(".masonry", children),
  }
}

export default Grid
