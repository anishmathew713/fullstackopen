const Filter = (props) => {

    return (
        <div>
            <label>filter shown with</label>
            <input type='text' name='filter' id='filter' onChange={props.handleFilter} />
        </div>
    )
}

export default Filter;