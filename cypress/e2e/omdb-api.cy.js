describe("OMDB API Tests", () => {
  const apiKey = "acf91a81";
  const baseUrl = "http://www.omdbapi.com/";

  const sendRequest = (queryParam) => {
    return cy.request({
      method: "GET",
      url: `${baseUrl}?${queryParam}&apikey=${apiKey}`,
    });
  };

  const validateCommonFields = (response) => {
    expect(response.status).to.eq(200);
    expect(response.body.Year).to.not.be.null.and.not.be.empty;
    expect(response.body.Director).to.not.be.null.and.not.be.empty;
    expect(response.body.Writer).to.not.be.null.and.not.be.empty;
    expect(response.body.imdbRating).to.not.be.null.and.not.be.empty;
    expect(response.body.imdbID).to.match(/^tt\d{7,8}$/);
  };

  const validateSearchResults = (response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("Search").that.is.an("array");
    expect(Number(response.body.totalResults)).to.be.greaterThan(0);
    expect(response.body).to.have.property("Response").that.equals("True");
    expect(response.body.Search.length).to.be.greaterThan(0);
    response.body.Search.forEach((movie) => {
      expect(movie.Title).to.not.be.null.and.not.be.empty;
      expect(movie.Year).to.not.be.null.and.not.be.empty;
      expect(movie.imdbID).to.match(/^tt\d{7,8}$/);
      expect(movie.Type).to.not.be.null.and.not.be.empty;
      expect(movie.Poster).to.not.be.null.and.not.be.empty;
    });
  };

  // Task 1
  it("Get a Movie by its Title and Validate Response", () => {
    const movieTitle = "Pretty Woman";
    sendRequest(`t=${movieTitle}`).then((response) => {
      validateCommonFields(response);
      expect(response.body.Title).to.eq(movieTitle);
    });
  });

  // Task 2
  it("Get a Movie by its ID and Validate Response", () => {
    const movieID = "tt0100405";
    sendRequest(`i=${movieID}`).then((response) => {
      validateCommonFields(response);
      expect(response.body.imdbID).to.eq(movieID);
    });
  });

  // Task 3
  it("Search Movies with Valid Search Query and Validate Response", () => {
    const searchQuery = "Matrix";
    sendRequest(`s=${searchQuery}`).then((response) => {
      validateSearchResults(response);
    });
  });

  // Task 4
  it("Search Movies with Invalid Search Query and Validate Error Response", () => {
    const invalidSearchQuery = "837dusdhhiqddwdiuh";
    sendRequest(`s=${invalidSearchQuery}`).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property("Response").that.equals("False");
      expect(response.body).to.have.property("Error").that.equals("Movie not found!");
    });
  });
});
