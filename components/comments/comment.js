import DateTime from '../dateTime'
import { useEffect, useRef } from 'react'

function ReplyButton ({ canReplyTo, clickReplyTo, clickCancel }) {
  if (canReplyTo) {
    return <button
      className="hover:bg-yellow-800 font-semibold border border-yellow-800 rounded-md text-border-yellow-800 hover:text-white py-1 my-2 px-4 duration-200 transition-colors"
      onClick={clickReplyTo}
    >
      Reply
    </button>
  }

  return (
    <>
      <span className="text-md font-black">You're replying to this comment.</span>
      <button
        className="hover:bg-yellow-800 font-semibold border border-yellow-800 rounded-md text-border-yellow-800 hover:text-white py-1 my-2 px-4 ml-4 duration-200 transition-colors"
        onClick={clickCancel}
      >
        Cancel
      </button>
    </>
  )
}

export default function Comment ({
                                   _id,
                                   _createdAt,
                                   name,
                                   comment,
                                   isResponse = false,
                                   replyingTo,
                                   clickReplyTo,
                                   newCommentId,
                                 }) {
  const canReplyTo = !replyingTo || _id !== replyingTo._id
  const onClickReplyTo = () => clickReplyTo({ name, _id })
  const onClickCancel = () => clickReplyTo(undefined)
  const testRef = useRef(null)
  useEffect(() => {
    if (newCommentId === _id) {
      testRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    }
  }, [newCommentId])

  return (
    <li key={_id} className="mb-5" ref={testRef}>
      {!isResponse && <hr className="mb-5"/>}
      <h4 className="mb-2 leading-tight"><strong>{name}</strong> <em>(<DateTime
        dateString={_createdAt}
      />)</em></h4>
      <p>{comment}</p>
      {!isResponse && <ReplyButton canReplyTo={canReplyTo} clickReplyTo={onClickReplyTo} clickCancel={onClickCancel}/>}
    </li>
  )
}