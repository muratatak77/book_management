# frozen_string_literal: true

require 'rails_helper'

# belongs_to :post
# belongs_to :author
# validates :title, presence: true
# validates :content, presence: true

RSpec.describe Comment, type: :model do
  subject do
    described_class.new(title: 'test', content: 'test')
  end

  it 'is valid with valid attributes' do
    expect(subject).to be_valid
  end

  it 'is not valid without a title' do
    subject.title = nil
    expect(subject).to_not be_valid
  end

  it 'is not valid without a comment' do
    subject.content = nil
    expect(subject).to_not be_valid
  end

  describe 'Associations' do
    it { should belong_to(:post).without_validating_presence }
    it { should belong_to(:author).without_validating_presence }
  end
end
