import React, { useState, useEffect } from "react";

const TicketForm = ({ onSubmit, initialData = {}, showStatusField = false }) => {
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
        setImage(file);
        const previewUrl = URL.createObjectURL(file);
        setImagePreview(previewUrl);
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
        <form onSubmit={handleSubmit} className="text-center" encType="multipart/form-data">
            {imagePreview && (
                <div className="form-group mb-3" style={{ width: '300px', margin: '0 auto' }}>
                    <img
                        src={imagePreview}
                        alt="Image Preview"
                        className="img-fluid border"
                        style={{ maxHeight: '200px', maxWidth: '100%', borderRadius: '8px' }}
                    />
                </div>
            )}

            <div className="form-group mb-3">
                <button 
                    type="button" 
                    className="btn btn-secondary"
                    onClick={handleUploadClick}
                >
                    Upload Image
                </button>
                <input
                    type="file"
                    className="form-control d-none"
                    id="image-input"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e.target.files[0])}
                />
            </div>
            

            <div className="form-group mb-3" style={{ width: '300px', margin: '0 auto' }}>
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    type="text"
                    className="form-control"
                    id="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter ticket title"
                />
            </div>

            <div className="form-group mb-3" style={{ width: '300px', margin: '0 auto' }}>
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    className="form-control"
                    id="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Enter ticket description"
                ></textarea>
            </div>

            <div className="form-group mb-3" style={{ width: '300px', margin: '0 auto' }}>
                <label htmlFor="contactInfo" className="form-label">Contact Info</label>
                <input
                    type="text"
                    className="form-control"
                    id="contactInfo"
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    placeholder="Enter contact info"
                />
            </div>
    
            {showStatusField && (
                <div className="form-group mb-3" style={{ width: '300px', margin: '0 auto' }}>
                    <label htmlFor="status" className="form-label">Status</label>
                    <select
                        className="form-control"
                        id="status"
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                    >
                        <option value="pending">Pending</option>
                        <option value="accepted">Accepted</option>
                        <option value="resolved">Resolved</option>
                        <option value="rejected">Rejected</option>
                    </select>
                </div>
            )}

            <button type="submit" className="btn btn-primary">Submit Ticket</button>
        </form>
    );
};

export default TicketForm;