import { faFile } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Button } from 'react-bootstrap';

export default function File({ file }) {
    return (
        <Button variant="outline-dark" className="text-truncate w-100" 
           href={ file.url } target="_blank"
        >
            <FontAwesomeIcon icon={ faFile } className="me-2" />
            { file.name }
        </Button>
    )
}
