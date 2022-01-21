import * as React from "react";
import { mongoDB_url} from "../util/util";
import {fetchWrapper, handleError} from "./app";
import Modal from "../util/modal";

class AppTable extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {};

    }

    async componentDidMount() {
        await this.fetchAndUpdateState();
    }

    private async fetchAndUpdateState() {
        const response = await this.fetchDecisionData();
        this.setState({data: response});
    }

    async componentDidUpdate(prevProps: Readonly<any>, prevState: Readonly<any>, snapshot?: any) {
        if(prevProps !== this.props) {
            await this.fetchAndUpdateState();
        }
    }

    private async fetchDecisionData() {
        try {
            return await fetchWrapper(mongoDB_url, {method: 'GET'});
        } catch (e) {
            await this.handleErrorAndShowMessage(e);
        }
    }

    private async handleErrorAndShowMessage(e: any) {
        const msg = await handleError(e);
        this.showModal(msg.title, msg.detail, msg.status);
    }

    private showModal(title: string, detail: string, status: string) {
        this.setState({modal: {showModal: true, title, detail, status}});
    }

    render() {
        function getTd(attr: string) {
            return <td className="pr-4 py-4 whitespace-nowrap">
                <div className="flex text-left">
                    <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{attr}</div>
                    </div>
                </div>
            </td>;
        }

        return (
            <div className="w-full p-4">
                    <div className="flex flex-col">
                        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8 w-full">
                            <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                                <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                        <tr>

                                            {this.props.data.attributes?.map((column: any, i: number) => (
                                                <th
                                                    key={i}
                                                    scope="col"
                                                    className="px-3 py-3 text-left text-sm font-medium text-gray-900 uppercase tracking-wider"
                                                >
                                                    {column.question}
                                                </th>

                                            ))}
                                            <th
                                                scope="col"
                                                className="px-3 py-3 text-left text-xs font-medium text-gray-900 uppercase tracking-wider"
                                            >
                                               Decision
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                        {this.state.data?.map((attr: any, i: number) => (
                                            <tr key={i}>
                                                {getTd(attr.temperature)}
                                                {getTd(attr.gender)}
                                                {getTd(attr.age)}
                                                {getTd(attr.isCaffeineSensitive)}
                                                {getTd(attr.timeOfDay)}
                                                {getTd(attr.pregnant)}
                                                {getTd(attr.healthConscious)}
                                                {getTd(attr.drinksConsumedPerDay)}
                                                {getTd(attr.drinksConsumedToday)}
                                                {getTd(attr.decision)}
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                <Modal modal={this.state.modal}/>
            </div>
        );
    }
}
export default AppTable;