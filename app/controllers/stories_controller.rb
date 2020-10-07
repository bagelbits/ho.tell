# frozen_string_literal: true

class StoriesController < ApplicationController
  def create
    params.require(:story)

    story = Story.create(story: params[:story])

    render json: story
  end

  def report
    story = Story.find(params[:id])
    story.report!
    response = {
      success: true,
      error: ''
    }
    render json: response
  end
end
