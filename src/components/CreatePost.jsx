import { useState, useRef } from 'react'

function CreatePost({ onPost }) {
  const [text, setText] = useState('')
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [showPreview, setShowPreview] = useState(false)
  const fileRef = useRef(null)
  const currentUser = JSON.parse(localStorage.getItem('bc_currentUser') || 'null')
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleImage = (e) => {
    const file = e.target.files[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = () => {
    if (!text.trim() && !preview) return
    const displayName = currentUser?.name || 'Anonim';
    onPost({
      id: Date.now(),
      name: displayName,
      time: 'Baru saja',
      text: text,
      image: preview,
      likes: 0,
      comments: []
    })
    setText('')
    setImage(null)
    setPreview(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const handleKeyDown = (e) => {
  if (e.key === 'Enter' && !e.shiftKey) {
    e.preventDefault()
    handleSubmit()
  }
}

  return (
    <>
      <div className="create-post">
        <div className="input-wrapper">
          <textarea
            className="create-post-input"
            placeholder="Mau share apa hari ini bestie? 👀"
            value={text}
            onChange={(e) => setText(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
          />
          {preview && (
            <div className="preview-thumbnail-container">
              <img
                src={preview}
                alt="preview"
                className="preview-thumbnail"
                onClick={() => setShowPreview(true)}
              />
              <button className="remove-image" onClick={() => { setImage(null); setPreview(null) }}>✕</button>
            </div>
          )}
        </div>

        <div className="create-post-actions">
          <label className="upload-btn">
            Foto
            <input type="file" accept="image/*" onChange={handleImage} hidden ref={fileRef} />
          </label>
          <button className="upload-btn" onClick={handleSubmit}>
            Post
          </button>
        </div>
      </div>

      {/* Popup Preview */}
      {showPreview && (
        <div className="modal-overlay" onClick={() => setShowPreview(false)}>
          <div className="image-popup" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setShowPreview(false)}>✕</button>
            <img src={preview} alt="preview full" className="image-popup-img" />
          </div>
        </div>
      )}
    </>
  )
}

export default CreatePost