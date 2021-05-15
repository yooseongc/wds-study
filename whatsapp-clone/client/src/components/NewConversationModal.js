import React, { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';
import { useContacts } from '../contexts/ContactsProvider';
import { useConversations } from '../contexts/ConversationsProvider';

export default function NewConversationModal({ closeModal }) {

    const [selectedContactIds, setSelectedContactIds] = useState([]);
    const { contacts } = useContacts();
    const { createConversation } = useConversations();


    function handleSubmit(e) {
        e.preventDefault();
        createConversation(selectedContactIds);
        closeModal();
    }

    function handleCheckboxChange(contactId) {
        setSelectedContactIds(prevSelectedContactIds => {
            if (prevSelectedContactIds.includes(contactId)) {
                return prevSelectedContactIds.filter(prevId => contactId !== prevId);
            } else {
                return [...prevSelectedContactIds, contactId];
            }
        })
    }

    return (
        <>
            <Modal.Header>
                Create Conversation
                <button type="button" className="btn-close" onClick={ () => closeModal() } />
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={ handleSubmit } >
                    {
                        contacts.map(contact => (
                            <Form.Group controlId={ contact.id } key={ contact.id }>
                                <Form.Check
                                    type="checkbox"
                                    value={ selectedContactIds.includes(contact.id) }
                                    label={ contact.name }
                                    onChange={ () => handleCheckboxChange(contact.id) }
                                />
                            </Form.Group>

                        ))
                    }
                    <Button type="submit" className="mt-2">Create</Button>
                </Form>
            </Modal.Body>
        </>
    )
}
