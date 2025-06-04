import React, { useState } from 'react';
import { Card, Button, Form, Modal, Row, Col } from 'react-bootstrap';
import './ImageInputZone.css';

interface ImageInputZoneProps {
  title?: string;
  images: { url: string; caption: string }[];
  onImagesChange?: (images: { url: string; caption: string }[]) => void;
  isEditable?: boolean;
}

const ImageInputZone: React.FC<ImageInputZoneProps> = ({
  title = "Custom Images",
  images,
  onImagesChange,
  isEditable = false
}) => {
  const [showImageModal, setShowImageModal] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState<number | null>(null);
  const [newImage, setNewImage] = useState({ url: '', caption: '' });

  // Open image edit modal
  const openImageModal = (index: number | null) => {
    if (index !== null && index < images.length) {
      setNewImage(images[index]);
    } else {
      setNewImage({ url: '', caption: '' });
    }
    setCurrentImageIndex(index);
    setShowImageModal(true);
  };

  // Save image from modal
  const saveImage = () => {
    if (!onImagesChange) return;

    const updatedImages = [...images];
    
    if (currentImageIndex !== null && currentImageIndex < images.length) {
      // Edit existing image
      updatedImages[currentImageIndex] = newImage;
    } else {
      // Add new image
      updatedImages.push(newImage);
    }
    
    onImagesChange(updatedImages);
    setShowImageModal(false);
  };

  // Remove image
  const removeImage = (index: number) => {
    if (!onImagesChange) return;
    
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    onImagesChange(updatedImages);
  };

  return (
    <div className="image-input-zone">
      <Card>
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <Card.Title>{title}</Card.Title>
            {isEditable && (
              <Button 
                variant="success" 
                size="sm" 
                onClick={() => openImageModal(null)}
              >
                Add Image
              </Button>
            )}
          </div>

          {images.length === 0 ? (
            <div className="text-center p-4">
              <p className="text-muted">No images available. {isEditable && 'Click "Add Image" to upload one.'}</p>
            </div>
          ) : (
            <Row>
              {images.map((image, index) => (
                <Col key={index} md={4} className="mb-3">
                  <Card>
                    <Card.Img 
                      variant="top" 
                      src={image.url} 
                      alt={image.caption} 
                      className="image-preview"
                    />
                    <Card.Body>
                      <Card.Text>{image.caption}</Card.Text>
                      {isEditable && (
                        <div className="d-flex justify-content-between">
                          <Button 
                            variant="primary" 
                            size="sm" 
                            onClick={() => openImageModal(index)}
                          >
                            Edit
                          </Button>
                          <Button 
                            variant="danger" 
                            size="sm" 
                            onClick={() => removeImage(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      )}
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Card.Body>
      </Card>

      {/* Image Edit Modal */}
      <Modal show={showImageModal} onHide={() => setShowImageModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{currentImageIndex !== null ? 'Edit Image' : 'Add New Image'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Label>Image URL</Form.Label>
            <Form.Control
              type="text"
              value={newImage.url}
              onChange={(e) => setNewImage({...newImage, url: e.target.value})}
              placeholder="https://example.com/image.jpg"
              required
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Caption</Form.Label>
            <Form.Control
              type="text"
              value={newImage.caption}
              onChange={(e) => setNewImage({...newImage, caption: e.target.value})}
              placeholder="Image description"
              required
            />
          </Form.Group>
          {newImage.url && (
            <div className="text-center mt-3">
              <p>Preview:</p>
              <img 
                src={newImage.url} 
                alt="Preview" 
                style={{ maxWidth: '100%', maxHeight: '200px' }} 
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowImageModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={saveImage}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ImageInputZone;