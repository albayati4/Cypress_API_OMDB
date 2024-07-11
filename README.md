![Image](https://miro.medium.com/v2/resize:fit:670/1*PpZk1knHjIadHW-lpWSsOQ.png)

## Date: 07/10/2024

### By: Abdullah Albayati

### API Testing

#### Validating 4 test cases using OMDB API key.

#### Creator Linkedin page

[Abdullah Albayati](https://www.linkedin.com/in/albayati-abdullah/)

---

#### This project was creatated and executed with the use of JaveScript, Node.js, Cypress, OMDB API KEY.

---

### _Getting Started_

- In order to hit different endpoints, I created a simple method that handles that for me called `sendRequest` and here is the body
  ```JavaScript
  const sendRequest = (queryParam) => {
    return cy.request({
      method: "GET",
      url: `${baseUrl}?${queryParam}&apikey=${apiKey}`,
   });
   }
  ```
- So when I used it I just had to add my end point like so
  ```JavaScript
  sendRequest(`t=${movieTitle}`)
  ```
- I created two methods to handle validating common fields and search results

  ```JavaScript
  const validateCommonFields = (response) => {
    expect(response.status).to.eq(200);
    expect(response.body.Year).to.not.be.null.and.not.be.empty;
    };
      const validateSearchResults = (response) => {
    expect(response.status).to.eq(200);
    expect(response.body).to.have.property("Search").that.is.an("array");
    expect(Number(response.body.totalResults)).to.be.greaterThan(0);
    };
  ```

- To handle invalid search query I used
  ```JavaScript
     expect(response.body).to.have.property("Response").that.equals("False");
  ```

### _Screenshots_

![Image](https://i.ibb.co/XDx4tm8/Screenshot-2024-07-10-at-8-27-44-PM.png)
