import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import RedHatIcon from '../../assets/RedHatIcon.png';
import ClientIcon from '../../assets/ClientIcon.svg';
import OpenURLButton from './../OpenURLButton/OpenURLButton';

const theme = {
    background: '#f5f8fb',
    fontFamily: 'Red Hat Display',
    headerBgColor: '#0066CC',
    headerFontColor: '#fff',
    headerFontSize: '15px',
    botBubbleColor: '#0066CC',
    botFontColor: '#fff',
    userBubbleColor: '#fff',
    userFontColor: '#4a4a4a',
};


class Review extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            gender: '',
            age: '',
        };
    }

    componentWillMount() {
        const { steps } = this.props;
        const { name, gender, age } = steps;

        this.setState({ name, gender, age });
    }

    render() {
        const { name, gender, age } = this.state;
        return (
            <div style={{ width: '100%' }}>
                <h3>Summary</h3>
                <table>
                    <tbody>
                        <tr>
                            <td>Name</td>
                            <td>{name.value}</td>
                        </tr>
                        <tr>
                            <td>Gender</td>
                            <td>{gender.value}</td>
                        </tr>
                        <tr>
                            <td>Age</td>
                            <td>{age.value}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}

Review.propTypes = {
    steps: PropTypes.object,
};

Review.defaultProps = {
    steps: undefined,
};
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}
class SimpleForm extends Component {
    render() {
        return (
            <ThemeProvider theme={theme}>
                <ChatBot
                    headerTitle="Red Hat Troubleshoot Bot"
                    userAvatar={ClientIcon}
                    botAvatar={RedHatIcon}
                    recognitionEnable={true}
                    steps={[
                        {
                            id: '1',
                            message: 'What is your name?',
                            trigger: 'name',
                        },
                        {
                            id: 'name',
                            user: true,
                            trigger: '3',
                        },
                        {
                            id: '3',
                            message: 'Hi {previousValue}! Which product do you need help with?',
                            trigger: 'product',
                        },
                        {
                            id: 'product',
                            options: [
                                { value: 'RHEL', label: 'RHEL', trigger: '5' },
                                { value: 'Ansible', label: 'Ansible', trigger: '5' },
                                { value: 'Openshift', label: 'Openshift', trigger: '5' },
                            ],
                        },
                        {
                            id: '5',
                            message: 'Which is the product version',
                            trigger: 'version',
                        },
                        {
                            id: 'version',
                            user: true,
                            trigger: '7',
                            validator: (value) => {
                                if (isFloat(value)) {
                                    return 'Please give a version number';
                                } else if (value < 0) {
                                    return 'version must be positive';
                                } else if (value > 10) {
                                    return `${value}? Bruh! That version does not exist`;
                                }

                                return true;
                            },
                        },
                        {
                            id: '7',
                            message: 'Great! Check out your summary',
                            trigger: 'review',
                        },
                        {
                            id: 'review',
                            component: <OpenURLButton />,
                            asMessage: true,
                            end: true,
                            // trigger: 'update',
                        },
                        // {
                        //     id: 'update',
                        //     message: 'Would you like to update some field?',
                        //     trigger: 'update-question',
                        // },
                        // {
                        //     id: 'update-question',
                        //     options: [
                        //         { value: 'yes', label: 'Yes', trigger: 'update-yes' },
                        //         { value: 'no', label: 'No', trigger: 'end-message' },
                        //     ],
                        // },
                        // {
                        //     id: 'update-yes',
                        //     message: 'What field would you like to update?',
                        //     trigger: 'update-fields',
                        // },
                        // {
                        //     id: 'update-fields',
                        //     options: [
                        //         { value: 'name', label: 'Name', trigger: 'update-name' },
                        //         { value: 'gender', label: 'Gender', trigger: 'update-gender' },
                        //         { value: 'age', label: 'Age', trigger: 'update-age' },
                        //     ],
                        // },
                        // {
                        //     id: 'update-name',
                        //     update: 'name',
                        //     trigger: '7',
                        // },
                        // {
                        //     id: 'update-gender',
                        //     update: 'gender',
                        //     trigger: '7',
                        // },
                        // {
                        //     id: 'update-age',
                        //     update: 'age',
                        //     trigger: '7',
                        // },
                        // {
                        //     id: 'end-message',
                        //     message: 'Thanks! Your data was submitted successfully!',
                        //     end: true,
                        // },
                    ]}
                />
            </ThemeProvider>
        );
    }
}

export default SimpleForm;