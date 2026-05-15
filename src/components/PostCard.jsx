import { useState, useEffect } from 'react'
import { getComments, addComment, addReply, likePost, unlikePost } from '../api/posts'

function PostCard({ post }) {
  const [showComments, setShowComments] = useState(false)
  const [liked, setLiked] = useState(false)
  const [likes, setLikes] = useState(post?.likes || 0)
  const [comments, setComments] = useState([])
  const [replyTo, setReplyTo] = useState(null)
  const [replyText, setReplyText] = useState('')
  const [newComment, setNewComment] = useState('')
  const [loadingComments, setLoadingComments] = useState(false)
  const [commentCount, setCommentCount] = useState(0)

  const currentUser = JSON.parse(localStorage.getItem('bc_currentUser') || '{}')
  const displayName = currentUser?.username || 'Anonim'

  useEffect(() => {
    if (showComments) fetchComments()
  }, [showComments])

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const data = await getComments(post.id)
        setCommentCount(data.length)
      } catch (err) {
        console.error(err)
      }
    }
    fetchCount()
  }, [post.id])

  const fetchComments = async () => {
    setLoadingComments(true)
    try {
      const data = await getComments(post.id)
      setComments(data)
    } catch (err) {
      console.error('Error fetching comments:', err)
    } finally {
      setLoadingComments(false)
    }
  }

  const handleLike = async () => {
    try {
      if (liked) {
        await unlikePost(post.id)
        setLikes(likes - 1)
      } else {
        await likePost(post.id)
        setLikes(likes + 1)
      }
      setLiked(!liked)
    } catch (err) {
      console.error('Error liking post:', err)
    }
  }

  const handleNewComment = async () => {
    if (!newComment.trim()) return
    try {
      const data = await addComment(post.id, newComment)
      setComments([...comments, { ...data, replies: [] }])
      setCommentCount(commentCount + 1)
      setNewComment('')
    } catch (err) {
      console.error('Error adding comment:', err)
    }
  }

  const handleReply = async (commentId) => {
    if (!replyText.trim()) return
    try {
      const data = await addReply(commentId, replyText)
      setComments(comments.map(c => {
        if (c.id === commentId) {
          return { ...c, replies: [...(c.replies || []), data] }
        }
        return c
      }))
      setReplyText('')
      setReplyTo(null)
    } catch (err) {
      console.error('Error adding reply:', err)
    }
  }

  return (
    <>
      <div className="post-card">
        <div className="post-header">
          <div className="post-avatar">{post.username[0].toUpperCase()}</div>
          <div>
            <h4 className="post-username">{post.username}</h4>
            <p className="post-time">{post.time || 'Baru saja'}</p>
          </div>
        </div>
        {post.image && <img src={post.image} alt="post" className="post-image" />}
        {post.text && <p className="post-text">{post.text}</p>}
        <div className="post-actions">
          <button className={`post-btn ${liked ? 'liked' : ''}`} onClick={handleLike}>
            {liked ? '❤️' : '🤍'} {likes}
          </button>
          <button className={`post-btn ${showComments ? 'active' : ''}`} onClick={() => setShowComments(true)}>
            💬 {commentCount}
          </button>
        </div>
      </div>

      {showComments && (
        <div className="modal-overlay" onClick={() => setShowComments(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="post-header">
                <div className="post-avatar">{post.username[0].toUpperCase()}</div>
                <div>
                  <h4 className="post-username">{post.username}</h4>
                  <p className="post-time">{post.time || 'Baru saja'}</p>
                </div>
              </div>
              <button className="modal-close" onClick={() => setShowComments(false)}>✕</button>
            </div>

            {post.text && <p className="post-text">{post.text}</p>}
            {post.image && (
              <img
                src={post.image}
                alt="post"
                className="post-image"
                style={{borderRadius: '12px', marginBottom: '0.5rem', cursor: 'pointer'}}
                onClick={() => window.open(post.image)}
              />
            )}
            <div className="modal-divider" />

            <div className="comments-section">
              {loadingComments ? (
                <p className="no-comments">Loading komentar... </p>
              ) : comments.length === 0 ? (
                <p className="no-comments">Belum ada komentar, jadi yang pertama!</p>
              ) : (
                comments.map(comment => (
                  <div key={comment.id}>
                    <div className={`comment ${comment.username === displayName ? 'comment-self' : ''}`}>
                      {comment.username !== currentUser.username && (
                        <div className="comment-avatar">{comment.username[0].toUpperCase()}</div>
                      )}
                      <div className="comment-content">
                        <div className="comment-header">
                          <span className="comment-username">{comment.username}</span>
                          <span className="comment-time">{comment.time || 'Baru saja'}</span>
                        </div>
                        <p className="comment-text">{comment.text}</p>
                        {comment.username !== displayName && (
                          <button
                            className="reply-btn"
                            onClick={() => setReplyTo(replyTo === comment.id ? null : comment.id)}
                          >
                            {replyTo === comment.id ? 'Batal' : '↩ Reply'}
                          </button>
                        )}
                      </div>
                    </div>

                    {replyTo === comment.id && (
                      <div className="reply-input-container">
                        <input
                          className="reply-input"
                          placeholder={`Balas ${comment.username}...`}
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && handleReply(comment.id)}
                          autoFocus
                        />
                        <button className="reply-send-btn" onClick={() => handleReply(comment.id)}>Kirim</button>
                      </div>
                    )}

                    {comment.replies && comment.replies.map(reply => (
                      <div key={reply.id} className="comment reply">
                        <div className="comment-avatar reply-avatar">{(reply.username || 'A')[0].toUpperCase()}</div>
                        <div className="comment-content">
                          <div className="comment-header">
                            <span className="comment-username">{reply.username}</span>
                            <span className="comment-time">{reply.time || 'Baru saja'}</span>
                          </div>
                          <p className="comment-text">{reply.text}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                ))
              )}
            </div>

            <div className="modal-divider" />
            <div className="new-comment-container">
              <input
                className="reply-input"
                placeholder="Tulis komentar... (Enter untuk kirim)"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleNewComment()}
              />
              <button className="reply-send-btn" onClick={handleNewComment}>Kirim</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default PostCard