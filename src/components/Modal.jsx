<Modal show={showDeleteConfirmation} onHide={() => setShowDeleteConfirmation(false)}>
    <Modal.Header closeButton>
        <Modal.Title>Confirm Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete this medication?</Modal.Body>
    <Modal.Footer>
        <Button variant="secondary" onClick={() => setShowDeleteConfirmation(false)}>
            Cancel
        </Button>
        <Button variant="danger" onClick={() => {
            handleDeleteMedicationClick(deletingMedicationId);
            setShowDeleteConfirmation(false);
        }}>
            Delete
        </Button>
    </Modal.Footer>
</Modal>