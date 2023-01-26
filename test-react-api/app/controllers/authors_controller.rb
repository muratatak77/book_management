# frozen_string_literal: true

class AuthorsController < ApplicationController
  before_action :set_author, only: %i[show update destroy]

  # GET /autors
  def index
    autors = Author.order('created_at DESC').paginate(page: params[:page])
    autors_count = Author.all.size

    render json: { data: autors, data_count: autors_count }
  end

  # POST /autors
  def create
    @author = Author.new(author_params)

    if @author.save
      render json: @author, status: :created, location: @author
    else
      render json: @author.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /autors/1
  def update
    if @author.update(author_params)
      render json: @author
    else
      render json: @author.errors, status: :unprocessable_entity
    end
  end

  # DELETE /autors/1
  def destroy
    @author.destroy
  end

  private

  # Use callbacks to share common setup or constraints between actions.
  def set_author
    @author = Author.find(params[:id])
  end

  # Only allow a list of trusted parameters through.
  def author_params
    params.require(:author).permit(:name, :email)
  end
end
