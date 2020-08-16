import React from "react";
import App from '../App'
import { render } from "@testing-library/react";
describe("<App />", () => {
  it("Renders <App /> component correctly", () => {
    const data = {"Search":[{"Title":"Swa Le","Year":"2009","imdbID":"tt1634561","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BYzZhZjBkZjItZWM2MS00NDczLTgzNTEtZDM4ZjZiNTJmODUyXkEyXkFqcGdeQXVyMjkxNzQ1NDI@._V1_SX300.jpg"}],"totalResults":"1","Response":"True"}
    const { getByText } = render(<App Data= {data}/>);
    expect(getByText(/Getting started with React testing library/i)).toBeInTheDocument();
  });
});