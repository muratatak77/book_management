# frozen_string_literal: true

class BooksController < ApplicationController
  before_action :set_book, only: %i[show update destroy]

  # GET /books
  def index
    books = Book.includes(:author).order('created_at DESC').paginate(page: params[:page])
    render json: {
      data: ActiveModelSerializers::SerializableResource.new(books),
      data_count: Book.all.size
    }
  end

  # GET /books/1
  def show
    render json: @book
  end

  def category_list
    list = [
      { value: 'category1', label: 'CATEGORY1' },
      { value: 'category2', label: 'CATEGORY2' },
      { value: 'category3', label: 'CATEGORY3' }
    ]
    render json: list
  end

  # POST /books
  def create
    @book = Book.new(book_params)

    if @book.save
      render json: @book, status: :created, location: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /books/1
  def update
    if @book.update(book_params)
      render json: @book
    else
      render json: @book.errors, status: :unprocessable_entity
    end
  end

  # DELETE /books/1
  def destroy
    @book.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_book
    @book = Book.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def book_params
    params.require(:book).permit(:title, :page_size, :category)
  end
end
