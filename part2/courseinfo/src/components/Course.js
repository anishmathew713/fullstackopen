import React from 'react';
import Header from './Header'
import Content from './Content'
const Course = ({ course }) => {

    const initialValue = 0;
    const sumWithInitial = course.parts.reduce((accumulator, currentObject) => accumulator + currentObject.exercises, initialValue);

    return (
        <React.Fragment>
            <Header name={course.name} />
            <Content content={course.parts} />
            <h3>total of {sumWithInitial}</h3>
        </React.Fragment>

    )
}

export default Course;