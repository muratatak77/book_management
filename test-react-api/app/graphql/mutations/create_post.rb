module Mutations
  class CreatePost < BaseMutation
    argument :content, String
    argument :title, String

    # return type from the mutation
    type Types::PostType

    def resolve(content: nil, title: nil)
      Post.create!(content: content, title: title)
    end
  end
end