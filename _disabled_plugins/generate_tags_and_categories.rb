# Runs during the :generate phase, so it creates the .md files for tags and categories
# from posts, pages, notes and videos, and then Jekyll builds the HTML for them, along
# the rest of the pages of the site.

# This is disabled and is used only before an update is published to GitHub, because
# otherwise the Actions runner would have to commit those new tags and categories.
# I'm not going to bother opening that can of worms.

require 'set'
require 'fileutils'

module Jekyll
  class GenerateTagsAndCategories < Generator
    safe true

    def generate(site)
      # Prevent running the plugin multiple times in a single build
      return if site.config['tags_and_categories_generated']

      tags = Set.new
      categories = Set.new

      # Collect tags and categories from posts
      site.posts.docs.each do |post|
        collect_tags_and_categories(post.data, tags, categories)
      end

      # Collect tags and categories from pages
      site.pages.each do |page|
        collect_tags_and_categories(page.data, tags, categories)
      end

      # Collect tags and categories from Notes and Videos
      site.pages.each do |page|
        if page.data['title'] == 'Notes'
          collect_nested_items(page.data['notes'], tags, categories)
        elsif page.data['title'] == 'Videos'
          collect_nested_items(page.data['videos'], tags, categories)
        end
      end

      # Log collected tags and categories
      Jekyll.logger.info "GenerateTagsAndCategories:", "Collected Tags: #{tags.to_a.sort.join(', ')}"
      Jekyll.logger.info "GenerateTagsAndCategories:", "Collected Categories: #{categories.to_a.sort.join(', ')}"

      # Generate category pages
      categories.each do |category|
        slug = category.gsub(' ', '-').downcase
        create_category_page(site, slug, category)
      end

      # Generate tag pages
      tags.each do |tag|
        slug = tag.gsub(' ', '-').downcase
        create_tag_page(site, slug, tag)
      end

      # Mark the generation as complete
      site.config['tags_and_categories_generated'] = true
      Jekyll.logger.info "GenerateTagsAndCategories:", "Tag and category files have been generated."
    end

    private

    def collect_tags_and_categories(data, tags, categories)
      if data['tags']
        data['tags'].each { |tag| tags.add(tag.to_s) }
      end
      if data['categories']
        data['categories'].each { |category| categories.add(category.to_s) }
      end
    end

    def collect_nested_items(items, tags, categories)
      return unless items.is_a?(Array)

      items.each do |item|
        collect_tags_and_categories(item, tags, categories)
      end
    end

    def create_category_page(site, slug, category)
      path = File.join('categories', "#{slug}.md")
      content = <<~YAML
        ---
        layout: category
        title: Items in the "#{category}" category
        description: Just a page listing all items in the "#{category}" category
        category: #{category}
        ---
      YAML
      write_file(site, path, content)
    end

    def create_tag_page(site, slug, tag)
      path = File.join('tags', "#{slug}.md")
      content = <<~YAML
        ---
        layout: tag
        title: Items with the "#{tag}" tag
        description: Just a page listing all items with the "#{tag}" tag
        tag: #{tag}
        ---
      YAML
      write_file(site, path, content)
    end

    def write_file(site, path, content)
      dir = File.dirname(path)
      FileUtils.mkdir_p(File.join(site.source, dir))
      File.open(File.join(site.source, path), 'w') do |file|
        file.write(content)
      end
    end
  end
end
