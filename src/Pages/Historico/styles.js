import styled from 'styled-components';

export const FilterContainer = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 1em;
`;

export const Dropdown = styled.select`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #333;
    cursor: pointer;

    &:hover {
    border-color: #999;
    }

    &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }
`;

export const Input = styled.input`
    padding: 8px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    background-color: #fff;
    color: #333;

    &:hover {
    border-color: #999;
    }

    &:focus {
    outline: none;
    border-color: #666;
    box-shadow: 0 0 4px rgba(0, 0, 0, 0.2);
    }
`;

export const Button = styled.button`
    padding: 10px 16px;
    font-size: 15px;
    border: none;
    border-radius: 4px;
    background-color: #00b300;
    color: #fff;
    cursor: pointer;

    &:hover {
    background-color: #008c00;
    }

    &:focus {
    outline: none;
    box-shadow: 0 0 4px rgba(0, 179, 0, 0.4);
    }
`;