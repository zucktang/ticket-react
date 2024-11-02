import React, { useState, useEffect } from "react";
import { Card, Form, Button, Container, Row, Col } from 'react-bootstrap';
import { Image, Upload } from 'lucide-react';

const TicketForm = ({ onSubmit, initialData = {}, showStatusField = false, submitText }) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [description, setDescription] = useState(initialData?.description || '');
    const [contactInfo, setContactInfo] = useState(initialData?.contact_info || '');
    const [status, setStatus] = useState(initialData?.status || 'pending');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(initialData?.image || null);

    useEffect(() => {
        if (initialData.image) {
            setImagePreview(initialData.image);
        }
    }, [initialData]);

    const handleImageChange = (file) => {
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleUploadClick = () => {
        document.getElementById('image-input').click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('contact_info', contactInfo);
        formData.append('status', status);
        
        if (image) {
            formData.append('image', image);
        }

        onSubmit(formData);
    };

    return (
        <Container className="py-4">
            <Card className="shadow-sm border-0">
                <Card.Body className="p-4">
                    <Form onSubmit={handleSubmit} encType="multipart/form-data">
                        <Row>
                            <Col md={7}>
                                <div className="mb-4">
                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-medium">Title</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            placeholder="Enter ticket title"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-medium">Description</Form.Label>
                                        <Form.Control
                                            as="textarea"
                                            rows={4}
                                            value={description}
                                            onChange={(e) => setDescription(e.target.value)}
                                            placeholder="Enter ticket description"
                                            required
                                        />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                        <Form.Label className="fw-medium">Contact Info</Form.Label>
                                        <Form.Control
                                            type="text"
                                            value={contactInfo}
                                            onChange={(e) => setContactInfo(e.target.value)}
                                            placeholder="Enter contact info"
                                            required
                                        />
                                    </Form.Group>

                                    {showStatusField && (
                                        <Form.Group className="mb-3">
                                            <Form.Label className="fw-medium">Status</Form.Label>
                                            <Form.Select
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                <option value="pending">Pending</option>
                                                <option value="accepted">Accepted</option>
                                                <option value="resolved">Resolved</option>
                                                <option value="rejected">Rejected</option>
                                            </Form.Select>
                                        </Form.Group>
                                    )}
                                </div>
                            </Col>

                            <Col md={5}>
                                <Form.Group className="mb-4">
                                    <Form.Label className="fw-medium">Image Upload</Form.Label>
                                    <Card 
                                        className="text-center p-3 bg-light" 
                                        style={{ border: '2px dashed #dee2e6' }}
                                    >
                                        <div 
                                            className="image-preview-container" 
                                            style={{ 
                                                minHeight: '250px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }}
                                        >
                                            {imagePreview ? (
                                                <img
                                                    src={imagePreview}
                                                    alt="Preview"
                                                    className="img-fluid rounded"
                                                    style={{ 
                                                        maxHeight: '250px', 
                                                        objectFit: 'contain' 
                                                    }}
                                                />
                                            ) : (
                                                <div className="text-muted text-center">
                                                    <Image size={48} className="mb-2" />
                                                    <p className="mb-0">No image uploaded</p>
                                                    <small>Upload an image to preview</small>
                                                </div>
                                            )}
                                        </div>
                                        <div className="mt-3">
                                            <input
                                                type="file"
                                                className="d-none"
                                                id="image-input"
                                                accept="image/*"
                                                onChange={(e) => handleImageChange(e.target.files[0])}
                                            />
                                            <Button
                                                variant="outline-secondary"
                                                size="sm"
                                                onClick={handleUploadClick}
                                                className="w-100"
                                            >
                                                <Upload size={16} className="me-2" />
                                                {imagePreview ? 'Change Image' : 'Upload Image'}
                                            </Button>
                                        </div>
                                    </Card>
                                </Form.Group>
                            </Col>
                        </Row>

                        <div className="text-center mt-4">
                            <Button 
                                variant="dark"
                                type="submit" 
                                size="md"
                                className="px-5"
                            >
                                {submitText}
                            </Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    );
};

export default TicketForm;