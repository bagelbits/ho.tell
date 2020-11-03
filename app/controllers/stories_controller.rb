# frozen_string_literal: true

class StoriesController < ApplicationController
  def create
    params.require(:story)

    story = Story.create(story: params[:story])

    render json: story
  end

  def random
    ignored_ids = params[:ignored_ids] || ''
    random_story = Story.random(ignored_ids.split(','))

    render json: random_story
  end

  def to_review
    render json: Story.to_review
  end

  def reviewed
    render json: Story.reviewed
  end

  def reported
    render json: Story.reported
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

  def review
    story = Story.find(params[:id])
    story.review!
    response = {
      success: true,
      error: ''
    }
    render json: response
  end
end
