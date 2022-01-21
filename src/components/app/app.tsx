import * as React from "react";
import AppTable from "./app.table";
import AppForm from "./app.form";
import {token, up2Tom_url} from "../util/util";


// handle errors
export async function handleError(e: any) {
    // application error
    if (e instanceof Response) {
        if (e instanceof Response) {
            const errResponse = (await e.json()).errors[0];
            return errResponse;
        }
    } else {
        // technical error
        return {
            title: 'Something went wrong',
            detail: e.message || e,
            status: '400'
        }
    }
}

// fetch api wrapper
export async function fetchWrapper<T>(input: RequestInfo, init: RequestInit): Promise<any> {
    init = {
        ...init,
        headers: {
            'Content-Type': 'application/json',
            ...init.headers
        }
    }
    const response = await fetch(input, init);
    if (!response.ok) {
        throw response;
    }
    return await response.json() as Promise<T>;
}


class App extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {}
    }

    async componentDidMount() {
        const choiceData = await this.fetchChoiceData();
        this.setState((state: any) => ({
            name: choiceData.data.attributes.name,
            description: choiceData.data.attributes.description,
            attributes: choiceData.data.attributes.metadata.attributes
        } as any));
    }

    private async fetchChoiceData() {
        const api = up2Tom_url('models');
        const responsePromise = fetch(api, {
            method: 'GET',
            headers: {Authorization: token}
        })
        const response = await responsePromise;
        return await response.json();
    }

    setDecision(decision: string) {
        this.setState({...this.state, decision: decision});
    }

    render() {

        const renderDecision = () => {
            if (this.state.decision) {
                return <span
                    className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500 py-3">
                            <div className="text-2xl text-gray-300">DECISION</div>
                    {this.state.decision}
                        </span>
            }
        }
        return (
            <div>
                <div className="p-5 items-center bg-cool-gray-700 w-full">
                    <h3 className="text-1xl text-base text-blue-600">
                        <span className="bg-clip-text text-blue-600">
                            {this.state.description}
                        </span>
                    </h3>
                    <h1 className="text-6xl font-black text-white">
                        <span className="bg-gradient-to-r text-transparent bg-clip-text from-green-400 to-purple-500">
                         <div className="text-2xl text-gray-300">MODEL NAME</div>
                            {this.state.name}
                        </span>
                        {renderDecision()}
                    </h1>
                </div>


                <div className="p-10 flex justify-center">
                    <AppForm attributes={this.state.attributes} onRetriveDecision={this.setDecision.bind(this)}/>
                </div>
                <div className="p-10 flex justify-center">
                    <AppTable data={this.state} />
                </div>

            </div>
        );
    }
}
export default App;