import Comment from './comment'

export default function Comments ({ comments = [], replyToComment, clickReplyTo, newCommentId }) {
  const rootComments = comments?.filter(c => !c.responseToId) || []

  const responsesMap = {}
  comments.filter(c => c.responseToId)
          .forEach(c => {
            const responseId = c.responseToId
            if (!responsesMap[responseId]) {
              responsesMap[responseId] = [c]
            } else {
              responsesMap[responseId].push(c)
            }
          })

  const commentList = rootComments.length > 0 ? (<ul>
      {rootComments.map((commentData) => (
        <div key={commentData._id}>
          <Comment
            {...commentData}
            clickReplyTo={clickReplyTo}
            replyingTo={replyToComment}
            newCommentId={newCommentId}
            isResponse={false}
          />
          <div>
            {responsesMap[commentData._id] &&
             (<ul className="ml-5 p-2 pt-5 border border-2 border-amber-800 rounded-md">
                 {responsesMap[commentData._id].map((responseData) => (
                   <Comment
                     key={responseData._id}
                    {...responseData}
                    clickReplyTo={clickReplyTo}
                    replyingTo={replyToComment}
                    isResponse={true}
                  />
                ))
                }
              </ul>
            )}
          </div>
        </div>
        ))
      }
    </ul>) : (<h3>Be the first to add a comment!</h3>)

  return (
    <>
      {commentList}
      <hr className="mt-5 mb-5" />
    </>
  )
}
