import * as React from 'react';
import ReactTable from 'react-table';
import axios from 'axios';
import 'react-table/react-table.css';
import { CarDTO } from './car-list.model';
import { SERVER_URL } from '../configs/app.const';
import NavBar from '../components/nav-bar/NavBar';

export interface IAppProps {
}

export interface IAppStates {
    carList: CarDTO[]
}

export default class CarList extends React.Component<IAppProps, IAppStates> {
    constructor(props: IAppProps) {
        super(props);
        this.state = { carList: [] }
    }

    updateCarList() {
        axios.get(`${SERVER_URL}/api/cars`)
            .then(({ data }) => {
                console.log(data._embedded);
                this.setState({ carList: data._embedded.cars })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    onDelClick(selectedCarDeleteUrl: string) {
        console.log('onDelClick: deleting', selectedCarDeleteUrl);
        axios.delete(`${selectedCarDeleteUrl}`)
            .then(() => this.updateCarList())
            .catch((error) => console.log(error));
    }

    componentDidMount() {
        this.updateCarList();
    }

    render() {
        const columns = [
            {
                Header: 'Brand',
                accessor: 'brand' // String-based value accessors!
            },
            {
                Header: 'Model',
                accessor: 'model'
            },
            {
                Header: 'Color',
                accessor: 'color'
            },
            {
                Header: 'RegisterNumber',
                accessor: 'registerNumber'
            },
            {
                Header: 'Year',
                accessor: 'year'
            },
            {
                Header: 'Price',
                accessor: 'price'
            },
            {
                accessor: '_links.self.href',
                Cell: (props: any) => (<button onClick={() => { this.onDelClick(props.value) }}>Delete</button>)
            }
        ]

        return (
            <>
                <NavBar onRefresh={() => this.updateCarList()} />
                <ReactTable data={this.state.carList} columns={columns} filterable={true} />
            </>
        )
    }
}
