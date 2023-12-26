import { MDBInputGroup, MDBInput, MDBIcon, MDBBtn } from "mdb-react-ui-kit";

const SearchBar = (props) => {
  return (
    <MDBInputGroup>
      <MDBInput label={props.label || "Search"} />
      <MDBBtn onClick={props.onClick} rippleColor="dark">
        <MDBIcon icon="search" />
      </MDBBtn>
    </MDBInputGroup>
  );
};
export default SearchBar;
