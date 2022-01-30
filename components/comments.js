import DateTime from './dateTime'

export default function Comments ({ comments = [] }) {
  const commentList = comments?.length > 0
                      ? (
                        <ul>
                          {comments?.map(({ _id, _createdAt, name, comment }) => (
                            <li key={_id} className="mb-5">
                              <hr className="mb-5"/>
                              <h4 className="mb-2 leading-tight"><strong>{name}</strong> <em>(<DateTime
                                dateString={_createdAt}
                              />)</em></h4>
                              <p>{comment}</p>
                            </li>
                          ))}
                        </ul>
                      )
                      : (
                        <h3>Be the first to add a comment!</h3>
                      )

  // TODO: Make a new comment display upon publish
  // TODO: Remove all Next/Vercel/Sanity text
  // TODO: Figure out how to block certain commenters?
  // TODO: Edit out footer with something
  // TODO: Enable one-layer deep nested comments

  return (
    <>
      <h2 className="mt-6 mb-4 text-4xl lg:text-6xl leading-tight">Comments:</h2>
      {commentList}
      <hr className="mt-5 mb-5" />
    </>
  )
}
