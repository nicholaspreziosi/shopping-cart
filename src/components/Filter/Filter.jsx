import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Theme from "../Theme.jsx";
import PropTypes from "prop-types";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  margin: 1rem;
  gap: 1rem;
`;

const Text = styled.p`
  font-size: 1.25rem;
  margin: 0;
  color: ${(props) => props.theme.colors.slate};
`;

const InputGroup = styled.div`
  cursor: pointer;
  width: 220px;
  box-sizing: border-box;
`;

const SelectGroup = styled.div`
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  align-items: center;
  cursor: pointer;
  color: ${(props) => props.theme.colors.slate};
  border: 1px solid ${(props) => props.theme.colors.slate};
  background-color: white;
  margin: 0;
  padding: 0.5rem;
  &:hover {
    background-color: ${(props) => props.theme.colors.slate};
    color: white;
  }
`;

const SelectText = styled.p`
  font-size: 1.25rem;
  margin: 0;
  cursor: pointer;
`;

const CustomSelect = styled.div`
  padding: 0;
  margin: 0;
  cursor: pointer;
`;

const CustomOption = styled.p`
  font-size: 1.25rem;
  background-color: white;
  color: ${(props) => props.theme.colors.slate};
  border-top: 1px solid ${(props) => props.theme.colors.slate};
  cursor: pointer;
  padding: 0.5rem;
  margin: 0;
  &:hover {
    background-color: ${(props) => props.theme.colors.slate};
    color: white;
  }
  &:first-child {
    border-top: none;
  }
`;

const OptionGroup = styled.div`
  box-sizing: border-box;
  width: 220px;
  display: block;
  position: absolute;
  margin: 0;
  background-color: ${(props) => props.theme.colors.slate};
  border-left: 1px solid ${(props) => props.theme.colors.slate};
  border-right: 1px solid ${(props) => props.theme.colors.slate};
  border-bottom: 1px solid ${(props) => props.theme.colors.slate};
  box-shadow: rgba(0, 0, 0, 0.5) 2px 2px 5px 0px;
`;

function Filter({ categories, filter, setFilter, dropdown, setDropdown }) {
  function dropdownClick() {
    setDropdown(!dropdown);
  }

  function optionClick(e) {
    setFilter(e.target.textContent.toLowerCase());
    setDropdown(!dropdown);
  }

  const toTitleCase = (str) => {
    return str
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <>
      <Theme>
        <Container data-testid="filter">
          <Text>Filter:</Text>
          <InputGroup>
            <CustomSelect>
              <SelectGroup data-testid="select-group" onClick={dropdownClick}>
                <SelectText>{toTitleCase(filter)}</SelectText>
                {!dropdown && (
                  <svg
                    id="chevron-down"
                    data-testid="chevron-down"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    width="1.5rem"
                    height="1.5rem"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                    />
                  </svg>
                )}
                {dropdown && (
                  <svg
                    id="chevron-up"
                    data-testid="chevron-up"
                    xmlns="http://www.w3.org/2000/svg"
                    width="1.5rem"
                    height="1.5rem"
                    fill="currentColor"
                    className="bi bi-chevron-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708z"
                    />
                  </svg>
                )}
              </SelectGroup>
              {dropdown && (
                <OptionGroup>
                  <CustomOption
                    data-testid="options"
                    onClick={(e) => {
                      optionClick(e);
                    }}
                  >
                    All
                  </CustomOption>
                  {categories.map((item) => (
                    <CustomOption
                      data-testid="options"
                      key={item}
                      onClick={(e) => {
                        optionClick(e);
                      }}
                    >
                      {toTitleCase(item)}
                    </CustomOption>
                  ))}
                </OptionGroup>
              )}
            </CustomSelect>
          </InputGroup>
        </Container>
      </Theme>
    </>
  );
}

Filter.propTypes = {
  categories: PropTypes.array,
  filter: PropTypes.string,
  setFilter: PropTypes.func,
  dropdown: PropTypes.bool,
  setDropdown: PropTypes.func,
};

export default Filter;
