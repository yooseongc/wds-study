import { faFolder } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

export default function Folder({ folder }) {
    return (
        <Button variant="outline-dark" className="text-truncate w-100" 
            as={Link} to={{
                pathname: `/folder/${folder.id}`,
                state: { folder: folder }
            }}
        >
            <FontAwesomeIcon icon={ faFolder } className="me-2" />
            { folder.name }
        </Button>
    )
}
