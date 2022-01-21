import * as React from "react";
import Modal from "../util/modal";
import {mongoDB_url_query, token, up2Tom_url} from "../util/util";
import {fetchWrapper, handleError} from "./app";


export class DecisionModel {
    temperature: Number;
    gender: String;
    age: Number;
    isCaffeineSensitive: String;
    timeOfDay: String;
    pregnant: String;
    healthConscious: String;
    drinksConsumedPerDay: Number;
    drinksConsumedToday: Number;
    decision: String;

    constructor(inputs: any, decision: string) {
        this.temperature = inputs.INPUTVAR1;
        this.gender = inputs.INPUTVAR2;
        this.age = inputs.INPUTVAR3;
        this.isCaffeineSensitive = inputs.INPUTVAR4;
        this.timeOfDay = inputs.INPUTVAR5;
        this.pregnant = inputs.INPUTVAR6;
        this.healthConscious = inputs.INPUTVAR7;
        this.drinksConsumedPerDay = inputs.INPUTVAR8;
        this.drinksConsumedToday = inputs.INPUTVAR9;
        this.decision = decision;
    }
}

class AppForm extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            "data": {"type": "scenario", "attributes": {"input": {}}}
        }
    }

    async handleSubmit(event: any) {
        event.preventDefault();
        const inputs = this.state.data.attributes.input;
        if (Object.values(inputs).length === 9 && !Object.values(inputs).some(v => v === '' || v === undefined)) {
            const response = await this.postChoiceData({'data': this.state.data});
            if(response) {
                await this.saveDecisionData(new DecisionModel(inputs, response.data.attributes.decision));
                this.showModal('Save successful', 'data stored stored in MongoDB, see updated table below', '');
                this.shareDecisionToParentComponent(response);
            }
        } else {
            return this.showModal('Information required', 'Please fill all fields in the form', '');
        }
    }

    private shareDecisionToParentComponent(response: any) {
        this.props.onRetriveDecision(response.data?.attributes?.decision);
    }

    async fetchUtil<T>(input: RequestInfo, init: RequestInit): Promise<any> {
        return await fetchWrapper(input, init);
    }


    private async postChoiceData(data: any): Promise<any> {
        try {
            return await this.fetchUtil(up2Tom_url('decision'), {
                body: JSON.stringify(data),
                method: 'POST',
                headers: {Authorization: token}
            });
        } catch (e) {
            await this.handleErrorAndShowMessage(e);
        }
    }

    private async handleErrorAndShowMessage(e: any) {
        const msg = await handleError(e);
        this.showModal(msg.title, msg.detail, msg.status);
    }

    private async saveDecisionData(data: DecisionModel) {
        try {
            await this.fetchUtil(mongoDB_url_query('add'), {body: JSON.stringify(data), method: 'POST'});
        } catch (e) {
            return await this.handleErrorAndShowMessage(e);
        }
    }


    private showModal(title: string, detail: string, status: string) {
        this.setState({modal: {showModal: true, title, detail, status}});
    }


    handleChange(event: any) {
        this.upDateAttributes(event);
    }

    private upDateAttributes(event: any) {
        this.setState({
            data: {
                ...this.state.data,
                attributes: {
                    input: {
                        ...this.state.data.attributes.input,
                        [event.target.id.split('-')[0]]: event.target.id.split('-')[1] === 'DomainC' ? event.target.value : Number(event.target.value)
                    }
                }
            }
        });
    }

    render() {
        // dropdown field
        const getDropDownInput = (attr: any) => {
            return <div className="select-box">
                <select className="px-3 py-2 rounded-full w-full" id={`${attr.name}-${attr.domain?.type}`}
                        onChange={this.handleChange.bind(this)}>
                    <option hidden></option>
                    {attr.domain?.values?.map((item: any, i: number) => <option value={item} key={i}>{item}</option>)}
                </select>
            </div>;
        }

        // textbox field
        const getTextBoxInput = (attr: any) => {
            return <div>
                <input className="px-3 py-2 rounded-full w-full" type="number"
                       min={attr.domain?.lower} max={attr.domain?.upper}
                       id={`${attr.name}-${attr.domain?.type}`}
                       value={undefined}
                       onChange={this.handleChange.bind(this)}/>
                <div className="text-gray-500 text-right">
                    MIN VALUE: <strong>{attr.domain?.lower}</strong> .
                    MAX VALUE: <strong>{attr.domain?.upper}</strong></div>
            </div>;
        }

        return (
            <form className="py-4 flex flex-wrap w-full" onSubmit={this.handleSubmit.bind(this)}>
                {this.props.attributes?.map((attr: any, i: number) => (
                    <div className="w-1/2 px-3 py-1" key={i}>
                        <div className="text-xs text-gray-500">{attr.name}</div>
                        <div className="text-md font-medium text-gray-900">{attr.question.toUpperCase()}</div>
                        {attr.domain?.type === 'DomainC' ? getDropDownInput.call(this, attr) : getTextBoxInput.call(this, attr)}
                    </div>
                ))}
                <div className="w-full mt-4">
                    <div className="flex items-center justify-center">
                        <input type="submit" value="Submit"
                               className="w-1/2 lg:w-1/2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"></input>
                    </div>
                </div>

                <Modal modal={this.state.modal}/>
            </form>
        );
    }
}

export default AppForm;