module Jekyll
  class WrapHeadings
    # Hook into the post-render process for pages and posts
    Jekyll::Hooks.register [:pages, :posts], :post_render do |doc|
      next unless doc.output_ext == ".html" # Process only HTML output

      doc.output = wrap_headings(doc.output)
    end

    def self.wrap_headings(content)
      # Use a regex to find all h1-h6 tags and wrap them
      content.gsub(/<(h[1-6])(\s+[^>]*)?>(.*?)<\/\1>/i) do |match|
        tag = Regexp.last_match(1) # h1, h2, etc.
        attrs = Regexp.last_match(2) || "" # Attributes of the tag
        text = Regexp.last_match(3) # Inner text of the tag

        # Extract or generate the ID for the heading
        id_match = attrs.match(/id="([^"]+)"/)
        heading_id = id_match ? id_match[1] : generate_id(text)

        # Ensure the ID is part of the attributes
        attrs = attrs.sub(/id="[^"]*"/, '').strip
        attrs += %( id="#{heading_id}")

        # Wrap the heading with the desired structure
        %(
          <div class="flex row">
            <a href="##{heading_id}" class="heading-linker" aria-label="Link directly to this section">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" data-lucide="hash" class="lucide lucide-hash rem3"><line x1="4" x2="20" y1="9" y2="9"></line><line x1="4" x2="20" y1="15" y2="15"></line><line x1="10" x2="8" y1="3" y2="21"></line><line x1="16" x2="14" y1="3" y2="21"></line></svg>
            </a>
            <#{tag}#{attrs}>#{text}</#{tag}>
          </div>
        ).strip
      end
    end

    def self.generate_id(content)
      # Create a URL-friendly ID based on the content
      content.downcase.strip.gsub(/\s+/, "-").gsub(/[^a-z0-9\-_]/, "")
    end
  end
end

puts 'GenerateHeadings plugin loaded'