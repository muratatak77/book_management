# frozen_string_literal: true

class CommentsController < ApplicationController
  before_action :set_comment, only: %i[show update destroy]

  # GET /comments
  def index
    @comments = Comment.all

    render json: @comments
  end

  def users_comments_old
    posts = Post.all
    comments = posts.map(&:comments).flatten
    @user_comments = comments.select do |comment|
      comment.author.username == params[:username]
    end
    render json: @user_comments

    # we can get N+1 query issues
    #     GET /users_comments?username=muratatak
    # USE eager loading detected
    #   Post => [:comments]
    #   Add to your query: .includes([:comments])
    # Call stack
    #   /Users/muratatak/Documents/REACT/book_management/test-react-api/app/controllers/comments_controller.rb:13:in `flatten'
    #   /Users/muratatak/Documents/REACT/book_management/test-react-api/app/controllers/comments_controller.rb:13:in `users_comments'
    # we can improve this function with by 1 query.
  end

  def users_comments
    # byebug
    # we don't need actually post active record relations and collections.
    @user_comments = Comment.joins(:author).where('authors.username = ?', params[:username])
    render json: @user_comments
  end

  # GET /comments/1
  def show
    render json: @comment
  end

  # POST /comments
  def create
    @comment = Comment.new(comment_params)

    if @comment.save
      render json: @comment, status: :created, location: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /comments/1
  def update
    if @comment.update(comment_params)
      render json: @comment
    else
      render json: @comment.errors, status: :unprocessable_entity
    end
  end

  # DELETE /comments/1
  def destroy
    @comment.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_comment
    @comment = Comment.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def comment_params
    params.require(:comment).permit(:title, :content, :post_id, :author_id)
  end
end
