import React from 'react';
import { Button, ButtonVariant } from '@patternfly/react-core'
import { Card, CardBody } from '@patternfly/react-core';

const openInNewTab = (url) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
}

function OpenURLButton() {
    return (
        <Card>
            <CardBody>
                <Button variant={ButtonVariant.primary} onClick={() => openInNewTab('https:/access.redhat.com')}>
                    Open URL
                </Button>
            </CardBody>
        </Card>
    );
}

export default OpenURLButton;
