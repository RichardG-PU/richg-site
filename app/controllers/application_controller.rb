class ApplicationController < ActionController::Base
  # Only allow modern browsers supporting webp images, web push, badges, import maps, CSS nesting, and CSS :has.
  allow_browser versions: :modern

  # Changes to the importmap will invalidate the etag for HTML responses
  stale_when_importmap_changes

  before_action :load_skills_words
  private

  def load_skills_words
    skills = JSON.parse(File.read(Rails.root.join("app/assets/skills.json")))
    @skills_words = skills["skills"].values.flatten.uniq
  end
end
