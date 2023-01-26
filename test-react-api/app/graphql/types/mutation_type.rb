module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"
    def test_field
      "Hello World"
    end

    field :create_post, mutation: Mutations::CreatePost
   
    # field :post, PostType, "Find a post by ID" do
    #   argument :id, ID
    # end

  end
end