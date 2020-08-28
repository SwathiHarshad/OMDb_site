import React from "react";
import ReactDOM, { render } from "react-dom";
import { shallow, mount } from 'enzyme';

import array from './array.json'
import detail from './detail.json'
import { MovieList } from "../mainContent/MovieList";
import App from "../App";
import SearchBar from "../searchBarAndSorting/SearchBar";
import { MovieDetail } from "../mainContent/MovieDetail/MovieDetail";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

/******** Mock function for spy as sortCall and APICall ********/
const spy = jest.fn((key,order)=> 
  console.log('To sort Function Key value: ',key,' Order to sort :', order))
const APICall = jest.fn((value, component)=>{
  console.log("API call were initiated search value:", value,' Component name: ', component)
})

/******** Movie List Component Testing ********/

const movieListContainer = shallow(<MovieList Data = {array} APICall={APICall} />)
describe("<MovieList/> Component Testing",()=>{
  it("To test movie list page", ()=>{
    expect(movieListContainer.getElements()).toMatchSnapshot();
  });
  it('To check the movie onClick function', ()=>{
    movieListContainer.find('.poster').first().props().onClick()
    expect(APICall).toHaveBeenCalled()
  })
})


/******** To Test the Search bar and Sort icon *******/

const searchBarContainer = mount(  <SearchBar APICall={APICall} toSort={spy} />  )
describe("<searchBar/> to test search and sorting functionality",()=>{

  it("Sorting type select from the dropdown", ()=>{
    searchBarContainer.find('.dropDownDiv').find('#Title').simulate("click")
    expect(spy).toHaveBeenCalled()
    searchBarContainer.find('.dropDownDiv').find('#Year').simulate("click")
    expect(spy).toHaveBeenCalled()
    expect(spy.mock.calls[0][0]).toEqual('Title')
    expect(spy.mock.calls[1][0]).toEqual('Year')
  })

  it("Sort Icon to toggle from Ascending to Descending", ()=>{
    searchBarContainer.find('.sortIcon').simulate('click')
    expect(spy.mock.calls[2][1]).toEqual('Ascending')

    searchBarContainer.find('.sortIcon').simulate('click')
    expect(spy.mock.calls[3][1]).toEqual('Descending')

  })

  it("To update the search input and make the APICall function", ()=>{
    searchBarContainer.find('input[type="text"]').simulate('change',{
      target:{
        value: 'wanted',
      },
    })
    expect(searchBarContainer.find('input[type="text"]').prop('value')).toEqual('wanted');
    searchBarContainer.find('.btn').first().simulate("click")
    expect(APICall).toHaveBeenCalled()
    expect(APICall.mock.calls[1][0]).toEqual('wanted')
  })
})

/****** <MovieDetail /> component render ******/
// describe("<MovieDetail /> component render",()=>{
//   const movieDetailContainer = shallow(<MovieDetail Detail={detail}/>)
//   it("",()=>{
//     expect(movieDetailContainer.getElements()).toMatchSnapshot();
//   })
// })
