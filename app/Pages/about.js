const About = (mdl) => {
  return {
    view: ({ attrs: { mdl } }) =>
      m(
        ".frow-container frow-center",

        m("img", {
          dataSrc:
            "https://m.media-amazon.com/images/I/81dk5K365jL.RM_SS200_.jpg",
        }),

        m("img", {
          dataSrc:
            "https://m.media-amazon.com/images/I/21fsf1BwlkL._RI_AL_FMPNG_SS100_.png",
        })
      ),
  }
}

export default About
