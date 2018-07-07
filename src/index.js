import React from 'react';
import ReactDOM from 'react-dom';
import { Grid } from './Grid/Grid.js';
import "./css/index.css";
import "./css/grid.css";
import faker from 'faker';

var users = [];
buildFakeData();
function buildFakeUser() {
    return {
        name: faker.internet.userName(),
        avatar: faker.internet.avatar(),
        email: faker.internet.email(),
        color: faker.internet.color()
    };
}

function buildFakeData() {
    for (var i = 0; i < 100; i++) {
        users.push(buildFakeUser())
    }
}

class GridDemo extends React.Component {
    render() {
        return <Grid data={users} />;
    }
}

ReactDOM.render(<GridDemo />, document.getElementById("root"));