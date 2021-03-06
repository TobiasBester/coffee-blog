export default {
    name: 'comment',
    type: 'document',
    title: 'Comment',
    fields: [
      {
        name: 'name',
        type: 'string',
      },
      {
        title: 'Approved',
        name: 'approved',
        type: 'boolean',
        initialValue: true,
        description: "Comments won't show on the site without approval"
      },
      {
        name: 'email',
        type: 'string',
      },
      {
        name: 'comment',
        type: 'text',
      },
      {
        name: 'post',
        type: 'reference',
        to: [
          {type: 'post'}
        ]
      },
      {
        name: 'responseTo',
        type: 'reference',
        to: [
          {type: 'comment'}
        ],
        weak: true
      }
    ],
    preview: {
      select: {
        name: 'name',
        comment: 'comment',
        post: 'post.title'
      },
      prepare({name, comment, post}) {
        return {
          title: `${name} on ${post}`,
          subtitle: comment
        }
      }
    }
  }
  