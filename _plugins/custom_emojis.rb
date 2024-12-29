module Jekyll
  class EmojiProcessor
    def self.process(content, site)
      # Access the custom emoji definitions from the site config
      emoji_map = site.config['emoji_map']
      baseurl = site.config['baseurl'] || ""

      return content unless emoji_map.is_a?(Hash)

      # Replace all occurrences of :emoji: syntax
      content.gsub(/:([a-zA-Z0-9_\-]+):/) do |match|
        emoji_key = Regexp.last_match(1)
        if emoji_map.key?(emoji_key)
          emoji_data = emoji_map[emoji_key]
          image_path = emoji_data['path']
          alt_text = emoji_data['alt'] || emoji_key # Default to key if no alt is provided
          image_url = "#{baseurl}#{image_path}" # Prepend baseurl dynamically
          %(<img src="#{image_url}" alt="#{alt_text}" title="#{alt_text}" class="emoji">)
        else
          match # Leave the original text if no match is found
        end
      end
    end
  end
end

# Register the hook to modify site documents
Jekyll::Hooks.register [:pages, :documents], :post_render do |item|
  if item.output_ext == '.html'
    item.output = Jekyll::EmojiProcessor.process(item.output, item.site)
  end
end
