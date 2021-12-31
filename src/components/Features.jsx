import React, { useState } from 'react';
import { Button, Form, FormControl } from 'react-bootstrap';
import { filterPizzas } from '../actions/pizza.action';
import { useDispatch } from "react-redux";

export default function Features() {

    const [searchText, setSearchText] = useState("");
    const [filter, setFilter] = useState("all");
    const dispatch = useDispatch();

    const handleFilterChange = ({ target: { value } }) => {
        setFilter(value);
        dispatch(filterPizzas(searchText.trim(), value));
    }

    const handleSubmit = () => {
        dispatch(filterPizzas(searchText.trim(), filter));
    }

    const handleReset = () => {
        setSearchText("");
        setFilter("all");
        dispatch(filterPizzas("", "all"));
    }

    return <div className="featuresBody">
        <div className="searchBoxDiv">
            <Form className="d-flex" >
                <FormControl
                    type="search"
                    placeholder="Search pizza"
                    className="me-2"
                    aria-label="Search"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <Button onClick={handleSubmit} className='pizzaButton'>Search</Button>
            </Form>
        </div>
        <div className="filterDiv">
            <h5 className='uiBold'>Filter</h5>
            <Form.Select value={filter} onChange={handleFilterChange}>
                <option value="all">All</option>
                <option value="veg">Veg</option>
                <option value="nonveg">Nonveg</option>
            </Form.Select>
        </div>

        <Button onClick={handleReset} className='pizzaButton'>Reset Results</Button>
    </div>
}
