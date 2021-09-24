import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import RedHatIcon from '../../assets/RedHatIcon.png';
import ClientIcon from '../../assets/ClientIcon.svg';

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
            product: '',
            version: '',
            summary: '',
            result: '',
        };
    }

    componentWillMount() {
        const { steps } = this.props;
        const { product, version, summary } = steps;

        this.setState({ product, version, summary });
    }

    componentDidMount() {

        const { product, version, summary } = this.state;

        const requestOptions = {
            method: 'POST',
            headers: {
                'Authorization': 'Basic ',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                product: product,
                version: version,
                summary: summary
            })
        };

        fetch("https://access.redhat.com/hydra/rest/search/recommendations", requestOptions)
            .then(res => res.json())
            .then(
                (result) => {
                    this.setState({
                        isLoaded: true,
                        result: result.response
                    });
                },

                (error) => {
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render() {
        const { product, version, summary, result } = this.state;
        console.log(product, version, summary, result);
        return (
            <div style={{ width: '100%' }}>
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <ul>

                                </ul>
                            </td>
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
                            message: 'Tell us your issue',
                            trigger: 'summary',
                        },
                        {
                            id: 'summary',
                            user: true,
                            trigger: '9',
                            validator: (value) => {
                                if (value.length < 1) {
                                    return 'Length should be greater than 1';
                                }
                                return true;
                            },
                        },
                        {
                            id: '9',
                            message: "Here's the troubleshoot results for your query",
                            trigger: 'review',
                        },
                        {
                            id: 'review',
                            component: <Review />,
                            asMessage: true,
                        },

                    ]}
                />
            </ThemeProvider>
        );
    }
}

export default SimpleForm;