import React from 'react';
import SimpleForm from "./SimpleForm.jsx";
import ShowResults from "./ShowResults.jsx"

// import { Values } from "redux-form-website-template";

class Home extends React.Component {
    handleResults(values) {
        console.log("handle results: " + JSON.stringify(values));
    }

    render() {

        return (
            <div>
                <SimpleForm onSubmit={this.handleResults}/>

            </div>
        )
    }
}

export default Home;